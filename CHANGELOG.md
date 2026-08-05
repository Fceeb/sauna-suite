# Changelog

All notable changes to Sauna Suite will be documented in this file.

The format is based on Keep a Changelog, and this project follows semantic
versioning once releases begin.

## [Unreleased]

### Added

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

- This release remains monitoring/display only and does not control sauna
  equipment.
