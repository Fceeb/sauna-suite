import { describe, expect, it } from 'vitest';

import { CARD_PICKER_TYPE, CARD_TAG, CARD_TYPE } from '../models/constants';
import { CARD_METADATA, registerCustomCard } from './custom-card-registry';

describe('custom card registry', () => {
  it('keeps public YAML and web component types separate', () => {
    expect(CARD_TYPE).toBe('custom:sauna-suite-card');
    expect(CARD_TAG).toBe('sauna-suite-card');
    expect(CARD_PICKER_TYPE).toBe('sauna-suite-card');
  });

  it('uses the unprefixed card picker metadata type', () => {
    expect(CARD_METADATA.type).toBe('sauna-suite-card');
    expect(CARD_METADATA.type).not.toMatch(/^custom:/);
  });

  it('registers customCards metadata idempotently', () => {
    const windowRef = {} as Window;

    registerCustomCard(windowRef);
    registerCustomCard(windowRef);

    expect(windowRef.customCards).toEqual([CARD_METADATA]);
  });

  it('never registers metadata with a custom prefix', () => {
    const windowRef = {} as Window;

    registerCustomCard(windowRef);

    expect(windowRef.customCards?.every((card) => !card.type.startsWith('custom:'))).toBe(true);
  });
});
