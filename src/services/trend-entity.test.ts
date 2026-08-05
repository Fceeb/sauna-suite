import { describe, expect, it } from 'vitest';

import type { ControlTemperatureMode } from '../models/card-config';
import { normalizeConfig } from './card-config';
import { getTrendEntityId, isDirectControlTemperatureMode } from './trend-entity';

describe('trend entity selection', () => {
  it.each([
    ['top', 'sensor.sauna_top'],
    ['middle', 'sensor.sauna_middle'],
    ['bottom', 'sensor.sauna_bottom'],
  ] satisfies [ControlTemperatureMode, string][])(
    'selects the configured %s entity for direct trend modes',
    (mode, expectedEntityId) => {
      const config = normalizeConfig({
        control_temperature_mode: mode,
        temperature_top_entity: 'sensor.sauna_top',
        temperature_middle_entity: 'sensor.sauna_middle',
        temperature_bottom_entity: 'sensor.sauna_bottom',
      });

      expect(isDirectControlTemperatureMode(mode)).toBe(true);
      expect(getTrendEntityId(config)).toBe(expectedEntityId);
    },
  );

  it.each(['average', 'weighted_average', 'minimum', 'maximum'] satisfies ControlTemperatureMode[])(
    'disables trend entity selection for calculated %s mode',
    (mode) => {
      const config = normalizeConfig({
        control_temperature_mode: mode,
        temperature_top_entity: 'sensor.sauna_top',
        temperature_middle_entity: 'sensor.sauna_middle',
        temperature_bottom_entity: 'sensor.sauna_bottom',
      });

      expect(isDirectControlTemperatureMode(mode)).toBe(false);
      expect(getTrendEntityId(config)).toBeUndefined();
    },
  );
});
