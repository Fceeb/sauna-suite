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

export const ACKNOWLEDGEMENT_MODES = ['card_only', 'entity_only', 'card_or_entity'] as const;

export type AcknowledgementMode = (typeof ACKNOWLEDGEMENT_MODES)[number];

export const MEDIA_NOTIFICATION_MODES = ['tts', 'media'] as const;

export type MediaNotificationMode = (typeof MEDIA_NOTIFICATION_MODES)[number];

export const GRID_POWER_POSITIVE_MEANS = ['import', 'export'] as const;

export type GridPowerPositiveMeans = (typeof GRID_POWER_POSITIVE_MEANS)[number];

export const BATTERY_POWER_POSITIVE_MEANS = ['charging', 'discharging'] as const;

export type BatteryPowerPositiveMeans = (typeof BATTERY_POWER_POSITIVE_MEANS)[number];

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
  acknowledgement_mode: AcknowledgementMode;
  acknowledgement_entity?: string;
  acknowledgement_reset_input_boolean: boolean;
  show_acknowledge_button: boolean;
  media_notification_enabled: boolean;
  media_player_entity?: string;
  media_notification_mode: MediaNotificationMode;
  media_notification_message: string;
  media_notification_media_id?: string;
  media_notification_volume: number;
  media_notification_repeat: boolean;
  media_notification_repeat_interval_seconds: number;
  media_notification_stop_on_acknowledge: boolean;
  media_notification_restore_volume: boolean;
  tts_entity?: string;
  energy_intelligence_enabled: boolean;
  pv_power_entity?: string;
  home_power_entity?: string;
  grid_power_entity?: string;
  grid_power_positive_means: GridPowerPositiveMeans;
  battery_soc_entity?: string;
  battery_power_entity?: string;
  battery_power_positive_means: BatteryPowerPositiveMeans;
  battery_capacity_kwh: number;
  battery_minimum_reserve_percent: number;
  sauna_power_entity?: string;
  sauna_rated_power_kw: number;
  planned_sauna_enabled: boolean;
  planned_sauna_time: string;
  planned_target_temperature?: number | undefined;
  expected_session_duration_minutes: number;
  pv_persistence_factor: number;
  show_energy_recommendation: boolean;
  show_optimal_start_time: boolean;
  show_estimated_energy_need: boolean;
  show_expected_battery_soc: boolean;
  show_pv_contribution: boolean;
  show_grid_contribution: boolean;
}
