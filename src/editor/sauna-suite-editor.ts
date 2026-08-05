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
  description?: string;
  selector: Record<string, unknown>;
}

interface EditorSection {
  titleKey: string;
  schema: HaFormSchema[];
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
        ${this.sections.map(
          (section) => html`
            <section class="section">
              <h3>${this.t(section.titleKey)}</h3>
              <ha-form
                .hass=${this.hass}
                .data=${this.config}
                .schema=${section.schema}
                .computeLabel=${this.computeLabel}
                .computeHelper=${this.computeHelper}
                @value-changed=${this.handleValueChanged}
              ></ha-form>
            </section>
          `,
        )}
      </div>
    `;
  }

  private get sections(): EditorSection[] {
    const temperatureCalculationFields = [
      {
        name: 'control_temperature_mode',
        label: this.t('editor.controlTemperatureMode'),
        description: this.t('editor.controlTemperatureModeDescription'),
        selector: {
          select: {
            mode: 'dropdown',
            options: CONTROL_TEMPERATURE_MODES.map((mode) => ({
              value: mode,
              label: this.t(`modes.${mode}`),
            })),
          },
        },
      } satisfies HaFormSchema,
      this.numberField(
        'near_target_threshold',
        'editor.nearTargetThreshold',
        'editor.nearTargetThresholdDescription',
        0,
        50,
        0.5,
      ),
      this.numberField(
        'target_reached_tolerance',
        'editor.targetReachedTolerance',
        'editor.targetReachedToleranceDescription',
        0,
        20,
        0.5,
      ),
      this.numberField(
        'above_target_threshold',
        'editor.aboveTargetThreshold',
        'editor.aboveTargetThresholdDescription',
        0,
        20,
        0.5,
      ),
    ];

    if (this.config.control_temperature_mode === 'weighted_average') {
      temperatureCalculationFields.push(
        this.numberField(
          'weight_top',
          'editor.weightTop',
          'editor.weightTopDescription',
          0,
          10,
          0.1,
        ),
        this.numberField(
          'weight_middle',
          'editor.weightMiddle',
          'editor.weightMiddleDescription',
          0,
          10,
          0.1,
        ),
        this.numberField(
          'weight_bottom',
          'editor.weightBottom',
          'editor.weightBottomDescription',
          0,
          10,
          0.1,
        ),
      );
    }

    return [
      {
        titleKey: 'editor.sections.general',
        schema: [this.textField('name', 'editor.cardName', 'editor.cardNameDescription')],
      },
      {
        titleKey: 'editor.sections.entities',
        schema: [
          this.entityField(
            'main_switch_entity',
            'editor.mainSwitchEntity',
            'editor.mainSwitchEntityDescription',
            [{ domain: 'switch' }, { domain: 'input_boolean' }],
          ),
          this.temperatureSensorField(
            'temperature_top_entity',
            'editor.temperatureTopEntity',
            'editor.temperatureTopEntityDescription',
          ),
          this.temperatureSensorField(
            'temperature_middle_entity',
            'editor.temperatureMiddleEntity',
            'editor.temperatureMiddleEntityDescription',
          ),
          this.temperatureSensorField(
            'temperature_bottom_entity',
            'editor.temperatureBottomEntity',
            'editor.temperatureBottomEntityDescription',
          ),
          this.entityField(
            'outside_temperature_entity',
            'editor.outsideTemperatureEntity',
            'editor.outsideTemperatureEntityDescription',
            [{ domain: 'sensor', device_class: 'temperature' }],
          ),
          this.entityField(
            'target_temperature_entity',
            'editor.targetTemperatureEntity',
            'editor.targetTemperatureEntityDescription',
            [{ domain: 'number' }, { domain: 'input_number' }],
          ),
        ],
      },
      {
        titleKey: 'editor.sections.temperatureCalculation',
        schema: temperatureCalculationFields,
      },
      {
        titleKey: 'editor.sections.display',
        schema: [
          this.booleanField(
            'show_outside_temperature',
            'editor.showOutsideTemperature',
            'editor.showOutsideTemperatureDescription',
          ),
          this.booleanField(
            'show_temperature_zones',
            'editor.showTemperatureZones',
            'editor.showTemperatureZonesDescription',
          ),
        ],
      },
      {
        titleKey: 'editor.sections.trend',
        schema: [
          this.booleanField(
            'show_temperature_trend',
            'editor.showTemperatureTrend',
            'editor.showTemperatureTrendDescription',
          ),
          this.numberField(
            'trend_history_minutes',
            'editor.trendHistoryMinutes',
            'editor.trendHistoryMinutesDescription',
            15,
            1440,
            15,
          ),
          this.numberField(
            'trend_refresh_minutes',
            'editor.trendRefreshMinutes',
            'editor.trendRefreshMinutesDescription',
            1,
            60,
            1,
          ),
        ],
      },
      {
        titleKey: 'editor.sections.safety',
        schema: [
          this.booleanField(
            'confirm_switch_on',
            'editor.confirmSwitchOn',
            'editor.confirmSwitchOnDescription',
          ),
        ],
      },
    ];
  }

  private readonly computeLabel = (schema: HaFormSchema): string => schema.label;
  private readonly computeHelper = (schema: HaFormSchema): string | undefined => schema.description;

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

  private textField(
    name: keyof SaunaSuiteCardConfig,
    labelKey: string,
    descriptionKey: string,
  ): HaFormSchema {
    return {
      name,
      label: this.t(labelKey),
      description: this.t(descriptionKey),
      selector: {
        text: {},
      },
    };
  }

  private temperatureSensorField(
    name: keyof SaunaSuiteCardConfig,
    labelKey: string,
    descriptionKey: string,
  ): HaFormSchema {
    return this.entityField(name, labelKey, descriptionKey, [
      { domain: 'sensor', device_class: 'temperature' },
    ]);
  }

  private entityField(
    name: keyof SaunaSuiteCardConfig,
    labelKey: string,
    descriptionKey: string,
    filter: Record<string, string>[],
  ): HaFormSchema {
    return {
      name,
      label: this.t(labelKey),
      description: this.t(descriptionKey),
      selector: {
        entity: {
          filter,
        },
      },
    };
  }

  private numberField(
    name: keyof SaunaSuiteCardConfig,
    labelKey: string,
    descriptionKey: string,
    minimum: number,
    maximum: number,
    step: number,
  ): HaFormSchema {
    return {
      name,
      label: this.t(labelKey),
      description: this.t(descriptionKey),
      selector: {
        number: {
          min: minimum,
          max: maximum,
          mode: 'box',
          step,
        },
      },
    };
  }

  private booleanField(
    name: keyof SaunaSuiteCardConfig,
    labelKey: string,
    descriptionKey: string,
  ): HaFormSchema {
    return {
      name,
      label: this.t(labelKey),
      description: this.t(descriptionKey),
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
