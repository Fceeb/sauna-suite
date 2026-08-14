import type { AcknowledgementMode } from '../models/card-config';
import type { HassEntity } from '../models/home-assistant';

export const ACKNOWLEDGEMENT_ENTITY_DOMAINS = [
  'input_button',
  'button',
  'input_boolean',
  'binary_sensor',
] as const;

export type AcknowledgementEntityDomain = (typeof ACKNOWLEDGEMENT_ENTITY_DOMAINS)[number];

export interface ReadyAcknowledgementEventContext {
  id: number;
  startedAt: number;
  acknowledged: boolean;
}

export interface AcknowledgementDetectionResult {
  acknowledged: boolean;
  reason:
    | 'card'
    | 'entity'
    | 'already_acknowledged'
    | 'mode_disallows'
    | 'unsupported_entity'
    | 'stale_transition'
    | 'missing_entity';
}

export function canAcknowledgeFromCard(mode: AcknowledgementMode, showButton: boolean): boolean {
  return showButton && (mode === 'card_only' || mode === 'card_or_entity');
}

export function canAcknowledgeFromEntity(mode: AcknowledgementMode): boolean {
  return mode === 'entity_only' || mode === 'card_or_entity';
}

export function isSupportedAcknowledgementEntity(entityId: string | undefined): boolean {
  return getAcknowledgementEntityDomain(entityId) !== undefined;
}

export function getAcknowledgementEntityDomain(
  entityId: string | undefined,
): AcknowledgementEntityDomain | undefined {
  const domain = entityId?.split('.')[0];
  return ACKNOWLEDGEMENT_ENTITY_DOMAINS.includes(domain as AcknowledgementEntityDomain)
    ? (domain as AcknowledgementEntityDomain)
    : undefined;
}

export function detectCardAcknowledgement(
  mode: AcknowledgementMode,
  showButton: boolean,
  event: ReadyAcknowledgementEventContext | undefined,
): AcknowledgementDetectionResult {
  if (!event) {
    return { acknowledged: false, reason: 'missing_entity' };
  }

  if (event.acknowledged) {
    return { acknowledged: false, reason: 'already_acknowledged' };
  }

  if (!canAcknowledgeFromCard(mode, showButton)) {
    return { acknowledged: false, reason: 'mode_disallows' };
  }

  return { acknowledged: true, reason: 'card' };
}

export function detectEntityAcknowledgement(
  mode: AcknowledgementMode,
  entityId: string | undefined,
  entity: HassEntity | undefined,
  event: ReadyAcknowledgementEventContext | undefined,
): AcknowledgementDetectionResult {
  if (!event || !entity) {
    return { acknowledged: false, reason: 'missing_entity' };
  }

  if (event.acknowledged) {
    return { acknowledged: false, reason: 'already_acknowledged' };
  }

  if (!canAcknowledgeFromEntity(mode)) {
    return { acknowledged: false, reason: 'mode_disallows' };
  }

  const domain = getAcknowledgementEntityDomain(entityId);
  if (!domain) {
    return { acknowledged: false, reason: 'unsupported_entity' };
  }

  const transitionTime = getEntityTransitionTime(entity);
  if (transitionTime === undefined || transitionTime <= event.startedAt) {
    return { acknowledged: false, reason: 'stale_transition' };
  }

  if (domain === 'input_button' || domain === 'button') {
    return { acknowledged: true, reason: 'entity' };
  }

  if ((domain === 'input_boolean' || domain === 'binary_sensor') && entity.state === 'on') {
    return { acknowledged: true, reason: 'entity' };
  }

  return { acknowledged: false, reason: 'stale_transition' };
}

export function getEntityTransitionTime(entity: HassEntity): number | undefined {
  const timestamp = Date.parse(entity.last_changed || entity.last_updated);
  return Number.isFinite(timestamp) ? timestamp : undefined;
}
