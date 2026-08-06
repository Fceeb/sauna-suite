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
}
