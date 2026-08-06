import { describe, expect, it } from 'vitest';

import { calculateRobustHeatingRate, isStableCoolingRate } from './heating-rate';

describe('heating rate model', () => {
  it('calculates a positive heating rate from recent samples', () => {
    expect(
      calculateRobustHeatingRate(
        [sample(0, 40), sample(10, 45), sample(20, 50), sample(30, 55), sample(40, 60)],
        5,
      ).rateCPerMinute,
    ).toBeCloseTo(0.5);
  });

  it('returns a flat rate for flat temperature history', () => {
    expect(
      calculateRobustHeatingRate(
        [sample(0, 50), sample(10, 50), sample(20, 50), sample(30, 50), sample(40, 50)],
        5,
      ).rateCPerMinute,
    ).toBe(0);
  });

  it('detects stable negative cooling history', () => {
    const result = calculateRobustHeatingRate(
      [sample(0, 70), sample(10, 68), sample(20, 66), sample(30, 64), sample(40, 62)],
      5,
    );

    expect(result.rateCPerMinute).toBeCloseTo(-0.2);
    expect(isStableCoolingRate(result.rateCPerMinute)).toBe(true);
  });

  it('ignores invalid samples and non-positive intervals', () => {
    const result = calculateRobustHeatingRate(
      [
        { timestamp: Number.NaN, value: 40 },
        sample(10, 40),
        sample(10, 44),
        sample(20, 45),
        sample(30, 50),
        sample(40, 55),
      ],
      4,
    );

    expect(result.validSampleCount).toBe(5);
    expect(result.rateCPerMinute).toBeGreaterThan(0);
  });

  it('reduces sensitivity to a single outlier slope', () => {
    const result = calculateRobustHeatingRate(
      [
        sample(0, 40),
        sample(10, 45),
        sample(20, 110),
        sample(30, 50),
        sample(40, 55),
        sample(50, 60),
      ],
      5,
    );

    expect(result.rateCPerMinute).toBeCloseTo(0.5);
  });

  it('requires the configured minimum sample count', () => {
    const result = calculateRobustHeatingRate([sample(0, 40), sample(10, 45)], 5);

    expect(result.rateCPerMinute).toBeUndefined();
    expect(result.validSampleCount).toBe(2);
  });
});

function sample(minutes: number, value: number): { timestamp: number; value: number } {
  return {
    timestamp: minutes * 60_000,
    value,
  };
}
