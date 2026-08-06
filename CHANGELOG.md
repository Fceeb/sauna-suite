# Changelog

All notable changes to Sauna Suite will be documented in this file.

The format is based on Keep a Changelog, and this project follows semantic
versioning once releases begin.

## [Unreleased]

No unreleased changes yet.

## [0.1.0-alpha.2]

### Fixed

- Fixed a frozen Home Assistant card picker caused by incorrect custom-card
  metadata.
- Fixed the card-picker metadata type to use `sauna-suite-card` without the
  `custom:` prefix while keeping user-facing YAML as
  `custom:sauna-suite-card`.
- Fixed duplicate custom-element registration so loading the bundle twice no
  longer throws.

### Alpha Notes

- This is alpha software and may change before a stable release.
- No automatic temperature regulation is implemented.
- No RGB light signaling or audio alarm support is implemented yet.
- No PV or battery optimization is implemented yet.

## [0.1.0-alpha.1]

### Added

- First HACS-installable Dashboard alpha release.
- Multi-zone temperature monitoring for top, middle and bottom sauna sensors.
- Optional outside temperature display.
- Control-temperature display modes for direct zone, average, weighted average,
  minimum and maximum values.
- Manual main switch control for `switch` and `input_boolean` entities.
- Confirmation before manually switching on the configured sauna power entity.
- Manual target-temperature adjustment for `number` and `input_number`
  entities.
- Temperature progress and localized status display.
- Direct-sensor Recorder trend for top, middle and bottom control modes.
- Visual editor for card configuration.
- German and English translations.

### Alpha Notes

- This is alpha software and may change before a stable release.
- No automatic temperature regulation is implemented.
- No RGB light signaling or audio alarm support is implemented yet.
- No PV or battery optimization is implemented yet.
- This release remains manual monitoring/display only and does not control sauna
  equipment automatically.
