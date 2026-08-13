import { describe, expect, it } from 'vitest';

import {
  getTemperatureSemanticColor,
  normalizeReadyColor,
  normalizeRgbColor,
  rgbToArray,
  rgbToHs,
} from './temperature-color';

describe('temperature color mapping', () => {
  it('maps temperature progress to semantic RGB colors', () => {
    expect(getTemperatureSemanticColor(50, 80, thresholds()).status).toBe('far_below');
    expect(getTemperatureSemanticColor(70, 80, thresholds()).status).toBe('heating');
    expect(getTemperatureSemanticColor(77, 80, thresholds()).status).toBe('near_target');
    expect(getTemperatureSemanticColor(80, 80, thresholds()).status).toBe('target_reached');
    expect(getTemperatureSemanticColor(84, 80, thresholds()).status).toBe('above_target');
  });

  it('interpolates smoothly between heating colors', () => {
    const early = getTemperatureSemanticColor(61, 80, thresholds()).rgb;
    const later = getTemperatureSemanticColor(74, 80, thresholds()).rgb;

    expect(early.blue).toBeGreaterThan(later.blue);
    expect(later.green).toBeGreaterThan(early.green);
  });

  it('clamps invalid RGB inputs', () => {
    expect(normalizeRgbColor({ red: -10, green: 260, blue: Number.NaN })).toEqual({
      red: 0,
      green: 255,
      blue: 0,
    });
  });

  it('normalizes named ready colors and falls back safely', () => {
    expect(normalizeReadyColor('gold')).toEqual({ red: 238, green: 185, blue: 58 });
    expect(normalizeReadyColor('custom')).toEqual({ red: 42, green: 202, blue: 116 });
  });

  it('returns RGB array and HS values for Home Assistant payloads', () => {
    const color = { red: 255, green: 0, blue: 0 };

    expect(rgbToArray(color)).toEqual([255, 0, 0]);
    expect(rgbToHs(color)).toEqual({ hue: 0, saturation: 100 });
  });
});

function thresholds() {
  return {
    nearTargetThreshold: 5,
    targetReachedTolerance: 2,
  };
}
