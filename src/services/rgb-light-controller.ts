import type { SaunaSuiteCardConfig } from '../models/card-config';
import type { HassEntity, HomeAssistant } from '../models/home-assistant';
import { normalizeRgbColor, rgbToArray, rgbToHs, type RgbColor } from '../core/temperature-color';

export type LightColorCapability = 'rgb_color' | 'hs_color' | 'color_temp' | 'unsupported';

export interface LightCapabilities {
  capability: LightColorCapability;
  supported: boolean;
}

export interface RgbLightCommand {
  color?: RgbColor | undefined;
  brightness?: number | undefined;
  off?: boolean | undefined;
}

export interface RgbLightSyncInput {
  hass: HomeAssistant | undefined;
  config: SaunaSuiteCardConfig;
  light: HassEntity | undefined;
  saunaOn: boolean;
  command: RgbLightCommand | undefined;
  force?: boolean;
  now?: number;
}

export interface RgbLightResult {
  ok: boolean;
  active: boolean;
  status: 'inactive' | 'updated' | 'throttled' | 'unsupported' | 'unavailable' | 'restored';
  error?: string;
}

interface CapturedLightState {
  state: string;
  brightness: number | undefined;
  rgbColor: [number, number, number] | undefined;
  hsColor: [number, number] | undefined;
  colorTemp: number | undefined;
}

export class RgbLightController {
  private capturedState?: CapturedLightState | undefined;
  private lastCommandKey?: string | undefined;
  private lastCommandAt = 0;
  private controlledEntityId?: string | undefined;

  public async sync(input: RgbLightSyncInput): Promise<RgbLightResult> {
    const active = this.shouldBeActive(input.config, input.saunaOn, input.command);

    if (!active) {
      return this.release(input.hass, input.config);
    }

    if (!input.hass?.callService) {
      return { ok: true, active: false, status: 'inactive' };
    }

    if (!isLightEntity(input.config.rgb_light_entity)) {
      return {
        ok: false,
        active: false,
        status: 'unsupported',
        error: 'Unsupported light entity.',
      };
    }

    if (!input.light || input.light.state === 'unavailable' || input.light.state === 'unknown') {
      return { ok: false, active: false, status: 'unavailable', error: 'Light unavailable.' };
    }

    const command = normalizeCommand(input.command);
    const capabilities = detectLightCapabilities(input.light);
    if (!command.off && !capabilities.supported) {
      return {
        ok: false,
        active: false,
        status: 'unsupported',
        error: 'Configured light does not support color control.',
      };
    }

    const entityId = input.config.rgb_light_entity;
    const payload = buildLightPayload(entityId, capabilities.capability, command);
    const commandKey = JSON.stringify(payload);
    const now = input.now ?? Date.now();
    const intervalMs = input.config.rgb_update_interval_seconds * 1000;

    if (
      !input.force &&
      this.lastCommandKey === commandKey &&
      now - this.lastCommandAt < intervalMs
    ) {
      return { ok: true, active: true, status: 'throttled' };
    }

    this.captureStateOnce(input.config, input.light);

    try {
      await input.hass.callService('light', command.off ? 'turn_off' : 'turn_on', payload);
      this.controlledEntityId = entityId;
      this.lastCommandKey = commandKey;
      this.lastCommandAt = now;
      return { ok: true, active: true, status: 'updated' };
    } catch (error) {
      return {
        ok: false,
        active: false,
        status: 'unavailable',
        error: error instanceof Error ? error.message : 'Failed to update RGB light.',
      };
    }
  }

  public async release(
    hass: HomeAssistant | undefined,
    config: SaunaSuiteCardConfig,
  ): Promise<RgbLightResult> {
    this.lastCommandKey = undefined;
    this.lastCommandAt = 0;

    if (!this.capturedState || !this.controlledEntityId) {
      return { ok: true, active: false, status: 'inactive' };
    }

    if (!config.rgb_restore_previous_state || !hass?.callService) {
      this.clearCapturedState();
      return { ok: true, active: false, status: 'inactive' };
    }

    const entityId = this.controlledEntityId;
    const previousState = this.capturedState;
    this.clearCapturedState();

    try {
      if (previousState.state === 'on') {
        await hass.callService('light', 'turn_on', buildRestorePayload(entityId, previousState));
      } else {
        await hass.callService('light', 'turn_off', { entity_id: entityId });
      }

      return { ok: true, active: false, status: 'restored' };
    } catch (error) {
      return {
        ok: false,
        active: false,
        status: 'unavailable',
        error: error instanceof Error ? error.message : 'Failed to restore RGB light.',
      };
    }
  }

  public reset(): void {
    this.clearCapturedState();
    this.lastCommandKey = undefined;
    this.lastCommandAt = 0;
  }

  private shouldBeActive(
    config: SaunaSuiteCardConfig,
    saunaOn: boolean,
    command: RgbLightCommand | undefined,
  ): boolean {
    return (
      config.rgb_enabled &&
      config.rgb_mode !== 'off' &&
      command !== undefined &&
      (!config.rgb_only_when_sauna_on || saunaOn)
    );
  }

