import { describe, expect, it } from 'vitest';

import {
  averageTemperatureValues,
  calculateTemperatureDifference,
  calculateTemperatureStratification,
  readTemperatureValue,
  selectControlTemperature,
  weightedTemperatureAverage,
  type TemperatureWeights,
  type TemperatureZoneValues,
} from './temperature';

const equalWeights: TemperatureWeights = {
  top: 1,
  middle: 1,
  bottom: 1,
};

describe('temperature domain logic', () => {
  it('reads valid numeric temperature values', () => {
    expect(readTemperatureValue('82.5')).toBe(82.5);
    expect(readTemperatureValue(74)).toBe(74);
  });

  it('ignores unavailable, unknown and non-numeric values', () => {
    expect(readTemperatureValue('unavailable')).toBeUndefined();
    expect(readTemperatureValue('unknown')).toBeUndefined();
    expect(readTemperatureValue('not-a-number')).toBeUndefined();
    expect(readTemperatureValue(Number.NaN)).toBeUndefined();
  });

  it('averages one, two and three available sensors', () => {
    expect(selectControlTemperature({ top: 90 }, 'average', equalWeights)).toBe(90);
    expect(selectControlTemperature({ top: 90, middle: 80 }, 'average', equalWeights)).toBe(85);
    expect(
      selectControlTemperature({ top: 90, middle: 80, bottom: 70 }, 'average', equalWeights),
    ).toBe(80);
  });

  it('returns undefined for averages with no valid values', () => {
    expect(averageTemperatureValues([])).toBeUndefined();
    expect(selectControlTemperature({}, 'average', equalWeights)).toBeUndefined();
  });

  it('selects every direct control-temperature mode', () => {
    const values: TemperatureZoneValues = { top: 92, middle: 84, bottom: 76 };

    expect(selectControlTemperature(values, 'top', equalWeights)).toBe(92);
    expect(selectControlTemperature(values, 'middle', equalWeights)).toBe(84);
    expect(selectControlTemperature(values, 'bottom', equalWeights)).toBe(76);
  });

  it('selects weighted average using only available sensors', () => {
    expect(
      selectControlTemperature({ top: 90, bottom: 70 }, 'weighted_average', {
        top: 3,
        middle: 100,
        bottom: 1,
      }),
    ).toBe(85);
  });

  it('normalizes active weights automatically', () => {
    expect(
      weightedTemperatureAverage(
        { top: 100, middle: 50 },
        {
          top: 2,
          middle: 2,
          bottom: 99,
        },
      ),
    ).toBe(75);
  });

  it('returns undefined for weighted averages with zero weights', () => {
    expect(
      selectControlTemperature({ top: 90, middle: 80 }, 'weighted_average', {
        top: 0,
        middle: 0,
        bottom: 1,
      }),
    ).toBeUndefined();
  });

  it('safely handles negative weights', () => {
    expect(
      selectControlTemperature({ top: 90, middle: 70 }, 'weighted_average', {
        top: -5,
        middle: 1,
        bottom: 1,
      }),
    ).toBe(70);
  });

  it('selects minimum and maximum temperatures', () => {
    const values: TemperatureZoneValues = { top: 92, middle: 84, bottom: 76 };

    expect(selectControlTemperature(values, 'minimum', equalWeights)).toBe(76);
    expect(selectControlTemperature(values, 'maximum', equalWeights)).toBe(92);
  });

  it('calculates temperature stratification from top minus bottom', () => {
    expect(calculateTemperatureStratification({ top: 92, bottom: 76 })).toBe(16);
  });

  it('returns undefined for stratification without top and bottom sensors', () => {
    expect(calculateTemperatureStratification({ top: 92 })).toBeUndefined();
    expect(calculateTemperatureStratification({ bottom: 76 })).toBeUndefined();
  });

  it('calculates signed temperature differences', () => {
    expect(calculateTemperatureDifference(65, 90)).toBe(25);
    expect(calculateTemperatureDifference(95, 80)).toBe(-15);
  });
});
