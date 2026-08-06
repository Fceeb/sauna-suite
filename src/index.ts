import './components/temperature-trend';
import './card/sauna-suite-card';
import './editor/sauna-suite-editor';

import { registerCustomCard } from './services/custom-card-registry';

registerCustomCard();

export {
  CARD_PICKER_TYPE,
  CARD_TAG,
  CARD_TYPE,
  EDITOR_TAG,
  TEMPERATURE_TREND_TAG,
} from './models/constants';
export type { SaunaSuiteCardConfig } from './models/card-config';
