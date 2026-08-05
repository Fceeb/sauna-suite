import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import type { SaunaSuiteCardConfig } from '../models/card-config';
import { EDITOR_TAG } from '../models/constants';
import type { HomeAssistant } from '../models/home-assistant';
import { normalizeConfig } from '../services/card-config';
import { editorStyles } from '../styles/editor-styles';

@customElement(EDITOR_TAG)
export class SaunaSuiteEditor extends LitElement {
  public static override styles = editorStyles;

  @property({ attribute: false })
  public hass?: HomeAssistant;

  @state()
  private config = normalizeConfig({});

  public setConfig(config: Partial<SaunaSuiteCardConfig>): void {
    this.config = normalizeConfig(config);
  }

  protected override render(): TemplateResult {
    return html`
      <div class="form">
        <label>
          Card name
          <input .value=${this.config.name ?? ''} @input=${this.handleNameInput} />
        </label>
      </div>
    `;
  }

  private handleNameInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.updateConfig({ name: target.value });
  }

  private updateConfig(configUpdate: Partial<SaunaSuiteCardConfig>): void {
    this.config = normalizeConfig({
      ...this.config,
      ...configUpdate,
    });

    this.dispatchEvent(
      new CustomEvent('config-changed', {
        bubbles: true,
        composed: true,
        detail: {
          config: this.config,
        },
      }),
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [EDITOR_TAG]: SaunaSuiteEditor;
  }
}
