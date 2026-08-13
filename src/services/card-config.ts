import {
  CONTROL_TEMPERATURE_MODES,
  HEATING_POWER_MODES,
  READY_SIGNAL_COLORS,
  READY_SIGNAL_MODES,
  RGB_MODES,
  type ControlTemperatureMode,
  type HeatingPowerMode,
  type ReadySignalColor,
  type ReadySignalMode,
  type RgbMode,
  type SaunaSuiteCardConfig,
} from '../models/card-config';
import { CARD_TYPE } from '../models/constants';
import { clampValue } from '../utils/number';

const DEFAULT_NAME = 'Sauna Suite';
const DEFAULT_WEIGHT = 1;
const DEFAULT_HEATER_POWER_KW = 9;
const DEFAULT_OUTSIDE_TEMPERATURE_WEIGHT = 0.15;
const DEFAULT_ETA_MINIMUM_SAMPLES = 5;
const DEFAULT_ETA_HISTORY_MINUTES = 30;
const DEFAULT_NEAR_TARGET_THRESHOLD = 5;
const DEFAULT_TARGET_REACHED_TOLERANCE = 2;
const DEFAULT_TREND_HISTORY_MINUTES = 120;
const DEFAULT_TREND_REFRESH_MINUTES = 5;
const DEFAULT_RGB_BRIGHTNESS = 100;
const DEFAULT_RGB_UPDATE_INTERVAL_SECONDS = 5;
const DEFAULT_READY_SIGNAL_BRIGHTNESS = 100;
const DEFAULT_READY_SIGNAL_INTERVAL_SECONDS = 1;
const DEFAULT_READY_SIGNAL_DURATION_SECONDS = 30;
const DEFAULT_READY_SIGNAL_REPEAT_INTERVAL_SECONDS = 60;

export function createDefaultConfig(): SaunaSuiteCardConfig {
  return {
    type: CARD_TYPE,
    name: DEFAULT_NAME,
    control_temperature_mode: 'average',
    heating_power_mode: 'fixed',
    fixed_heater_power_kw: DEFAULT_HEATER_POWER_KW,
    heater_rated_power_kw: DEFAULT_HEATER_POWER_KW,
    outside_temperature_weight: DEFAULT_OUTSIDE_TEMPERATURE_WEIGHT,
    weight_top: DEFAULT_WEIGHT,
    weight_middle: DEFAULT_WEIGHT,
    weight_bottom: DEFAULT_WEIGHT,
    show_outside_temperature: false,
    show_temperature_zones: true,
    show_eta: true,
    show_ready_time: true,
    show_heating_rate: true,
    eta_minimum_samples: DEFAULT_ETA_MINIMUM_SAMPLES,
    eta_history_minutes: DEFAULT_ETA_HISTORY_MINUTES,
    near_target_threshold: DEFAULT_NEAR_TARGET_THRESHOLD,
    target_reached_tolerance: DEFAULT_TARGET_REACHED_TOLERANCE,
    show_temperature_trend: true,
    trend_history_minutes: DEFAULT_TREND_HISTORY_MINUTES,
    trend_refresh_minutes: DEFAULT_TREND_REFRESH_MINUTES,
    confirm_switch_on: true,
    rgb_enabled: false,
    rgb_mode: 'temperature_gradient',
    rgb_brightness: DEFAULT_RGB_BRIGHTNESS,
    rgb_update_interval_seconds: DEFAULT_RGB_UPDATE_INTERVAL_SECONDS,
    rgb_restore_previous_state: true,
    rgb_only_when_sauna_on: true,
    ready_signal_enabled: true,
    ready_signal_mode: 'hold',
    ready_signal_color: 'green',
    ready_signal_brightness: DEFAULT_READY_SIGNAL_BRIGHTNESS,
    ready_signal_interval_seconds: DEFAULT_READY_SIGNAL_INTERVAL_SECONDS,
    ready_signal_duration_seconds: DEFAULT_READY_SIGNAL_DURATION_SECONDS,
    ready_signal_requires_acknowledgement: false,
    ready_signal_repeat: false,
    ready_signal_repeat_interval_seconds: DEFAULT_READY_SIGNAL_REPEAT_INTERVAL_SECONDS,
  };
}

