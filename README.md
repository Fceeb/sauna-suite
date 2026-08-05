# Sauna Suite

Sauna Suite is an open-source Home Assistant project for a professional,
modular and HACS-compatible sauna dashboard experience.

This repository currently contains the project foundation only. The first
implementation is a minimal Lovelace custom card placeholder named
`custom:sauna-suite-card`.

![Sauna Suite preview](docs/images/sauna-suite-preview.svg)

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

### HACS Custom Repository

Sauna Suite is intended to be installed as a HACS custom repository until it is
available through the default HACS repository list.

1. Open HACS in Home Assistant.
2. Open the three-dot menu and choose **Custom repositories**.
3. Add this repository URL:

   ```text
   https://github.com/Fceeb/sauna-suite
   ```

4. Select the repository category **Dashboard**.
5. Install Sauna Suite from HACS.
6. Add the Lovelace resource if Home Assistant does not add it automatically:

   ```text
   /hacsfiles/sauna-suite/sauna-suite.js
   ```

   Resource type:

   ```text
   JavaScript module
   ```

Releases will provide the HACS-ready file named `sauna-suite.js`. The
`hacs.json` manifest points to that release asset.

### Manual Development Installation

For local development:

```bash
npm install
npm run build
```

The development build writes the bundle to:

```text
dist/sauna-suite.js
```

Copy the built file into your Home Assistant `www` directory, for example:

```bash
cp dist/sauna-suite.js /config/www/sauna-suite.js
```

Then add this Lovelace resource:

```text
/local/sauna-suite.js
```

Resource type:

```text
JavaScript module
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
