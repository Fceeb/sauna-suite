import { clampValue } from '../utils/number';
import type { EnergyState } from './energy-state';

export const ENERGY_PLANNER_STATUSES = [
  'start_now',
  'wait',
  'planned',
  'insufficient_data',
  'already_ready',
  'target_time_missed',
] as const;

export const ENERGY_CONFIDENCE_LEVELS = ['high', 'medium', 'low', 'unavailable'] as const;

export type EnergyPlannerStatus = (typeof ENERGY_PLANNER_STATUSES)[number];
export type EnergyConfidence = (typeof ENERGY_CONFIDENCE_LEVELS)[number];

export type EnergyRecommendationReason =
  | 'optimal_start'
  | 'start_now_for_target'
  | 'pv_contribution'
  | 'battery_sufficient'
  | 'grid_needed'
  | 'missing_battery'
  | 'insufficient_data'
  | 'already_ready'
  | 'target_time_missed';

export interface EnergySourceBreakdown {
  pvEnergyKwh: number;
  batteryEnergyKwh: number;
  gridEnergyKwh: number;
  expectedBatterySocAfterSauna?: number | undefined;
}

export interface EnergyPlannerInput {
  now: Date;
  desiredReadyTime?: string | undefined;
  desiredReadyAt?: Date | undefined;
  estimatedHeatupMinutes?: number | undefined;
  expectedSessionDurationMinutes: number;
  totalEnergyKwh?: number | undefined;
  energyState: EnergyState;
  pvPersistenceFactor: number;
  homePowerIncludesSauna: boolean;
  currentTemperature?: number | undefined;
  targetTemperature?: number | undefined;
  etaAvailable: boolean;
  hasSufficientHistory: boolean;
}

export interface EnergyPlannerResult {
  desiredReadyAt?: Date | undefined;
  recommendedStartAt?: Date | undefined;
  latestSafeStartAt?: Date | undefined;
  status: EnergyPlannerStatus;
  confidence: EnergyConfidence;
  sourceBreakdown?: EnergySourceBreakdown | undefined;
  reasons: EnergyRecommendationReason[];
}

const START_NOW_GRACE_MINUTES = 5;

export function planSaunaStart(input: EnergyPlannerInput): EnergyPlannerResult {
  const sourceBreakdown = calculateEnergySourceBreakdown({
    totalEnergyKwh: input.totalEnergyKwh,
    planningDurationMinutes:
      (input.estimatedHeatupMinutes ?? 0) + input.expectedSessionDurationMinutes,
    energyState: input.energyState,
    pvPersistenceFactor: input.pvPersistenceFactor,
    homePowerIncludesSauna: input.homePowerIncludesSauna,
  });
  const confidence = classifyEnergyConfidence({
    etaAvailable: input.etaAvailable,
    hasBatteryData:
      input.energyState.batterySocPercent !== undefined &&
      input.energyState.batteryUsableEnergyKwh !== undefined,
    hasPvData: input.energyState.pvPowerKw !== undefined,
    hasPowerData: input.energyState.saunaPowerKw !== undefined,
    hasSufficientHistory: input.hasSufficientHistory,
  });

  if (isTargetReady(input.currentTemperature, input.targetTemperature)) {
    return {
      status: 'already_ready',
      confidence,
      sourceBreakdown,
      reasons: ['already_ready'],
    };
  }

  if (
    input.estimatedHeatupMinutes === undefined ||
    !Number.isFinite(input.estimatedHeatupMinutes) ||
    input.estimatedHeatupMinutes < 0
  ) {
    return {
      status: 'insufficient_data',
      confidence,
      sourceBreakdown,
      reasons: ['insufficient_data'],
    };
  }

  const desiredReadyAt =
    input.desiredReadyAt ?? parseDesiredReadyTime(input.desiredReadyTime, input.now);

  if (!desiredReadyAt) {
    return {
      status: 'wait',
      confidence,
      sourceBreakdown,
      reasons: buildRecommendationReasons('wait', sourceBreakdown),
    };
  }

  if (desiredReadyAt.getTime() <= input.now.getTime()) {
    return {
      desiredReadyAt,
      status: 'target_time_missed',
      confidence,
      sourceBreakdown,
      reasons: ['target_time_missed'],
    };
  }

  const recommendedStartAt = new Date(
    desiredReadyAt.getTime() - input.estimatedHeatupMinutes * 60_000,
  );
  const latestSafeStartAt = recommendedStartAt;
  const graceTime = input.now.getTime() + START_NOW_GRACE_MINUTES * 60_000;
  const status: EnergyPlannerStatus =
    recommendedStartAt.getTime() <= graceTime ? 'start_now' : 'planned';

  return {
    desiredReadyAt,
    recommendedStartAt,
    latestSafeStartAt,
    status,
    confidence,
    sourceBreakdown,
    reasons: buildRecommendationReasons(status, sourceBreakdown),
  };
}

