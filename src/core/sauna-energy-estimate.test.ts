import { describe, expect, it } from 'vitest';

import { estimateSaunaEnergyNeed } from './sauna-energy-estimate';

describe('sauna energy estimate', () => {
  it('estimates heat-up energy from ETA and effective heater power', () => {
    const estimate = estimateSaunaEnergyNeed({
      currentTemperature: 40,
      targetTemperature: 80,
      etaMinutes: 45,
      effectiveHeaterPowerKw: 8,
      ratedHeaterPowerKw: 9,
      expectedSessionDurationMinutes: 90,
    });

    expect(estimate.estimatedHeatupEnergyKwh).toBeCloseTo(6);
    expect(estimate.estimatedHeatupMinutes).toBe(45);
    expect(estimate.estimatedSessionEnergyKwh).toBeCloseTo(4.2);
    expect(estimate.totalEstimatedEnergyKwh).toBeCloseTo(10.2);
    expect(estimate.usedThermalFallback).toBe(false);
  });

  it('falls back to deterministic thermal estimate when ETA is unavailable', () => {
    const estimate = estimateSaunaEnergyNeed({
      currentTemperature: 50,
      targetTemperature: 80,
      effectiveHeaterPowerKw: 9,
      ratedHeaterPowerKw: 9,
      expectedSessionDurationMinutes: 60,
    });

    expect(estimate.estimatedHeatupEnergyKwh).toBeCloseTo(3.6);
    expect(estimate.estimatedHeatupMinutes).toBeCloseTo(24);
    expect(estimate.usedThermalFallback).toBe(true);
  });

  it('handles target already reached without heat-up demand', () => {
    const estimate = estimateSaunaEnergyNeed({
      currentTemperature: 85,
      targetTemperature: 80,
      effectiveHeaterPowerKw: 9,
      ratedHeaterPowerKw: 9,
      expectedSessionDurationMinutes: 90,
    });

    expect(estimate.estimatedHeatupEnergyKwh).toBe(0);
    expect(estimate.estimatedHeatupMinutes).toBe(0);
    expect(estimate.unavailableReason).toBe('target_reached');
  });

  it('does not estimate with invalid heater power or missing temperatures', () => {
    expect(
      estimateSaunaEnergyNeed({
        currentTemperature: 40,
        targetTemperature: 80,
        effectiveHeaterPowerKw: 0,
        ratedHeaterPowerKw: 0,
        expectedSessionDurationMinutes: 90,
      }).unavailableReason,
    ).toBe('invalid_power');
    expect(
      estimateSaunaEnergyNeed({
        effectiveHeaterPowerKw: 9,
        ratedHeaterPowerKw: 9,
        expectedSessionDurationMinutes: 90,
      }).unavailableReason,
    ).toBe('missing_temperature');
  });
});
