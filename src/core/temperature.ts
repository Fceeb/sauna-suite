import type { ControlTemperatureMode } from '../models/card-config';

export interface TemperatureZoneValues {
  top?: number | undefined;
  middle?: number | undefined;
  bottom?: number | undefined;
}

export interface TemperatureWeights {
  top: number;
  middle: number;
  bottom: number;
}

export interface TemperatureSummary {
  controlTemperature?: number | undefined;
  stratification?: number | undefined;
}

type TemperatureZone = keyof TemperatureZoneValues;

const UNAVAILABLE_STATES = new Set(['unavailable', 'unknown', '']);

export function readTemperatureValue(state: string | number | undefined): number | undefined {
  if (state === undefined) {
    return undefined;
  }

  if (typeof state === 'number') {
    return Number.isFinite(state) ? state : undefined;
  }

  const normalizedState = state.trim().toLowerCase();

  if (UNAVAILABLE_STATES.has(normalizedState)) {
    return undefined;
  }

  const value = Number(state);
  return Number.isFinite(value) ? value : undefined;
}

export function averageTemperatureValues(values: readonly number[]): number | undefined {
  const validValues = values.filter(Number.isFinite);

  if (validValues.length === 0) {
    return undefined;
  }

  const total = validValues.reduce((sum, value) => sum + value, 0);
  return total / validValues.length;
}

export function weightedTemperatureAverage(
  values: TemperatureZoneValues,
  weights: TemperatureWeights,
): number | undefined {
  const weightedValues = getAvailableZones(values)
    .map((zone) => ({
      value: values[zone],
      weight: normalizeWeight(weights[zone]),
    }))
    .filter((item): item is { value: number; weight: number } => item.value !== undefined);

  const activeWeightTotal = weightedValues.reduce((sum, item) => sum + item.weight, 0);

  if (weightedValues.length === 0 || activeWeightTotal <= 0) {
    return undefined;
  }

  const weightedSum = weightedValues.reduce((sum, item) => sum + item.value * item.weight, 0);
  return weightedSum / activeWeightTotal;
}

export function minimumTemperature(values: TemperatureZoneValues): number | undefined {
  const availableValues = getAvailableValues(values);
  return availableValues.length > 0 ? Math.min(...availableValues) : undefined;
}

export function maximumTemperature(values: TemperatureZoneValues): number | undefined {
  const availableValues = getAvailableValues(values);
  return availableValues.length > 0 ? Math.max(...availableValues) : undefined;
}

export function selectControlTemperature(
  values: TemperatureZoneValues,
  mode: ControlTemperatureMode,
  weights: TemperatureWeights,
): number | undefined {
  switch (mode) {
    case 'top':
      return values.top;
    case 'middle':
      return values.middle;
    case 'bottom':
      return values.bottom;
    case 'average':
      return averageTemperatureValues(getAvailableValues(values));
    case 'weighted_average':
      return weightedTemperatureAverage(values, weights);
    case 'minimum':
      return minimumTemperature(values);
    case 'maximum':
      return maximumTemperature(values);
  }
}

export function calculateTemperatureStratification(
  values: TemperatureZoneValues,
): number | undefined {
  if (values.top === undefined || values.bottom === undefined) {
    return undefined;
  }

  return values.top - values.bottom;
}

export function calculateTemperatureSummary(
  values: TemperatureZoneValues,
  mode: ControlTemperatureMode,
  weights: TemperatureWeights,
): TemperatureSummary {
  return {
    controlTemperature: selectControlTemperature(values, mode, weights),
    stratification: calculateTemperatureStratification(values),
  };
}

export function calculateTemperatureDifference(
  fromTemperature: number,
  toTemperature: number,
): number {
  return toTemperature - fromTemperature;
}

function getAvailableValues(values: TemperatureZoneValues): number[] {
  return getAvailableZones(values)
    .map((zone) => values[zone])
    .filter((value): value is number => value !== undefined);
}

function getAvailableZones(values: TemperatureZoneValues): TemperatureZone[] {
  const zones: TemperatureZone[] = ['top', 'middle', 'bottom'];
  return zones.filter((zone) => values[zone] !== undefined);
}

function normalizeWeight(weight: number): number {
  return Number.isFinite(weight) ? Math.max(0, weight) : 0;
}