export function calculateEnergySourceBreakdown(input: {
  totalEnergyKwh?: number | undefined;
  planningDurationMinutes: number;
  energyState: EnergyState;
  pvPersistenceFactor: number;
  homePowerIncludesSauna: boolean;
}): EnergySourceBreakdown | undefined {
  if (
    input.totalEnergyKwh === undefined ||
    !Number.isFinite(input.totalEnergyKwh) ||
    input.totalEnergyKwh < 0
  ) {
    return undefined;
  }

  const planningHours = Math.max(0, input.planningDurationMinutes / 60);
  const pvEnergyKwh = Math.min(
    input.totalEnergyKwh,
    calculatePvContributionKwh(
      input.energyState.pvPowerKw,
      input.energyState.homePowerKw,
      input.energyState.saunaPowerKw,
      input.homePowerIncludesSauna,
      input.pvPersistenceFactor,
      planningHours,
    ),
  );
  const afterPvKwh = Math.max(0, input.totalEnergyKwh - pvEnergyKwh);
  const batteryEnergyKwh = Math.min(afterPvKwh, input.energyState.batteryUsableEnergyKwh ?? 0);
  const gridEnergyKwh = Math.max(0, afterPvKwh - batteryEnergyKwh);

  return {
    pvEnergyKwh,
    batteryEnergyKwh,
    gridEnergyKwh,
    expectedBatterySocAfterSauna: calculateExpectedBatterySocAfterSauna(
      input.energyState,
      batteryEnergyKwh,
    ),
  };
}

export function calculatePvContributionKwh(
  pvPowerKw: number | undefined,
  homePowerKw: number | undefined,
  saunaPowerKw: number | undefined,
  homePowerIncludesSauna: boolean,
  persistenceFactor: number,
  planningHours: number,
): number {
  if (
    pvPowerKw === undefined ||
    !Number.isFinite(pvPowerKw) ||
    pvPowerKw <= 0 ||
    !Number.isFinite(planningHours) ||
    planningHours <= 0
  ) {
    return 0;
  }

  return (
    calculateAvailablePvSurplusKw(pvPowerKw, homePowerKw, saunaPowerKw, homePowerIncludesSauna) *
    clampValue(persistenceFactor, 0, 1) *
    planningHours
  );
}

export function calculateAvailablePvSurplusKw(
  pvPowerKw: number | undefined,
  homePowerKw: number | undefined,
  saunaPowerKw: number | undefined,
  homePowerIncludesSauna: boolean,
): number {
  if (pvPowerKw === undefined || !Number.isFinite(pvPowerKw) || pvPowerKw <= 0) {
    return 0;
  }

  if (homePowerKw === undefined || !Number.isFinite(homePowerKw) || homePowerKw < 0) {
    return 0;
  }

  const nonSaunaHomePowerKw =
    homePowerIncludesSauna && saunaPowerKw !== undefined && Number.isFinite(saunaPowerKw)
      ? Math.max(0, homePowerKw - Math.max(0, saunaPowerKw))
      : homePowerKw;

  return Math.max(0, pvPowerKw - nonSaunaHomePowerKw);
}

export function calculateExpectedBatterySocAfterSauna(
  energyState: EnergyState,
  batteryEnergyKwh: number,
): number | undefined {
  if (
    energyState.batterySocPercent === undefined ||
    energyState.batteryCapacityKwh === undefined ||
    energyState.batteryReserveEnergyKwh === undefined ||
    energyState.batteryCapacityKwh <= 0
  ) {
    return undefined;
  }

  const availableAfterKwh = Math.max(
    energyState.batteryReserveEnergyKwh,
    (energyState.batteryAvailableEnergyKwh ?? 0) - Math.max(0, batteryEnergyKwh),
  );

  return clampValue((availableAfterKwh / energyState.batteryCapacityKwh) * 100, 0, 100);
}

export function classifyEnergyConfidence(input: {
  etaAvailable: boolean;
  hasBatteryData: boolean;
  hasPvData: boolean;
  hasPowerData: boolean;
  hasSufficientHistory: boolean;
}): EnergyConfidence {
  const score = [
    input.etaAvailable,
    input.hasBatteryData,
    input.hasPvData,
    input.hasPowerData,
    input.hasSufficientHistory,
  ].filter(Boolean).length;

  if (score >= 4) {
    return 'high';
  }

  if (score >= 3) {
    return 'medium';
  }

  if (score >= 1) {
    return 'low';
  }

  return 'unavailable';
}

export function parseDesiredReadyTime(value: string | undefined, now: Date): Date | undefined {
  const match = value?.match(/^([01]\d|2[0-3]):([0-5]\d)$/);

  if (!match) {
    return undefined;
  }

  const hour = Number(match[1]);
  const minute = Number(match[2]);
  const readyAt = new Date(now);
  readyAt.setHours(hour, minute, 0, 0);

  if (readyAt.getTime() <= now.getTime()) {
    readyAt.setDate(readyAt.getDate() + 1);
  }

  return readyAt;
}

function isTargetReady(
  currentTemperature: number | undefined,
  targetTemperature: number | undefined,
): boolean {
  return (
    currentTemperature !== undefined &&
    targetTemperature !== undefined &&
    Number.isFinite(currentTemperature) &&
    Number.isFinite(targetTemperature) &&
    currentTemperature >= targetTemperature
  );
}

function buildRecommendationReasons(
  status: EnergyPlannerStatus,
  sourceBreakdown: EnergySourceBreakdown | undefined,
): EnergyRecommendationReason[] {
  const reasons: EnergyRecommendationReason[] =
    status === 'start_now' ? ['start_now_for_target'] : ['optimal_start'];

  if (!sourceBreakdown) {
    reasons.push('insufficient_data');
    return reasons;
  }

  if (sourceBreakdown.pvEnergyKwh > 0.1) {
    reasons.push('pv_contribution');
  }

  if (sourceBreakdown.expectedBatterySocAfterSauna === undefined) {
    reasons.push('missing_battery');
  }

  if (sourceBreakdown.gridEnergyKwh <= 0.05 && sourceBreakdown.batteryEnergyKwh > 0) {
    reasons.push('battery_sufficient');
  }

  if (sourceBreakdown.gridEnergyKwh > 0.05) {
    reasons.push('grid_needed');
  }

  return reasons;
}
