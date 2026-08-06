export type PowerUnit = 'W' | 'kW';

export interface PowerReading {
  value: number;
  unit?: string | undefined;
}

export function parsePowerValue(value: unknown): number | undefined {
  const parsedValue = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(parsedValue) ? parsedValue : undefined;
}

export function convertPowerToKilowatts(
  value: number | undefined,
  unit: string | undefined,
): number | undefined {
  if (value === undefined || !Number.isFinite(value)) {
    return undefined;
  }

  const normalizedUnit = unit?.trim().toLowerCase();

  if (normalizedUnit === 'w') {
    return value / 1000;
  }

  if (normalizedUnit === 'kw' || normalizedUnit === undefined || normalizedUnit === '') {
    return value;
  }

  return undefined;
}

export function validateKilowatts(value: number | undefined): number | undefined {
  if (value === undefined || !Number.isFinite(value) || value < 0) {
    return undefined;
  }

  return value;
}

export function normalizePowerReadingToKilowatts(
  value: unknown,
  unit: string | undefined,
): number | undefined {
  return validateKilowatts(convertPowerToKilowatts(parsePowerValue(value), unit));
}

export function estimateSaunaShareFromGeneralPower(
  totalPowerKw: number | undefined,
  heaterRatedPowerKw: number,
): number | undefined {
  const validTotalPowerKw = validateKilowatts(totalPowerKw);
  const validRatedPowerKw = validateKilowatts(heaterRatedPowerKw);

  if (validTotalPowerKw === undefined || validRatedPowerKw === undefined) {
    return undefined;
  }

  return Math.min(validTotalPowerKw, validRatedPowerKw);
}
