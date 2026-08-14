import { describe, expect, it } from 'vitest';

import {
  acknowledgeReadyNotificationEvent,
  createReadyNotificationEvent,
  getReadyNotificationStatus,
  markNotificationChannel,
  markNotificationFailure,
} from './notification-state';

describe('notification state', () => {
  it('creates one shared ready event with RGB and media channels', () => {
    let event = createReadyNotificationEvent(3, 1000);

    expect(event.id).toBe(3);
    expect(getReadyNotificationStatus(event, false)).toBe('ready');

    event = markNotificationChannel(event, 'rgb', true);
    event = markNotificationChannel(event, 'media', true);

    expect(getReadyNotificationStatus(event, false)).toBe('signaling');
  });

  it('marks acknowledgement for the whole ready event', () => {
    const event = markNotificationChannel(createReadyNotificationEvent(1, 1000), 'media', true);
    const acknowledged = acknowledgeReadyNotificationEvent(event, 2000);

    expect(acknowledged.acknowledged).toBe(true);
    expect(acknowledged.channels.media).toBe(false);
    expect(getReadyNotificationStatus(acknowledged, true)).toBe('acknowledged');
  });

  it('reports independent channel failures', () => {
    expect(
      getReadyNotificationStatus(
        markNotificationFailure(createReadyNotificationEvent(1, 1000), 'media', true),
        false,
      ),
    ).toBe('media_unavailable');
    expect(
      getReadyNotificationStatus(
        markNotificationFailure(createReadyNotificationEvent(1, 1000), 'rgb', true),
        false,
      ),
    ).toBe('rgb_unavailable');
  });
});
