import { describe, expect, it, vi } from 'vitest';

import { normalizeConfig } from './card-config';
import {
  buildLightPayload,
  detectLightCapabilities,
  RgbLightController,
  rgbToApproximateColorTemp,
} from './rgb-light-controller';
import type { HassEntity, HomeAssistant } from '../models/home-assistant';

describe('RGB light controller', () => {
  it('detects RGB, HS and color-temperature capabilities', () => {
    expect(detectLightCapabilities(light({ supported_color_modes: ['rgb'] })).capability).toBe(
      'rgb_color',
    );
    expect(detectLightCapabilities(light({ supported_color_modes: ['hs'] })).capability).toBe(
      'hs_color',
    );
    expect(
      detectLightCapabilities(light({ supported_color_modes: ['color_temp'] })).capability,
    ).toBe('color_temp');
    expect(
      detectLightCapabilities(light({ supported_color_modes: ['brightness'] })).supported,
    ).toBe(false);
  });

  it('builds safe RGB, HS and color-temperature service payloads', () => {
    const command = { color: { red: 260, green: -4, blue: 128 }, brightness: 150 };

    expect(buildLightPayload('light.sauna', 'rgb_color', command)).toMatchObject({
      entity_id: 'light.sauna',
      brightness_pct: 100,
      rgb_color: [255, 0, 128],
    });
    expect(buildLightPayload('light.sauna', 'hs_color', command)).toHaveProperty('hs_color');
    expect(buildLightPayload('light.sauna', 'color_temp', command)).toHaveProperty('color_temp');
  });

  it('prevents RGB updates when sauna is off and only-when-on is enabled', async () => {
    const callService = vi.fn();
    const controller = new RgbLightController();

    const result = await controller.sync({
      hass: hass(callService),
      config: normalizeConfig({
        rgb_enabled: true,
        rgb_light_entity: 'light.sauna',
        rgb_only_when_sauna_on: true,
      }),
      light: light({ supported_color_modes: ['rgb'] }),
      saunaOn: false,
      command: { color: { red: 1, green: 2, blue: 3 }, brightness: 50 },
    });

    expect(result.status).toBe('inactive');
    expect(callService).not.toHaveBeenCalled();
  });

  it('suppresses duplicate updates until the refresh interval expires', async () => {
    const callService = vi.fn().mockResolvedValue(undefined);
    const controller = new RgbLightController();
    const input = {
      hass: hass(callService),
      config: normalizeConfig({
        rgb_enabled: true,
        rgb_light_entity: 'light.sauna',
        rgb_update_interval_seconds: 5,
      }),
      light: light({ supported_color_modes: ['rgb'] }),
      saunaOn: true,
      command: { color: { red: 1, green: 2, blue: 3 }, brightness: 50 },
    };

    await controller.sync({ ...input, now: 1000 });
    await controller.sync({ ...input, now: 2000 });
    await controller.sync({ ...input, now: 7000 });

    expect(callService).toHaveBeenCalledTimes(2);
  });

  it('captures and restores the previous light state once', async () => {
    const callService = vi.fn().mockResolvedValue(undefined);
    const controller = new RgbLightController();
    const config = normalizeConfig({
      rgb_enabled: true,
      rgb_light_entity: 'light.sauna',
      rgb_restore_previous_state: true,
    });

    await controller.sync({
      hass: hass(callService),
      config,
      light: light({
        supported_color_modes: ['rgb'],
        brightness: 80,
        rgb_color: [10, 20, 30],
      }),
      saunaOn: true,
      command: { color: { red: 1, green: 2, blue: 3 }, brightness: 50 },
      now: 1000,
    });
    await controller.release(hass(callService), config);

    expect(callService).toHaveBeenLastCalledWith('light', 'turn_on', {
      entity_id: 'light.sauna',
      brightness: 80,
      rgb_color: [10, 20, 30],
    });
  });

  it('uses light.turn_off for blink-off phases', async () => {
    const callService = vi.fn().mockResolvedValue(undefined);

    await new RgbLightController().sync({
      hass: hass(callService),
      config: normalizeConfig({ rgb_enabled: true, rgb_light_entity: 'light.sauna' }),
      light: light({ supported_color_modes: ['rgb'] }),
      saunaOn: true,
      command: { off: true },
    });

    expect(callService).toHaveBeenCalledWith('light', 'turn_off', { entity_id: 'light.sauna' });
  });

  it('maps RGB colors to a bounded approximate color temperature', () => {
    expect(rgbToApproximateColorTemp({ red: 255, green: 230, blue: 120 })).toBeGreaterThanOrEqual(
      153,
    );
    expect(rgbToApproximateColorTemp({ red: 255, green: 230, blue: 120 })).toBeLessThanOrEqual(370);
  });
});

function hass(callService: NonNullable<HomeAssistant['callService']>): HomeAssistant {
  return {
    states: {},
    callService,
  };
}

function light(attributes: Record<string, unknown>): HassEntity {
  return {
    entity_id: 'light.sauna',
    state: 'on',
    attributes,
    last_changed: '2026-08-13T10:00:00Z',
    last_updated: '2026-08-13T10:00:00Z',
  };
}