export function normalizeConfig(config: Partial<SaunaSuiteCardConfig>): SaunaSuiteCardConfig {
  const defaults = createDefaultConfig();
  const normalized: SaunaSuiteCardConfig = {
    type: CARD_TYPE,
    name: normalizeOptionalString(config.name, DEFAULT_NAME),
    control_temperature_mode: normalizeControlMode(config.control_temperature_mode),
    heating_power_mode: normalizeHeatingPowerMode(config.heating_power_mode),
    fixed_heater_power_kw: normalizeRange(
      config.fixed_heater_power_kw,
      defaults.fixed_heater_power_kw,
      0,
      50,
    ),
    heater_rated_power_kw: normalizeRange(
      config.heater_rated_power_kw,
      defaults.heater_rated_power_kw,
      0,
      50,
    ),
    outside_temperature_weight: normalizeRange(
      config.outside_temperature_weight,
      defaults.outside_temperature_weight,
      0,
      1,
    ),
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
    show_eta: normalizeBoolean(config.show_eta, defaults.show_eta),
    show_ready_time: normalizeBoolean(config.show_ready_time, defaults.show_ready_time),
    show_heating_rate: normalizeBoolean(config.show_heating_rate, defaults.show_heating_rate),
    eta_minimum_samples: normalizeIntegerRange(
      config.eta_minimum_samples,
      defaults.eta_minimum_samples,
      2,
      60,
    ),
    eta_history_minutes: normalizeRange(
      config.eta_history_minutes,
      defaults.eta_history_minutes,
      5,
      1440,
    ),
    near_target_threshold: normalizePositiveNumber(
      config.near_target_threshold,
      defaults.near_target_threshold,
    ),
    target_reached_tolerance: normalizePositiveNumber(
      config.target_reached_tolerance,
      defaults.target_reached_tolerance,
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
    rgb_enabled: normalizeBoolean(config.rgb_enabled, defaults.rgb_enabled),
    rgb_mode: normalizeRgbMode(config.rgb_mode),
    rgb_brightness: normalizeIntegerRange(config.rgb_brightness, defaults.rgb_brightness, 1, 100),
    rgb_update_interval_seconds: normalizeIntegerRange(
      config.rgb_update_interval_seconds,
      defaults.rgb_update_interval_seconds,
      1,
      3600,
    ),
    rgb_restore_previous_state: normalizeBoolean(
      config.rgb_restore_previous_state,
      defaults.rgb_restore_previous_state,
    ),
    rgb_only_when_sauna_on: normalizeBoolean(
      config.rgb_only_when_sauna_on,
      defaults.rgb_only_when_sauna_on,
    ),
    ready_signal_enabled: normalizeBoolean(
      config.ready_signal_enabled,
      defaults.ready_signal_enabled,
    ),
    ready_signal_mode: normalizeReadySignalMode(config.ready_signal_mode),
    ready_signal_color: normalizeReadySignalColor(config.ready_signal_color),
    ready_signal_brightness: normalizeIntegerRange(
      config.ready_signal_brightness,
      defaults.ready_signal_brightness,
      1,
      100,
    ),
    ready_signal_interval_seconds: normalizeIntegerRange(
      config.ready_signal_interval_seconds,
      defaults.ready_signal_interval_seconds,
      1,
      3600,
    ),
    ready_signal_duration_seconds: normalizeIntegerRange(
      config.ready_signal_duration_seconds,
      defaults.ready_signal_duration_seconds,
      1,
      3600,
    ),
    ready_signal_requires_acknowledgement: normalizeBoolean(
      config.ready_signal_requires_acknowledgement,
      defaults.ready_signal_requires_acknowledgement,
    ),
    ready_signal_repeat: normalizeBoolean(config.ready_signal_repeat, defaults.ready_signal_repeat),
    ready_signal_repeat_interval_seconds: normalizeIntegerRange(
      config.ready_signal_repeat_interval_seconds,
      defaults.ready_signal_repeat_interval_seconds,
      1,
      86400,
    ),
  };

  applyOptionalString(normalized, 'main_switch_entity', config.main_switch_entity);
  applyOptionalString(normalized, 'temperature_top_entity', config.temperature_top_entity);
  applyOptionalString(normalized, 'temperature_middle_entity', config.temperature_middle_entity);
  applyOptionalString(normalized, 'temperature_bottom_entity', config.temperature_bottom_entity);
  applyOptionalString(normalized, 'outside_temperature_entity', config.outside_temperature_entity);
  applyOptionalString(normalized, 'target_temperature_entity', config.target_temperature_entity);
  applyOptionalString(
    normalized,
    'general_power_sensor_entity',
    config.general_power_sensor_entity,
  );
  applyOptionalString(normalized, 'rgb_light_entity', config.rgb_light_entity);

  return normalized;
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

function normalizeHeatingPowerMode(mode: unknown): HeatingPowerMode {
  if (typeof mode === 'string' && HEATING_POWER_MODES.includes(mode as HeatingPowerMode)) {
    return mode as HeatingPowerMode;
  }

  return createDefaultConfig().heating_power_mode;
}

function normalizeRgbMode(mode: unknown): RgbMode {
  if (typeof mode === 'string' && RGB_MODES.includes(mode as RgbMode)) {
    return mode as RgbMode;
  }

  return createDefaultConfig().rgb_mode;
}

function normalizeReadySignalMode(mode: unknown): ReadySignalMode {
  if (typeof mode === 'string' && READY_SIGNAL_MODES.includes(mode as ReadySignalMode)) {
    return mode as ReadySignalMode;
  }

  return createDefaultConfig().ready_signal_mode;
}

function normalizeReadySignalColor(color: unknown): ReadySignalColor {
  if (typeof color === 'string' && READY_SIGNAL_COLORS.includes(color as ReadySignalColor)) {
    return color as ReadySignalColor;
  }

  return createDefaultConfig().ready_signal_color;
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

function normalizeOptionalString(value: unknown, fallback: string): string;
function normalizeOptionalString(value: unknown, fallback?: string): string | undefined;
function normalizeOptionalString(value: unknown, fallback?: string): string | undefined {
  if (typeof value === 'string') {
    return value;
  }

  return fallback;
}

function applyOptionalString(
  config: SaunaSuiteCardConfig,
  key:
    | 'main_switch_entity'
    | 'temperature_top_entity'
    | 'temperature_middle_entity'
    | 'temperature_bottom_entity'
    | 'outside_temperature_entity'
    | 'target_temperature_entity'
    | 'general_power_sensor_entity'
    | 'rgb_light_entity',
  value: unknown,
): void {
  const normalizedValue = normalizeOptionalString(value);

  if (normalizedValue !== undefined) {
    config[key] = normalizedValue;
  }
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

function normalizeIntegerRange(
  value: unknown,
  fallback: number,
  minimum: number,
  maximum: number,
): number {
  return Math.round(normalizeRange(value, fallback, minimum, maximum));
}
