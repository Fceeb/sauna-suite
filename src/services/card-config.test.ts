import { describe, expect, it } from 'vitest';

import { createDefaultConfig, normalizeConfig } from './card-config';

describe('card configuration', () => {
  it('creates defaults for new cards', () => {
    expect(createDefaultConfig()).toMatchObject({
      type: 'custom:sauna-suite-card',
      name: 'Sauna Suite',
      control_temperature_mode: 'average',
      heating_power_mode: 'fixed',
      fixed_heater_power_kw: 9,
      heater_rated_power_kw: 9,
      outside_temperature_weight: 0.15,
      weight_top: 1,
      weight_middle: 1,
      weight_bottom: 1,
      show_outside_temperature: false,
      show_temperature_zones: true,
      show_eta: true,
      show_ready_time: true,
      show_heating_rate: true,
      eta_minimum_samples: 5,
      eta_history_minutes: 30,
      near_target_threshold: 5,
      target_reached_tolerance: 2,
      show_temperature_trend: true,
      trend_history_minutes: 120,
      trend_refresh_minutes: 5,
      confirm_switch_on: true,
    });
  });

  it('normalizes invalid control modes to the default', () => {
    expect(
      normalizeConfig({
        control_temperature_mode: 'invalid',
      } as never).control_temperature_mode,
    ).toBe('average');
  });

  it('normalizes invalid heating power modes to the default', () => {
    expect(
      normalizeConfig({
        heating_power_mode: 'invalid',
      } as never).heating_power_mode,
    ).toBe('fixed');
  });

  it('preserves configured entities and display flags', () => {
    expect(
      normalizeConfig({
        main_switch_entity: 'switch.sauna',
        temperature_top_entity: 'sensor.sauna_top',
        temperature_middle_entity: 'sensor.sauna_middle',
        temperature_bottom_entity: 'sensor.sauna_bottom',
        outside_temperature_entity: 'sensor.outside',
        target_temperature_entity: 'number.sauna_target',
        general_power_sensor_entity: 'sensor.house_power',
        show_outside_temperature: true,
        show_temperature_zones: false,
      }),
    ).toMatchObject({
      main_switch_entity: 'switch.sauna',
      temperature_top_entity: 'sensor.sauna_top',
      temperature_middle_entity: 'sensor.sauna_middle',
      temperature_bottom_entity: 'sensor.sauna_bottom',
      outside_temperature_entity: 'sensor.outside',
      target_temperature_entity: 'number.sauna_target',
      general_power_sensor_entity: 'sensor.house_power',
      show_outside_temperature: true,
      show_temperature_zones: false,
    });
  });

  it('clamps negative weights to zero', () => {
    expect(
      normalizeConfig({
        weight_top: -1,
        weight_middle: 2,
        weight_bottom: Number.NaN,
      }),
    ).toMatchObject({
      weight_top: 0,
      weight_middle: 2,
      weight_bottom: 1,
    });
  });

  it('normalizes invalid interactive and ETA settings safely', () => {
    expect(
      normalizeConfig({
        near_target_threshold: -5,
        target_reached_tolerance: Number.NaN,
        trend_history_minutes: 1,
        trend_refresh_minutes: 100,
        confirm_switch_on: false,
        fixed_heater_power_kw: -1,
        heater_rated_power_kw: 100,
        outside_temperature_weight: 5,
        eta_minimum_samples: 1,
        eta_history_minutes: 1,
      }),
    ).toMatchObject({
      near_target_threshold: 0,
      target_reached_tolerance: 2,
      trend_history_minutes: 15,
      trend_refresh_minutes: 60,
      confirm_switch_on: false,
      fixed_heater_power_kw: 0,
      heater_rated_power_kw: 50,
      outside_temperature_weight: 1,
      eta_minimum_samples: 2,
      eta_history_minutes: 5,
    });
  });

  it('does not preserve unknown legacy threshold configuration', () => {
    const legacyThresholdKey = `above_${'target'}_threshold`;

    expect(
      normalizeConfig({
        [legacyThresholdKey]: 8,
      } as never),
    ).not.toHaveProperty(legacyThresholdKey);
  });
});
