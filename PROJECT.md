# Project

Sauna Suite is intended to become a modular Home Assistant sauna experience
with a professional Lovelace card, visual editor, analytics and optional
automation integrations.

## Current Scope

The current scope is the project foundation:

- TypeScript strict mode
- Lit custom element foundation
- Vite library build
- Vitest unit tests
- ESLint and Prettier
- HACS-compatible metadata
- GitHub issue, pull request and CI templates
- Documentation for contributors and maintainers

## Non-Goals for the Foundation

- No heater control logic
- No battery or PV optimization
- No alarm flow
- No sauna session state machine
- No safety-critical behavior

## Design Principles

- Keep runtime dependencies minimal.
- Keep modules small and purposeful.
- Prefer explicit Home Assistant-facing types at the project boundary.
- Separate UI, models, services, styles and utilities.
- Treat future control features as safety-sensitive and design them separately.
