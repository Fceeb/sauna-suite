import { describe, expect, it } from 'vitest';

import {
  calculateHeatingEta,
  calculateOutsideTemperatureCorrectionFactor,
  calculatePowerCorrectionFactor,
  formatEtaDuration,
  formatExpectedReadyTime,
  OUTSIDE_CORRECTION_MAX,
  OUTSIDE_CORRECTION_MIN,
  POWER_CORRECTION_MAX,
  POWER_CORRECTION_MIN,
} from './heating-eta';

const labels = {
  readyIn: 'Ready in',
  hour: 'h',
  hours: 'h',
  minute: 'min',
  minutes: 'min',
};

describe('heating ETA model', () => {
  it('calculates ETA from remaining temperature and measured rate', () => {
    expect(
      calculateHeatingEta({
        currentTemperature: 60,
        targetTemperature: 80,
        heatingRateCPerMinute: 0.5,
        outsideTemperatureWeight: 0,
        effectivePowerKw: 9,
        nominalPowerKw: 9,
      }).etaMinutes,
    ).toBeCloseTo(40);
  });

  it('returns unavailable when target is already reached', () => {
    expect(
      calculateHeatingEta({
        currentTemperature: 80,
        targetTemperature: 80,
        heatingRateCPerMinute: 0.5,
        outsideTemperatureWeight: 0.15,
        effectivePowerKw: 9,
        nominalPowerKw: 9,
      }).unavailableReason,
    ).toBe('target_reached');
  });

  it('returns unavailable when heater power is zero', () => {
    expect(
      calculateHeatingEta({
        currentTemperature: 60,
        targetTemperature: 80,
        heatingRateCPerMinute: 0.5,
        outsideTemperatureWeight: 0.15,
        effectivePowerKw: 0,
        nominalPowerKw: 9,
      }).unavailableReason,
    ).toBe('heater_off');
  });

  it('returns unavailable for insufficient history and invalid rates', () => {
    expect(
      calculateHeatingEta({
        currentTemperature: 60,
        targetTemperature: 80,
        heatingRateCPerMinute: undefined,
        outsideTemperatureWeight: 0.15,
        effectivePowerKw: 9,
        nominalPowerKw: 9,
        hasInsufficientHistory: true,
      }).unavailableReason,
    ).toBe('insufficient_history');

    expect(
      calculateHeatingEta({
        currentTemperature: 60,
        targetTemperature: 80,
        heatingRateCPerMinute: 0,
        outsideTemperatureWeight: 0.15,
        effectivePowerKw: 9,
        nominalPowerKw: 9,
      }).unavailableReason,
    ).toBe('invalid_rate');
  });

  it('bounds outside-temperature correction factors', () => {
    expect(calculateOutsideTemperatureCorrectionFactor(-100, 1)).toBe(OUTSIDE_CORRECTION_MAX);
    expect(calculateOutsideTemperatureCorrectionFactor(100, 1)).toBe(OUTSIDE_CORRECTION_MIN);
  });

  it('bounds power correction factors', () => {
    expect(calculatePowerCorrectionFactor(1, 9)).toBe(POWER_CORRECTION_MAX);
    expect(calculatePowerCorrectionFactor(20, 9)).toBe(POWER_CORRECTION_MIN);
  });

  it('formats ETA duration under and over one hour', () => {
    expect(formatEtaDuration(24, labels)).toBe('Ready in 24 min');
    expect(formatEtaDuration(75, labels)).toBe('Ready in 1 h 15 min');
  });

  it('formats expected ready time using the provided locale', () => {
    expect(formatExpectedReadyTime(75, new Date('2026-08-06T10:00:00Z'), 'en-US')).toContain('15');
  });
});
