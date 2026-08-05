import { describe, expect, it } from 'vitest';

import { clampValue } from './number';

describe('clampValue', () => {
  it('keeps values inside the range unchanged', () => {
    expect(clampValue(5, 0, 10)).toBe(5);
  });

  it('clamps values below the minimum', () => {
    expect(clampValue(-2, 0, 10)).toBe(0);
  });

  it('clamps values above the maximum', () => {
    expect(clampValue(12, 0, 10)).toBe(10);
  });

  it('rejects invalid ranges', () => {
    expect(() => clampValue(5, 10, 0)).toThrow(RangeError);
  });
});
