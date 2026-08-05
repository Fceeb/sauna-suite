import { describe, expect, it } from 'vitest';

import {
  averageTemperatureValues,
  calculateTemperatureDifference,
  weightedTemperatureAverage,
} from './temperature';

describe('temperature utilities', () => {
  it('averages temperature values', () => {
    expect(averageTemperatureValues([70, 80, 90])).toBe(80);
  });

  it('rejects empty temperature averages', () => {
    expect(() => averageTemperatureValues([])).toThrow(RangeError);
  });

  it('calculates weighted temperature averages', () => {
    expect(
      weightedTemperatureAverage([
        { value: 90, weight: 3 },
        { value: 70, weight: 1 },
      ]),
    ).toBe(85);
  });

  it('rejects zero total weight', () => {
    expect(() =>
      weightedTemperatureAverage([
        { value: 90, weight: 0 },
        { value: 70, weight: 0 },
      ]),
    ).toThrow(RangeError);
  });

  it('calculates signed temperature differences', () => {
    expect(calculateTemperatureDifference(65, 90)).toBe(25);
    expect(calculateTemperatureDifference(95, 80)).toBe(-15);
  });
});
