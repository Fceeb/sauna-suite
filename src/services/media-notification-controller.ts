import type { SaunaSuiteCardConfig } from '../models/card-config';
import type { HassEntity, HomeAssistant } from '../models/home-assistant';
import { clampValue } from '../utils/number';

export interface MediaNotificationContext {
  temperature?: number | undefined;
  target?: number | undefined;
  eta?: string | undefined;
  readyTime?: string | undefined;
}

export interface MediaNotificationResult {
  ok: boolean;
  active: boolean;
  error?: string | undefined;
}

export class MediaNotificationController {
  private activeEventId?: number | undefined;
  private capturedVolumeEventId?: number | undefined;
  private capturedVolume?: number | undefined;

  public async notify(input: {
    hass: HomeAssistant | undefined;
    config: SaunaSuiteCardConfig;
    mediaPlayer: HassEntity | undefined;
    eventId: number;
    context: MediaNotificationContext;
  }): Promise<MediaNotificationResult> {
    if (!input.config.media_notification_enabled) {
      return { ok: true, active: false };
    }

    if (!input.hass?.callService) {
      return { ok: true, active: false };
    }

    if (!isMediaPlayerEntity(input.config.media_player_entity)) {
      return { ok: false, active: false, error: 'Unsupported media player entity.' };
    }

    if (
      !input.mediaPlayer ||
      input.mediaPlayer.state === 'unavailable' ||
      input.mediaPlayer.state === 'unknown'
    ) {
      return { ok: false, active: false, error: 'Media player unavailable.' };
    }

    this.captureVolumeOnce(input.eventId, input.mediaPlayer);

    try {
      await this.setNotificationVolume(input.hass, input.config);

      if (input.config.media_notification_mode === 'media') {
        await this.playMedia(input.hass, input.config);
      } else {
        await this.speak(input.hass, input.config, input.context);
      }

      this.activeEventId = input.eventId;
      return { ok: true, active: true };
    } catch (error) {
      return {
        ok: false,
        active: false,
        error: error instanceof Error ? error.message : 'Failed to play media notification.',
      };
    }
  }

  public async stop(input: {
    hass: HomeAssistant | undefined;
    config: SaunaSuiteCardConfig;
    eventId: number | undefined;
  }): Promise<MediaNotificationResult> {
    if (!input.hass?.callService || input.eventId === undefined) {
      this.reset();
      return { ok: true, active: false };
    }

    if (this.activeEventId !== input.eventId) {
      return { ok: true, active: false };
    }

    try {
      if (input.config.media_notification_stop_on_acknowledge) {
        await input.hass.callService('media_player', 'media_stop', {
          entity_id: input.config.media_player_entity,
        });
      }

      await this.restoreVolume(input.hass, input.config);
      this.reset();
      return { ok: true, active: false };
    } catch (error) {
      this.reset();
      return {
        ok: false,
        active: false,
        error: error instanceof Error ? error.message : 'Failed to stop media notification.',
      };
    }
  }

  public async restoreVolume(
    hass: HomeAssistant | undefined,
    config: SaunaSuiteCardConfig,
  ): Promise<void> {
    if (
      !config.media_notification_restore_volume ||
      this.capturedVolume === undefined ||
      !hass?.callService ||
      !isMediaPlayerEntity(config.media_player_entity)
    ) {
      return;
    }

    await hass.callService('media_player', 'volume_set', {
      entity_id: config.media_player_entity,
      volume_level: this.capturedVolume,
    });
  }

  public reset(): void {
    this.activeEventId = undefined;
    this.capturedVolumeEventId = undefined;
    this.capturedVolume = undefined;
  }

  private captureVolumeOnce(eventId: number, mediaPlayer: HassEntity): void {
    if (this.capturedVolumeEventId === eventId) {
      return;
    }

    const volume = mediaPlayer.attributes.volume_level;
    this.capturedVolumeEventId = eventId;
    this.capturedVolume =
      typeof volume === 'number' && Number.isFinite(volume) ? volume : undefined;
  }

  private async setNotificationVolume(
    hass: HomeAssistant,
    config: SaunaSuiteCardConfig,
  ): Promise<void> {
    const callService = requireCallService(hass);

    await callService('media_player', 'volume_set', {
      entity_id: config.media_player_entity,
      volume_level: clampValue(config.media_notification_volume, 0, 1),
    });
  }

  private async speak(
    hass: HomeAssistant,
    config: SaunaSuiteCardConfig,
    context: MediaNotificationContext,
  ): Promise<void> {
    if (!isTtsEntity(config.tts_entity)) {
      throw new Error('TTS entity is required for TTS notifications.');
    }

    const callService = requireCallService(hass);

    await callService('tts', 'speak', {
      entity_id: config.tts_entity,
      media_player_entity_id: config.media_player_entity,
      message: renderMediaNotificationMessage(config.media_notification_message, context),
    });
  }

  private async playMedia(hass: HomeAssistant, config: SaunaSuiteCardConfig): Promise<void> {
    if (!config.media_notification_media_id) {
      throw new Error('Media ID is required for media notifications.');
    }

    const callService = requireCallService(hass);

    await callService('media_player', 'play_media', {
      entity_id: config.media_player_entity,
      media_content_id: config.media_notification_media_id,
      media_content_type: 'music',
    });
  }
}

function requireCallService(hass: HomeAssistant): NonNullable<HomeAssistant['callService']> {
  if (!hass.callService) {
    throw new Error('Home Assistant service API is unavailable.');
  }

  return hass.callService;
}

export function isMediaPlayerEntity(entityId: string | undefined): boolean {
  return entityId?.startsWith('media_player.') === true;
}

export function isTtsEntity(entityId: string | undefined): boolean {
  return entityId?.startsWith('tts.') === true;
}

export function renderMediaNotificationMessage(
  template: string,
  context: MediaNotificationContext,
): string {
  const replacements: Record<string, string> = {
    temperature: formatOptional(context.temperature),
    target: formatOptional(context.target),
    eta: context.eta ?? '',
    ready_time: context.readyTime ?? '',
  };

  return template.replace(/\{(temperature|target|eta|ready_time)\}/g, (_, key: string) => {
    return replacements[key] ?? '';
  });
}

function formatOptional(value: number | undefined): string {
  return value === undefined || !Number.isFinite(value) ? '' : value.toFixed(1);
}
