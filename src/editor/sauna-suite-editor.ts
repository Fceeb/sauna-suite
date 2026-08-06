import { LitElement, html, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';

import {
  CONTROL_TEMPERATURE_MODES,
  HEATING_POWER_MODES,
  type SaunaSuiteCardConfig,
} from '../models/card-config';
import { EDITOR_TAG } from '../models/constants';
import type { HomeAssistant } from '../models/home-assistant';
import { normalizeConfig } from '../services/card-config';
import { defineCustomElement } from '../services/custom-element-registry';
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
            <details class="section" open>
              <summary>${this.t(section.titleKey)}</summary>
              <ha-form
                .hass=${this.hass}
                .data=${this.config}
                .schema=${section.schema}
                .computeLabel=${this.computeLabel}
                .computeHelper=${this.computeHelper}
                @value-changed=${this.handleValueChanged}
              ></ha-form>
            </details>
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

    const heatingFields: HaFormSchema[] = [
      {
        name: 'heating_power_mode',
        label: this.t('editor.heatingPowerMode'),
        description: this.t('editor.heatingPowerModeDescription'),
        selector: {
          select: {
            mode: 'dropdown',
            options: HEATING_POWER_MODES.map((mode) => ({
              value: mode,
              label: this.t(`heatingPowerModes.${mode}`),
            })),
          },
        },
      },
    ];

    if (this.config.heating_power_mode === 'fixed') {
      heatingFields.push(
        this.numberField(
          'fixed_heater_power_kw',
          'editor.fixedHeaterPowerKw',
          'editor.fixedHeaterPowerKwDescription',
          0,
          50,
          0.1,
        ),
      );
    }

    if (this.config.heating_power_mode === 'general_power_sensor') {
      heatingFields.push(
        this.entityField(
          'general_power_sensor_entity',
          'editor.generalPowerSensorEntity',
          'editor.generalPowerSensorEntityDescription',
          [{ domain: 'sensor', device_class: 'power' }],
        ),
        this.numberField(
          'heater_rated_power_kw',
          'editor.heaterRatedPowerKw',
          'editor.heaterRatedPowerKwDescription',
          0,
          50,
          0.1,
        ),
      );
    }

    heatingFields.push(
      this.numberField(
        'outside_temperature_weight',
        'editor.outsideTemperatureWeight',
        'editor.outsideTemperatureWeightDescription',
        0,
        1,
        0.01,
      ),
      this.booleanField('show_eta', 'editor.showEta', 'editor.showEtaDescription'),
      this.booleanField(
        'show_ready_time',
        'editor.showReadyTime',
        'editor.showReadyTimeDescription',
      ),
      this.booleanField(
        'show_heating_rate',
        'editor.showHeatingRate',
        'editor.showHeatingRateDescription',
      ),
      this.numberField(
        'eta_minimum_samples',
        'editor.etaMinimumSamples',
        'editor.etaMinimumSamplesDescription',
        2,
        60,
        1,
      ),
      this.numberField(
        'eta_history_minutes',
        'editor.etaHistoryMinutes',
        'editor.etaHistoryMinutesDescription',
        5,
        1440,
        5,
      ),
    );

    const trendFields = [
      this.booleanField(
        'show_temperature_trend',
        'editor.showTemperatureTrend',
        'editor.showTemperatureTrendDescription',
      ),
    ];

    if (this.config.show_temperature_trend) {
      trendFields.push(
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
        titleKey: 'editor.sections.heatingEta',
        schema: heatingFields,
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
        schema: trendFields,
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

defineCustomElement(customElements, EDITOR_TAG, SaunaSuiteEditor);

declare global {
  interface HTMLElementTagNameMap {
    [EDITOR_TAG]: SaunaSuiteEditor;
  }
}
