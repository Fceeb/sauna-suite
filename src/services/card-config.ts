import {
  CONTROL_TEMPERATURE_MODES,
  type ControlTemperatureMode,
  type SaunaSuiteCardConfig,
} from '../models/card-config';
import { CARD_TYPE } from '../models/constants';
import { clampValue } from '../utils/number';

const DEFAULT_WEIGHT = 1;
const DEFAULT_NEAR_TARGET_THRESHOLD = 5;
const DEFAULT_TARGET_REACHED_TOLERANCE = 2;
const DEFAULT_ABOVE_TARGET_THRESHOLD = 2;
const DEFAULT_TREND_HISTORY_MINUTES = 120;
const DEFAULT_TREND_REFRESH_MINUTES = 5;

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
    near_target_threshold: DEFAULT_NEAR_TARGET_THRESHOLD,
    target_reached_tolerance: DEFAULT_TARGET_REACHED_TOLERANCE,
    above_target_threshold: DEFAULT_ABOVE_TARGET_THRESHOLD,
    show_temperature_trend: true,
    trend_history_minutes: DEFAULT_TREND_HISTORY_MINUTES,
    trend_refresh_minutes: DEFAULT_TREND_REFRESH_MINUTES,
    confirm_switch_on: true,
  };
}

export function normalizeConfig(config: Partial<SaunaSuiteCardConfig>): SaunaSuiteCardConfig {
  const defaults = createDefaultConfig();
  const targetReachedTolerance = normalizePositiveNumber(
    config.target_reached_tolerance,
    defaults.target_reached_tolerance,
  );

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
    near_target_threshold: normalizePositiveNumber(
      config.near_target_threshold,
      defaults.near_target_threshold,
    ),
    target_reached_tolerance: targetReachedTolerance,
    above_target_threshold: Math.max(
      targetReachedTolerance,
      normalizePositiveNumber(config.above_target_threshold, defaults.above_target_threshold),
    ),
    show_temperature_trend: normalizeBoolean(
      config.show_temperature_trend,
      defaults.show_temperature_trend,
    ),
    trend_history_minutes: normalizeRange(
      config.trend_history_minutes,
      defaults.trend_history_minutes,
      15,
      1440,
    ),
    trend_refresh_minutes: normalizeRange(
      config.trend_refresh_minutes,
      defaults.trend_refresh_minutes,
      1,
      60,
    ),
    confirm_switch_on: normalizeBoolean(config.confirm_switch_on, defaults.confirm_switch_on),
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

function normalizePositiveNumber(value: unknown, fallback: number): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return fallback;
  }

  return Math.max(0, value);
}

function normalizeRange(
  value: unknown,
  fallback: number,
  minimum: number,
  maximum: number,
): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return fallback;
  }

  return clampValue(value, minimum, maximum);
}
