import { LitElement, html, svg, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import type { TemperatureStatus } from '../core/temperature-progress';
import { getTemperatureStatusColors } from '../core/temperature-progress';
import { TEMPERATURE_TREND_TAG } from '../models/constants';
import { defineCustomElement } from '../services/custom-element-registry';
import type { TemperatureHistorySample } from '../services/temperature-history';

export class TemperatureTrend extends LitElement {
  @property({ attribute: false })
  public samples: TemperatureHistorySample[] = [];

  @property()
  public status: TemperatureStatus = 'unavailable';

  @property({ attribute: 'empty-label' })
  public emptyLabel = 'No trend data available';

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

    return html`
      <svg class="trend" viewBox="0 0 240 80" role="img" aria-label=${this.emptyLabel}>
        <defs>
          <linearGradient id="sauna-suite-trend-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color=${colors.line} stop-opacity="0.28"></stop>
            <stop offset="100%" stop-color=${colors.line} stop-opacity="0.02"></stop>
          </linearGradient>
        </defs>
        ${svg`<path d=${areaPath} fill="url(#sauna-suite-trend-fill)"></path>`}
        ${svg`<path d=${linePath} fill="none" stroke=${colors.line} stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>`}
      </svg>
    `;
  }

  private createLinePath(): string {
    const width = 240;
    const height = 80;
    const padding = 8;
    const values = this.samples.map((sample) => sample.value);
    const minimum = Math.min(...values);
    const maximum = Math.max(...values);
    const range = maximum - minimum || 1;
    const horizontalStep = (width - padding * 2) / (this.samples.length - 1);

    return this.samples
      .map((sample, index) => {
        const x = padding + index * horizontalStep;
        const y = height - padding - ((sample.value - minimum) / range) * (height - padding * 2);
        return `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  }

  private createAreaPath(linePath: string): string {
    return `${linePath} L 232 76 L 8 76 Z`;
  }
}

defineCustomElement(customElements, TEMPERATURE_TREND_TAG, TemperatureTrend);

declare global {
  interface HTMLElementTagNameMap {
    [TEMPERATURE_TREND_TAG]: TemperatureTrend;
  }
}
