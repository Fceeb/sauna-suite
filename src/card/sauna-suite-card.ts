import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import {
  calculateTemperatureProgress,
  getTemperatureStatusColors,
} from '../core/temperature-progress';
import { CARD_TAG, EDITOR_TAG } from '../models/constants';
import type { SaunaSuiteCardConfig } from '../models/card-config';
import type { HassEntity, HomeAssistant } from '../models/home-assistant';
import { normalizeConfig } from '../services/card-config';
import {
  getTargetNumberRange,
  isSupportedSwitchEntity,
  isSupportedTargetNumberEntity,
  isUnavailableEntity,
  setSwitchState,
  setTargetTemperatureValue,
  type TargetNumberRange,
} from '../services/entity-control';
import {
  fetchTemperatureHistory,
  type TemperatureHistorySample,
} from '../services/temperature-history';
import { buildSaunaTemperatureState, getEntity } from '../services/temperature-state';
import { cardStyles } from '../styles/card-styles';
import { translate } from '../translations/translator';

@customElement(CARD_TAG)
export class SaunaSuiteCard extends LitElement {
  public static override styles = cardStyles;

  @property({ attribute: false })
  public hass?: HomeAssistant;

  @state()
  private config = normalizeConfig({});

  @state()
  private switchPending = false;

  @state()
  private targetPending = false;

  @state()
  private serviceError?: string | undefined;

  @state()
  private historySamples: TemperatureHistorySample[] = [];

  @state()
  private historyLoading = false;

  private historyRefreshTimer?: number | undefined;
  private targetDebounceTimer?: number | undefined;
  private lastHistoryFetchKey?: string | undefined;

  public setConfig(config: Partial<SaunaSuiteCardConfig>): void {
    this.config = normalizeConfig(config);
    this.resetHistorySchedule();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.clearHistoryTimer();
    this.clearTargetDebounceTimer();
  }

  public getCardSize(): number {
    return 6;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement(EDITOR_TAG);
  }

  public static getStubConfig(): SaunaSuiteCardConfig {
    return normalizeConfig({});
  }

  protected override updated(): void {
    this.scheduleHistoryRefresh();
  }

  protected override render(): TemplateResult {
    const temperatureState = buildSaunaTemperatureState(this.hass, this.config);
    const progress = calculateTemperatureProgress(
      temperatureState.summary.controlTemperature,
      temperatureState.targetTemperature,
      {
        nearTargetThreshold: this.config.near_target_threshold,
        targetReachedTolerance: this.config.target_reached_tolerance,
        aboveTargetThreshold: this.config.above_target_threshold,
      },
    );
    const statusColors = getTemperatureStatusColors(progress.status);
    const switchEntity = getEntity(this.hass, this.config.main_switch_entity);
    const targetEntity = getEntity(this.hass, this.config.target_temperature_entity);

    return html`
      <ha-card>
        <div class="content">
          <header class="header">
            <div>
              <div class="title">${this.config.name}</div>
              <div class="state">${this.getSwitchStateLabel(switchEntity)}</div>
            </div>
            ${this.renderPowerButton(switchEntity)}
          </header>

          <main class="main">
            <section class="hero-temperature" aria-label=${this.t('card.controlTemperature')}>
              <div class="label">${this.t('card.controlTemperature')}</div>
              <div class=${this.valueClass(temperatureState.summary.controlTemperature)}>
                ${this.formatTemperature(temperatureState.summary.controlTemperature)}
              </div>
              <div class="progress-track" aria-hidden="true">
                <div
                  class="progress-bar"
                  style=${`width: ${Math.round(progress.progress * 100)}%; background: linear-gradient(90deg, ${statusColors.fill}, ${statusColors.line});`}
                ></div>
              </div>
              <div class="status-line">${this.t(`status.${progress.status}`)}</div>
              ${
                progress.difference !== undefined
                  ? html`<div class="status-line">
                      ${this.t('card.targetDifference')}:
                      ${this.formatTemperatureDelta(progress.difference)}
                    </div>`
                  : undefined
              }
              ${this.serviceError ? html`<div class="error" role="alert">${this.serviceError}</div>` : undefined}
            </section>

            ${this.renderTargetControl(targetEntity)}
          </main>

          <section class="grid" aria-label=${this.t('card.temperatureZones')}>
            ${
              this.config.show_temperature_zones
                ? html`
                    ${this.renderMetric('card.topTemperature', temperatureState.zones.top)}
                    ${this.renderMetric('card.middleTemperature', temperatureState.zones.middle)}
                    ${this.renderMetric('card.bottomTemperature', temperatureState.zones.bottom)}
                  `
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
          </section>

          ${
            this.config.show_temperature_trend
              ? html`
                  <section class="trend-panel" aria-label=${this.t('card.temperatureTrend')}>
                    <div class="label">${this.t('card.temperatureTrend')}</div>
                    <sauna-suite-temperature-trend
                      .samples=${this.historySamples}
                      .status=${progress.status}
                      empty-label=${
                        this.historyLoading
                          ? this.t('card.trendLoading')
                          : this.t('card.trendUnavailable')
                      }
                    ></sauna-suite-temperature-trend>
                  </section>
                `
              : undefined
          }
        </div>
      </ha-card>
    `;
  }

