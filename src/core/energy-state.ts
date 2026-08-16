import type { HassEntity } from '../models/home-assistant';
import {
  normalizeBatteryPowerSign,
  normalizeGridPowerSign,
  normalizeKilowatts,
  normalizePercent,
  type BatteryPowerPositiveMeans,
  type GridPowerPositiveMeans,
} from './energy-normalization';

export interface EnergyStateConfig {
  batteryCapacityKwh: number;
  batteryMinimumReservePercent: number;
  saunaRatedPowerKw: number;
  gridPowerPositiveMeans: GridPowerPositiveMeans;
  batteryPowerPositiveMeans: BatteryPowerPositiveMeans;
}

export interface EnergyStateEntities {
  pvPower?: HassEntity | undefined;
  homePower?: HassEntity | undefined;
  gridPower?: HassEntity | undefined;
  batterySoc?: HassEntity | undefined;
  batteryPower?: HassEntity | undefined;
  saunaPower?: HassEntity | undefined;
}

export interface EnergyState {
  pvPowerKw?: number | undefined;
  homePowerKw?: number | undefined;
  gridPowerKw?: number | undefined;
  batteryPowerKw?: number | undefined;
  batterySocPercent?: number | undefined;
  batteryCapacityKwh?: number | undefined;
  batteryAvailableEnergyKwh?: number | undefined;
  batteryReserveEnergyKwh?: number | undefined;
  batteryUsableEnergyKwh?: number | undefined;
  saunaPowerKw?: number | undefined;
}

const UNAVAILABLE_STATES = new Set(['unavailable', 'unknown', 'none', '']);

export function buildEnergyState(
  entities: EnergyStateEntities,
  config: EnergyStateConfig,
): EnergyState {
  const batteryCapacityKwh = normalizePositiveConfigValue(config.batteryCapacityKwh);
  const batteryMinimumReservePercent = normalizePercent(config.batteryMinimumReservePercent);
  const batterySocPercent = readPercentEntity(entities.batterySoc);
  const batteryReserveEnergyKwh =
    batteryCapacityKwh !== undefined && batteryMinimumReservePercent !== undefined
      ? batteryCapacityKwh * (batteryMinimumReservePercent / 100)
      : undefined;
  const batteryAvailableEnergyKwh =
    batteryCapacityKwh !== undefined && batterySocPercent !== undefined
      ? batteryCapacityKwh * (batterySocPercent / 100)
      : undefined;
  const batteryUsableEnergyKwh =
    batteryAvailableEnergyKwh !== undefined && batteryReserveEnergyKwh !== undefined
      ? Math.max(0, batteryAvailableEnergyKwh - batteryReserveEnergyKwh)
      : undefined;
  const rawGridPowerKw = readSignedPowerEntity(entities.gridPower);
  const rawBatteryPowerKw = readSignedPowerEntity(entities.batteryPower);
  const saunaSensorPowerKw = readPositivePowerEntity(entities.saunaPower);

  return {
    pvPowerKw: readPositivePowerEntity(entities.pvPower),
    homePowerKw: readPositivePowerEntity(entities.homePower),
    gridPowerKw: normalizeGridPowerSign(rawGridPowerKw, config.gridPowerPositiveMeans),
    batteryPowerKw: normalizeBatteryPowerSign(rawBatteryPowerKw, config.batteryPowerPositiveMeans),
    batterySocPercent,
    batteryCapacityKwh,
    batteryAvailableEnergyKwh,
    batteryReserveEnergyKwh,
    batteryUsableEnergyKwh,
    saunaPowerKw: saunaSensorPowerKw ?? normalizePositiveConfigValue(config.saunaRatedPowerKw),
  };
}

export function readPositivePowerEntity(entity: HassEntity | undefined): number | undefined {
  return readPowerEntity(entity, false);
}

export function readSignedPowerEntity(entity: HassEntity | undefined): number | undefined {
  return readPowerEntity(entity, true);
}

export function readPercentEntity(entity: HassEntity | undefined): number | undefined {
  if (!isReadableEntity(entity)) {
    return undefined;
  }

  return normalizePercent(entity.state);
}

function readPowerEntity(
  entity: HassEntity | undefined,
  allowNegative: boolean,
): number | undefined {
  if (!isReadableEntity(entity)) {
    return undefined;
  }

  const unit = entity.attributes.unit_of_measurement;

  return normalizeKilowatts(entity.state, typeof unit === 'string' ? unit : undefined, {
    allowNegative,
  });
}

function isReadableEntity(entity: HassEntity | undefined): entity is HassEntity {
  return entity !== undefined && !UNAVAILABLE_STATES.has(entity.state.toLowerCase());
}

function normalizePositiveConfigValue(value: number): number | undefined {
  return Number.isFinite(value) && value > 0 ? value : undefined;
}
