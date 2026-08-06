// @vitest-environment happy-dom

import { afterEach, describe, expect, it, vi } from 'vitest';

import { CARD_TAG } from '../models/constants';
import type { HassEntity, HomeAssistant } from '../models/home-assistant';
import { cardStyles } from '../styles/card-styles';
import type { TemperatureHistorySample } from '../services/temperature-history';
import { fetchTemperatureHistory } from '../services/temperature-history';
import { SaunaSuiteCard } from './sauna-suite-card';

vi.mock('../services/temperature-history', () => ({
  fetchTemperatureHistory: vi.fn(() => Promise.resolve([])),
}));

describe('SaunaSuiteCard', () => {
  afterEach(() => {
    document.body.replaceChildren();
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  it('renders a card-picker preview with the stub configuration', async () => {
    const card = createCard();

    card.setConfig(SaunaSuiteCard.getStubConfig());
    document.body.append(card);

    await expectUpdateComplete(card);
    expect(card.shadowRoot?.textContent).toContain('Sauna Suite');
  });

  it('renders safely without hass and does not enter an update loop', async () => {
    const card = createCard();

    card.setConfig({ show_temperature_trend: true });
    document.body.append(card);

    await expectUpdateComplete(card);
    expect(fetchTemperatureHistory).not.toHaveBeenCalled();
  });

  it('does not enter an update loop when no trend entity is configured', async () => {
    const card = createCard();

    card.setConfig({ show_temperature_trend: true, control_temperature_mode: 'top' });
    card.hass = createHass();
    document.body.append(card);

    await expectUpdateComplete(card);
    expect(fetchTemperatureHistory).not.toHaveBeenCalled();
  });

  it('keeps existing history samples when unchanged history scheduling is repeated', async () => {
    vi.useFakeTimers();
    const card = createCard();
    const historyApi = card as unknown as HistoryTestApi;
    const historySamples: TemperatureHistorySample[] = [{ timestamp: 1, value: 70 }];

    card.setConfig({
      control_temperature_mode: 'top',
      show_temperature_trend: true,
      temperature_top_entity: 'sensor.sauna_top',
    });
    card.hass = createHass({
      'sensor.sauna_top': createTemperatureEntity('sensor.sauna_top', '70'),
    });
    document.body.append(card);

    await expectUpdateComplete(card);
    historyApi.historySamples = historySamples;
    historyApi.scheduleHistoryRefresh();
    historyApi.scheduleHistoryRefresh();

    expect(historyApi.historySamples).toBe(historySamples);
  });

  it('creates only one refresh interval for unchanged trend inputs', async () => {
    vi.useFakeTimers();
    const setIntervalSpy = vi.spyOn(window, 'setInterval');
    const card = createCard();
    const historyApi = card as unknown as Pick<HistoryTestApi, 'scheduleHistoryRefresh'>;

    card.setConfig({
      control_temperature_mode: 'top',
      show_temperature_trend: true,
      temperature_top_entity: 'sensor.sauna_top',
    });
    card.hass = createHass({
      'sensor.sauna_top': createTemperatureEntity('sensor.sauna_top', '70'),
    });
    document.body.append(card);

    await expectUpdateComplete(card);
    historyApi.scheduleHistoryRefresh();
    historyApi.scheduleHistoryRefresh();

    expect(setIntervalSpy).toHaveBeenCalledTimes(1);
  });

  it('clears the refresh interval when disconnected', async () => {
    vi.useFakeTimers();
    const clearIntervalSpy = vi.spyOn(window, 'clearInterval');
    const card = createCard();

    card.setConfig({
      control_temperature_mode: 'top',
      show_temperature_trend: true,
      temperature_top_entity: 'sensor.sauna_top',
    });
    card.hass = createHass({
      'sensor.sauna_top': createTemperatureEntity('sensor.sauna_top', '70'),
    });
    document.body.append(card);

    await expectUpdateComplete(card);
    card.remove();

    expect(clearIntervalSpy).toHaveBeenCalledTimes(1);
  });

  it('renders one configured sensor without broken compact values', async () => {
    const card = createCard();

    card.setConfig({
      control_temperature_mode: 'top',
      show_temperature_trend: false,
      temperature_top_entity: 'sensor.sauna_top',
    });
    card.hass = createHass({
      'sensor.sauna_top': createTemperatureEntity('sensor.sauna_top', '72.3'),
    });
    document.body.append(card);

    await expectUpdateComplete(card);
    expect(getText(card)).toContain('72.3');
    expect(getText(card)).toContain('Top');
  });

  it('renders three configured temperature zones', async () => {
    const card = createCard();

    card.setConfig({
      control_temperature_mode: 'average',
      show_temperature_trend: false,
      temperature_top_entity: 'sensor.sauna_top',
      temperature_middle_entity: 'sensor.sauna_middle',
      temperature_bottom_entity: 'sensor.sauna_bottom',
    });
    card.hass = createHass({
      'sensor.sauna_top': createTemperatureEntity('sensor.sauna_top', '90'),
      'sensor.sauna_middle': createTemperatureEntity('sensor.sauna_middle', '75'),
      'sensor.sauna_bottom': createTemperatureEntity('sensor.sauna_bottom', '60'),
    });
    document.body.append(card);

    await expectUpdateComplete(card);
    expect(getText(card)).toContain('90.0');
    expect(getText(card)).toContain('75.0');
    expect(getText(card)).toContain('60.0');
  });

  it('shows subdued dash values for unavailable compact temperatures', async () => {
    const card = createCard();

    card.setConfig({
      control_temperature_mode: 'average',
      show_temperature_trend: false,
      temperature_top_entity: 'sensor.sauna_top',
      temperature_middle_entity: 'sensor.sauna_middle',
      temperature_bottom_entity: 'sensor.sauna_bottom',
    });
    card.hass = createHass({
      'sensor.sauna_top': createTemperatureEntity('sensor.sauna_top', 'unavailable'),
      'sensor.sauna_middle': createTemperatureEntity('sensor.sauna_middle', 'unknown'),
      'sensor.sauna_bottom': createTemperatureEntity('sensor.sauna_bottom', 'not-number'),
    });
    document.body.append(card);

    await expectUpdateComplete(card);
    expect(getText(card)).toContain('\u2014');
  });

  it('uses Home Assistant theme variables for light and dark themes', () => {
    const cssText = String(cardStyles);

    expect(cssText).toContain('--ha-card-background');
    expect(cssText).toContain('--primary-text-color');
    expect(cssText).toContain('--secondary-text-color');
    expect(cssText).toContain('--divider-color');
    expect(cssText).toContain('--primary-color');
    expect(cssText).toContain('--accent-color');
  });

  it('keeps manual switch service controls working', async () => {
    const callService = vi.fn().mockResolvedValue(undefined);
    const card = createCard();

    card.setConfig({
      main_switch_entity: 'switch.sauna',
      confirm_switch_on: false,
      show_temperature_trend: false,
    });
    card.hass = createHass(
      {
        'switch.sauna': createSwitchEntity('switch.sauna', 'off'),
      },
      callService,
    );
    document.body.append(card);

    await expectUpdateComplete(card);
    card.shadowRoot?.querySelector<HTMLButtonElement>('.power-button')?.click();
    await Promise.resolve();

    expect(callService).toHaveBeenCalledWith('switch', 'turn_on', {
      entity_id: 'switch.sauna',
    });
  });
});

interface HistoryTestApi {
  historySamples: TemperatureHistorySample[];
  scheduleHistoryRefresh: () => void;
}

async function expectUpdateComplete(card: SaunaSuiteCard): Promise<void> {
  await Promise.race([
    card.updateComplete,
    new Promise((_, reject) => {
      window.setTimeout(() => reject(new Error('Card update did not settle.')), 250);
    }),
  ]);
}

function createCard(): SaunaSuiteCard {
  return document.createElement(CARD_TAG) as SaunaSuiteCard;
}

function getText(card: SaunaSuiteCard): string {
  return card.shadowRoot?.textContent ?? '';
}

function createHass(
  states: Record<string, HassEntity> = {},
  callService = vi.fn().mockResolvedValue(undefined),
): HomeAssistant {
  return {
    language: 'en',
    selectedLanguage: 'en',
    states,
    callService,
    callApi: vi.fn().mockResolvedValue([]),
  };
}

function createTemperatureEntity(entityId: string, state: string): HassEntity {
  return createEntity(entityId, state, {
    device_class: 'temperature',
    unit_of_measurement: 'Â°C',
  });
}

function createSwitchEntity(entityId: string, state: string): HassEntity {
  return createEntity(entityId, state, {});
}

function createEntity(
  entityId: string,
  state: string,
  attributes: Record<string, unknown>,
): HassEntity {
  return {
    entity_id: entityId,
    state,
    attributes,
    last_changed: '2026-08-05T12:00:00Z',
    last_updated: '2026-08-05T12:00:00Z',
  };
}
