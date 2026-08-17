import { describe, expect, it } from 'vitest';

import {
  normalizeBatteryPowerSign,
  normalizeGridPowerSign,
  normalizeKilowattHours,
  normalizeKilowatts,
  normalizePercent,
  normalizePersistenceFactor,
  wattHoursToKilowattHours,
  wattsToKilowatts,
} from './energy-normalization';

describe('energy normalization', () => {
  it('converts W to kW and preserves kW values', () => {
    expect(wattsToKilowatts(2500)).toBe(2.5);
    expect(normalizeKilowatts('4500', 'W')).toBe(4.5);
    expect(normalizeKilowatts('4.2', 'kW')).toBe(4.2);
  });

  it('converts Wh to kWh where needed', () => {
    expect(wattHoursToKilowattHours(1800)).toBe(1.8);
    expect(normalizeKilowattHours('9800', 'Wh')).toBe(9.8);
    expect(normalizeKilowattHours('9.8', 'kWh')).toBe(9.8);
  });

  it('rejects invalid units and invalid values', () => {
    expect(normalizeKilowatts('12', 'MW')).toBeUndefined();
    expect(normalizeKilowattHours('12', 'MWh')).toBeUndefined();
    expect(normalizeKilowatts('not-number', 'kW')).toBeUndefined();
  });

  it('normalizes percentages to safe boundaries', () => {
    expect(normalizePercent(-5)).toBe(0);
    expect(normalizePercent(44.4)).toBe(44.4);
    expect(normalizePercent(120)).toBe(100);
  });

  it('normalizes grid sign conventions to positive import and negative export', () => {
    expect(normalizeGridPowerSign(2, 'import')).toBe(2);
    expect(normalizeGridPowerSign(-1, 'import')).toBe(-1);
    expect(normalizeGridPowerSign(2, 'export')).toBe(-2);
  });

  it('normalizes battery sign conventions to positive discharge and negative charge', () => {
    expect(normalizeBatteryPowerSign(2, 'charging')).toBe(-2);
    expect(normalizeBatteryPowerSign(-1, 'charging')).toBe(1);
    expect(normalizeBatteryPowerSign(2, 'discharging')).toBe(2);
  });

  it('clamps PV persistence factors', () => {
    expect(normalizePersistenceFactor(-1, 0.5)).toBe(0);
    expect(normalizePersistenceFactor(0.6, 0.5)).toBe(0.6);
    expect(normalizePersistenceFactor(2, 0.5)).toBe(1);
    expect(normalizePersistenceFactor('invalid', 0.5)).toBe(0.5);
  });
});
