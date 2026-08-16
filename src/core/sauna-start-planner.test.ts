import { describe, expect, it } from 'vitest';

import type { EnergyState } from './energy-state';
import {
  calculateEnergySourceBreakdown,
  calculateExpectedBatterySocAfterSauna,
  calculatePvContributionKwh,
  classifyEnergyConfidence,
  parseDesiredReadyTime,
  planSaunaStart,
} from './sauna-start-planner';

describe('sauna start planner', () => {
  it('calculates recommended start time for planned ready time', () => {
    const result = planSaunaStart({
      now: new Date('2026-08-16T16:00:00'),
      desiredReadyTime: '19:00',
      estimatedHeatupMinutes: 46,
      totalEnergyKwh: 7.8,
      energyState: energyState(),
      pvPersistenceFactor: 0.5,
      currentTemperature: 40,
      targetTemperature: 80,
      etaAvailable: true,
      hasSufficientHistory: true,
    });

    expect(result.status).toBe('planned');
    expect(result.recommendedStartAt?.getHours()).toBe(18);
    expect(result.recommendedStartAt?.getMinutes()).toBe(14);
  });

  it('returns start now near the latest safe start', () => {
    const result = planSaunaStart({
      now: new Date('2026-08-16T18:12:00'),
      desiredReadyTime: '19:00',
      estimatedHeatupMinutes: 46,
      totalEnergyKwh: 7.8,
      energyState: energyState(),
      pvPersistenceFactor: 0.5,
      currentTemperature: 40,
      targetTemperature: 80,
      etaAvailable: true,
      hasSufficientHistory: true,
    });

    expect(result.status).toBe('start_now');
  });

  it('reports wait when there is no planned ready time', () => {
    const result = planSaunaStart({
      now: new Date('2026-08-16T12:00:00'),
      estimatedHeatupMinutes: 30,
      totalEnergyKwh: 5,
      energyState: energyState(),
      pvPersistenceFactor: 0.5,
      currentTemperature: 40,
      targetTemperature: 80,
      etaAvailable: false,
      hasSufficientHistory: false,
    });

    expect(result.status).toBe('wait');
  });

  it('reports missed and already-ready states', () => {
    expect(
      planSaunaStart({
        now: new Date('2026-08-16T19:10:00'),
        desiredReadyAt: new Date('2026-08-16T19:00:00'),
        estimatedHeatupMinutes: 30,
        totalEnergyKwh: 5,
        energyState: energyState(),
        pvPersistenceFactor: 0.5,
        currentTemperature: 40,
        targetTemperature: 80,
        etaAvailable: true,
        hasSufficientHistory: true,
      }).status,
    ).toBe('target_time_missed');

    expect(
      planSaunaStart({
        now: new Date('2026-08-16T12:00:00'),
        desiredReadyTime: '19:00',
        estimatedHeatupMinutes: 30,
        totalEnergyKwh: 5,
        energyState: energyState(),
        pvPersistenceFactor: 0.5,
        currentTemperature: 82,
        targetTemperature: 80,
        etaAvailable: true,
        hasSufficientHistory: true,
      }).status,
    ).toBe('already_ready');
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

  it('estimates PV contribution with boundaries and zero PV', () => {
    expect(calculatePvContributionKwh(6, 0.5, 1)).toBe(3);
    expect(calculatePvContributionKwh(6, 2, 1)).toBe(6);
    expect(calculatePvContributionKwh(0, 0.5, 1)).toBe(0);
    expect(calculatePvContributionKwh(undefined, 0.5, 1)).toBe(0);
  });

  it('splits energy between PV, battery and grid with reserve enforcement', () => {
    expect(
      calculateEnergySourceBreakdown({
        totalEnergyKwh: 7.8,
        planningDurationMinutes: 120,
        energyState: energyState({ pvPowerKw: 4, batteryUsableEnergyKwh: 3 }),
        pvPersistenceFactor: 0.5,
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
        energyState: energyState({ pvPowerKw: 6, batteryUsableEnergyKwh: 2 }),
        pvPersistenceFactor: 0.5,
      }),
    ).toMatchObject({ pvEnergyKwh: 3, batteryEnergyKwh: 0, gridEnergyKwh: 0 });
    expect(
      calculateEnergySourceBreakdown({
        totalEnergyKwh: 5,
        planningDurationMinutes: 60,
        energyState: energyState({ pvPowerKw: 4, batteryUsableEnergyKwh: 3 }),
        pvPersistenceFactor: 0.5,
      }),
    ).toMatchObject({ pvEnergyKwh: 2, batteryEnergyKwh: 3, gridEnergyKwh: 0 });
    expect(
      calculateEnergySourceBreakdown({
        totalEnergyKwh: 5,
        planningDurationMinutes: 60,
        energyState: { pvPowerKw: 2, saunaPowerKw: 9 },
        pvPersistenceFactor: 0.5,
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

function energyState(overrides: Partial<EnergyState> = {}): EnergyState {
  return {
    pvPowerKw: 6,
    batterySocPercent: 80,
    batteryCapacityKwh: 10,
    batteryAvailableEnergyKwh: 8,
    batteryReserveEnergyKwh: 2,
    batteryUsableEnergyKwh: 6,
    saunaPowerKw: 9,
    ...overrides,
  };
}
