import type { TemperatureHistorySample } from '../services/temperature-history';

export const MINIMUM_POSITIVE_HEATING_RATE_C_PER_MINUTE = 0.02;
export const STABLE_COOLING_RATE_C_PER_MINUTE = -0.02;

export interface HeatingRateResult {
  rateCPerMinute?: number | undefined;
  validSampleCount: number;
  validSlopeCount: number;
}

export function calculateRobustHeatingRate(
  samples: readonly TemperatureHistorySample[],
  minimumSamples: number,
): HeatingRateResult {
  const validSamples = samples
    .filter(
      (sample) =>
        Number.isFinite(sample.timestamp) && Number.isFinite(sample.value) && sample.timestamp >= 0,
    )
    .sort((left, right) => left.timestamp - right.timestamp);

  if (validSamples.length < minimumSamples) {
    return {
      validSampleCount: validSamples.length,
      validSlopeCount: 0,
    };
  }

  const slopes = calculateConsecutiveSlopes(validSamples);

  if (slopes.length === 0) {
    return {
      validSampleCount: validSamples.length,
      validSlopeCount: 0,
    };
  }

  const filteredSlopes = filterMedianOutliers(slopes);

  return {
    rateCPerMinute: median(filteredSlopes),
    validSampleCount: validSamples.length,
    validSlopeCount: filteredSlopes.length,
  };
}

export function isPositiveHeatingRate(rateCPerMinute: number | undefined): boolean {
  return (
    rateCPerMinute !== undefined &&
    Number.isFinite(rateCPerMinute) &&
    rateCPerMinute >= MINIMUM_POSITIVE_HEATING_RATE_C_PER_MINUTE
  );
}

export function isStableCoolingRate(rateCPerMinute: number | undefined): boolean {
  return (
    rateCPerMinute !== undefined &&
    Number.isFinite(rateCPerMinute) &&
    rateCPerMinute <= STABLE_COOLING_RATE_C_PER_MINUTE
  );
}

function calculateConsecutiveSlopes(samples: readonly TemperatureHistorySample[]): number[] {
  const slopes: number[] = [];

  for (let index = 1; index < samples.length; index += 1) {
    const previousSample = samples[index - 1];
    const currentSample = samples[index];

    if (!previousSample || !currentSample) {
      continue;
    }

    const minutes = (currentSample.timestamp - previousSample.timestamp) / 60_000;

    if (!Number.isFinite(minutes) || minutes <= 0) {
      continue;
    }

    const slope = (currentSample.value - previousSample.value) / minutes;

    if (Number.isFinite(slope)) {
      slopes.push(slope);
    }
  }

  return slopes;
}

function filterMedianOutliers(values: readonly number[]): number[] {
  const center = median(values);
  const absoluteDeviations = values.map((value) => Math.abs(value - center));
  const medianAbsoluteDeviation = median(absoluteDeviations);
  const tolerance = Math.max(0.05, medianAbsoluteDeviation * 3);
  const filteredValues = values.filter((value) => Math.abs(value - center) <= tolerance);

  return filteredValues.length > 0 ? filteredValues : [...values];
}

function median(values: readonly number[]): number {
  const sortedValues = [...values].sort((left, right) => left - right);
  const middleIndex = Math.floor(sortedValues.length / 2);
  const middleValue = sortedValues[middleIndex] ?? 0;

  if (sortedValues.length % 2 === 1) {
    return middleValue;
  }

  return ((sortedValues[middleIndex - 1] ?? middleValue) + middleValue) / 2;
}
