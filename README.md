# Sauna Suite

Sauna Suite is an open-source Home Assistant project for a professional,
modular and HACS-compatible sauna dashboard experience.

This repository currently contains the project foundation only. The first
implementation is a minimal Lovelace custom card placeholder named
`custom:sauna-suite-card`.

## Status

Early foundation. No sauna control logic, battery optimization, alarms or
safety-critical behavior is implemented yet.

## Planned Capabilities

- Lovelace custom card
- Visual card editor
- Multiple sauna temperature sensors for top, middle and bottom zones
- Optional outside-temperature sensor
- Weighted temperature calculation
- Intelligent heat-up time estimation
- Optional Home Assistant temperature control
- RGB light signaling
- HomePod or generic media-player alarm with acknowledgement
- Sauna session tracking
- General power sensor in kW
- Fixed sauna-heater rated power
- PV and battery-storage optimization
- Planned sauna sessions
- Analytics and diagnostics

## Installation

HACS support is planned for releases that publish `dist/sauna-suite.js`.

For local development:

```bash
npm install
npm run build
```

The production bundle is written to:

```text
dist/sauna-suite.js
```

## Development

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Card

The placeholder card is registered as:

```yaml
type: custom:sauna-suite-card
name: Sauna Suite
```

## License

MIT
