import {
  CONTROL_TEMPERATURE_MODES,
  HEATING_POWER_MODES,
  type ControlTemperatureMode,
  type HeatingPowerMode,
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
    | 'general_power_sensor_entity',
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
