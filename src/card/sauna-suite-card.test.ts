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

  it('loads ETA history from the selected direct sensor mode', async () => {
    const card = createCard();

    card.setConfig({
      control_temperature_mode: 'top',
      show_temperature_trend: false,
      show_eta: true,
      eta_history_minutes: 45,
      temperature_top_entity: 'sensor.sauna_top',
    });
    card.hass = createHass({
      'sensor.sauna_top': createTemperatureEntity('sensor.sauna_top', '70'),
    });
    document.body.append(card);

    await expectUpdateComplete(card);
    expect(fetchTemperatureHistory).toHaveBeenCalledWith(expect.anything(), 'sensor.sauna_top', 45);
  });

  it('does not load ETA history for calculated control modes', async () => {
    const card = createCard();

    card.setConfig({
      control_temperature_mode: 'average',
      show_temperature_trend: false,
      show_eta: true,
      temperature_top_entity: 'sensor.sauna_top',
      temperature_middle_entity: 'sensor.sauna_middle',
      temperature_bottom_entity: 'sensor.sauna_bottom',
    });
    card.hass = createHass({
      'sensor.sauna_top': createTemperatureEntity('sensor.sauna_top', '80'),
      'sensor.sauna_middle': createTemperatureEntity('sensor.sauna_middle', '70'),
      'sensor.sauna_bottom': createTemperatureEntity('sensor.sauna_bottom', '60'),
    });
    document.body.append(card);

    await expectUpdateComplete(card);
    expect(fetchTemperatureHistory).not.toHaveBeenCalled();
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

  it('does not send RGB service calls in card-picker previews without hass', async () => {
    const card = createCard();

    card.setConfig({
      rgb_enabled: true,
      rgb_light_entity: 'light.sauna',
    });
    document.body.append(card);

    await expectUpdateComplete(card);
    expect(fetchTemperatureHistory).not.toHaveBeenCalled();
  });

  it('sends temperature-gradient RGB updates only while sauna is on', async () => {
    const callService = vi.fn().mockResolvedValue(undefined);
    const card = createCard();

    card.setConfig({
      rgb_enabled: true,
      rgb_light_entity: 'light.sauna',
      main_switch_entity: 'switch.sauna',
      temperature_top_entity: 'sensor.sauna_top',
      target_temperature_entity: 'number.sauna_target',
      control_temperature_mode: 'top',
      show_temperature_trend: false,
    });
    card.hass = createHass(
      {
        'switch.sauna': createSwitchEntity('switch.sauna', 'on'),
        'sensor.sauna_top': createTemperatureEntity('sensor.sauna_top', '70'),
        'number.sauna_target': createTemperatureEntity('number.sauna_target', '80'),
        'light.sauna': createLightEntity('light.sauna', 'on', ['rgb']),
      },
      callService,
    );
    document.body.append(card);

    await expectUpdateComplete(card);
    await Promise.resolve();

    expect(callService).toHaveBeenCalledWith(
      'light',
      'turn_on',
      expect.objectContaining({ entity_id: 'light.sauna', rgb_color: expect.any(Array) }),
    );
  });

  it('shows unsupported-light warning without throwing', async () => {
    const card = createCard();

    card.setConfig({
      rgb_enabled: true,
      rgb_light_entity: 'light.sauna',
      main_switch_entity: 'switch.sauna',
      temperature_top_entity: 'sensor.sauna_top',
      target_temperature_entity: 'number.sauna_target',
      control_temperature_mode: 'top',
      show_temperature_trend: false,
    });
    card.hass = createHass({
      'switch.sauna': createSwitchEntity('switch.sauna', 'on'),
      'sensor.sauna_top': createTemperatureEntity('sensor.sauna_top', '70'),
      'number.sauna_target': createTemperatureEntity('number.sauna_target', '80'),
      'light.sauna': createLightEntity('light.sauna', 'on', ['brightness']),
    });
    document.body.append(card);

    await expectUpdateComplete(card);
    await Promise.resolve();
    await expectUpdateComplete(card);

    expect(getText(card)).toContain('Configured light does not support RGB or HS color.');
  });

  it('starts a hold ready signal and acknowledges it', async () => {
    const callService = vi.fn().mockResolvedValue(undefined);
    const card = createCard();

    card.setConfig({
      rgb_enabled: true,
      rgb_mode: 'ready_only',
      rgb_light_entity: 'light.sauna',
      main_switch_entity: 'switch.sauna',
      temperature_top_entity: 'sensor.sauna_top',
      target_temperature_entity: 'number.sauna_target',
      control_temperature_mode: 'top',
      ready_signal_requires_acknowledgement: true,
      show_temperature_trend: false,
    });
    card.hass = createHass(
      {
        'switch.sauna': createSwitchEntity('switch.sauna', 'on'),
        'sensor.sauna_top': createTemperatureEntity('sensor.sauna_top', '80'),
        'number.sauna_target': createTemperatureEntity('number.sauna_target', '80'),
        'light.sauna': createLightEntity('light.sauna', 'on', ['rgb']),
      },
      callService,
    );
    document.body.append(card);

    await expectUpdateComplete(card);
    await Promise.resolve();
    await expectUpdateComplete(card);

    expect(getText(card)).toContain('Acknowledge');
    card.shadowRoot?.querySelector<HTMLButtonElement>('.ack-button')?.click();
    await Promise.resolve();

    expect(callService).toHaveBeenCalledWith('light', 'turn_on', expect.anything());
  });

  it('uses blink and pulse timers without creating orphan intervals', async () => {
    vi.useFakeTimers();
    const clearIntervalSpy = vi.spyOn(window, 'clearInterval');
    const callService = vi.fn().mockResolvedValue(undefined);
    const card = createCard();

    card.setConfig({
      rgb_enabled: true,
      rgb_mode: 'ready_only',
      rgb_light_entity: 'light.sauna',
      main_switch_entity: 'switch.sauna',
      temperature_top_entity: 'sensor.sauna_top',
      target_temperature_entity: 'number.sauna_target',
      control_temperature_mode: 'top',
      ready_signal_mode: 'blink',
      ready_signal_interval_seconds: 1,
      show_temperature_trend: false,
    });
    card.hass = createHass(
      {
        'switch.sauna': createSwitchEntity('switch.sauna', 'on'),
        'sensor.sauna_top': createTemperatureEntity('sensor.sauna_top', '80'),
        'number.sauna_target': createTemperatureEntity('number.sauna_target', '80'),
        'light.sauna': createLightEntity('light.sauna', 'on', ['rgb']),
      },
      callService,
    );
    document.body.append(card);

    await expectUpdateComplete(card);
    await vi.advanceTimersByTimeAsync(1000);

    expect(callService).toHaveBeenCalledWith('light', 'turn_off', { entity_id: 'light.sauna' });

    card.remove();
    expect(clearIntervalSpy).toHaveBeenCalled();
  });

  it('pulses the ready signal by lowering brightness on timer ticks', async () => {
    vi.useFakeTimers();
    const callService = vi.fn().mockResolvedValue(undefined);
    const card = createCard();

    card.setConfig({
      rgb_enabled: true,
      rgb_mode: 'ready_only',
      rgb_light_entity: 'light.sauna',
      main_switch_entity: 'switch.sauna',
      temperature_top_entity: 'sensor.sauna_top',
      target_temperature_entity: 'number.sauna_target',
      control_temperature_mode: 'top',
      ready_signal_mode: 'pulse',
      ready_signal_brightness: 80,
      ready_signal_interval_seconds: 1,
      show_temperature_trend: false,
    });
    card.hass = createHass(
      {
        'switch.sauna': createSwitchEntity('switch.sauna', 'on'),
        'sensor.sauna_top': createTemperatureEntity('sensor.sauna_top', '80'),
        'number.sauna_target': createTemperatureEntity('number.sauna_target', '80'),
        'light.sauna': createLightEntity('light.sauna', 'on', ['rgb']),
      },
      callService,
    );
    document.body.append(card);

    await expectUpdateComplete(card);
    await vi.advanceTimersByTimeAsync(1000);

    expect(callService).toHaveBeenCalledWith(
      'light',
      'turn_on',
      expect.objectContaining({ brightness_pct: 28 }),
    );
  });

  it('restores the previous RGB light before controlling a newly configured light', async () => {
    const callService = vi.fn().mockResolvedValue(undefined);
    const card = createCard();

    card.hass = createHass(
      {
        'switch.sauna': createSwitchEntity('switch.sauna', 'on'),
        'sensor.sauna_top': createTemperatureEntity('sensor.sauna_top', '70'),
        'number.sauna_target': createTemperatureEntity('number.sauna_target', '80'),
        'light.sauna_a': createLightEntity('light.sauna_a', 'on', ['rgb'], {
          brightness: 80,
          rgb_color: [10, 20, 30],
        }),
        'light.sauna_b': createLightEntity('light.sauna_b', 'on', ['rgb']),
      },
      callService,
    );
    card.setConfig({
      rgb_enabled: true,
      rgb_light_entity: 'light.sauna_a',
      main_switch_entity: 'switch.sauna',
      temperature_top_entity: 'sensor.sauna_top',
      target_temperature_entity: 'number.sauna_target',
      control_temperature_mode: 'top',
      show_temperature_trend: false,
    });
    document.body.append(card);

    await expectUpdateComplete(card);
    await Promise.resolve();

    card.setConfig({
      rgb_enabled: true,
      rgb_light_entity: 'light.sauna_b',
      main_switch_entity: 'switch.sauna',
      temperature_top_entity: 'sensor.sauna_top',
      target_temperature_entity: 'number.sauna_target',
      control_temperature_mode: 'top',
      show_temperature_trend: false,
    });
    await expectUpdateComplete(card);
    await Promise.resolve();

    expect(callService.mock.calls[1]).toEqual([
      'light',
      'turn_on',
      {
        entity_id: 'light.sauna_a',
        brightness: 80,
        rgb_color: [10, 20, 30],
      },
    ]);
    expect(callService.mock.calls[2]).toEqual([
      'light',
      'turn_on',
      expect.objectContaining({ entity_id: 'light.sauna_b' }),
    ]);
  });

  it('plays a media TTS notification from the shared ready event', async () => {
    const callService = vi.fn().mockResolvedValue(undefined);
    const card = createCard();

    card.setConfig({
      media_notification_enabled: true,
      media_player_entity: 'media_player.sauna',
      tts_entity: 'tts.piper',
      main_switch_entity: 'switch.sauna',
      temperature_top_entity: 'sensor.sauna_top',
      target_temperature_entity: 'number.sauna_target',
      control_temperature_mode: 'top',
      show_temperature_trend: false,
    });
    card.hass = createHass(
      {
        'switch.sauna': createSwitchEntity('switch.sauna', 'on'),
        'sensor.sauna_top': createTemperatureEntity('sensor.sauna_top', '80'),
        'number.sauna_target': createTemperatureEntity('number.sauna_target', '80'),
        'media_player.sauna': createMediaPlayerEntity('media_player.sauna', 'idle'),
        'tts.piper': createEntity('tts.piper', 'idle', {}),
      },
      callService,
    );
    document.body.append(card);

    await expectUpdateComplete(card);
    await Promise.resolve();

    expect(callService).toHaveBeenCalledWith('tts', 'speak', expect.anything());
    expect(getText(card)).toContain('Ready notification');
  });

  it('card acknowledgement stops both RGB and media channels', async () => {
    const callService = vi.fn().mockResolvedValue(undefined);
    const card = createCard();

    card.setConfig({
      rgb_enabled: true,
      rgb_mode: 'ready_only',
      rgb_light_entity: 'light.sauna',
      media_notification_enabled: true,
      media_player_entity: 'media_player.sauna',
      tts_entity: 'tts.piper',
      main_switch_entity: 'switch.sauna',
      temperature_top_entity: 'sensor.sauna_top',
      target_temperature_entity: 'number.sauna_target',
      control_temperature_mode: 'top',
      show_temperature_trend: false,
    });
    card.hass = createHass(
      {
        'switch.sauna': createSwitchEntity('switch.sauna', 'on'),
        'sensor.sauna_top': createTemperatureEntity('sensor.sauna_top', '80'),
        'number.sauna_target': createTemperatureEntity('number.sauna_target', '80'),
        'light.sauna': createLightEntity('light.sauna', 'on', ['rgb']),
        'media_player.sauna': createMediaPlayerEntity('media_player.sauna', 'idle'),
        'tts.piper': createEntity('tts.piper', 'idle', {}),
      },
      callService,
    );
    document.body.append(card);

    await expectUpdateComplete(card);
    await Promise.resolve();
    await expectUpdateComplete(card);
    card.shadowRoot?.querySelector<HTMLButtonElement>('.ack-button')?.click();
    await Promise.resolve();

    expect(callService).toHaveBeenCalledWith('media_player', 'media_stop', {
      entity_id: 'media_player.sauna',
    });
    expect(callService).toHaveBeenCalledWith('light', 'turn_on', expect.anything());
  });

  it('entity acknowledgement resets an input_boolean after the current ready event starts', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-08-14T10:00:00Z'));
    const callService = vi.fn().mockResolvedValue(undefined);
    const card = createCard();

    card.setConfig({
      acknowledgement_mode: 'entity_only',
      acknowledgement_entity: 'input_boolean.sauna_ack',
      acknowledgement_reset_input_boolean: true,
      media_notification_enabled: true,
      media_player_entity: 'media_player.sauna',
      tts_entity: 'tts.piper',
      main_switch_entity: 'switch.sauna',
      temperature_top_entity: 'sensor.sauna_top',
      target_temperature_entity: 'number.sauna_target',
      control_temperature_mode: 'top',
      show_temperature_trend: false,
    });
    card.hass = createHass(
      {
        'switch.sauna': createSwitchEntity('switch.sauna', 'on'),
        'sensor.sauna_top': createTemperatureEntity('sensor.sauna_top', '80'),
        'number.sauna_target': createTemperatureEntity('number.sauna_target', '80'),
        'media_player.sauna': createMediaPlayerEntity('media_player.sauna', 'idle'),
        'tts.piper': createEntity('tts.piper', 'idle', {}),
        'input_boolean.sauna_ack': createEntity('input_boolean.sauna_ack', 'off', {}),
      },
      callService,
    );
    document.body.append(card);

    await expectUpdateComplete(card);
    await Promise.resolve();
    vi.setSystemTime(new Date('2026-08-14T10:01:00Z'));
    card.hass = createHass(
      {
        ...card.hass.states,
        'input_boolean.sauna_ack': createEntity(
          'input_boolean.sauna_ack',
          'on',
          {},
          '2026-08-14T10:01:00Z',
        ),
      },
      callService,
    );
    await expectUpdateComplete(card);
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    expect(callService).toHaveBeenCalledWith('input_boolean', 'turn_off', {
      entity_id: 'input_boolean.sauna_ack',
    });
  });

  it('renders energy intelligence without sending service calls', async () => {
    const callService = vi.fn().mockResolvedValue(undefined);
    const card = createCard();

    card.setConfig({
      energy_intelligence_enabled: true,
      planned_sauna_enabled: true,
      planned_sauna_time: '19:00',
      pv_power_entity: 'sensor.pv_power',
      battery_soc_entity: 'sensor.battery_soc',
      battery_capacity_kwh: 10,
      battery_minimum_reserve_percent: 20,
      sauna_rated_power_kw: 9,
      temperature_top_entity: 'sensor.sauna_top',
      target_temperature_entity: 'number.sauna_target',
      control_temperature_mode: 'top',
      show_temperature_trend: false,
      rgb_enabled: false,
      media_notification_enabled: false,
    });
    card.hass = createHass(
      {
        'sensor.sauna_top': createTemperatureEntity('sensor.sauna_top', '50'),
        'number.sauna_target': createTemperatureEntity('number.sauna_target', '80'),
        'sensor.pv_power': createPowerEntity('sensor.pv_power', '6000', 'W'),
        'sensor.battery_soc': createEntity('sensor.battery_soc', '80', {
          device_class: 'battery',
          unit_of_measurement: '%',
        }),
      },
      callService,
    );
    document.body.append(card);

    await expectUpdateComplete(card);

    expect(getText(card)).toContain('Energy Intelligence');
    expect(getText(card)).toContain('PV');
    expect(getText(card)).toContain('Battery after');
    expect(callService).not.toHaveBeenCalled();
  });

  it('renders energy intelligence safely without hass in previews', async () => {
    const card = createCard();

    card.setConfig({
      energy_intelligence_enabled: true,
      planned_sauna_enabled: true,
      show_temperature_trend: false,
    });
    document.body.append(card);

    await expectUpdateComplete(card);

    expect(getText(card)).toContain('Energy Intelligence');
    expect(fetchTemperatureHistory).not.toHaveBeenCalled();
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
    unit_of_measurement: '°C',
  });
}

function createSwitchEntity(entityId: string, state: string): HassEntity {
  return createEntity(entityId, state, {});
}

function createLightEntity(
  entityId: string,
  state: string,
  supportedColorModes: string[],
  extraAttributes: Record<string, unknown> = {},
): HassEntity {
  return createEntity(entityId, state, {
    friendly_name: 'Sauna RGB',
    supported_color_modes: supportedColorModes,
    ...extraAttributes,
  });
}

function createMediaPlayerEntity(entityId: string, state: string): HassEntity {
  return createEntity(entityId, state, {
    friendly_name: 'Sauna HomePod',
    volume_level: 0.25,
  });
}

function createPowerEntity(entityId: string, state: string, unit: string): HassEntity {
  return createEntity(entityId, state, {
    device_class: 'power',
    unit_of_measurement: unit,
  });
}

function createEntity(
  entityId: string,
  state: string,
  attributes: Record<string, unknown>,
  changedAt = '2026-08-05T12:00:00Z',
): HassEntity {
  return {
    entity_id: entityId,
    state,
    attributes,
    last_changed: changedAt,
    last_updated: changedAt,
  };
}
