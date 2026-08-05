import { CARD_TYPE } from './constants';

export interface SaunaSuiteCardConfig {
  type: typeof CARD_TYPE;
  name?: string;
}
