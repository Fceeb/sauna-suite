import { LitElement, html, svg, type PropertyValues, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';

import {
  calculateTemperatureProgress,
  getTemperatureStatusColors,
  type TemperatureStatus,
} from '../core/temperature-progress';
import type { SaunaSuiteCardConfig } from '../models/card-config';
import { CARD_TAG, EDITOR_TAG } from '../models/constants';
import type { HassEntity, HomeAssistant } from '../models/home-assistant';
import { normalizeConfig } from '../services/card-config';
import { defineCustomElement } from '../services/custom-element-registry';
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
import { getTrendEntityId, isDirectControlTemperatureMode } from '../services/trend-entity';
import { cardStyles } from '../styles/card-styles';
import { translate } from '../translations/translator';

const DEFAULT_TEMPERATURE_UNIT = '°C';
const UNAVAILABLE_COMPACT_VALUE = '—';

interface TemperatureParts {
  value: string;
  unit: string;
  unavailable: boolean;
}

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

  protected override updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('hass') || changedProperties.has('config')) {
      this.scheduleHistoryRefresh();
    }
  }

  protected override render(): TemplateResult {
    const temperatureState = buildSaunaTemperatureState(this.hass, this.config);
    const progress = calculateTemperatureProgress(
      temperatureState.summary.controlTemperature,
      temperatureState.targetTemperature,
      {
        nearTargetThreshold: this.config.near_target_threshold,
        targetReachedTolerance: this.config.target_reached_tolerance,
      },
    );
    const statusColors = getTemperatureStatusColors(progress.status);
    const switchEntity = getEntity(this.hass, this.config.main_switch_entity);
    const targetEntity = getEntity(this.hass, this.config.target_temperature_entity);

    return html`
      <ha-card>
        <div
          class="content"
          style=${`--sauna-status-line: ${statusColors.line}; --sauna-status-fill: ${statusColors.fill};`}
        >
          <header class="header">
            <div class="brand-mark" aria-hidden="true">${this.renderHeatIcon()}</div>
            <div class="header-copy">
              <div class="title">${this.config.name}</div>
              <div class="state">${this.getSwitchStateLabel(switchEntity)}</div>
            </div>
            ${this.renderPowerButton(switchEntity)}
          </header>

          ${this.renderHero(
            temperatureState.summary.controlTemperature,
            temperatureState.targetTemperature,
            progress.status,
            progress.progress,
            progress.difference,
          )}
          ${this.renderTemperatureZones(
            temperatureState.zones.top,
            temperatureState.zones.middle,
            temperatureState.zones.bottom,
            temperatureState.outsideTemperature,
            temperatureState.summary.stratification,
          )}
          ${this.renderTrend(progress.status, temperatureState.targetTemperature)}
          ${this.renderTargetControl(targetEntity)}
        </div>
      </ha-card>
    `;
  }

  private renderHero(
    controlTemperature: number | undefined,
    targetTemperature: number | undefined,
    status: TemperatureStatus,
    progress: number,
    difference: number | undefined,
  ): TemplateResult {
    const controlParts = this.getTemperatureParts(
      controlTemperature,
      this.getControlTemperatureUnit(),
    );
    const targetParts = this.getTemperatureParts(
      targetTemperature,
      this.getTemperatureUnit(this.config.target_temperature_entity),
    );

    return html`
      <section class="hero" aria-label=${this.t('card.controlTemperature')}>
        <div class="hero-main">
          <div>
            <div class="label">${this.t('card.controlTemperature')}</div>
            <div class=${`hero-value ${controlParts.unavailable ? 'unavailable' : ''}`}>
              <span class="hero-number">${controlParts.value}</span>
              <span class="hero-unit">${controlParts.unit}</span>
            </div>
          </div>
          <div class="target-summary" aria-label=${this.t('card.targetTemperature')}>
            <div class="label">${this.t('card.targetTemperature')}</div>
            <div class=${`target-value ${targetParts.unavailable ? 'unavailable' : ''}`}>
              <span>${targetParts.value}</span>
              <small>${targetParts.unit}</small>
            </div>
          </div>
        </div>

        <div class="progress-track" aria-hidden="true">
          <div class="progress-bar" style=${`width: ${Math.round(progress * 100)}%;`}></div>
        </div>

        <div class="hero-meta">
          <span class="status-chip">
            <span class="status-dot" aria-hidden="true"></span>
            ${this.t(`status.${status}`)}
          </span>
          ${
            difference !== undefined
              ? html`<span class="difference">
                  ${this.t('card.targetDifference')}: ${this.formatTemperatureDelta(difference)}
                </span>`
              : undefined
          }
        </div>
        ${this.serviceError ? html`<div class="error" role="alert">${this.serviceError}</div>` : undefined}
      </section>
    `;
  }

  private renderTemperatureZones(
    top: number | undefined,
    middle: number | undefined,
    bottom: number | undefined,
    outside: number | undefined,
    stratification: number | undefined,
  ): TemplateResult | undefined {
    const showZones = this.config.show_temperature_zones;
    const showOutside =
      this.config.show_outside_temperature && this.config.outside_temperature_entity !== undefined;

    if (!showZones && !showOutside && stratification === undefined) {
      return undefined;
    }

    return html`
      <section class="zones" aria-label=${this.t('card.temperatureZones')}>
        ${
          showZones
            ? html`
                <div class="zone-grid">
                  ${this.renderTemperatureTile(
                    'card.topTemperature',
                    top,
                    this.config.temperature_top_entity,
                  )}
                  ${this.renderTemperatureTile(
                    'card.middleTemperature',
                    middle,
                    this.config.temperature_middle_entity,
                  )}
                  ${this.renderTemperatureTile(
                    'card.bottomTemperature',
                    bottom,
                    this.config.temperature_bottom_entity,
                  )}
                </div>
              `
            : undefined
        }
        <div class="secondary-grid">
          ${
            showOutside
              ? this.renderTemperatureTile(
                  'card.outsideTemperature',
                  outside,
                  this.config.outside_temperature_entity,
                  'subtle',
                )
              : undefined
          }
          ${
            stratification !== undefined
              ? this.renderTemperatureTile(
                  'card.stratification',
                  stratification,
                  undefined,
                  'subtle',
                )
              : undefined
          }
        </div>
      </section>
    `;
  }

  private renderTemperatureTile(
    labelKey: string,
    value: number | undefined,
    entityId?: string | undefined,
    variant = 'zone',
  ): TemplateResult {
    const parts = this.getTemperatureParts(value, this.getTemperatureUnit(entityId), true);

    return html`
      <div class=${`temperature-tile ${variant}`}>
        <div class="label">${this.t(labelKey)}</div>
        <div class=${`tile-value ${parts.unavailable ? 'unavailable' : ''}`}>
          <span>${parts.value}</span>
          <small>${parts.unit}</small>
        </div>
      </div>
    `;
  }

  private renderTrend(
    status: TemperatureStatus,
    targetTemperature: number | undefined,
  ): TemplateResult | undefined {
    if (!this.config.show_temperature_trend) {
      return undefined;
    }

    const trendAvailable = isDirectControlTemperatureMode(this.config.control_temperature_mode);

    return html`
      <section class="trend-panel" aria-label=${this.t('card.temperatureTrend')}>
        <div class="section-heading">
          <div>
            <div class="label">${this.t('card.temperatureTrend')}</div>
          </div>
        </div>
        ${
          trendAvailable
            ? html`
                <fceeb-sauna-suite-temperature-trend
                  .samples=${this.historySamples}
                  .status=${status}
                  .targetValue=${targetTemperature}
                  empty-label=${
                    this.historyLoading
                      ? this.t('card.trendLoading')
                      : this.t('card.trendUnavailable')
                  }
                ></fceeb-sauna-suite-temperature-trend>
              `
            : html`<div class="trend-empty">${this.t('card.trendDirectModesOnly')}</div>`
        }
      </section>
    `;
  }

  private renderPowerButton(entity: HassEntity | undefined): TemplateResult {
    const disabled =
      this.switchPending ||
      !isSupportedSwitchEntity(this.config.main_switch_entity) ||
      isUnavailableEntity(entity);
    const isOn = entity?.state === 'on';
    const label = this.switchPending
      ? this.t('card.pending')
      : isOn
        ? this.t('card.powerOn')
        : this.t('card.powerOff');

    return html`
      <button
        class=${`power-button ${isOn ? 'on' : 'off'}`}
        type="button"
        ?disabled=${disabled}
        aria-label=${this.t('card.togglePower')}
        @click=${this.handlePowerClick}
      >
        <span class="power-icon" aria-hidden="true">${this.renderPowerIcon()}</span>
        <span>${label}</span>
      </button>
    `;
  }

  private renderTargetControl(entity: HassEntity | undefined): TemplateResult {
    const range = getTargetNumberRange(entity);
    const currentValue = this.getEntityNumber(entity);
    const currentParts = this.getTemperatureParts(
      currentValue,
      this.getTemperatureUnit(this.config.target_temperature_entity),
    );
    const disabled =
      this.targetPending ||
      !isSupportedTargetNumberEntity(this.config.target_temperature_entity) ||
      isUnavailableEntity(entity) ||
      currentValue === undefined;

    return html`
      <section class="target-control" aria-label=${this.t('card.targetTemperature')}>
        <div class="target-header">
          <div>
            <div class="label">${this.t('card.targetTemperature')}</div>
            <div class=${`target-current ${currentParts.unavailable ? 'unavailable' : ''}`}>
              <span>${currentParts.value}</span>
              <small>${currentParts.unit}</small>
            </div>
          </div>
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

  private renderHeatIcon(): TemplateResult {
    return svg`
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path d="M8 20c-1.5-1.1-2.3-2.5-2.3-4.2 0-1.8.9-3.2 2.6-4.4 1.3-.9 2-2.1 2-3.4 0-1-.3-2-.9-3 2.3.9 3.8 2.7 3.8 5.1 0 1-.2 1.8-.6 2.6.9-.5 1.6-1.2 2.1-2.2 2.1 1.4 3.2 3.2 3.2 5.3 0 1.7-.8 3.1-2.3 4.2" />
        <path d="M9.5 20c-.6-.7-.9-1.5-.9-2.4 0-1.2.6-2.2 1.7-3 .9-.6 1.4-1.4 1.4-2.4 1.5 1 2.2 2.2 2.2 3.7 0 .6-.1 1.1-.4 1.6.5-.2.9-.6 1.3-1.1.7.7 1.1 1.5 1.1 2.4 0 .4-.1.8-.3 1.2" />
      </svg>
    `;
  }

  private renderPowerIcon(): TemplateResult {
    return svg`
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path d="M12 3v8" />
        <path d="M7.1 6.8a7 7 0 1 0 9.8 0" />
      </svg>
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
    if (
      !this.config.show_temperature_trend ||
      !this.hass ||
      !isDirectControlTemperatureMode(this.config.control_temperature_mode)
    ) {
      this.clearHistorySamples();
      this.lastHistoryFetchKey = undefined;
      this.clearHistoryTimer();
      return;
    }

    const entityId = getTrendEntityId(this.config);
    const fetchKey = `${entityId ?? ''}:${this.config.trend_history_minutes}:${this.config.trend_refresh_minutes}`;

    if (!entityId) {
      this.clearHistorySamples();
      this.lastHistoryFetchKey = undefined;
      this.clearHistoryTimer();
      return;
    }

    if (this.lastHistoryFetchKey === fetchKey && this.historyRefreshTimer !== undefined) {
      return;
    }

    if (this.lastHistoryFetchKey !== undefined && this.lastHistoryFetchKey !== fetchKey) {
      this.clearHistoryTimer();
    }

    if (this.historyRefreshTimer === undefined) {
      this.historyRefreshTimer = window.setInterval(() => {
        void this.loadHistory(entityId);
      }, this.config.trend_refresh_minutes * 60_000);
    }

    if (this.lastHistoryFetchKey !== fetchKey) {
      this.lastHistoryFetchKey = fetchKey;
      void this.loadHistory(entityId);
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

  private clearHistorySamples(): void {
    if (this.historySamples.length > 0) {
      this.historySamples = [];
    }
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

  private getControlTemperatureUnit(): string {
    return this.getTemperatureUnit(getTrendEntityId(this.config));
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

  private getTemperatureUnit(entityId: string | undefined): string {
    const unit = getEntity(this.hass, entityId)?.attributes.unit_of_measurement;

    if (typeof unit === 'string' && unit.trim().length > 0) {
      return unit;
    }

    return DEFAULT_TEMPERATURE_UNIT;
  }

  private getTemperatureParts(
    value: number | undefined,
    unit: string,
    compactUnavailable = false,
  ): TemperatureParts {
    return {
      value:
        value === undefined
          ? compactUnavailable
            ? UNAVAILABLE_COMPACT_VALUE
            : UNAVAILABLE_COMPACT_VALUE
          : value.toFixed(1),
      unit: value === undefined ? '' : unit,
      unavailable: value === undefined,
    };
  }

  private formatTemperatureDelta(value: number): string {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)} ${DEFAULT_TEMPERATURE_UNIT}`;
  }

  private t(key: string): string {
    return translate(this.hass?.selectedLanguage ?? this.hass?.language, key);
  }
}

defineCustomElement(customElements, CARD_TAG, SaunaSuiteCard);

declare global {
  interface HTMLElementTagNameMap {
    [CARD_TAG]: SaunaSuiteCard;
  }
}
