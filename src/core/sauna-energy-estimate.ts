export const DEFAULT_EXPECTED_SESSION_DURATION_MINUTES = 90;
export const THERMAL_FALLBACK_KWH_PER_DEGREE = 0.12;
export const SESSION_HOLDING_POWER_FACTOR = 0.35;

export type SaunaEnergyEstimateUnavailableReason =
  'missing_temperature' | 'invalid_power' | 'target_reached';

export interface SaunaEnergyEstimateInput {
  currentTemperature?: number | undefined;
  targetTemperature?: number | undefined;
  etaMinutes?: number | undefined;
  effectiveHeaterPowerKw?: number | undefined;
  ratedHeaterPowerKw: number;
  expectedSessionDurationMinutes: number;
}

export interface SaunaEnergyEstimate {
  estimatedHeatupEnergyKwh?: number | undefined;
  estimatedSessionEnergyKwh?: number | undefined;
  totalEstimatedEnergyKwh?: number | undefined;
  estimatedHeatupMinutes?: number | undefined;
  estimatedSessionMinutes: number;
  usedThermalFallback: boolean;
  unavailableReason?: SaunaEnergyEstimateUnavailableReason | undefined;
}

export function estimateSaunaEnergyNeed(input: SaunaEnergyEstimateInput): SaunaEnergyEstimate {
  const heaterPowerKw = selectHeaterPower(input.effectiveHeaterPowerKw, input.ratedHeaterPowerKw);
  const estimatedSessionMinutes = normalizeSessionDuration(input.expectedSessionDurationMinutes);

  if (heaterPowerKw === undefined) {
    return {
      estimatedSessionMinutes,
      usedThermalFallback: false,
      unavailableReason: 'invalid_power',
    };
  }

  const estimatedSessionEnergyKwh =
    heaterPowerKw * (estimatedSessionMinutes / 60) * SESSION_HOLDING_POWER_FACTOR;
  const heatup = estimateHeatup(input, heaterPowerKw);
  const totalEstimatedEnergyKwh =
    heatup.energyKwh !== undefined ? heatup.energyKwh + estimatedSessionEnergyKwh : undefined;

  return {
    estimatedHeatupEnergyKwh: heatup.energyKwh,
    estimatedSessionEnergyKwh,
    totalEstimatedEnergyKwh,
    estimatedHeatupMinutes: heatup.minutes,
    estimatedSessionMinutes,
    usedThermalFallback: heatup.usedThermalFallback,
    unavailableReason: heatup.unavailableReason,
  };
}

function estimateHeatup(
  input: SaunaEnergyEstimateInput,
  heaterPowerKw: number,
): {
  energyKwh?: number | undefined;
  minutes?: number | undefined;
  usedThermalFallback: boolean;
  unavailableReason?: SaunaEnergyEstimateUnavailableReason | undefined;
} {
  if (
    input.currentTemperature === undefined ||
    input.targetTemperature === undefined ||
    !Number.isFinite(input.currentTemperature) ||
    !Number.isFinite(input.targetTemperature)
  ) {
    return { usedThermalFallback: false, unavailableReason: 'missing_temperature' };
  }

  const remainingTemperature = input.targetTemperature - input.currentTemperature;

  if (remainingTemperature <= 0) {
    return {
      energyKwh: 0,
      minutes: 0,
      usedThermalFallback: false,
      unavailableReason: 'target_reached',
    };
  }

  if (input.etaMinutes !== undefined && Number.isFinite(input.etaMinutes) && input.etaMinutes > 0) {
    return {
      energyKwh: heaterPowerKw * (input.etaMinutes / 60),
      minutes: input.etaMinutes,
      usedThermalFallback: false,
    };
  }

  const energyKwh = remainingTemperature * THERMAL_FALLBACK_KWH_PER_DEGREE;

  return {
    energyKwh,
    minutes: (energyKwh / heaterPowerKw) * 60,
    usedThermalFallback: true,
  };
}

function selectHeaterPower(
  effectiveHeaterPowerKw: number | undefined,
  ratedHeaterPowerKw: number,
): number | undefined {
  if (
    effectiveHeaterPowerKw !== undefined &&
    Number.isFinite(effectiveHeaterPowerKw) &&
    effectiveHeaterPowerKw > 0
  ) {
    return effectiveHeaterPowerKw;
  }

  return Number.isFinite(ratedHeaterPowerKw) && ratedHeaterPowerKw > 0
    ? ratedHeaterPowerKw
    : undefined;
}

function normalizeSessionDuration(value: number): number {
  return Number.isFinite(value) && value > 0 ? value : DEFAULT_EXPECTED_SESSION_DURATION_MINUTES;
}
