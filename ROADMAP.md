# Roadmap

## Phase 1: Foundation

- HACS-compatible project layout
- Strict TypeScript setup
- Minimal Lit card and editor
- CI, linting, type checking, tests and build

## Phase 2: Card Configuration

- Sensor entity selectors
- Temperature zone labels
- Basic preview states
- German and English UI strings
- Monitoring-only multi-zone temperature model
- Configurable control-temperature display mode

## Phase 3: Interactive Monitoring Card

- Manual main switch button with confirmation before switching on
- Manual target-temperature adjustment for number and input_number entities
- Temperature status and progress display
- Compact Recorder-backed temperature trend for direct top, middle and bottom
  sensor modes
- No automatic sauna regulation

## Phase 4: Temperature Insights

- Premium heating dashboard hero
- Optional outside-temperature context
- Deterministic heat-up ETA for direct sensor modes
- Fixed heater power and approximate general power sensor support
- Heat-up progress display
- Aggregated history for calculated control-temperature modes

## Phase 5: Sauna Sessions

- Session start, active and finished states
- Session duration tracking
- Diagnostics and history summaries

## Phase 6: Notifications and Light Signaling

- Optional RGB status light for visual-only temperature progress
- Ready-temperature signal with hold, blink and pulse modes
- Runtime-only acknowledgement button for the ready signal
- Optional in-memory restoration of the previous light state
- Unified card and external-entity acknowledgement for one ready event
- Media-player and HomePod-ready notifications through Home Assistant
- Runtime-only acknowledgement state

## Phase 7: Optimization

- Read-only Energy Intelligence for PV, battery, grid and sauna load sensors
- Planned sauna ready time with recommended manual start time
- Estimated PV, battery and grid contribution for a sauna session
- Battery reserve-aware planning estimates
- Deeper power analytics beyond the first ETA estimate
- Aggregated calculated-mode history for ETA and trend
- Future PV and battery-storage optimization after safety review

## Phase 8: Optional Control

- Optional Home Assistant temperature control
- Optional energy optimizer control layer after explicit design review
- Safety review before implementation
- Explicit user confirmation and clear documentation
