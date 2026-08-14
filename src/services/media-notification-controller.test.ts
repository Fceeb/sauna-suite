import { describe, expect, it, vi } from 'vitest';

import { normalizeConfig } from './card-config';
import {
  MediaNotificationController,
  renderMediaNotificationMessage,
} from './media-notification-controller';
import type { HassEntity, HomeAssistant } from '../models/home-assistant';

describe('media notification controller', () => {
  it('does nothing when media notifications are disabled', async () => {
    const callService = vi.fn();
    const result = await new MediaNotificationController().notify({
      hass: hass(callService),
      config: normalizeConfig({ media_notification_enabled: false }),
      mediaPlayer: mediaPlayer(),
      eventId: 1,
      context: {},
    });

    expect(result.active).toBe(false);
    expect(callService).not.toHaveBeenCalled();
  });

  it('plays a TTS notification through tts.speak', async () => {
    const callService = vi.fn().mockResolvedValue(undefined);

    await new MediaNotificationController().notify({
      hass: hass(callService),
      config: normalizeConfig({
        media_notification_enabled: true,
        media_player_entity: 'media_player.sauna',
        tts_entity: 'tts.piper',
        media_notification_message: 'Ready {temperature}',
      }),
      mediaPlayer: mediaPlayer(),
      eventId: 1,
      context: { temperature: 80 },
    });

    expect(callService).toHaveBeenCalledWith('media_player', 'volume_set', {
      entity_id: 'media_player.sauna',
      volume_level: 0.5,
    });
    expect(callService).toHaveBeenCalledWith('tts', 'speak', {
      entity_id: 'tts.piper',
      media_player_entity_id: 'media_player.sauna',
      message: 'Ready 80.0',
    });
  });

  it('plays a configured media source', async () => {
    const callService = vi.fn().mockResolvedValue(undefined);

    await new MediaNotificationController().notify({
      hass: hass(callService),
      config: normalizeConfig({
        media_notification_enabled: true,
        media_notification_mode: 'media',
        media_player_entity: 'media_player.sauna',
        media_notification_media_id: 'media-source://media_source/local/ready.mp3',
      }),
      mediaPlayer: mediaPlayer(),
      eventId: 1,
      context: {},
    });

    expect(callService).toHaveBeenCalledWith('media_player', 'play_media', {
      entity_id: 'media_player.sauna',
      media_content_id: 'media-source://media_source/local/ready.mp3',
      media_content_type: 'music',
    });
  });

  it('stops playback and restores volume on acknowledgement', async () => {
    const callService = vi.fn().mockResolvedValue(undefined);
    const controller = new MediaNotificationController();
    const config = normalizeConfig({
      media_notification_enabled: true,
      media_player_entity: 'media_player.sauna',
      tts_entity: 'tts.piper',
      media_notification_volume: 0.8,
    });

    await controller.notify({
      hass: hass(callService),
      config,
      mediaPlayer: mediaPlayer({ volume_level: 0.25 }),
      eventId: 5,
      context: {},
    });
    await controller.stop({ hass: hass(callService), config, eventId: 5 });

    expect(callService).toHaveBeenCalledWith('media_player', 'media_stop', {
      entity_id: 'media_player.sauna',
    });
    const volumeCalls = callService.mock.calls.filter(
      ([domain, service]) => domain === 'media_player' && service === 'volume_set',
    );

    expect(volumeCalls.at(-1)).toEqual([
      'media_player',
      'volume_set',
      {
        entity_id: 'media_player.sauna',
        volume_level: 0.25,
      },
    ]);
  });

  it('preserves the original volume across repeat notifications for the same event', async () => {
    const callService = vi.fn().mockResolvedValue(undefined);
    const controller = new MediaNotificationController();
    const config = normalizeConfig({
      media_notification_enabled: true,
      media_player_entity: 'media_player.sauna',
      tts_entity: 'tts.piper',
      media_notification_volume: 0.8,
    });

    await controller.notify({
      hass: hass(callService),
      config,
      mediaPlayer: mediaPlayer({ volume_level: 0.25 }),
      eventId: 5,
      context: {},
    });
    await controller.notify({
      hass: hass(callService),
      config,
      mediaPlayer: mediaPlayer({ volume_level: 0.8 }),
      eventId: 5,
      context: {},
    });
    await controller.stop({ hass: hass(callService), config, eventId: 5 });

    const volumeCalls = callService.mock.calls.filter(
      ([domain, service]) => domain === 'media_player' && service === 'volume_set',
    );

    expect(volumeCalls.at(-1)).toEqual([
      'media_player',
      'volume_set',
      {
        entity_id: 'media_player.sauna',
        volume_level: 0.25,
      },
    ]);
  });

  it('does not call media_stop when no playback started for the current event', async () => {
    const callService = vi.fn().mockResolvedValue(undefined);
    const controller = new MediaNotificationController();
    const config = normalizeConfig({
      media_notification_enabled: true,
      media_player_entity: 'media_player.sauna',
      tts_entity: 'tts.piper',
    });

    await controller.stop({ hass: hass(callService), config, eventId: 9 });

    expect(callService).not.toHaveBeenCalledWith('media_player', 'media_stop', expect.anything());
  });

  it('fails independently for unavailable media players', async () => {
    const result = await new MediaNotificationController().notify({
      hass: hass(vi.fn()),
      config: normalizeConfig({
        media_notification_enabled: true,
        media_player_entity: 'media_player.sauna',
      }),
      mediaPlayer: mediaPlayer({}, 'unavailable'),
      eventId: 1,
      context: {},
    });

    expect(result.ok).toBe(false);
  });

  it('renders documented placeholders only', () => {
    expect(
      renderMediaNotificationMessage('Temp {temperature}, target {target}, {unknown}', {
        temperature: 79.5,
        target: 80,
      }),
    ).toBe('Temp 79.5, target 80.0, {unknown}');
  });
});

function hass(callService: NonNullable<HomeAssistant['callService']>): HomeAssistant {
  return {
    states: {},
    callService,
  };
}

function mediaPlayer(attributes: Record<string, unknown> = {}, state = 'idle'): HassEntity {
  return {
    entity_id: 'media_player.sauna',
    state,
    attributes,
    last_changed: '2026-08-14T10:00:00Z',
    last_updated: '2026-08-14T10:00:00Z',
  };
}
