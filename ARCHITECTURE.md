# Architecture

Sauna Suite is organized as a small TypeScript library that builds to one
Lovelace resource bundle.

## Source Layout

```text
src/
  card/           Lovelace card web component
  components/     Small reusable Lit components
  editor/         Visual editor web component
  core/           Pure domain calculations
  models/         Shared TypeScript interfaces
  services/       Home Assistant-facing state, service and history helpers
  styles/         Lit CSS modules
  translations/   German and English UI strings
  utils/          Small pure utility functions
```

## Entry Point

`src/index.ts` imports the card, editor and trend component modules and
registers the card metadata expected by Home Assistant.

## Card Layer

The card layer owns rendering and user interaction. It delegates Home Assistant
service calls to `src/services/entity-control.ts`, history loading to
`src/services/temperature-history.ts` and pure calculations to `src/core`.

The card displays:

- current main switch state
- manual power button
- selected control temperature
- target-temperature controls
- zone and outside temperatures
- stratification
- compact Recorder-backed trend

The card layer must not contain automatic heater switching, temperature
regulation, battery optimization, alarm acknowledgement or other
safety-sensitive workflows.

## Editor Layer

The editor layer emits `config-changed` events using the Home Assistant
Lovelace editor convention. It groups settings into General, Entities,
Temperature calculation, Display, Trend and Safety and confirmation sections.

All settings are configurable through the visual editor. YAML editing is not
required.

## Core Layer

`src/core/temperature.ts` contains pure temperature aggregation logic.
`src/core/temperature-progress.ts` contains progress and status classification:

- `unavailable`
- `far_below`
- `heating`
- `near_target`
- `target_reached`
- `above_target`

Status colors are centralized in `temperature-progress.ts` so future RGB light
support can reuse the same semantic mapping without coupling lights to the card
view.

## Service Layer

`src/services/card-config.ts` normalizes user configuration and applies safe
defaults. `src/services/temperature-state.ts` adapts Home Assistant entity
states into the pure temperature model.

`src/services/entity-control.ts` contains manual switch and target-temperature
service calls. Failures return structured errors and are rendered by the card.

`src/services/temperature-history.ts` retrieves recent Recorder history through
the Home Assistant frontend API, parses numeric samples, drops unavailable
states and reduces large responses before rendering.

## Components

`src/components/temperature-trend.ts` renders a small SVG line trend without a
charting-library dependency.

## Build Output

Vite builds the production bundle to:

```text
dist/sauna-suite.js
```

Releases will publish the HACS-ready asset as:

```text
sauna-suite.js
```
