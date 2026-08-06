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

- Media-player alarm support
- Acknowledgement flow
- RGB light signaling

## Phase 7: Optimization

- Deeper power analytics beyond the first ETA estimate
- Aggregated calculated-mode history for ETA and trend
- PV and battery-storage optimization
- Planned sauna sessions

## Phase 8: Optional Control

- Optional Home Assistant temperature control
- Safety review before implementation
- Explicit user confirmation and clear documentation
