import { describe, expect, it } from 'vitest';

import type { HassEntity, HomeAssistant } from '../models/home-assistant';
import { normalizeConfig } from './card-config';
import { buildHeatingPowerState } from './power-state';

describe('heating power state', () => {
  it('uses fixed heater power mode', () => {
    expect(
      buildHeatingPowerState(
        createHass(),
        normalizeConfig({
          heating_power_mode: 'fixed',
          fixed_heater_power_kw: 8.5,
        }),
      ),
    ).toMatchObject({
      effectivePowerKw: 8.5,
      approximate: false,
    });
  });

  it('uses a general power sensor with W unit conversion', () => {
    expect(
      buildHeatingPowerState(
        createHass({
          'sensor.house_power': createEntity('sensor.house_power', '8500', {
            unit_of_measurement: 'W',
          }),
        }),
        normalizeConfig({
          heating_power_mode: 'general_power_sensor',
          general_power_sensor_entity: 'sensor.house_power',
          heater_rated_power_kw: 9,
        }),
      ),
    ).toMatchObject({
      effectivePowerKw: 8.5,
      approximate: true,
    });
  });

  it('caps the general power estimate at rated power', () => {
    expect(
      buildHeatingPowerState(
        createHass({
          'sensor.house_power': createEntity('sensor.house_power', '12', {
            unit_of_measurement: 'kW',
          }),
        }),
        normalizeConfig({
          heating_power_mode: 'general_power_sensor',
          general_power_sensor_entity: 'sensor.house_power',
          heater_rated_power_kw: 9,
        }),
      ).effectivePowerKw,
    ).toBe(9);
  });

  it('returns zero effective power when the main switch is off', () => {
    expect(
      buildHeatingPowerState(
        createHass({
          'switch.sauna': createEntity('switch.sauna', 'off', {}),
        }),
        normalizeConfig({
          main_switch_entity: 'switch.sauna',
          heating_power_mode: 'fixed',
          fixed_heater_power_kw: 9,
        }),
      ).effectivePowerKw,
    ).toBe(0);
  });
});

function createHass(states: Record<string, HassEntity> = {}): HomeAssistant {
  return {
    states,
  };
}

function createEntity(
  entityId: string,
  state: string,
  attributes: Record<string, unknown>,
): HassEntity {
  return {
    entity_id: entityId,
    state,
    attributes,
    last_changed: '2026-08-05T12:00:00Z',
    last_updated: '2026-08-05T12:00:00Z',
  };
}
