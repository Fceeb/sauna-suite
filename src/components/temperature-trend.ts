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

export class TemperatureTrend extends LitElement {
  @property({ attribute: false })
  public samples: TemperatureHistorySample[] = [];

  @property()
  public status: TemperatureStatus = 'unavailable';

  @property({ attribute: 'empty-label' })
  public emptyLabel = 'No trend data available';

  @property({ attribute: 'target-value', type: Number })
  public targetValue?: number | undefined;

  protected override createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }

  protected override render(): TemplateResult {
    if (this.samples.length < 2) {
      return html`<div class="trend-empty">${this.emptyLabel}</div>`;
    }

    const colors = getTemperatureStatusColors(this.status);
    const linePath = this.createLinePath();
    const areaPath = this.createAreaPath(linePath);
    const targetReferencePath = this.createTargetReferencePath();

    return html`
      <svg class="trend" viewBox="0 0 240 80" role="img" aria-label=${this.emptyLabel}>
        <defs>
          <linearGradient id="sauna-suite-trend-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color=${colors.line} stop-opacity="0.24"></stop>
            <stop offset="100%" stop-color=${colors.line} stop-opacity="0.01"></stop>
          </linearGradient>
        </defs>
        ${svg`<path d=${areaPath} fill="url(#sauna-suite-trend-fill)"></path>`}
        ${
          targetReferencePath
            ? svg`<path class="target-reference-line" d=${targetReferencePath} fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 5" stroke-linecap="round"></path>`
            : undefined
        }
        ${svg`<path class="trend-line" d=${linePath} fill="none" stroke=${colors.line} stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>`}
      </svg>
    `;
  }

  private createLinePath(): string {
    const { minimum, range } = this.getValueRange();
    const horizontalStep = (TREND_WIDTH - TREND_PADDING * 2) / (this.samples.length - 1);

    return this.samples
      .map((sample, index) => {
        const x = TREND_PADDING + index * horizontalStep;
        const y =
          TREND_HEIGHT -
          TREND_PADDING -
          ((sample.value - minimum) / range) * (TREND_HEIGHT - TREND_PADDING * 2);
        return `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  }

  private createTargetReferencePath(): string | undefined {
    if (this.targetValue === undefined || !Number.isFinite(this.targetValue)) {
      return undefined;
    }

    const { minimum, range } = this.getValueRange();
    const y =
      TREND_HEIGHT -
      TREND_PADDING -
      ((this.targetValue - minimum) / range) * (TREND_HEIGHT - TREND_PADDING * 2);

    return `M ${TREND_PADDING} ${y.toFixed(1)} L ${TREND_WIDTH - TREND_PADDING} ${y.toFixed(1)}`;
  }

  private createAreaPath(linePath: string): string {
    return `${linePath} L ${TREND_WIDTH - TREND_PADDING} ${TREND_HEIGHT - TREND_PADDING / 2} L ${TREND_PADDING} ${TREND_HEIGHT - TREND_PADDING / 2} Z`;
  }

  private getValueRange(): { minimum: number; range: number } {
    const values = this.samples.map((sample) => sample.value);

    if (this.targetValue !== undefined && Number.isFinite(this.targetValue)) {
      values.push(this.targetValue);
    }

    const minimum = Math.min(...values);
    const maximum = Math.max(...values);

    return {
      minimum,
      range: maximum - minimum || 1,
    };
  }
}

defineCustomElement(customElements, TEMPERATURE_TREND_TAG, TemperatureTrend);

declare global {
  interface HTMLElementTagNameMap {
    [TEMPERATURE_TREND_TAG]: TemperatureTrend;
  }
}
