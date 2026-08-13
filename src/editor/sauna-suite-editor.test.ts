// @vitest-environment happy-dom

import { afterEach, describe, expect, it } from 'vitest';

import type { SaunaSuiteCardConfig } from '../models/card-config';
import { EDITOR_TAG } from '../models/constants';
import { SaunaSuiteEditor } from './sauna-suite-editor';

describe('SaunaSuiteEditor', () => {
  afterEach(() => {
    document.body.replaceChildren();
  });

  it('shows weight fields only for weighted-average mode', () => {
    const editor = createEditor();

    editor.setConfig({ control_temperature_mode: 'average' });
    expect(getSchemaNames(editor)).not.toContain('weight_top');

    editor.setConfig({ control_temperature_mode: 'weighted_average' });
    expect(getSchemaNames(editor)).toEqual(
      expect.arrayContaining(['weight_top', 'weight_middle', 'weight_bottom']),
    );
  });

  it('shows heating power fields for the selected power mode', () => {
    const editor = createEditor();

    editor.setConfig({ heating_power_mode: 'fixed' });
    expect(getSchemaNames(editor)).toContain('fixed_heater_power_kw');
    expect(getSchemaNames(editor)).not.toContain('general_power_sensor_entity');
    expect(getSchemaNames(editor)).not.toContain('heater_rated_power_kw');

    editor.setConfig({ heating_power_mode: 'general_power_sensor' });
    expect(getSchemaNames(editor)).toEqual(
      expect.arrayContaining(['general_power_sensor_entity', 'heater_rated_power_kw']),
    );
    expect(getSchemaNames(editor)).not.toContain('fixed_heater_power_kw');
  });
  it('shows trend timing fields only when the trend is enabled', () => {
    const editor = createEditor();

    editor.setConfig({ show_temperature_trend: false });
    expect(getSchemaNames(editor)).toContain('show_temperature_trend');
    expect(getSchemaNames(editor)).not.toContain('trend_history_minutes');
    expect(getSchemaNames(editor)).not.toContain('trend_refresh_minutes');

    editor.setConfig({ show_temperature_trend: true });
    expect(getSchemaNames(editor)).toEqual(
      expect.arrayContaining([
        'show_temperature_trend',
        'trend_history_minutes',
        'trend_refresh_minutes',
      ]),
    );
  });

  it('shows RGB fields only when RGB signaling is enabled', () => {
    const editor = createEditor();

    editor.setConfig({ rgb_enabled: false });
    expect(getSchemaNames(editor)).toContain('rgb_enabled');
    expect(getSchemaNames(editor)).not.toContain('rgb_light_entity');

    editor.setConfig({ rgb_enabled: true });
    expect(getSchemaNames(editor)).toEqual(
      expect.arrayContaining(['rgb_light_entity', 'rgb_mode', 'ready_signal_enabled']),
    );
  });

  it('shows RGB and ready-signal conditional sub-fields', () => {
    const editor = createEditor();

    editor.setConfig({
      rgb_enabled: true,
      rgb_mode: 'ready_only',
      ready_signal_enabled: true,
      ready_signal_repeat: false,
    });
    expect(getSchemaNames(editor)).not.toContain('rgb_brightness');
    expect(getSchemaNames(editor)).toContain('ready_signal_mode');
    expect(getSchemaNames(editor)).not.toContain('ready_signal_repeat_interval_seconds');

    editor.setConfig({
      rgb_enabled: true,
      rgb_mode: 'temperature_gradient',
      ready_signal_enabled: true,
      ready_signal_repeat: true,
    });
    expect(getSchemaNames(editor)).toEqual(
      expect.arrayContaining([
        'rgb_brightness',
        'rgb_update_interval_seconds',
        'ready_signal_repeat_interval_seconds',
      ]),
    );
  });
});

interface EditorSectionTestApi {
  sections: {
    schema: { name: keyof SaunaSuiteCardConfig }[];
  }[];
}

function createEditor(): SaunaSuiteEditor {
  void EDITOR_TAG;
  return new SaunaSuiteEditor();
}

function getSchemaNames(editor: SaunaSuiteEditor): (keyof SaunaSuiteCardConfig)[] {
  return (editor as unknown as EditorSectionTestApi).sections.flatMap((section) =>
    section.schema.map((field) => field.name),
  );
}
