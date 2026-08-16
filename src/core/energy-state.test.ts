import { describe, expect, it } from 'vitest';

import type { HassEntity } from '../models/home-assistant';
import { buildEnergyState } from './energy-state';

describe('energy state', () => {
  it('builds a normalized current energy state', () => {
    expect(
      buildEnergyState(
        {
          pvPower: entity('sensor.pv', '6200', 'W'),
          homePower: entity('sensor.home', '1.8', 'kW'),
          gridPower: entity('sensor.grid', '-1.2', 'kW'),
          batterySoc: entity('sensor.battery_soc', '80', '%'),
          batteryPower: entity('sensor.battery_power', '2', 'kW'),
          saunaPower: entity('sensor.sauna_power', '8700', 'W'),
        },
        {
          batteryCapacityKwh: 10,
          batteryMinimumReservePercent: 20,
          saunaRatedPowerKw: 9,
          gridPowerPositiveMeans: 'import',
          batteryPowerPositiveMeans: 'charging',
        },
      ),
    ).toMatchObject({
      pvPowerKw: 6.2,
      homePowerKw: 1.8,
      gridPowerKw: -1.2,
      batteryPowerKw: -2,
      batterySocPercent: 80,
      batteryCapacityKwh: 10,
      batteryAvailableEnergyKwh: 8,
      batteryReserveEnergyKwh: 2,
      batteryUsableEnergyKwh: 6,
      saunaPowerKw: 8.7,
    });
  });

  it('enforces battery reserve and SOC boundaries', () => {
    const state = buildEnergyState(
      {
        batterySoc: entity('sensor.battery_soc', '10', '%'),
      },
      {
        batteryCapacityKwh: 10,
        batteryMinimumReservePercent: 30,
        saunaRatedPowerKw: 9,
        gridPowerPositiveMeans: 'import',
        batteryPowerPositiveMeans: 'charging',
      },
    );

    expect(state.batteryAvailableEnergyKwh).toBe(1);
    expect(state.batteryReserveEnergyKwh).toBe(3);
    expect(state.batteryUsableEnergyKwh).toBe(0);
  });

  it('handles missing capacity and unavailable entities without guessing', () => {
    const state = buildEnergyState(
      {
        pvPower: entity('sensor.pv', 'unavailable', 'W'),
        homePower: entity('sensor.home', '-1', 'kW'),
        batterySoc: entity('sensor.battery_soc', 'unknown', '%'),
      },
      {
        batteryCapacityKwh: Number.NaN,
        batteryMinimumReservePercent: 20,
        saunaRatedPowerKw: 9,
        gridPowerPositiveMeans: 'import',
        batteryPowerPositiveMeans: 'charging',
      },
    );

    expect(state.pvPowerKw).toBeUndefined();
    expect(state.homePowerKw).toBeUndefined();
    expect(state.batteryCapacityKwh).toBeUndefined();
    expect(state.batteryUsableEnergyKwh).toBeUndefined();
    expect(state.saunaPowerKw).toBe(9);
  });
});

function entity(entityId: string, state: string, unit: string): HassEntity {
  return {
    entity_id: entityId,
    state,
    attributes: { unit_of_measurement: unit },
    last_changed: '2026-08-16T12:00:00Z',
    last_updated: '2026-08-16T12:00:00Z',
  };
}
