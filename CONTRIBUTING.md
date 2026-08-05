# Contributing

Thank you for considering a contribution to Sauna Suite.

## Development Setup

```bash
npm install
npm run lint
npm run typecheck
npm test
npm run build
```

## Code Guidelines

- Use English for code, comments, commits and documentation.
- Keep modules focused and small.
- Avoid unnecessary runtime dependencies.
- Add tests for pure logic.
- Do not add safety-critical control behavior without a dedicated design review.

## Pull Requests

Before opening a pull request, run:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Use the pull request template and describe both the user impact and validation.
