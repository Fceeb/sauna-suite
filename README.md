# Sauna Suite

Sauna Suite is an open-source Home Assistant project for a professional,
modular and HACS-compatible sauna dashboard experience.

This repository currently contains a Lovelace custom card named
`custom:sauna-suite-card` with manual controls, multi-zone temperature
monitoring, target-temperature adjustment, a redesigned compact interface and a Recorder-backed trend for direct sensor modes.

![Sauna Suite preview](docs/images/sauna-suite-preview.svg)

## Alpha Status

Version `0.2.0-alpha.1` is the current HACS-installable alpha release. It redesigns the card into a modern, compact dashboard experience without adding automatic equipment control. Expect breaking changes while the dashboard model and editor mature.

This version provides manual user controls and monitoring only. It does not
automatically switch the sauna heater, regulate temperature, run schedules,
control RGB lights, play alarms, calculate ETA or optimize energy, PV or
battery usage.

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

Sauna Suite is installed as a HACS custom repository.

1. Open HACS in Home Assistant.
2. Open the three-dot menu and choose **Custom repositories**.
3. Add this repository URL:

   ```text
   https://github.com/Fceeb/sauna-suite
   ```

4. Select repository type/category **Dashboard**.
5. Install Sauna Suite from HACS.
6. Add the Lovelace resource if Home Assistant does not add it automatically:

   ```text
   /hacsfiles/sauna-suite/sauna-suite.js
   ```

   Resource type:

   ```text
   JavaScript module
   ```

Releases provide the HACS-ready file named `sauna-suite.js`. The `hacs.json`
manifest points HACS to that release asset.

After installation or update, refresh the Home Assistant frontend. A full page
reload is usually enough; if Home Assistant still serves an old file, clear the
browser cache or use a hard refresh.

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

Restarting Home Assistant is usually not required for a Lovelace resource, but
a dashboard reload or frontend refresh is required after replacing the
JavaScript file.

## Card Type

Use this Lovelace card type:

```yaml
type: custom:sauna-suite-card
```

## Basic Configuration Example

All settings can be configured through the visual editor. YAML is optional for
manual setups:

```yaml
type: custom:sauna-suite-card
name: Sauna Suite
main_switch_entity: switch.sauna_main
temperature_top_entity: sensor.sauna_temperature_top
temperature_middle_entity: sensor.sauna_temperature_middle
temperature_bottom_entity: sensor.sauna_temperature_bottom
outside_temperature_entity: sensor.outside_temperature
target_temperature_entity: number.sauna_target_temperature
control_temperature_mode: weighted_average
weight_top: 3
weight_middle: 2
weight_bottom: 1
show_outside_temperature: true
show_temperature_zones: true
near_target_threshold: 5
target_reached_tolerance: 2
show_temperature_trend: true
trend_history_minutes: 120
trend_refresh_minutes: 5
confirm_switch_on: true
```

Supported `control_temperature_mode` values:

- `top`
- `middle`
- `bottom`
- `average`
- `weighted_average`
- `minimum`
- `maximum`

Weighted averages use only sensors with valid numeric states. Missing,
`unavailable`, `unknown` and non-numeric sensor states are ignored instead of
being treated as zero.

## Manual Controls

The power button manually toggles the configured `main_switch_entity`.
Supported domains are `switch` and `input_boolean`.

Switching on requires confirmation by default. Switching off happens directly.
These actions call only:

- `switch.turn_on` / `switch.turn_off`
- `input_boolean.turn_on` / `input_boolean.turn_off`

The target-temperature controls write only to the configured
`target_temperature_entity`. Supported domains are `number` and `input_number`.
The card uses the entity's `min`, `max` and `step` attributes for clamping,
rounding, plus/minus buttons and the optional slider.

The target setting is not used to switch or regulate sauna equipment
automatically.

## Temperature Trend

The redesigned compact trend uses the Home Assistant Recorder history API for recent
temperature samples. In this version, trends are available only when
`control_temperature_mode` is `top`, `middle` or `bottom`, because those modes
map to one physical sensor.

For calculated modes (`average`, `weighted_average`, `minimum` and `maximum`),
the card does not show a single sensor history as if it were the calculated
control-temperature trend. Multi-sensor history aggregation is planned for a
later release.

If Recorder or history is unavailable, the card still works and shows an empty
trend state.

## Troubleshooting

### Custom element does not exist

Confirm the Lovelace resource is registered and points to the installed file:

```text
/hacsfiles/sauna-suite/sauna-suite.js
```

Then refresh the dashboard. If the error remains, update to
`0.1.0-alpha.2` or newer. Alpha.2 fixes incorrect custom-card metadata that
could make the Home Assistant card picker freeze with
`Custom element not found: custom:sauna-suite-card`.

### Card picker freezes

Update to `0.1.0-alpha.3` or newer. Alpha.3 fixes an infinite preview render
loop that could freeze the Home Assistant **By card** picker when the preview
card was created without `hass` or configured trend entities.

### Resource not loaded

Check that HACS installed Sauna Suite as a **Dashboard** custom repository and
that the release asset is named `sauna-suite.js`. The resource type must be
`JavaScript module`.

### Old JavaScript file cached

Use a hard browser refresh, clear the browser cache or open the dashboard in a
private window. Mobile companion apps may also need their frontend cache
refreshed after an update. If the card still shows the older alpha layout after
updating to `0.2.0-alpha.1`, Home Assistant is likely still serving the cached
JavaScript file.

### Duplicate custom-element registration

Update to `0.1.0-alpha.2` or newer if the browser console reports that a custom
element has already been defined. Alpha.2 guards internal custom-element
registration so loading the bundle twice no longer throws.

### Recorder trend unavailable

The trend requires Home Assistant Recorder history for the selected direct
sensor mode (`top`, `middle` or `bottom`). Calculated modes intentionally do not
show a trend yet. If Recorder is disabled, purged or unavailable, the rest of
the card still works.

## Development

```bash
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
```

## License

MIT
