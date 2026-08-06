# Releasing

This document describes how to prepare and publish a HACS-installable Sauna
Suite Dashboard release.

## Version

Update both `package.json` and `package-lock.json` with npm:

```bash
npm version 0.1.0-alpha.3 --no-git-tag-version
```

Use the next semantic version for later releases. Alpha tags should keep the
same version in the package metadata and the GitHub release tag.

## Tag Format

GitHub release tags use a leading `v`:

```text
v0.1.0-alpha.3
```

## Create The GitHub Release

After the release preparation PR is merged:

1. Open the GitHub repository.
2. Create a new release.
3. Use tag `v0.1.0-alpha.3`.
4. Target the merged `main` branch.
5. Add release notes from `CHANGELOG.md`.
6. Publish the release.

Do not manually attach local build artifacts before publishing. The release
workflow builds the final asset from the tagged source.

## Automated Release Workflow

When a GitHub release is published, `.github/workflows/release.yml`:

1. Checks out the repository.
2. Installs Node.js 20.
3. Runs `npm ci`.
4. Runs formatting, linting, type checking, tests and the production build.
5. Verifies that `dist/sauna-suite.js` exists, is the only JavaScript build
   output and is not empty.
6. Copies the built file to `sauna-suite.js`.
7. Uploads `sauna-suite.js` to the matching GitHub release.

Source maps are not uploaded as release assets.

## Verify The Uploaded Asset

After the workflow finishes:

1. Open the GitHub release.
2. Confirm that `sauna-suite.js` is attached.
3. Confirm that no `.map` file is attached.
4. Download `sauna-suite.js` and confirm it is not empty.
5. Confirm HACS can see the release.

## HACS Consumption

`hacs.json` declares this repository as a Dashboard resource by pointing HACS to
the release asset:

```json
{
  "name": "Sauna Suite",
  "filename": "sauna-suite.js",
  "render_readme": true
}
```

Users add `https://github.com/Fceeb/sauna-suite` as a HACS custom repository
with category **Dashboard**. HACS downloads `sauna-suite.js` from the selected
GitHub release and serves it through:

```text
/hacsfiles/sauna-suite/sauna-suite.js
```
