import { describe, expect, it } from 'vitest';

import {
  canAcknowledgeFromCard,
  createAcknowledgementEntityBaseline,
  detectEntityAcknowledgement,
  isSupportedAcknowledgementEntity,
  updateAcknowledgementEntityBaseline,
} from './acknowledgement';
import type { HassEntity } from '../models/home-assistant';

describe('acknowledgement', () => {
  it('supports card-only, entity-only and card-or-entity modes', () => {
    expect(canAcknowledgeFromCard('card_only', true)).toBe(true);
    expect(canAcknowledgeFromCard('entity_only', true)).toBe(false);
    expect(canAcknowledgeFromCard('card_or_entity', true)).toBe(true);
    expect(canAcknowledgeFromCard('card_or_entity', false)).toBe(false);
  });

  it('accepts only supported acknowledgement entity domains', () => {
    expect(isSupportedAcknowledgementEntity('input_button.sauna_ack')).toBe(true);
    expect(isSupportedAcknowledgementEntity('button.sauna_ack')).toBe(true);
    expect(isSupportedAcknowledgementEntity('input_boolean.sauna_ack')).toBe(true);
    expect(isSupportedAcknowledgementEntity('binary_sensor.sauna_ack')).toBe(true);
    expect(isSupportedAcknowledgementEntity('switch.sauna_ack')).toBe(false);
  });

  it('detects fresh button and input_button transitions after the ready event starts', () => {
    const event = { id: 1, startedAt: Date.parse('2026-08-14T10:00:00Z'), acknowledged: false };

    expect(
      detectEntityAcknowledgement(
        'entity_only',
        'input_button.sauna_ack',
        entity('input_button.sauna_ack', '2026-08-14T10:01:00Z'),
        event,
        createAcknowledgementEntityBaseline(
          'input_button.sauna_ack',
          entity('input_button.sauna_ack', '2026-08-14T09:59:00Z'),
        ),
      ).acknowledged,
    ).toBe(true);
    expect(
      detectEntityAcknowledgement(
        'entity_only',
        'button.sauna_ack',
        entity('button.sauna_ack', '2026-08-14T09:59:00Z'),
        event,
        createAcknowledgementEntityBaseline(
          'button.sauna_ack',
          entity('button.sauna_ack', '2026-08-14T09:59:00Z'),
        ),
      ).acknowledged,
    ).toBe(false);
  });

  it('requires fresh off-to-on style states for input_boolean and binary_sensor', () => {
    const event = { id: 1, startedAt: Date.parse('2026-08-14T10:00:00Z'), acknowledged: false };

    expect(
      detectEntityAcknowledgement(
        'card_or_entity',
        'input_boolean.sauna_ack',
        entity('input_boolean.sauna_ack', '2026-08-14T10:01:00Z', 'on'),
        event,
        createAcknowledgementEntityBaseline(
          'input_boolean.sauna_ack',
          entity('input_boolean.sauna_ack', '2026-08-14T09:59:00Z', 'off'),
        ),
      ).acknowledged,
    ).toBe(true);
    expect(
      detectEntityAcknowledgement(
        'card_or_entity',
        'binary_sensor.sauna_ack',
        entity('binary_sensor.sauna_ack', '2026-08-14T10:01:00Z', 'off'),
        event,
        createAcknowledgementEntityBaseline(
          'binary_sensor.sauna_ack',
          entity('binary_sensor.sauna_ack', '2026-08-14T09:59:00Z', 'off'),
        ),
      ).acknowledged,
    ).toBe(false);
  });

  it('requires button timestamps to advance beyond the ready-event baseline', () => {
    const event = { id: 1, startedAt: Date.parse('2026-08-14T10:00:00Z'), acknowledged: false };
    const inputButtonBaseline = createAcknowledgementEntityBaseline(
      'input_button.sauna_ack',
      entity('input_button.sauna_ack', '2026-08-14T10:00:30Z'),
    );
    const buttonBaseline = createAcknowledgementEntityBaseline(
      'button.sauna_ack',
      entity('button.sauna_ack', '2026-08-14T10:00:30Z'),
    );

    expect(
      detectEntityAcknowledgement(
        'entity_only',
        'input_button.sauna_ack',
        entity('input_button.sauna_ack', '2026-08-14T10:00:30Z'),
        event,
        inputButtonBaseline,
      ).acknowledged,
    ).toBe(false);
    expect(
      detectEntityAcknowledgement(
        'entity_only',
        'input_button.sauna_ack',
        entity('input_button.sauna_ack', '2026-08-14T10:01:00Z'),
        event,
        inputButtonBaseline,
      ).acknowledged,
    ).toBe(true);
    expect(
      detectEntityAcknowledgement(
        'entity_only',
        'button.sauna_ack',
        entity('button.sauna_ack', '2026-08-14T10:00:30Z'),
        event,
        buttonBaseline,
      ).acknowledged,
    ).toBe(false);
    expect(
      detectEntityAcknowledgement(
        'entity_only',
        'button.sauna_ack',
        entity('button.sauna_ack', '2026-08-14T10:01:00Z'),
        event,
        buttonBaseline,
      ).acknowledged,
    ).toBe(true);
  });

  it('requires already-on boolean entities to go off before a fresh on edge', () => {
    const event = { id: 1, startedAt: Date.parse('2026-08-14T10:00:00Z'), acknowledged: false };
    let baseline = createAcknowledgementEntityBaseline(
      'input_boolean.sauna_ack',
      entity('input_boolean.sauna_ack', '2026-08-14T09:59:00Z', 'on'),
    );

    expect(
      detectEntityAcknowledgement(
        'entity_only',
        'input_boolean.sauna_ack',
        entity('input_boolean.sauna_ack', '2026-08-14T10:01:00Z', 'on'),
        event,
        baseline,
      ).acknowledged,
    ).toBe(false);

    baseline = updateAcknowledgementEntityBaseline(
      baseline,
      'input_boolean.sauna_ack',
      entity('input_boolean.sauna_ack', '2026-08-14T10:02:00Z', 'off'),
    );

    expect(
      detectEntityAcknowledgement(
        'entity_only',
        'input_boolean.sauna_ack',
        entity('input_boolean.sauna_ack', '2026-08-14T10:03:00Z', 'on'),
        event,
        baseline,
      ).acknowledged,
    ).toBe(true);

    let binaryBaseline = createAcknowledgementEntityBaseline(
      'binary_sensor.sauna_ack',
      entity('binary_sensor.sauna_ack', '2026-08-14T09:59:00Z', 'on'),
    );

    expect(
      detectEntityAcknowledgement(
        'entity_only',
        'binary_sensor.sauna_ack',
        entity('binary_sensor.sauna_ack', '2026-08-14T10:01:00Z', 'on'),
        event,
        binaryBaseline,
      ).acknowledged,
    ).toBe(false);

    binaryBaseline = updateAcknowledgementEntityBaseline(
      binaryBaseline,
      'binary_sensor.sauna_ack',
      entity('binary_sensor.sauna_ack', '2026-08-14T10:02:00Z', 'off'),
    );

    expect(
      detectEntityAcknowledgement(
        'entity_only',
        'binary_sensor.sauna_ack',
        entity('binary_sensor.sauna_ack', '2026-08-14T10:03:00Z', 'on'),
        event,
        binaryBaseline,
      ).acknowledged,
    ).toBe(true);
  });
});

function entity(entityId: string, changedAt: string, state = 'pressed'): HassEntity {
  return {
    entity_id: entityId,
    state,
    attributes: {},
    last_changed: changedAt,
    last_updated: changedAt,
  };
}
