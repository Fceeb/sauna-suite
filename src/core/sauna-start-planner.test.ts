import { describe, expect, it } from 'vitest';

import type { EnergyState } from './energy-state';
import {
  calculateAvailablePvSurplusKw,
  calculateEnergySourceBreakdown,
  calculateExpectedBatterySocAfterSauna,
  calculatePvContributionKwh,
  classifyEnergyConfidence,
  parseDesiredReadyTime,
  planSaunaStart,
  type EnergyPlannerInput,
} from './sauna-start-planner';

describe('sauna start planner', () => {
  it('calculates recommended start time for planned ready time', () => {
    const result = planSaunaStart(
      plannerInput({
        now: new Date('2026-08-16T16:00:00'),
        desiredReadyTime: '19:00',
        estimatedHeatupMinutes: 46,
      }),
    );

    expect(result.status).toBe('planned');
    expect(result.recommendedStartAt?.getHours()).toBe(18);
    expect(result.recommendedStartAt?.getMinutes()).toBe(14);
  });

  it('returns start now near the latest safe start', () => {
    const result = planSaunaStart(
      plannerInput({
        now: new Date('2026-08-16T18:12:00'),
        desiredReadyTime: '19:00',
        estimatedHeatupMinutes: 46,
      }),
    );

    expect(result.status).toBe('start_now');
  });

  it('reports wait when there is no planned ready time', () => {
    const result = planSaunaStart(
      plannerInput({
        now: new Date('2026-08-16T12:00:00'),
        desiredReadyTime: undefined,
        estimatedHeatupMinutes: 30,
        totalEnergyKwh: 5,
        etaAvailable: false,
        hasSufficientHistory: false,
      }),
    );

    expect(result.status).toBe('wait');
  });

  it('reports missed and already-ready states', () => {
    expect(
      planSaunaStart(
        plannerInput({
          now: new Date('2026-08-16T19:10:00'),
          desiredReadyAt: new Date('2026-08-16T19:00:00'),
          estimatedHeatupMinutes: 30,
          currentTemperature: 40,
          targetTemperature: 80,
        }),
      ).status,
    ).toBe('target_time_missed');

    expect(
      planSaunaStart(
        plannerInput({
          now: new Date('2026-08-16T12:00:00'),
          desiredReadyTime: '19:00',
          estimatedHeatupMinutes: 30,
          currentTemperature: 82,
          targetTemperature: 80,
        }),
      ).status,
    ).toBe('already_ready');
  });

  it('uses configured 60, 90 and 120 minute session durations for source planning', () => {
    expect(
      planSaunaStart(
        plannerInput({
          estimatedHeatupMinutes: 0,
          expectedSessionDurationMinutes: 60,
          totalEnergyKwh: 100,
          energyState: energyState({ pvPowerKw: 10, homePowerKw: 0 }),
          pvPersistenceFactor: 0.5,
        }),
      ).sourceBreakdown?.pvEnergyKwh,
    ).toBe(5);
    expect(
      planSaunaStart(
        plannerInput({
          estimatedHeatupMinutes: 0,
          expectedSessionDurationMinutes: 90,
          totalEnergyKwh: 100,
          energyState: energyState({ pvPowerKw: 10, homePowerKw: 0 }),
          pvPersistenceFactor: 0.5,
        }),
      ).sourceBreakdown?.pvEnergyKwh,
    ).toBe(7.5);
    expect(
      planSaunaStart(
        plannerInput({
          estimatedHeatupMinutes: 0,
          expectedSessionDurationMinutes: 120,
          totalEnergyKwh: 100,
          energyState: energyState({ pvPowerKw: 10, homePowerKw: 0 }),
          pvPersistenceFactor: 0.5,
        }),
      ).sourceBreakdown?.pvEnergyKwh,
    ).toBe(10);
  });

  it('handles midnight crossing for desired ready time', () => {
    const readyAt = parseDesiredReadyTime('00:30', new Date('2026-08-16T23:30:00'));

    expect(readyAt?.getDate()).toBe(17);
    expect(readyAt?.getHours()).toBe(0);
    expect(readyAt?.getMinutes()).toBe(30);
  });

  it('keeps local Date handling deterministic across DST-style local construction', () => {
    const readyAt = parseDesiredReadyTime('03:30', new Date(2026, 2, 29, 1, 30));

    expect(readyAt?.getHours()).toBe(3);
    expect(readyAt?.getMinutes()).toBe(30);
  });

  it('estimates PV contribution from surplus with boundaries and zero PV', () => {
    expect(calculatePvContributionKwh(6, 0, 9, false, 0.5, 1)).toBe(3);
    expect(calculatePvContributionKwh(6, 0, 9, false, 2, 1)).toBe(6);
    expect(calculatePvContributionKwh(0, 0, 9, false, 0.5, 1)).toBe(0);
    expect(calculatePvContributionKwh(undefined, 0, 9, false, 0.5, 1)).toBe(0);
  });

  it('reduces PV contribution by significant house load', () => {
    expect(calculateAvailablePvSurplusKw(6, 0, 9, false)).toBe(6);
    expect(calculateAvailablePvSurplusKw(6, 5, 9, false)).toBe(1);
    expect(calculatePvContributionKwh(6, 5, 9, false, 0.5, 1)).toBe(0.5);
  });

  it('returns zero PV contribution when house load is greater than generation', () => {
    expect(calculateAvailablePvSurplusKw(4, 5, 9, false)).toBe(0);
    expect(calculatePvContributionKwh(4, 5, 9, false, 0.5, 1)).toBe(0);
  });

  it('handles home power including sauna load without double-counting the sauna', () => {
    expect(calculateAvailablePvSurplusKw(6, 10, 9, true)).toBe(5);
    expect(calculatePvContributionKwh(6, 10, 9, true, 0.5, 1)).toBe(2.5);
  });

  it('uses conservative surplus when home power excludes sauna load', () => {
    expect(calculateAvailablePvSurplusKw(6, 10, 9, false)).toBe(0);
    expect(calculatePvContributionKwh(6, 10, 9, false, 0.5, 1)).toBe(0);
  });

  it('does not claim gross PV when no home power sensor is available', () => {
    expect(calculateAvailablePvSurplusKw(6, undefined, 9, false)).toBe(0);
    expect(calculatePvContributionKwh(6, undefined, 9, false, 0.5, 1)).toBe(0);
  });

  it('splits energy between PV, battery and grid with reserve enforcement', () => {
    expect(
      calculateEnergySourceBreakdown({
        totalEnergyKwh: 7.8,
        planningDurationMinutes: 120,
        energyState: energyState({ pvPowerKw: 4, homePowerKw: 0, batteryUsableEnergyKwh: 3 }),
        pvPersistenceFactor: 0.5,
        homePowerIncludesSauna: false,
      }),
    ).toMatchObject({
      pvEnergyKwh: 4,
      batteryEnergyKwh: 3,
      gridEnergyKwh: 0.7999999999999998,
    });
  });

  it('supports PV-only, PV plus battery, and no-battery source splits', () => {
    expect(
      calculateEnergySourceBreakdown({
        totalEnergyKwh: 3,
        planningDurationMinutes: 60,
        energyState: energyState({ pvPowerKw: 6, homePowerKw: 0, batteryUsableEnergyKwh: 2 }),
        pvPersistenceFactor: 0.5,
        homePowerIncludesSauna: false,
      }),
    ).toMatchObject({ pvEnergyKwh: 3, batteryEnergyKwh: 0, gridEnergyKwh: 0 });
    expect(
      calculateEnergySourceBreakdown({
        totalEnergyKwh: 5,
        planningDurationMinutes: 60,
        energyState: energyState({ pvPowerKw: 4, homePowerKw: 0, batteryUsableEnergyKwh: 3 }),
        pvPersistenceFactor: 0.5,
        homePowerIncludesSauna: false,
      }),
    ).toMatchObject({ pvEnergyKwh: 2, batteryEnergyKwh: 3, gridEnergyKwh: 0 });
    expect(
      calculateEnergySourceBreakdown({
        totalEnergyKwh: 5,
        planningDurationMinutes: 60,
        energyState: { pvPowerKw: 2, homePowerKw: 0, saunaPowerKw: 9 },
        pvPersistenceFactor: 0.5,
        homePowerIncludesSauna: false,
      }),
    ).toMatchObject({ pvEnergyKwh: 1, batteryEnergyKwh: 0, gridEnergyKwh: 4 });
  });

  it('calculates expected battery SOC after sauna without going below reserve', () => {
    expect(calculateExpectedBatterySocAfterSauna(energyState(), 3.6)).toBeCloseTo(44);
    expect(calculateExpectedBatterySocAfterSauna(energyState(), 99)).toBe(20);
  });

  it('classifies confidence qualitatively', () => {
    expect(
      classifyEnergyConfidence({
        etaAvailable: true,
        hasBatteryData: true,
        hasPvData: true,
        hasPowerData: true,
        hasSufficientHistory: true,
      }),
    ).toBe('high');
    expect(
      classifyEnergyConfidence({
        etaAvailable: true,
        hasBatteryData: true,
        hasPvData: false,
        hasPowerData: true,
        hasSufficientHistory: false,
      }),
    ).toBe('medium');
    expect(
      classifyEnergyConfidence({
        etaAvailable: false,
        hasBatteryData: false,
        hasPvData: true,
        hasPowerData: false,
        hasSufficientHistory: false,
      }),
    ).toBe('low');
    expect(
      classifyEnergyConfidence({
        etaAvailable: false,
        hasBatteryData: false,
        hasPvData: false,
        hasPowerData: false,
        hasSufficientHistory: false,
      }),
    ).toBe('unavailable');
  });
});

function plannerInput(overrides: Partial<EnergyPlannerInput> = {}): EnergyPlannerInput {
  return {
    now: new Date('2026-08-16T16:00:00'),
    desiredReadyTime: '19:00',
    estimatedHeatupMinutes: 46,
    expectedSessionDurationMinutes: 90,
    totalEnergyKwh: 7.8,
    energyState: energyState(),
    pvPersistenceFactor: 0.5,
    homePowerIncludesSauna: false,
    currentTemperature: 40,
    targetTemperature: 80,
    etaAvailable: true,
    hasSufficientHistory: true,
    ...overrides,
  };
}

function energyState(overrides: Partial<EnergyState> = {}): EnergyState {
  return {
    pvPowerKw: 6,
    homePowerKw: 0,
    batterySocPercent: 80,
    batteryCapacityKwh: 10,
    batteryAvailableEnergyKwh: 8,
    batteryReserveEnergyKwh: 2,
    batteryUsableEnergyKwh: 6,
    saunaPowerKw: 9,
    ...overrides,
  };
}
