# Changelog

All notable changes to Sauna Suite will be documented in this file.

The format is based on Keep a Changelog, and this project follows semantic
versioning once releases begin.

## [Unreleased]

### Added

- Manual main switch control for `switch` and `input_boolean` entities.
- Confirmation before manually switching on the configured sauna power entity.
- Manual target-temperature controls for `number` and `input_number` entities.
- Target-temperature clamping and step rounding based on entity attributes.
- Temperature progress model with localized status labels.
- Centralized temperature status color mapping for future reuse.
- Compact SVG trend sourced from Home Assistant Recorder history.
- Visual editor sections for General, Entities, Temperature calculation,
  Display, Trend and Safety and confirmation settings.
- Multi-zone temperature card configuration fields.
- Monitoring-only top, middle, bottom, target and outside temperature display.
- Control-temperature modes for direct zone, average, weighted average, minimum
  and maximum values.
- Temperature stratification display for top minus bottom temperature.
- Home Assistant visual editor selectors for all card settings.
- German and English labels for new card and editor text.
- Tests for temperature modes, invalid states, weights and configuration
  defaults.
- Initial HACS-compatible project foundation.
- Minimal `custom:sauna-suite-card` placeholder card.
- Basic visual editor placeholder.
- Numeric and temperature utility tests.

### Notes

- This release remains manual monitoring/display only and does not control sauna
  equipment automatically.
