# Changelog

All notable changes to Sauna Suite will be documented in this file.

The format is based on Keep a Changelog, and this project follows semantic
versioning once releases begin.

## [Unreleased]

No unreleased changes yet.

## [0.2.0-alpha.1]

### Changed

- Redesigned the Sauna Suite card with a compact premium layout, including a clearer header, stronger control-temperature hero section, compact zone tiles, polished manual power control and responsive target-temperature controls.
- Refined the Recorder trend panel with status-colored line styling, a subtle gradient fill and an optional target-temperature reference line.
- Improved the visual editor layout with grouped collapsible sections and conditional trend timing fields.
- Updated the repository preview image to reflect the redesigned card.

### Alpha Notes

- This is alpha software and may change before a stable release.
- This release redesigns the interface only and does not add automatic sauna regulation.
- No RGB light signaling or audio alarm support is implemented yet.
- No PV or battery optimization is implemented yet.

## [0.1.0-alpha.3]

### Fixed

- Fixed a frozen Home Assistant **By card** picker caused by an infinite Lit
  preview render loop.
- Made Recorder trend scheduling idempotent so unchanged preview or history
  inputs do not replace empty history arrays, recreate timers or refetch before
  the configured refresh interval.
- Prevented card-picker previews without `hass` or configured entities from
  starting Recorder timers or requests.

### Alpha Notes

- This is alpha software and may change before a stable release.
- No automatic temperature regulation is implemented.
- No RGB light signaling or audio alarm support is implemented yet.
- No PV or battery optimization is implemented yet.

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
