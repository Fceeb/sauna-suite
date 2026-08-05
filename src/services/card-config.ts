import {
  CONTROL_TEMPERATURE_MODES,
  type ControlTemperatureMode,
  type SaunaSuiteCardConfig,
} from '../models/card-config';
import { CARD_TYPE } from '../models/constants';

const DEFAULT_WEIGHT = 1;

export function createDefaultConfig(): SaunaSuiteCardConfig {
  return {
    type: CARD_TYPE,
    name: 'Sauna Suite',
    control_temperature_mode: 'average',
    weight_top: DEFAULT_WEIGHT,
    weight_middle: DEFAULT_WEIGHT,
    weight_bottom: DEFAULT_WEIGHT,
    show_outside_temperature: false,
    show_temperature_zones: true,
  };
}

export function normalizeConfig(config: Partial<SaunaSuiteCardConfig>): SaunaSuiteCardConfig {
  const defaults = createDefaultConfig();

  return {
    ...defaults,
    ...config,
    type: CARD_TYPE,
    control_temperature_mode: normalizeControlMode(config.control_temperature_mode),
    weight_top: normalizeWeight(config.weight_top, defaults.weight_top),
    weight_middle: normalizeWeight(config.weight_middle, defaults.weight_middle),
    weight_bottom: normalizeWeight(config.weight_bottom, defaults.weight_bottom),
    show_outside_temperature: normalizeBoolean(
      config.show_outside_temperature,
      defaults.show_outside_temperature,
    ),
    show_temperature_zones: normalizeBoolean(
      config.show_temperature_zones,
      defaults.show_temperature_zones,
    ),
  };
}

function normalizeControlMode(mode: unknown): ControlTemperatureMode {
  if (
    typeof mode === 'string' &&
    CONTROL_TEMPERATURE_MODES.includes(mode as ControlTemperatureMode)
  ) {
    return mode as ControlTemperatureMode;
  }

  return createDefaultConfig().control_temperature_mode;
}

function normalizeWeight(value: unknown, fallback: number): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return fallback;
  }

  return Math.max(0, value);
}

function normalizeBoolean(value: unknown, fallback: boolean): boolean {
  if (typeof value === 'boolean') {
    return value;
  }

  return fallback;
}
