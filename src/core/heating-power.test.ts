import { describe, expect, it } from 'vitest';

import {
  convertPowerToKilowatts,
  estimateSaunaShareFromGeneralPower,
  normalizePowerReadingToKilowatts,
  parsePowerValue,
  validateKilowatts,
} from './heating-power';

describe('heating power utilities', () => {
  it('parses numeric power values', () => {
    expect(parsePowerValue('9000')).toBe(9000);
    expect(parsePowerValue(9)).toBe(9);
    expect(parsePowerValue('bad')).toBeUndefined();
  });

  it('converts W to kW and keeps kW values', () => {
    expect(convertPowerToKilowatts(9000, 'W')).toBe(9);
    expect(convertPowerToKilowatts(9, 'kW')).toBe(9);
    expect(convertPowerToKilowatts(9, undefined)).toBe(9);
  });

  it('validates non-negative kW values', () => {
    expect(validateKilowatts(0)).toBe(0);
    expect(validateKilowatts(9)).toBe(9);
    expect(validateKilowatts(-1)).toBeUndefined();
  });

  it('normalizes W and kW power readings', () => {
    expect(normalizePowerReadingToKilowatts('8500', 'W')).toBe(8.5);
    expect(normalizePowerReadingToKilowatts('8.5', 'kW')).toBe(8.5);
  });

  it('caps a general power sensor estimate at rated heater power', () => {
    expect(estimateSaunaShareFromGeneralPower(12, 9)).toBe(9);
    expect(estimateSaunaShareFromGeneralPower(4, 9)).toBe(4);
    expect(estimateSaunaShareFromGeneralPower(-1, 9)).toBeUndefined();
  });
});
