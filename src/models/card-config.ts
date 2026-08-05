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

export interface SaunaSuiteCardConfig {
  type: typeof CARD_TYPE;
  name?: string;
  main_switch_entity?: string;
  temperature_top_entity?: string;
  temperature_middle_entity?: string;
  temperature_bottom_entity?: string;
  outside_temperature_entity?: string;
  target_temperature_entity?: string;
  control_temperature_mode: ControlTemperatureMode;
  weight_top: number;
  weight_middle: number;
  weight_bottom: number;
  show_outside_temperature: boolean;
  show_temperature_zones: boolean;
  near_target_threshold: number;
  target_reached_tolerance: number;
  above_target_threshold: number;
  show_temperature_trend: boolean;
  trend_history_minutes: number;
  trend_refresh_minutes: number;
  confirm_switch_on: boolean;
}
