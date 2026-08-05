export function clampValue(value: number, minimum: number, maximum: number): number {
  assertFiniteNumber(value, 'value');
  assertFiniteNumber(minimum, 'minimum');
  assertFiniteNumber(maximum, 'maximum');

  if (minimum > maximum) {
    throw new RangeError('minimum must be less than or equal to maximum');
  }

  return Math.min(Math.max(value, minimum), maximum);
}

export function assertFiniteNumber(value: number, label: string): void {
  if (!Number.isFinite(value)) {
    throw new RangeError(`${label} must be a finite number`);
  }
}
