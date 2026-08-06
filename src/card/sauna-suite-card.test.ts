// @vitest-environment happy-dom

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { CARD_TAG } from '../models/constants';
import type { HassEntity, HomeAssistant } from '../models/home-assistant';
import { fetchTemperatureHistory } from '../services/temperature-history';
import { SaunaSuiteCard } from './sauna-suite-card';

vi.mock('../services/temperature-history', () => ({
  fetchTemperatureHistory: vi.fn(() => new Promise(() => undefined)),
}));

interface SaunaSuiteCardTestApi {
  historySamples: readonly unknown[];
  scheduleHistoryRefresh(): void;
}

const fetchTemperatureHistoryMock = vi.mocked(fetchTemperatureHistory);

describe('SaunaSuiteCard preview history scheduling', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.replaceChildren();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('renders the card-picker stub configuration to updateComplete', async () => {
    const card = createConnectedCard();

    card.setConfig(SaunaSuiteCard.getStubConfig());

    await expectUpdateComplete(card);

    expect(card.shadowRoot?.querySelector('ha-card')).not.toBeNull();
    expect(fetchTemperatureHistoryMock).not.toHaveBeenCalled();
  });

  it('does not enter an update loop without hass', async () => {
    const card = createConnectedCard();
    const cardApi = asTestApi(card);
    const initialHistorySamples = cardApi.historySamples;

    card.setConfig(SaunaSuiteCard.getStubConfig());
    await expectUpdateComplete(card);
    await expectUpdateComplete(card);

    expect(cardApi.historySamples).toBe(initialHistorySamples);
    expect(fetchTemperatureHistoryMock).not.toHaveBeenCalled();
  });

  it('does not enter an update loop when no direct trend entity is configured', async () => {
    const setIntervalSpy = vi.spyOn(window, 'setInterval');
    const card = createConnectedCard();
    const cardApi = asTestApi(card);
    const initialHistorySamples = cardApi.historySamples;

    card.setConfig({
      control_temperature_mode: 'top',
      show_temperature_trend: true,
    });
    card.hass = createHass();

    await expectUpdateComplete(card);
    await expectUpdateComplete(card);

    expect(cardApi.historySamples).toBe(initialHistorySamples);
    expect(setIntervalSpy).not.toHaveBeenCalled();
    expect(fetchTemperatureHistoryMock).not.toHaveBeenCalled();
  });

  it('keeps history samples stable when scheduling unchanged state repeatedly', () => {
    vi.useFakeTimers();
    const setIntervalSpy = vi.spyOn(window, 'setInterval');
    const card = new SaunaSuiteCard();
    const cardApi = asTestApi(card);
    const initialHistorySamples = cardApi.historySamples;

    card.setConfig({
      control_temperature_mode: 'top',
      temperature_top_entity: 'sensor.sauna_top',
      show_temperature_trend: true,
      trend_history_minutes: 120,
      trend_refresh_minutes: 5,
    });
    card.hass = createHass();

    cardApi.scheduleHistoryRefresh();
    cardApi.scheduleHistoryRefresh();

    expect(cardApi.historySamples).toBe(initialHistorySamples);
    expect(fetchTemperatureHistoryMock).toHaveBeenCalledTimes(1);
    expect(setIntervalSpy).toHaveBeenCalledTimes(1);
  });

  it('creates only one refresh interval for unchanged history inputs', () => {
    vi.useFakeTimers();
    const setIntervalSpy = vi.spyOn(window, 'setInterval');
    const card = new SaunaSuiteCard();
    const cardApi = asTestApi(card);

    card.setConfig({
      control_temperature_mode: 'top',
      temperature_top_entity: 'sensor.sauna_top',
      show_temperature_trend: true,
      trend_history_minutes: 120,
      trend_refresh_minutes: 5,
    });
    card.hass = createHass();

    cardApi.scheduleHistoryRefresh();
    cardApi.scheduleHistoryRefresh();
    cardApi.scheduleHistoryRefresh();

    expect(setIntervalSpy).toHaveBeenCalledTimes(1);
    expect(fetchTemperatureHistoryMock).toHaveBeenCalledTimes(1);
  });

  it('clears the refresh interval when disconnected', async () => {
    vi.useFakeTimers();
    const setIntervalSpy = vi.spyOn(window, 'setInterval');
    const clearIntervalSpy = vi.spyOn(window, 'clearInterval');
    const card = createConnectedCard();

    card.setConfig({
      control_temperature_mode: 'top',
      temperature_top_entity: 'sensor.sauna_top',
      show_temperature_trend: true,
    });
    card.hass = createHass();

    await expectUpdateComplete(card);
    card.remove();

    expect(setIntervalSpy).toHaveBeenCalledTimes(1);
    expect(clearIntervalSpy).toHaveBeenCalledTimes(1);
  });

  it('instantiates and renders a card-picker preview safely', async () => {
    const setIntervalSpy = vi.spyOn(window, 'setInterval');
    const card = document.createElement(CARD_TAG) as SaunaSuiteCard;

    card.setConfig(SaunaSuiteCard.getStubConfig());
    document.body.append(card);

    await expectUpdateComplete(card);

    expect(card.getCardSize()).toBeGreaterThan(0);
    expect(card.shadowRoot?.textContent).toContain('Sauna Suite');
    expect(setIntervalSpy).not.toHaveBeenCalled();
    expect(fetchTemperatureHistoryMock).not.toHaveBeenCalled();
  });
});

function createConnectedCard(): SaunaSuiteCard {
  const card = document.createElement(CARD_TAG) as SaunaSuiteCard;
  document.body.append(card);
  return card;
}

function asTestApi(card: SaunaSuiteCard): SaunaSuiteCardTestApi {
  return card as unknown as SaunaSuiteCardTestApi;
}

async function expectUpdateComplete(card: SaunaSuiteCard): Promise<void> {
  await Promise.race([
    card.updateComplete,
    new Promise((_, reject) => {
      window.setTimeout(() => reject(new Error('Timed out waiting for updateComplete')), 100);
    }),
  ]);
}

function createHass(): HomeAssistant {
  return {
    language: 'en',
    selectedLanguage: 'en',
    states: {
      'sensor.sauna_top': createEntity('sensor.sauna_top', '80'),
    },
  };
}

function createEntity(entityId: string, state: string): HassEntity {
  return {
    entity_id: entityId,
    state,
    attributes: {
      device_class: 'temperature',
      unit_of_measurement: '°C',
    },
    last_changed: '2026-08-06T00:00:00.000Z',
    last_updated: '2026-08-06T00:00:00.000Z',
  };
}
