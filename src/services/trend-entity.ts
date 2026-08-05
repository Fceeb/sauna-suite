import type { ControlTemperatureMode, SaunaSuiteCardConfig } from '../models/card-config';

const DIRECT_TREND_MODES = new Set<ControlTemperatureMode>(['top', 'middle', 'bottom']);

export function isDirectControlTemperatureMode(mode: ControlTemperatureMode): boolean {
  return DIRECT_TREND_MODES.has(mode);
}

export function getTrendEntityId(config: SaunaSuiteCardConfig): string | undefined {
  switch (config.control_temperature_mode) {
    case 'top':
      return config.temperature_top_entity;
    case 'middle':
      return config.temperature_middle_entity;
    case 'bottom':
      return config.temperature_bottom_entity;
    default:
      return undefined;
  }
}
