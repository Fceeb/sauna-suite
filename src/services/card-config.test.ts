import { describe, expect, it } from 'vitest';

import { createDefaultConfig, normalizeConfig } from './card-config';

describe('card configuration', () => {
  it('creates defaults for new cards', () => {
    expect(createDefaultConfig()).toMatchObject({
      type: 'custom:sauna-suite-card',
      name: 'Sauna Suite',
      control_temperature_mode: 'average',
      weight_top: 1,
      weight_middle: 1,
      weight_bottom: 1,
      show_outside_temperature: false,
      show_temperature_zones: true,
      near_target_threshold: 5,
      target_reached_tolerance: 2,
      above_target_threshold: 2,
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

  it('preserves configured entities and display flags', () => {
    expect(
      normalizeConfig({
        main_switch_entity: 'switch.sauna',
        temperature_top_entity: 'sensor.sauna_top',
        temperature_middle_entity: 'sensor.sauna_middle',
        temperature_bottom_entity: 'sensor.sauna_bottom',
        outside_temperature_entity: 'sensor.outside',
        target_temperature_entity: 'number.sauna_target',
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

  it('normalizes invalid interactive settings safely', () => {
    expect(
      normalizeConfig({
        near_target_threshold: -5,
        target_reached_tolerance: Number.NaN,
        above_target_threshold: 1,
        trend_history_minutes: 1,
        trend_refresh_minutes: 100,
        confirm_switch_on: false,
      }),
    ).toMatchObject({
      near_target_threshold: 0,
      target_reached_tolerance: 2,
      above_target_threshold: 2,
      trend_history_minutes: 15,
      trend_refresh_minutes: 60,
      confirm_switch_on: false,
    });
  });
});
