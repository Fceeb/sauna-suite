import { describe, expect, it } from 'vitest';

import {
  calculateNormalizedHeatingProgress,
  calculateTemperatureDifferenceToTarget,
  getProgressColorStops,
  getTemperatureStatus,
  getTemperatureStatusColors,
  normalizeTemperatureThresholds,
} from './temperature-progress';

const thresholds = {
  nearTargetThreshold: 5,
  targetReachedTolerance: 2,
  aboveTargetThreshold: 2,
};

describe('temperature progress', () => {
  it('calculates difference between control and target temperatures', () => {
    expect(calculateTemperatureDifferenceToTarget(75, 90)).toBe(-15);
    expect(calculateTemperatureDifferenceToTarget(92, 90)).toBe(2);
  });

  it('returns unavailable status without control or target temperature', () => {
    expect(getTemperatureStatus(undefined, 90, thresholds)).toBe('unavailable');
    expect(getTemperatureStatus(80, undefined, thresholds)).toBe('unavailable');
  });

  it('classifies every temperature status', () => {
    expect(getTemperatureStatus(60, 90, thresholds)).toBe('far_below');
    expect(getTemperatureStatus(75, 90, thresholds)).toBe('heating');
    expect(getTemperatureStatus(86, 90, thresholds)).toBe('near_target');
    expect(getTemperatureStatus(91, 90, thresholds)).toBe('target_reached');
    expect(getTemperatureStatus(93, 90, thresholds)).toBe('above_target');
  });

  it('handles exact threshold boundaries', () => {
    expect(getTemperatureStatus(70, 90, thresholds)).toBe('heating');
    expect(getTemperatureStatus(85, 90, thresholds)).toBe('heating');
    expect(getTemperatureStatus(85.1, 90, thresholds)).toBe('near_target');
    expect(getTemperatureStatus(90, 90, thresholds)).toBe('target_reached');
    expect(getTemperatureStatus(92, 90, thresholds)).toBe('target_reached');
    expect(getTemperatureStatus(92.1, 90, thresholds)).toBe('above_target');
  });

  it('uses the above-target threshold independently', () => {
    expect(
      getTemperatureStatus(93, 90, {
        nearTargetThreshold: 5,
        targetReachedTolerance: 2,
        aboveTargetThreshold: 4,
      }),
    ).toBe('target_reached');
  });

  it('normalizes progress and clamps it between 0 and 1', () => {
    expect(calculateNormalizedHeatingProgress(45, 90)).toBe(0.5);
    expect(calculateNormalizedHeatingProgress(-10, 90)).toBe(0);
    expect(calculateNormalizedHeatingProgress(120, 90)).toBe(1);
    expect(calculateNormalizedHeatingProgress(undefined, 90)).toBe(0);
  });

  it('normalizes invalid threshold combinations safely', () => {
    expect(
      normalizeTemperatureThresholds({
        nearTargetThreshold: Number.NaN,
        targetReachedTolerance: -1,
        aboveTargetThreshold: 1,
      }),
    ).toEqual({
      nearTargetThreshold: 5,
      targetReachedTolerance: 0,
      aboveTargetThreshold: 1,
    });
  });

  it('selects colors and progress color stops centrally', () => {
    expect(getTemperatureStatusColors('heating').line).toBe('#22c7d8');
    expect(getProgressColorStops('target_reached')).toEqual([
      'rgba(215, 179, 57, 0.18)',
      '#d7b339',
    ]);
  });
});
