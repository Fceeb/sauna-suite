import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { CARD_TAG, EDITOR_TAG } from '../models/constants';
import type { SaunaSuiteCardConfig } from '../models/card-config';
import type { HomeAssistant } from '../models/home-assistant';
import { normalizeConfig } from '../services/card-config';
import { cardStyles } from '../styles/card-styles';

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
    return 2;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement(EDITOR_TAG);
  }

  public static getStubConfig(): SaunaSuiteCardConfig {
    return normalizeConfig({});
  }

  protected override render(): TemplateResult {
    return html`
      <ha-card header=${this.config.name}>
        <div class="content">
          <div class="eyebrow">Home Assistant custom card</div>
          <div class="title">Sauna Suite</div>
          <div class="description">
            Foundation placeholder. Sauna logic, alarms, control and optimization features are not
            implemented yet.
          </div>
        </div>
      </ha-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [CARD_TAG]: SaunaSuiteCard;
  }
}
