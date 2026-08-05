import type { HassEntity, HomeAssistant } from '../models/home-assistant';
import { clampValue } from '../utils/number';

export interface EntityServiceResult {
  ok: boolean;
  error?: string;
}

export interface TargetNumberRange {
  minimum: number;
  maximum: number;
  step: number;
}

export function isSupportedSwitchEntity(entityId: string | undefined): boolean {
  return getDomain(entityId) === 'switch' || getDomain(entityId) === 'input_boolean';
}

export function isSupportedTargetNumberEntity(entityId: string | undefined): boolean {
  return getDomain(entityId) === 'number' || getDomain(entityId) === 'input_number';
}

export function isUnavailableEntity(entity: HassEntity | undefined): boolean {
  return !entity || entity.state === 'unavailable' || entity.state === 'unknown';
}

export async function setSwitchState(
  hass: HomeAssistant | undefined,
  entityId: string | undefined,
  turnOn: boolean,
): Promise<EntityServiceResult> {
  if (!hass?.callService) {
    return { ok: false, error: 'Home Assistant service API is unavailable.' };
  }

  if (!isSupportedSwitchEntity(entityId)) {
    return { ok: false, error: 'Unsupported switch entity domain.' };
  }

  const domain = getDomain(entityId);
  const service = turnOn ? 'turn_on' : 'turn_off';

  try {
    await hass.callService(domain, service, { entity_id: entityId });
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Failed to update switch entity.',
    };
  }
}

export async function setTargetTemperatureValue(
  hass: HomeAssistant | undefined,
  entityId: string | undefined,
  requestedValue: number,
  range: TargetNumberRange,
): Promise<EntityServiceResult> {
  if (!hass?.callService) {
    return { ok: false, error: 'Home Assistant service API is unavailable.' };
  }

  if (!isSupportedTargetNumberEntity(entityId)) {
    return { ok: false, error: 'Unsupported target temperature entity domain.' };
  }

  const domain = getDomain(entityId);
  const value = roundTargetTemperatureToStep(requestedValue, range);

  try {
    await hass.callService(domain, 'set_value', {
      entity_id: entityId,
      value,
    });
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Failed to update target temperature.',
    };
  }
}

export function getTargetNumberRange(
  entity: HassEntity | undefined,
): TargetNumberRange | undefined {
  if (!entity) {
    return undefined;
  }

  const minimum = readFiniteAttribute(entity, 'min');
  const maximum = readFiniteAttribute(entity, 'max');
  const step = readFiniteAttribute(entity, 'step');

  if (minimum === undefined || maximum === undefined || step === undefined || step <= 0) {
    return undefined;
  }

  return {
    minimum,
    maximum,
    step,
  };
}

export function roundTargetTemperatureToStep(value: number, range: TargetNumberRange): number {
  const clampedValue = clampValue(value, range.minimum, range.maximum);
  const steps = Math.round((clampedValue - range.minimum) / range.step);
  const roundedValue = range.minimum + steps * range.step;
  const precision = getStepPrecision(range.step);
  return Number(clampValue(roundedValue, range.minimum, range.maximum).toFixed(precision));
}

function getDomain(entityId: string | undefined): string {
  return entityId?.split('.')[0] ?? '';
}

function readFiniteAttribute(entity: HassEntity, attribute: string): number | undefined {
  const value = entity.attributes[attribute];
  const parsedValue = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(parsedValue) ? parsedValue : undefined;
}

function getStepPrecision(step: number): number {
  const [, decimals = ''] = step.toString().split('.');
  return decimals.length;
}
