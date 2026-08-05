# Architecture

Sauna Suite is organized as a small TypeScript library that builds to one
Lovelace resource bundle.

## Source Layout

```text
src/
  card/           Lovelace card web component
  editor/         Visual editor web component
  core/           Pure domain calculations
  models/         Shared TypeScript interfaces
  services/       Home Assistant-facing state and configuration helpers
  styles/         Lit CSS modules
  translations/   German and English UI strings
  utils/          Small pure utility functions
```

## Entry Point

`src/index.ts` imports the card and editor modules and registers the card
metadata expected by Home Assistant.

## Card Layer

The card layer owns rendering only. It displays configured temperature zones,
the selected control temperature, the target temperature when configured, the
outside temperature when enabled and temperature stratification when top and
bottom sensors are available.

The card layer must not contain heater switching, temperature regulation,
battery optimization, alarm acknowledgement or other safety-sensitive workflows.

## Editor Layer

The editor layer emits `config-changed` events using the Home Assistant
Lovelace editor convention. It uses Home Assistant form selectors for entity,
dropdown, number and boolean fields so all settings can be configured visually.

## Core Layer

`src/core/temperature.ts` contains pure temperature logic:

- parse valid numeric temperature states
- ignore `unknown`, `unavailable` and non-numeric states
- calculate simple averages, weighted averages, minimum and maximum values
- select the configured control temperature
- calculate stratification as top temperature minus bottom temperature

Weighted averages only use available sensors and normalize active weights
automatically. Negative weights are handled safely by treating them as zero.

## Service Layer

`src/services/card-config.ts` normalizes user configuration and applies safe
defaults. `src/services/temperature-state.ts` adapts Home Assistant entity
states into the pure temperature model.

## Build Output

Vite builds the production bundle to:

```text
dist/sauna-suite.js
```

Releases will publish the HACS-ready asset as:

```text
sauna-suite.js
```
