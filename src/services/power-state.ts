import {
  estimateSaunaShareFromGeneralPower,
  normalizePowerReadingToKilowatts,
  validateKilowatts,
} from '../core/heating-power';
import type { SaunaSuiteCardConfig } from '../models/card-config';
import type { HassEntity, HomeAssistant } from '../models/home-assistant';
import { getEntity } from './temperature-state';

export interface HeatingPowerState {
  effectivePowerKw?: number | undefined;
  nominalPowerKw: number;
  mode: SaunaSuiteCardConfig['heating_power_mode'];
  approximate: boolean;
}

export function buildHeatingPowerState(
  hass: HomeAssistant | undefined,
  config: SaunaSuiteCardConfig,
): HeatingPowerState {
  const switchEntity = getEntity(hass, config.main_switch_entity);
  const nominalPowerKw = getNominalPowerKw(config);

  if (switchEntity?.state === 'off') {
    return {
      effectivePowerKw: 0,
      nominalPowerKw,
      mode: config.heating_power_mode,
      approximate: config.heating_power_mode === 'general_power_sensor',
    };
  }

  if (config.heating_power_mode === 'general_power_sensor') {
    return {
      effectivePowerKw: getGeneralPowerSensorEstimateKw(hass, config),
      nominalPowerKw,
      mode: config.heating_power_mode,
      approximate: true,
    };
  }

  return {
    effectivePowerKw: validateKilowatts(config.fixed_heater_power_kw),
    nominalPowerKw,
    mode: config.heating_power_mode,
    approximate: false,
  };
}

function getGeneralPowerSensorEstimateKw(
  hass: HomeAssistant | undefined,
  config: SaunaSuiteCardConfig,
): number | undefined {
  const powerEntity = getEntity(hass, config.general_power_sensor_entity);
  const totalPowerKw = readPowerEntityKilowatts(powerEntity);

  return estimateSaunaShareFromGeneralPower(totalPowerKw, config.heater_rated_power_kw);
}

function readPowerEntityKilowatts(entity: HassEntity | undefined): number | undefined {
  if (!entity || entity.state === 'unavailable' || entity.state === 'unknown') {
    return undefined;
  }

  const unit = entity.attributes.unit_of_measurement;

  return normalizePowerReadingToKilowatts(
    entity.state,
    typeof unit === 'string' ? unit : undefined,
  );
}

function getNominalPowerKw(config: SaunaSuiteCardConfig): number {
  if (config.heating_power_mode === 'general_power_sensor') {
    return config.heater_rated_power_kw;
  }

  return config.fixed_heater_power_kw;
}
