export type NotificationChannel = 'rgb' | 'media';

export type ReadyNotificationStatus =
  | 'none'
  | 'ready'
  | 'signaling'
  | 'waiting_for_acknowledgement'
  | 'acknowledged'
  | 'media_unavailable'
  | 'rgb_unavailable';

export interface ReadyNotificationEvent {
  id: number;
  startedAt: number;
  active: boolean;
  acknowledged: boolean;
  acknowledgedAt?: number | undefined;
  channels: Record<NotificationChannel, boolean>;
  failures: Partial<Record<NotificationChannel, boolean>>;
}

export function createReadyNotificationEvent(
  id: number,
  startedAt: number,
): ReadyNotificationEvent {
  return {
    id,
    startedAt,
    active: true,
    acknowledged: false,
    channels: {
      rgb: false,
      media: false,
    },
    failures: {},
  };
}

export function acknowledgeReadyNotificationEvent(
  event: ReadyNotificationEvent,
  acknowledgedAt: number,
): ReadyNotificationEvent {
  return {
    ...event,
    active: false,
    acknowledged: true,
    acknowledgedAt,
    channels: {
      rgb: false,
      media: false,
    },
  };
}

export function markNotificationChannel(
  event: ReadyNotificationEvent,
  channel: NotificationChannel,
  active: boolean,
): ReadyNotificationEvent {
  return {
    ...event,
    channels: {
      ...event.channels,
      [channel]: active,
    },
  };
}

export function markNotificationFailure(
  event: ReadyNotificationEvent,
  channel: NotificationChannel,
  failed: boolean,
): ReadyNotificationEvent {
  return {
    ...event,
    failures: {
      ...event.failures,
      [channel]: failed,
    },
  };
}

export function getReadyNotificationStatus(
  event: ReadyNotificationEvent | undefined,
  requiresAcknowledgement: boolean,
): ReadyNotificationStatus {
  if (!event) {
    return 'none';
  }

  if (event.failures.rgb) {
    return 'rgb_unavailable';
  }

  if (event.failures.media) {
    return 'media_unavailable';
  }

  if (event.acknowledged) {
    return 'acknowledged';
  }

  if (requiresAcknowledgement && event.active) {
    return 'waiting_for_acknowledgement';
  }

  if (event.channels.rgb || event.channels.media) {
    return 'signaling';
  }

  return event.active ? 'ready' : 'none';
}