  private captureStateOnce(config: SaunaSuiteCardConfig, light: HassEntity): void {
    if (!config.rgb_restore_previous_state || this.capturedState) {
      return;
    }

    this.capturedState = {
      state: light.state,
      brightness: readNumberAttribute(light, 'brightness'),
      rgbColor: readTupleAttribute(light, 'rgb_color', 3),
      hsColor: readTupleAttribute(light, 'hs_color', 2),
      colorTemp: readNumberAttribute(light, 'color_temp'),
    };
  }

  private clearCapturedState(): void {
    this.capturedState = undefined;
    this.controlledEntityId = undefined;
  }
}

export function detectLightCapabilities(light: HassEntity | undefined): LightCapabilities {
  if (!light || !isLightEntity(light.entity_id)) {
    return { capability: 'unsupported', supported: false };
  }

  const supportedColorModes = readStringArrayAttribute(light, 'supported_color_modes');
  const colorMode = readStringAttribute(light, 'color_mode');
  const modes = new Set([...supportedColorModes, ...(colorMode ? [colorMode] : [])]);

  if (modes.has('rgb') || modes.has('rgbw') || modes.has('rgbww') || light.attributes.rgb_color) {
    return { capability: 'rgb_color', supported: true };
  }

  if (modes.has('hs') || light.attributes.hs_color) {
    return { capability: 'hs_color', supported: true };
  }

  if (modes.has('color_temp') || light.attributes.color_temp) {
    return { capability: 'color_temp', supported: true };
  }

  return { capability: 'unsupported', supported: false };
}

export function isLightEntity(entityId: string | undefined): boolean {
  return entityId?.startsWith('light.') === true;
}

export function buildLightPayload(
  entityId: string | undefined,
  capability: LightColorCapability,
  command: RgbLightCommand,
): Record<string, unknown> {
  const brightnessPct = clampPercentage(command.brightness);
  const payload: Record<string, unknown> = {
    entity_id: entityId,
  };

  if (command.off) {
    return payload;
  }

  const color = normalizeRgbColor(command.color ?? {});
  payload.brightness_pct = brightnessPct;

  if (capability === 'rgb_color') {
    payload.rgb_color = rgbToArray(color);
  } else if (capability === 'hs_color') {
    const hs = rgbToHs(color);
    payload.hs_color = [hs.hue, hs.saturation];
  } else if (capability === 'color_temp') {
    payload.color_temp = rgbToApproximateColorTemp(color);
  }

  return payload;
}

export function rgbToApproximateColorTemp(color: RgbColor): number {
  const normalized = normalizeRgbColor(color);
  const warmth = (normalized.red + normalized.green * 0.45 - normalized.blue * 0.55) / 369.75;
  return Math.round(370 - Math.min(Math.max(warmth, 0), 1) * 217);
}

function normalizeCommand(command: RgbLightCommand | undefined): RgbLightCommand {
  if (command?.off) {
    return { off: true };
  }

  return {
    color: normalizeRgbColor(command?.color ?? {}),
    brightness: clampPercentage(command?.brightness),
  };
}

function buildRestorePayload(
  entityId: string,
  capturedState: CapturedLightState,
): Record<string, unknown> {
  const payload: Record<string, unknown> = { entity_id: entityId };

  if (capturedState.brightness !== undefined) {
    payload.brightness = capturedState.brightness;
  }

  if (capturedState.rgbColor) {
    payload.rgb_color = capturedState.rgbColor;
  } else if (capturedState.hsColor) {
    payload.hs_color = capturedState.hsColor;
  } else if (capturedState.colorTemp !== undefined) {
    payload.color_temp = capturedState.colorTemp;
  }

  return payload;
}

function clampPercentage(value: number | undefined): number {
  if (value === undefined || !Number.isFinite(value)) {
    return 100;
  }

  return Math.round(Math.min(Math.max(value, 1), 100));
}

function readStringArrayAttribute(entity: HassEntity, attribute: string): string[] {
  const value = entity.attributes[attribute];
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : [];
}

function readStringAttribute(entity: HassEntity, attribute: string): string | undefined {
  const value = entity.attributes[attribute];
  return typeof value === 'string' ? value : undefined;
}

function readNumberAttribute(entity: HassEntity, attribute: string): number | undefined {
  const value = entity.attributes[attribute];
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}

function readTupleAttribute(
  entity: HassEntity,
  attribute: string,
  size: 2,
): [number, number] | undefined;
function readTupleAttribute(
  entity: HassEntity,
  attribute: string,
  size: 3,
): [number, number, number] | undefined;
function readTupleAttribute(
  entity: HassEntity,
  attribute: string,
  size: 2 | 3,
): [number, number] | [number, number, number] | undefined {
  const value = entity.attributes[attribute];

  if (
    !Array.isArray(value) ||
    value.length < size ||
    !value.slice(0, size).every((item) => typeof item === 'number' && Number.isFinite(item))
  ) {
    return undefined;
  }

  return size === 2
    ? [value[0] as number, value[1] as number]
    : [value[0] as number, value[1] as number, value[2] as number];
}
