import { CARD_PICKER_TYPE } from '../models/constants';
import type { CustomCardMetadata } from '../models/custom-card';

export const CARD_METADATA: CustomCardMetadata = {
  type: CARD_PICKER_TYPE,
  name: 'Sauna Suite',
  description: 'A Home Assistant dashboard card for sauna monitoring and manual controls.',
  preview: true,
};

export function registerCustomCard(windowRef: Window = window): void {
  windowRef.customCards = windowRef.customCards ?? [];

  const alreadyRegistered = windowRef.customCards.some((card) => card.type === CARD_METADATA.type);

  if (!alreadyRegistered) {
    windowRef.customCards.push(CARD_METADATA);
  }
}
