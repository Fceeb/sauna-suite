import { CARD_TYPE } from './constants';

export const CONTROL_TEMPERATURE_MODES = [
  'top',
  'middle',
  'bottom',
  'average',
  'weighted_average',
  'minimum',
  'maximum',
] as const;

export type ControlTemperatureMode = (typeof CONTROL_TEMPERATURE_MODES)[number];

export const HEATING_POWER_MODES = ['fixed', 'general_power_sensor'] as const;

export type HeatingPowerMode = (typeof HEATING_POWER_MODES)[number];

export const RGB_MODES = ['off', 'temperature_gradient', 'ready_only'] as const;

export type RgbMode = (typeof RGB_MODES)[number];

export const READY_SIGNAL_MODES = ['hold', 'blink', 'pulse'] as const;

export type ReadySignalMode = (typeof READY_SIGNAL_MODES)[number];

export const READY_SIGNAL_COLORS = ['green', 'gold', 'red', 'blue', 'purple', 'white'] as const;

export type ReadySignalColor = (typeof READY_SIGNAL_COLORS)[number];

export interface SaunaSuiteCardConfig {
  type: typeof CARD_TYPE;
  name?: string;
  main_switch_entity?: string;
  temperature_top_entity?: string;
  temperature_middle_entity?: string;
  temperature_bottom_entity?: string;
  outside_temperature_entity?: string;
  target_temperature_entity?: string;
  general_power_sensor_entity?: string;
  control_temperature_mode: ControlTemperatureMode;
  heating_power_mode: HeatingPowerMode;
  fixed_heater_power_kw: number;
  heater_rated_power_kw: number;
  outside_temperature_weight: number;
  weight_top: number;
  weight_middle: number;
  weight_bottom: number;
  show_outside_temperature: boolean;
  show_temperature_zones: boolean;
  show_eta: boolean;
  show_ready_time: boolean;
  show_heating_rate: boolean;
  eta_minimum_samples: number;
  eta_history_minutes: number;
  near_target_threshold: number;
  target_reached_tolerance: number;
  show_temperature_trend: boolean;
  trend_history_minutes: number;
  trend_refresh_minutes: number;
  confirm_switch_on: boolean;
  rgb_light_entity?: string;
  rgb_enabled: boolean;
  rgb_mode: RgbMode;
  rgb_brightness: number;
  rgb_update_interval_seconds: number;
  rgb_restore_previous_state: boolean;
  rgb_only_when_sauna_on: boolean;
  ready_signal_enabled: boolean;
  ready_signal_mode: ReadySignalMode;
  ready_signal_color: ReadySignalColor;
  ready_signal_brightness: number;
  ready_signal_interval_seconds: number;
  ready_signal_duration_seconds: number;
  ready_signal_requires_acknowledgement: boolean;
  ready_signal_repeat: boolean;
  ready_signal_repeat_interval_seconds: number;
}
