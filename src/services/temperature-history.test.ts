import { describe, expect, it } from 'vitest';

import { parseHistorySamples, reduceHistorySamples } from './temperature-history';

describe('temperature history', () => {
  it('parses valid history samples', () => {
    expect(
      parseHistorySamples([
        [
          {
            state: '70.5',
            last_changed: '2026-08-05T12:00:00Z',
          },
        ],
      ]),
    ).toEqual([{ timestamp: Date.parse('2026-08-05T12:00:00Z'), value: 70.5 }]);
  });

  it('ignores invalid history states and timestamps', () => {
    expect(
      parseHistorySamples([
        [
          { state: 'unknown', last_changed: '2026-08-05T12:00:00Z' },
          { state: 'unavailable', last_changed: '2026-08-05T12:01:00Z' },
          { state: 'bad', last_changed: '2026-08-05T12:02:00Z' },
          { state: '80', last_changed: 'bad-date' },
        ],
      ]),
    ).toEqual([]);
  });

  it('reduces large history responses', () => {
    const samples = Array.from({ length: 10 }, (_, index) => ({
      timestamp: index,
      value: index,
    }));

    expect(reduceHistorySamples(samples, 4)).toEqual([
      { timestamp: 0, value: 0 },
      { timestamp: 3, value: 3 },
      { timestamp: 6, value: 6 },
      { timestamp: 9, value: 9 },
    ]);
  });
});
