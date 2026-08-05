import { describe, expect, it, vi } from 'vitest';

import type { HassEntity, HomeAssistant } from '../models/home-assistant';
import {
  getTargetNumberRange,
  isSupportedSwitchEntity,
  isSupportedTargetNumberEntity,
  roundTargetTemperatureToStep,
  setSwitchState,
  setTargetTemperatureValue,
} from './entity-control';

describe('entity control services', () => {
  it('detects supported switch domains', () => {
    expect(isSupportedSwitchEntity('switch.sauna')).toBe(true);
    expect(isSupportedSwitchEntity('input_boolean.sauna')).toBe(true);
    expect(isSupportedSwitchEntity('light.sauna')).toBe(false);
  });

  it('detects supported target-number domains', () => {
    expect(isSupportedTargetNumberEntity('number.sauna_target')).toBe(true);
    expect(isSupportedTargetNumberEntity('input_number.sauna_target')).toBe(true);
    expect(isSupportedTargetNumberEntity('sensor.sauna_target')).toBe(false);
  });

  it('rounds target temperatures to step and clamps min and max', () => {
    const range = { minimum: 40, maximum: 100, step: 0.5 };

    expect(roundTargetTemperatureToStep(72.74, range)).toBe(72.5);
    expect(roundTargetTemperatureToStep(72.76, range)).toBe(73);
    expect(roundTargetTemperatureToStep(20, range)).toBe(40);
    expect(roundTargetTemperatureToStep(120, range)).toBe(100);
  });

  it('reads number ranges from entity attributes', () => {
    expect(getTargetNumberRange(createEntity('number.sauna', '80'))).toEqual({
      minimum: 40,
      maximum: 100,
      step: 0.5,
    });
  });

  it('calls switch services manually', async () => {
    const callService = vi.fn().mockResolvedValue(undefined);
    const hass = { states: {}, callService } satisfies Partial<HomeAssistant> as HomeAssistant;

    await expect(setSwitchState(hass, 'switch.sauna', true)).resolves.toEqual({ ok: true });
    expect(callService).toHaveBeenCalledWith('switch', 'turn_on', { entity_id: 'switch.sauna' });
  });

  it('returns structured service errors', async () => {
    const callService = vi.fn().mockRejectedValue(new Error('boom'));
    const hass = { states: {}, callService } satisfies Partial<HomeAssistant> as HomeAssistant;

    await expect(setSwitchState(hass, 'switch.sauna', false)).resolves.toEqual({
      ok: false,
      error: 'boom',
    });
  });

  it('calls number set_value services', async () => {
    const callService = vi.fn().mockResolvedValue(undefined);
    const hass = { states: {}, callService } satisfies Partial<HomeAssistant> as HomeAssistant;

    await setTargetTemperatureValue(hass, 'input_number.sauna_target', 72.76, {
      minimum: 40,
      maximum: 100,
      step: 0.5,
    });

    expect(callService).toHaveBeenCalledWith('input_number', 'set_value', {
      entity_id: 'input_number.sauna_target',
      value: 73,
    });
  });
});

function createEntity(entityId: string, state: string): HassEntity {
  return {
    entity_id: entityId,
    state,
    attributes: {
      min: 40,
      max: 100,
      step: 0.5,
    },
    last_changed: '2026-08-05T12:00:00Z',
    last_updated: '2026-08-05T12:00:00Z',
  };
}
