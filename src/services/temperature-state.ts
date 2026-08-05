import {
  calculateTemperatureSummary,
  readTemperatureValue,
  type TemperatureSummary,
  type TemperatureWeights,
  type TemperatureZoneValues,
} from '../core/temperature';
import type { SaunaSuiteCardConfig } from '../models/card-config';
import type { HassEntity, HomeAssistant } from '../models/home-assistant';

export interface SaunaTemperatureState {
  zones: TemperatureZoneValues;
  outsideTemperature?: number | undefined;
  targetTemperature?: number | undefined;
  summary: TemperatureSummary;
}

export function buildSaunaTemperatureState(
  hass: HomeAssistant | undefined,
  config: SaunaSuiteCardConfig,
): SaunaTemperatureState {
  const zones = {
    top: readEntityTemperature(hass, config.temperature_top_entity),
    middle: readEntityTemperature(hass, config.temperature_middle_entity),
    bottom: readEntityTemperature(hass, config.temperature_bottom_entity),
  };
  const weights: TemperatureWeights = {
    top: config.weight_top,
    middle: config.weight_middle,
    bottom: config.weight_bottom,
  };

  return {
    zones,
    outsideTemperature: readEntityTemperature(hass, config.outside_temperature_entity),
    targetTemperature: readEntityTemperature(hass, config.target_temperature_entity),
    summary: calculateTemperatureSummary(zones, config.control_temperature_mode, weights),
  };
}

export function readEntityTemperature(
  hass: HomeAssistant | undefined,
  entityId: string | undefined,
): number | undefined {
  if (!hass || !entityId) {
    return undefined;
  }

  return readTemperatureValue(hass.states[entityId]?.state);
}

export function getEntity(
  hass: HomeAssistant | undefined,
  entityId: string | undefined,
): HassEntity | undefined {
  if (!hass || !entityId) {
    return undefined;
  }

  return hass.states[entityId];
}
