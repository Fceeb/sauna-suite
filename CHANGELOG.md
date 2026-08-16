# Changelog

All notable changes to Sauna Suite will be documented in this file.

The format is based on Keep a Changelog, and this project follows semantic
versioning once releases begin.

## [Unreleased]

No unreleased changes yet.

## [0.6.0-alpha.1]

### Added

- Added read-only Energy Intelligence for PV, battery, grid and sauna load sensors.
- Added normalized grid and battery sign-convention configuration.
- Added battery capacity, reserve and usable-energy estimates.
- Added sauna heat-up and approximate session energy estimates.
- Added planned sauna ready time and recommended manual start time.
- Added deterministic PV persistence factor and PV-surplus/battery/grid source split.
- Added explicit home-power semantics for whether the home load sensor includes the sauna load.
- Added qualitative planning confidence and localized deterministic recommendations.
- Added visual-editor fields and German/English translations for all Energy Intelligence settings.

### Alpha Notes

- Energy Intelligence is planning and display only.
- No battery charging, battery discharging, inverter mode, PV curtailment, automatic sauna start or heater regulation is implemented.
- PV contribution is a simple near-term assumption based on current PV power and the configured persistence factor, not a weather forecast.
- Source split estimates are planning assumptions and do not claim precise physical energy routing.

## [0.5.0-alpha.1]

### Added

- Added a unified runtime ready-event acknowledgement model shared by RGB and media notifications.
- Added optional card, entity or card-or-entity acknowledgement modes.
- Added support for acknowledgement entities: `input_button`, `button`, `input_boolean` and `binary_sensor`.
- Added optional media-player ready notifications using standard Home Assistant TTS and media-player services.
- Added TTS message placeholders for `{temperature}`, `{target}`, `{eta}` and `{ready_time}`.
- Added media-player volume setting, optional volume restoration, repeat notifications and best-effort stop on acknowledgement.

### Alpha Notes

- Acknowledgement state is runtime-only and is not persisted.
- Media playback ownership is best-effort because Home Assistant integrations vary.
- This release remains signaling and manual-control only; no automatic sauna regulation is implemented.
- No scheduled starts, PV optimization, battery optimization or session analytics are implemented.

## [0.4.0-alpha.1]

### Added

- Added optional RGB status lighting for one Home Assistant `light` entity.
- Added semantic temperature-progress color mapping for blue/cyan/green/yellow/gold/orange/red states.
- Added a ready-temperature signal with hold, blink and pulse modes.
- Added local runtime acknowledgement for active ready signals.
- Added optional in-memory restoration of the previous light state.
- Added visual-editor fields and German/English translations for RGB and ready-signal settings.

### Alpha Notes

- RGB control is visual signaling only and does not control the sauna heater.
- The selected light may be temporarily controlled by Sauna Suite while RGB signaling is active.
- Acknowledgement state is runtime-only and is not persisted.
- HomePod/audio notifications are not included yet.
- No automatic temperature regulation, PV control or battery optimization is implemented.

## [0.3.0-alpha.1]

### Added

- Added a premium heating dashboard hero with radial progress, localized heating status, ETA, expected ready time, recent heating rate and effective heater power display.
- Added deterministic heat-up ETA calculations based on recent Recorder history for direct top, middle or bottom control sensor modes.
- Added fixed heater power and approximate general power sensor modes with W/kW normalization and rated-power capping.
- Extended the SVG trend with current-value marker, heating-rate annotation and heating/cooling direction styling.
- Added visual-editor fields for ETA, power mode, power sensor and correction settings.

### Alpha Notes

- ETA is an estimate based on recent Recorder history and bounded deterministic corrections.
- General power sensor mode is approximate and does not isolate other household loads.
- This release remains monitoring and manual-control only; no automatic sauna regulation is implemented.
- Calculated average/min/max modes still do not have aggregated Recorder history yet.
- No RGB, audio, PV or battery control is implemented yet.

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
