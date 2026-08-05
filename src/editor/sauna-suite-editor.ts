import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { CONTROL_TEMPERATURE_MODES, type SaunaSuiteCardConfig } from '../models/card-config';
import { EDITOR_TAG } from '../models/constants';
import type { HomeAssistant } from '../models/home-assistant';
import { normalizeConfig } from '../services/card-config';
import { editorStyles } from '../styles/editor-styles';
import { translate } from '../translations/translator';

interface HaFormSchema {
  name: keyof SaunaSuiteCardConfig;
  label: string;
  selector: Record<string, unknown>;
}

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
        <ha-form
          .hass=${this.hass}
          .data=${this.config}
          .schema=${this.schema}
          .computeLabel=${this.computeLabel}
          @value-changed=${this.handleValueChanged}
        ></ha-form>
      </div>
    `;
  }

  private get schema(): HaFormSchema[] {
    const schema: HaFormSchema[] = [
      this.textField('name', 'editor.cardName'),
      this.entityField('main_switch_entity', 'editor.mainSwitchEntity', [
        { domain: 'switch' },
        { domain: 'input_boolean' },
      ]),
      this.temperatureSensorField('temperature_top_entity', 'editor.temperatureTopEntity'),
      this.temperatureSensorField('temperature_middle_entity', 'editor.temperatureMiddleEntity'),
      this.temperatureSensorField('temperature_bottom_entity', 'editor.temperatureBottomEntity'),
      this.entityField('outside_temperature_entity', 'editor.outsideTemperatureEntity', [
        { domain: 'sensor', device_class: 'temperature' },
      ]),
      this.entityField('target_temperature_entity', 'editor.targetTemperatureEntity', [
        { domain: 'number' },
        { domain: 'input_number' },
      ]),
      {
        name: 'control_temperature_mode',
        label: this.t('editor.controlTemperatureMode'),
        selector: {
          select: {
            mode: 'dropdown',
            options: CONTROL_TEMPERATURE_MODES.map((mode) => ({
              value: mode,
              label: this.t(`modes.${mode}`),
            })),
          },
        },
      },
    ];

    if (this.config.control_temperature_mode === 'weighted_average') {
      schema.push(
        this.numberField('weight_top', 'editor.weightTop'),
        this.numberField('weight_middle', 'editor.weightMiddle'),
        this.numberField('weight_bottom', 'editor.weightBottom'),
      );
    }

    schema.push(
      this.booleanField('show_outside_temperature', 'editor.showOutsideTemperature'),
      this.booleanField('show_temperature_zones', 'editor.showTemperatureZones'),
    );

    return schema;
  }

  private readonly computeLabel = (schema: HaFormSchema): string => schema.label;

  private handleValueChanged(event: CustomEvent<{ value: Partial<SaunaSuiteCardConfig> }>): void {
    this.updateConfig(event.detail.value);
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

  private textField(name: keyof SaunaSuiteCardConfig, labelKey: string): HaFormSchema {
    return {
      name,
      label: this.t(labelKey),
      selector: {
        text: {},
      },
    };
  }

  private temperatureSensorField(name: keyof SaunaSuiteCardConfig, labelKey: string): HaFormSchema {
    return this.entityField(name, labelKey, [{ domain: 'sensor', device_class: 'temperature' }]);
  }

  private entityField(
    name: keyof SaunaSuiteCardConfig,
    labelKey: string,
    filter: Record<string, string>[],
  ): HaFormSchema {
    return {
      name,
      label: this.t(labelKey),
      selector: {
        entity: {
          filter,
        },
      },
    };
  }

  private numberField(name: keyof SaunaSuiteCardConfig, labelKey: string): HaFormSchema {
    return {
      name,
      label: this.t(labelKey),
      selector: {
        number: {
          min: 0,
          mode: 'box',
          step: 0.1,
        },
      },
    };
  }

  private booleanField(name: keyof SaunaSuiteCardConfig, labelKey: string): HaFormSchema {
    return {
      name,
      label: this.t(labelKey),
      selector: {
        boolean: {},
      },
    };
  }

  private t(key: string): string {
    return translate(this.hass?.selectedLanguage ?? this.hass?.language, key);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [EDITOR_TAG]: SaunaSuiteEditor;
  }
}
