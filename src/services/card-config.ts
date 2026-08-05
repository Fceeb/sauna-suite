import type { SaunaSuiteCardConfig } from '../models/card-config';
import { CARD_TYPE } from '../models/constants';

export function createDefaultConfig(): SaunaSuiteCardConfig {
  return {
    type: CARD_TYPE,
    name: 'Sauna Suite',
  };
}

export function normalizeConfig(config: Partial<SaunaSuiteCardConfig>): SaunaSuiteCardConfig {
  return {
    ...createDefaultConfig(),
    ...config,
    type: CARD_TYPE,
  };
}