  private renderPowerButton(entity: HassEntity | undefined): TemplateResult {
    const disabled =
      this.switchPending ||
      !isSupportedSwitchEntity(this.config.main_switch_entity) ||
      isUnavailableEntity(entity);
    const isOn = entity?.state === 'on';

    return html`
      <button
        class=${`power-button ${isOn ? 'on' : 'off'}`}
        type="button"
        ?disabled=${disabled}
        aria-label=${this.t('card.togglePower')}
        @click=${this.handlePowerClick}
      >
        ${
          this.switchPending
            ? this.t('card.pending')
            : isOn
              ? this.t('card.powerOn')
              : this.t('card.powerOff')
        }
      </button>
    `;
  }

  private renderTargetControl(entity: HassEntity | undefined): TemplateResult {
    const range = getTargetNumberRange(entity);
    const currentValue = this.getEntityNumber(entity);
    const disabled =
      this.targetPending ||
      !isSupportedTargetNumberEntity(this.config.target_temperature_entity) ||
      isUnavailableEntity(entity) ||
      currentValue === undefined;

    return html`
      <section class="target-control" aria-label=${this.t('card.targetTemperature')}>
        <div class="label">${this.t('card.targetTemperature')}</div>
        <div class=${this.valueClass(currentValue)}>${this.formatTemperature(currentValue)}</div>
        <div class="target-actions">
          <button
            class="step-button"
            type="button"
            ?disabled=${disabled}
            aria-label=${this.t('card.decreaseTarget')}
            @click=${() => this.adjustTargetTemperature(-1)}
          >
            -
          </button>
          <button
            class="step-button"
            type="button"
            ?disabled=${disabled}
            aria-label=${this.t('card.increaseTarget')}
            @click=${() => this.adjustTargetTemperature(1)}
          >
            +
          </button>
        </div>
        ${
          range && currentValue !== undefined
            ? html`
                <input
                  type="range"
                  min=${range.minimum}
                  max=${range.maximum}
                  step=${range.step}
                  .value=${String(currentValue)}
                  ?disabled=${disabled}
                  aria-label=${this.t('card.targetTemperature')}
                  @input=${(event: Event) => this.handleTargetSliderInput(event, range)}
                />
              `
            : html`<div class="status-line">${this.t('card.sliderUnavailable')}</div>`
        }
        ${this.targetPending ? html`<div class="status-line">${this.t('card.pending')}</div>` : undefined}
      </section>
    `;
  }

  private renderMetric(labelKey: string, value: number | undefined): TemplateResult {
    return html`
      <div class="metric">
        <div class="label">${this.t(labelKey)}</div>
        <div class=${this.valueClass(value)}>${this.formatTemperature(value)}</div>
      </div>
    `;
  }

  private async handlePowerClick(): Promise<void> {
    const entity = getEntity(this.hass, this.config.main_switch_entity);

    if (this.switchPending || isUnavailableEntity(entity)) {
      return;
    }

    const shouldTurnOn = entity?.state !== 'on';

    if (
      shouldTurnOn &&
      this.config.confirm_switch_on &&
      !window.confirm(this.t('card.confirmSwitchOn'))
    ) {
      return;
    }

    this.switchPending = true;
    this.serviceError = undefined;

    const result = await setSwitchState(this.hass, this.config.main_switch_entity, shouldTurnOn);

    this.switchPending = false;
    this.serviceError = result.ok ? undefined : result.error;
  }

