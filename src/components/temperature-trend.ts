import { LitElement, html, svg, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import type { TemperatureStatus } from '../core/temperature-progress';
import { getTemperatureStatusColors } from '../core/temperature-progress';
import { TEMPERATURE_TREND_TAG } from '../models/constants';
import { defineCustomElement } from '../services/custom-element-registry';
import type { TemperatureHistorySample } from '../services/temperature-history';

const TREND_WIDTH = 240;
const TREND_HEIGHT = 80;
const TREND_PADDING = 8;

type TrendDirection = 'heating' | 'cooling' | 'idle';

export class TemperatureTrend extends LitElement {
  @property({ attribute: false })
  public samples: TemperatureHistorySample[] = [];

  @property()
  public status: TemperatureStatus = 'unavailable';

  @property()
  public direction: TrendDirection = 'idle';

  @property({ attribute: 'empty-label' })
  public emptyLabel = 'No trend data available';

  @property({ attribute: 'target-value', type: Number })
  public targetValue?: number | undefined;

  @property({ attribute: 'current-value', type: Number })
  public currentValue?: number | undefined;

  @property({ attribute: 'heating-rate-label' })
  public heatingRateLabel?: string | undefined;

  protected override createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }

  protected override render(): TemplateResult {
    if (this.samples.length < 2) {
      return html`<div class="trend-empty">${this.emptyLabel}</div>`;
    }

    const lineColor = this.getLineColor();
    const linePath = this.createLinePath();
    const areaPath = this.createAreaPath(linePath);
    const targetReferencePath = this.createTargetReferencePath();
    const currentPoint = this.createCurrentPoint();

    return html`
      <svg
        class=${`trend ${this.direction}`}
        viewBox="0 0 240 80"
        role="img"
        aria-label=${this.emptyLabel}
      >
        <defs>
          <linearGradient id="sauna-suite-trend-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color=${lineColor} stop-opacity="0.24"></stop>
            <stop offset="100%" stop-color=${lineColor} stop-opacity="0.01"></stop>
          </linearGradient>
        </defs>
        ${svg`<path d=${areaPath} fill="url(#sauna-suite-trend-fill)"></path>`}
        ${
          targetReferencePath
            ? svg`<path class="target-reference-line" d=${targetReferencePath} fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 5" stroke-linecap="round"></path>`
            : undefined
        }
        ${svg`<path class="trend-line" d=${linePath} fill="none" stroke=${lineColor} stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>`}
        ${
          currentPoint
            ? svg`<circle class="current-value-marker" cx=${String(currentPoint.x)} cy=${String(currentPoint.y)} r="4.2" fill=${lineColor} stroke="currentColor" stroke-width="1.5"></circle>`
            : undefined
        }
        ${
          this.heatingRateLabel
            ? svg`<text class="heating-rate-annotation" x="232" y="18" text-anchor="end">${this.heatingRateLabel}</text>`
            : undefined
        }
      </svg>
    `;
  }

  private createLinePath(): string {
    return this.samples
      .map((sample, index) => {
        const point = this.mapSampleToPoint(sample, index);
        return `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
      })
      .join(' ');
  }

  private createTargetReferencePath(): string | undefined {
    if (this.targetValue === undefined || !Number.isFinite(this.targetValue)) {
      return undefined;
    }

    const y = this.mapValueToY(this.targetValue);

    return `M ${TREND_PADDING} ${y.toFixed(1)} L ${TREND_WIDTH - TREND_PADDING} ${y.toFixed(1)}`;
  }

  private createCurrentPoint(): { x: number; y: number } | undefined {
    if (this.currentValue === undefined || !Number.isFinite(this.currentValue)) {
      return undefined;
    }

    return {
      x: TREND_WIDTH - TREND_PADDING,
      y: this.mapValueToY(this.currentValue),
    };
  }

  private createAreaPath(linePath: string): string {
    return `${linePath} L ${TREND_WIDTH - TREND_PADDING} ${TREND_HEIGHT - TREND_PADDING / 2} L ${TREND_PADDING} ${TREND_HEIGHT - TREND_PADDING / 2} Z`;
  }

  private mapSampleToPoint(
    sample: TemperatureHistorySample,
    index: number,
  ): { x: number; y: number } {
    const horizontalStep = (TREND_WIDTH - TREND_PADDING * 2) / (this.samples.length - 1);

    return {
      x: TREND_PADDING + index * horizontalStep,
      y: this.mapValueToY(sample.value),
    };
  }

  private mapValueToY(value: number): number {
    const { minimum, range } = this.getValueRange();

    return (
      TREND_HEIGHT -
      TREND_PADDING -
      ((value - minimum) / range) * (TREND_HEIGHT - TREND_PADDING * 2)
    );
  }

  private getValueRange(): { minimum: number; range: number } {
    const values = this.samples.map((sample) => sample.value);

    if (this.targetValue !== undefined && Number.isFinite(this.targetValue)) {
      values.push(this.targetValue);
    }

    if (this.currentValue !== undefined && Number.isFinite(this.currentValue)) {
      values.push(this.currentValue);
    }

    const minimum = Math.min(...values);
    const maximum = Math.max(...values);

    return {
      minimum,
      range: maximum - minimum || 1,
    };
  }

  private getLineColor(): string {
    if (this.direction === 'cooling') {
      return '#4ea3ff';
    }

    return getTemperatureStatusColors(this.status).line;
  }
}

defineCustomElement(customElements, TEMPERATURE_TREND_TAG, TemperatureTrend);

declare global {
  interface HTMLElementTagNameMap {
    [TEMPERATURE_TREND_TAG]: TemperatureTrend;
  }
}
