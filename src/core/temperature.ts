import { assertFiniteNumber } from '../utils/number';

export interface WeightedTemperatureValue {
  value: number;
  weight: number;
}

export function averageTemperatureValues(values: readonly number[]): number {
  if (values.length === 0) {
    throw new RangeError('values must not be empty');
  }

  values.forEach((value, index) => assertFiniteNumber(value, `values[${index}]`));

  const total = values.reduce((sum, value) => sum + value, 0);
  return total / values.length;
}

export function weightedTemperatureAverage(values: readonly WeightedTemperatureValue[]): number {
  if (values.length === 0) {
    throw new RangeError('values must not be empty');
  }

  const totals = values.reduce(
    (result, item, index) => {
      assertFiniteNumber(item.value, `values[${index}].value`);
      assertFiniteNumber(item.weight, `values[${index}].weight`);

      if (item.weight < 0) {
        throw new RangeError(`values[${index}].weight must be greater than or equal to 0`);
      }

      return {
        weightedSum: result.weightedSum + item.value * item.weight,
        weightSum: result.weightSum + item.weight,
      };
    },
    { weightedSum: 0, weightSum: 0 },
  );

  if (totals.weightSum === 0) {
    throw new RangeError('at least one weight must be greater than 0');
  }

  return totals.weightedSum / totals.weightSum;
}

export function calculateTemperatureDifference(
  fromTemperature: number,
  toTemperature: number,
): number {
  assertFiniteNumber(fromTemperature, 'fromTemperature');
  assertFiniteNumber(toTemperature, 'toTemperature');

  return toTemperature - fromTemperature;
}
