import { clampValue } from '../utils/number';

export const GRID_POWER_POSITIVE_MEANS = ['import', 'export'] as const;
export const BATTERY_POWER_POSITIVE_MEANS = ['charging', 'discharging'] as const;

export type GridPowerPositiveMeans = (typeof GRID_POWER_POSITIVE_MEANS)[number];
export type BatteryPowerPositiveMeans = (typeof BATTERY_POWER_POSITIVE_MEANS)[number];

export function parseEnergyNumber(value: unknown): number | undefined {
  const numericValue = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(numericValue) ? numericValue : undefined;
}

export function wattsToKilowatts(value: number | undefined): number | undefined {
  return value === undefined || !Number.isFinite(value) ? undefined : value / 1000;
}

export function wattHoursToKilowattHours(value: number | undefined): number | undefined {
  return value === undefined || !Number.isFinite(value) ? undefined : value / 1000;
}

export function normalizeKilowatts(
  value: unknown,
  unit: string | undefined,
  options: { allowNegative?: boolean | undefined } = {},
): number | undefined {
  const numericValue = parseEnergyNumber(value);

  if (numericValue === undefined) {
    return undefined;
  }

  const normalizedUnit = unit?.trim().toLowerCase();
  let kilowatts: number | undefined;

  if (normalizedUnit === 'w') {
    kilowatts = wattsToKilowatts(numericValue);
  } else if (normalizedUnit === 'kw' || normalizedUnit === undefined || normalizedUnit === '') {
    kilowatts = numericValue;
  }

  if (kilowatts === undefined || !Number.isFinite(kilowatts)) {
    return undefined;
  }

  if (!options.allowNegative && kilowatts < 0) {
    return undefined;
  }

  return kilowatts;
}

export function normalizeKilowattHours(
  value: unknown,
  unit: string | undefined,
): number | undefined {
  const numericValue = parseEnergyNumber(value);

  if (numericValue === undefined) {
    return undefined;
  }

  const normalizedUnit = unit?.trim().toLowerCase();
  let kilowattHours: number | undefined;

  if (normalizedUnit === 'wh') {
    kilowattHours = wattHoursToKilowattHours(numericValue);
  } else if (normalizedUnit === 'kwh' || normalizedUnit === undefined || normalizedUnit === '') {
    kilowattHours = numericValue;
  }

  return kilowattHours !== undefined && Number.isFinite(kilowattHours) && kilowattHours >= 0
    ? kilowattHours
    : undefined;
}

export function normalizePercent(value: unknown): number | undefined {
  const numericValue = parseEnergyNumber(value);

  if (numericValue === undefined) {
    return undefined;
  }

  return clampValue(numericValue, 0, 100);
}

export function normalizeGridPowerSign(
  powerKw: number | undefined,
  positiveMeans: GridPowerPositiveMeans,
): number | undefined {
  if (powerKw === undefined || !Number.isFinite(powerKw)) {
    return undefined;
  }

  return positiveMeans === 'import' ? powerKw : -powerKw;
}

export function normalizeBatteryPowerSign(
  powerKw: number | undefined,
  positiveMeans: BatteryPowerPositiveMeans,
): number | undefined {
  if (powerKw === undefined || !Number.isFinite(powerKw)) {
    return undefined;
  }

  return positiveMeans === 'charging' ? -powerKw : powerKw;
}

export function normalizePersistenceFactor(value: unknown, fallback: number): number {
  const numericValue = parseEnergyNumber(value);

  if (numericValue === undefined) {
    return fallback;
  }

  return clampValue(numericValue, 0, 1);
}
