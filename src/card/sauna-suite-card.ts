import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { CARD_TAG, EDITOR_TAG } from '../models/constants';
import type { SaunaSuiteCardConfig } from '../models/card-config';
import type { HomeAssistant } from '../models/home-assistant';
import { normalizeConfig } from '../services/card-config';
import { buildSaunaTemperatureState } from '../services/temperature-state';
import { cardStyles } from '../styles/card-styles';
import { translate } from '../translations/translator';

@customElement(CARD_TAG)
export class SaunaSuiteCard extends LitElement {
  public static override styles = cardStyles;

  @property({ attribute: false })
  public hass?: HomeAssistant;

  @state()
  private config = normalizeConfig({});

  public setConfig(config: Partial<SaunaSuiteCardConfig>): void {
    this.config = normalizeConfig(config);
  }

  public getCardSize(): number {
    return 4;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement(EDITOR_TAG);
  }

  public static getStubConfig(): SaunaSuiteCardConfig {
    return normalizeConfig({});
  }

  protected override render(): TemplateResult {
    const temperatureState = buildSaunaTemperatureState(this.hass, this.config);

    return html`
      <ha-card header=${this.config.name}>
        <div class="content">
          <div class="eyebrow">${this.t('card.earlyDevelopment')}</div>
          <div class="title">${this.t('card.name')}</div>
          <div class="description">${this.t('card.placeholder')}</div>

          <div class="grid">
            ${
              this.config.show_temperature_zones
                ? html`
                    ${this.renderMetric('card.topTemperature', temperatureState.zones.top)}
                    ${this.renderMetric('card.middleTemperature', temperatureState.zones.middle)}
                    ${this.renderMetric('card.bottomTemperature', temperatureState.zones.bottom)}
                  `
                : undefined
            }
            ${this.renderMetric('card.controlTemperature', temperatureState.summary.controlTemperature)}
            ${
              this.config.target_temperature_entity
                ? this.renderMetric('card.targetTemperature', temperatureState.targetTemperature)
                : undefined
            }
            ${
              this.config.show_outside_temperature && this.config.outside_temperature_entity
                ? this.renderMetric('card.outsideTemperature', temperatureState.outsideTemperature)
                : undefined
            }
            ${
              temperatureState.summary.stratification !== undefined
                ? this.renderMetric('card.stratification', temperatureState.summary.stratification)
                : undefined
            }
          </div>
        </div>
      </ha-card>
    `;
  }

  private renderMetric(labelKey: string, value: number | undefined): TemplateResult {
    const isAvailable = value !== undefined;

    return html`
      <div class="metric">
        <div class="metric-label">${this.t(labelKey)}</div>
        <div class=${isAvailable ? 'metric-value' : 'metric-value unavailable'}>
          ${isAvailable ? this.formatTemperature(value) : this.t('card.notAvailable')}
        </div>
      </div>
    `;
  }

  private formatTemperature(value: number): string {
    return `${value.toFixed(1)} °C`;
  }

  private t(key: string): string {
    return translate(this.hass?.selectedLanguage ?? this.hass?.language, key);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [CARD_TAG]: SaunaSuiteCard;
  }
}
