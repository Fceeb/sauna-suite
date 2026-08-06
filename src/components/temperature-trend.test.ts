// @vitest-environment happy-dom

import { afterEach, describe, expect, it } from 'vitest';

import { TEMPERATURE_TREND_TAG } from '../models/constants';
import { TemperatureTrend } from './temperature-trend';

describe('TemperatureTrend', () => {
  afterEach(() => {
    document.body.replaceChildren();
  });

  it('renders a compact SVG trend with target, current marker and rate annotation', async () => {
    const trend = createTrend();

    trend.samples = [
      { timestamp: 1, value: 50 },
      { timestamp: 2, value: 65 },
      { timestamp: 3, value: 75 },
    ];
    trend.status = 'heating';
    trend.targetValue = 70;
    trend.currentValue = 75;
    trend.direction = 'heating';
    trend.heatingRateLabel = '+0.40 °C/min';
    document.body.append(trend);

    await trend.updateComplete;

    expect(trend.querySelector('svg.trend')).not.toBeNull();
    expect(trend.querySelector('.trend-line')).not.toBeNull();
    expect(trend.querySelector('.target-reference-line')).not.toBeNull();
    expect(trend.querySelector('.current-value-marker')).not.toBeNull();
    expect(trend.querySelector('.heating-rate-annotation')).not.toBeNull();
  });

  it('omits the target reference line when no target value is available', async () => {
    const trend = createTrend();

    trend.samples = [
      { timestamp: 1, value: 50 },
      { timestamp: 2, value: 65 },
    ];
    document.body.append(trend);

    await trend.updateComplete;

    expect(trend.querySelector('.target-reference-line')).toBeNull();
  });
});

function createTrend(): TemperatureTrend {
  void TEMPERATURE_TREND_TAG;
  return new TemperatureTrend();
}
