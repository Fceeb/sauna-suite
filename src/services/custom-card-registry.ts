import { CARD_TYPE } from '../models/constants';
import type { CustomCardMetadata } from '../models/custom-card';

const CARD_METADATA: CustomCardMetadata = {
  type: CARD_TYPE,
  name: 'Sauna Suite Card',
  description: 'A placeholder card for the Sauna Suite Home Assistant project.',
  preview: true,
};

export function registerCustomCard(windowRef: Window = window): void {
  windowRef.customCards = windowRef.customCards ?? [];

  const alreadyRegistered = windowRef.customCards.some((card) => card.type === CARD_METADATA.type);

  if (!alreadyRegistered) {
    windowRef.customCards.push(CARD_METADATA);
  }
}
