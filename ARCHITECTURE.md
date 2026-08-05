# Architecture

Sauna Suite is organized as a small TypeScript library that builds to one
Lovelace resource bundle.

## Source Layout

```text
src/
  card/           Lovelace card web component
  editor/         Visual editor web component
  core/           Domain calculations and future orchestration
  models/         Shared TypeScript interfaces
  services/       Home Assistant-facing services and registration helpers
  styles/         Lit CSS modules
  translations/   Future UI translations
  utils/          Small pure utility functions
```

## Entry Point

`src/index.ts` imports the card and editor modules and registers the card
metadata expected by Home Assistant.

## Card Layer

The card layer owns rendering only. It must not contain future heater control
logic, battery scheduling logic or alarm acknowledgement workflows.

## Editor Layer

The editor layer emits `config-changed` events using the Home Assistant
Lovelace editor convention. It currently supports only a minimal display name.

## Utility Layer

Pure numeric and temperature helpers are tested with Vitest. Future domain
logic should remain testable without Home Assistant runtime objects.

## Build Output

Vite builds the production bundle to:

```text
dist/sauna-suite.js
```
