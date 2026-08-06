import { clampValue } from '../utils/number';
import { isPositiveHeatingRate } from './heating-rate';

export const OUTSIDE_TEMPERATURE_REFERENCE_C = 20;
export const OUTSIDE_CORRECTION_MIN = 0.85;
export const OUTSIDE_CORRECTION_MAX = 1.25;
export const POWER_CORRECTION_MIN = 0.75;
export const POWER_CORRECTION_MAX = 1.5;

export type HeatingEtaUnavailableReason =
  | 'target_reached'
  | 'heater_off'
  | 'insufficient_history'
  | 'invalid_rate'
  | 'missing_temperature'
  | 'missing_power';

export interface HeatingEtaInput {
  currentTemperature?: number | undefined;
  targetTemperature?: number | undefined;
  heatingRateCPerMinute?: number | undefined;
  outsideTemperature?: number | undefined;
  outsideTemperatureWeight: number;
  effectivePowerKw?: number | undefined;
  nominalPowerKw: number;
  hasInsufficientHistory?: boolean | undefined;
}

export interface HeatingEtaResult {
  etaMinutes?: number | undefined;
  baseEtaMinutes?: number | undefined;
  outsideCorrectionFactor: number;
  powerCorrectionFactor: number;
  unavailableReason?: HeatingEtaUnavailableReason | undefined;
}

export interface EtaDurationLabels {
  readyIn: string;
  hour: string;
  hours: string;
  minute: string;
  minutes: string;
}

export function calculateHeatingEta(input: HeatingEtaInput): HeatingEtaResult {
  const outsideCorrectionFactor = calculateOutsideTemperatureCorrectionFactor(
    input.outsideTemperature,
    input.outsideTemperatureWeight,
  );
  const powerCorrectionFactor = calculatePowerCorrectionFactor(
    input.effectivePowerKw,
    input.nominalPowerKw,
  );

  if (
    input.currentTemperature === undefined ||
    input.targetTemperature === undefined ||
    !Number.isFinite(input.currentTemperature) ||
    !Number.isFinite(input.targetTemperature)
  ) {
    return {
      outsideCorrectionFactor,
      powerCorrectionFactor,
      unavailableReason: 'missing_temperature',
    };
  }

  const remainingTemperature = input.targetTemperature - input.currentTemperature;

  if (remainingTemperature <= 0) {
    return {
      outsideCorrectionFactor,
      powerCorrectionFactor,
      unavailableReason: 'target_reached',
    };
  }

  if (input.effectivePowerKw === 0) {
    return {
      outsideCorrectionFactor,
      powerCorrectionFactor,
      unavailableReason: 'heater_off',
    };
  }

  if (
    input.effectivePowerKw === undefined ||
    !Number.isFinite(input.effectivePowerKw) ||
    input.effectivePowerKw < 0
  ) {
    return {
      outsideCorrectionFactor,
      powerCorrectionFactor,
      unavailableReason: 'missing_power',
    };
  }

  if (input.hasInsufficientHistory) {
    return {
      outsideCorrectionFactor,
      powerCorrectionFactor,
      unavailableReason: 'insufficient_history',
    };
  }

  const heatingRateCPerMinute = input.heatingRateCPerMinute;

  if (!isPositiveHeatingRate(heatingRateCPerMinute)) {
    return {
      outsideCorrectionFactor,
      powerCorrectionFactor,
      unavailableReason: 'invalid_rate',
    };
  }

  const positiveHeatingRateCPerMinute = heatingRateCPerMinute!;
  const baseEtaMinutes = remainingTemperature / positiveHeatingRateCPerMinute;
  const etaMinutes = baseEtaMinutes * outsideCorrectionFactor * powerCorrectionFactor;

  return {
    etaMinutes,
    baseEtaMinutes,
    outsideCorrectionFactor,
    powerCorrectionFactor,
  };
}

export function calculateOutsideTemperatureCorrectionFactor(
  outsideTemperature: number | undefined,
  outsideTemperatureWeight: number,
): number {
  if (outsideTemperature === undefined || !Number.isFinite(outsideTemperature)) {
    return 1;
  }

  const normalizedWeight = Math.max(0, outsideTemperatureWeight);
  const rawFactor =
    1 + normalizedWeight * ((OUTSIDE_TEMPERATURE_REFERENCE_C - outsideTemperature) / 40);

  return clampValue(rawFactor, OUTSIDE_CORRECTION_MIN, OUTSIDE_CORRECTION_MAX);
}

export function calculatePowerCorrectionFactor(
  effectivePowerKw: number | undefined,
  nominalPowerKw: number,
): number {
  if (
    effectivePowerKw === undefined ||
    !Number.isFinite(effectivePowerKw) ||
    effectivePowerKw <= 0 ||
    !Number.isFinite(nominalPowerKw) ||
    nominalPowerKw <= 0
  ) {
    return 1;
  }

  return clampValue(nominalPowerKw / effectivePowerKw, POWER_CORRECTION_MIN, POWER_CORRECTION_MAX);
}

export function formatEtaDuration(
  etaMinutes: number | undefined,
  labels: EtaDurationLabels,
): string | undefined {
  if (etaMinutes === undefined || !Number.isFinite(etaMinutes) || etaMinutes < 0) {
    return undefined;
  }

  const roundedMinutes = Math.max(1, Math.round(etaMinutes));

  if (roundedMinutes < 60) {
    return `${labels.readyIn} ${roundedMinutes} ${
      roundedMinutes === 1 ? labels.minute : labels.minutes
    }`;
  }

  const hours = Math.floor(roundedMinutes / 60);
  const minutes = roundedMinutes % 60;
  const hourLabel = hours === 1 ? labels.hour : labels.hours;

  if (minutes === 0) {
    return `${labels.readyIn} ${hours} ${hourLabel}`;
  }

  return `${labels.readyIn} ${hours} ${hourLabel} ${minutes} ${
    minutes === 1 ? labels.minute : labels.minutes
  }`;
}

export function formatExpectedReadyTime(
  etaMinutes: number | undefined,
  now: Date,
  locale: string | undefined,
): string | undefined {
  if (etaMinutes === undefined || !Number.isFinite(etaMinutes) || etaMinutes < 0) {
    return undefined;
  }

  const readyAt = new Date(now.getTime() + etaMinutes * 60_000);

  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(readyAt);
}