  private adjustTargetTemperature(direction: -1 | 1): void {
    const entity = getEntity(this.hass, this.config.target_temperature_entity);
    const range = getTargetNumberRange(entity);
    const currentValue = this.getEntityNumber(entity);

    if (!range || currentValue === undefined || this.targetPending) {
      return;
    }

    void this.updateTargetTemperature(currentValue + range.step * direction, range);
  }

  private handleTargetSliderInput(event: Event, range: TargetNumberRange): void {
    const target = event.target as HTMLInputElement;
    const value = Number(target.value);

    if (!Number.isFinite(value)) {
      return;
    }

    this.clearTargetDebounceTimer();
    this.targetDebounceTimer = window.setTimeout(() => {
      void this.updateTargetTemperature(value, range);
    }, 400);
  }

  private async updateTargetTemperature(value: number, range: TargetNumberRange): Promise<void> {
    if (this.targetPending) {
      return;
    }

    this.targetPending = true;
    this.serviceError = undefined;

    const result = await setTargetTemperatureValue(
      this.hass,
      this.config.target_temperature_entity,
      value,
      range,
    );

    this.targetPending = false;
    this.serviceError = result.ok ? undefined : result.error;
  }

  private scheduleHistoryRefresh(): void {
    if (!this.config.show_temperature_trend || !this.hass) {
      this.clearHistoryTimer();
      return;
    }

    const temperatureState = buildSaunaTemperatureState(this.hass, this.config);
    const entityId = this.getTrendEntityId();
    const fetchKey = `${entityId ?? ''}:${this.config.trend_history_minutes}:${this.config.trend_refresh_minutes}`;

    if (!entityId || temperatureState.summary.controlTemperature === undefined) {
      this.historySamples = [];
      this.clearHistoryTimer();
      return;
    }

    if (this.lastHistoryFetchKey !== fetchKey) {
      this.lastHistoryFetchKey = fetchKey;
      void this.loadHistory(entityId);
    }

    if (this.historyRefreshTimer === undefined) {
      this.historyRefreshTimer = window.setInterval(() => {
        void this.loadHistory(entityId);
      }, this.config.trend_refresh_minutes * 60_000);
    }
  }

  private async loadHistory(entityId: string): Promise<void> {
    this.historyLoading = true;
    this.historySamples = await fetchTemperatureHistory(
      this.hass,
      entityId,
      this.config.trend_history_minutes,
    );
    this.historyLoading = false;
  }

  private resetHistorySchedule(): void {
    this.lastHistoryFetchKey = undefined;
    this.clearHistoryTimer();
  }

  private clearHistoryTimer(): void {
    if (this.historyRefreshTimer !== undefined) {
      window.clearInterval(this.historyRefreshTimer);
      this.historyRefreshTimer = undefined;
    }
  }

  private clearTargetDebounceTimer(): void {
    if (this.targetDebounceTimer !== undefined) {
      window.clearTimeout(this.targetDebounceTimer);
      this.targetDebounceTimer = undefined;
    }
  }

  private getTrendEntityId(): string | undefined {
    switch (this.config.control_temperature_mode) {
      case 'top':
        return this.config.temperature_top_entity;
      case 'middle':
        return this.config.temperature_middle_entity;
      case 'bottom':
        return this.config.temperature_bottom_entity;
      default:
        return (
          this.config.temperature_middle_entity ??
          this.config.temperature_top_entity ??
          this.config.temperature_bottom_entity
        );
    }
  }

  private getSwitchStateLabel(entity: HassEntity | undefined): string {
    if (isUnavailableEntity(entity)) {
      return this.t('card.powerUnavailable');
    }

    return entity?.state === 'on' ? this.t('card.powerOn') : this.t('card.powerOff');
  }

  private getEntityNumber(entity: HassEntity | undefined): number | undefined {
    if (!entity || isUnavailableEntity(entity)) {
      return undefined;
    }

    const value = Number(entity.state);
    return Number.isFinite(value) ? value : undefined;
  }

  private valueClass(value: number | undefined): string {
    return value === undefined ? 'metric-value unavailable' : 'metric-value';
  }

  private formatTemperature(value: number | undefined): string {
    return value === undefined ? this.t('card.notAvailable') : `${value.toFixed(1)} degC`;
  }

  private formatTemperatureDelta(value: number): string {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)} degC`;
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
