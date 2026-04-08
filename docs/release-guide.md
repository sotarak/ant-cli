# Release Guide

The **Ant CLI** project uses [Changesets](https://github.com/changesets/changesets) for declarative versioning and releasing to npm. 

This guide explains the typical workflow for a maintainer/developer to cut a new release.

## 1. Creating a Changeset (During Development)

Whenever you make a change that users should know about (bug fixes, new features, breaking changes), you should create a changeset file. You can create multiple changesets over time, and they will be batched together when a release happens.

Run the following command at the root of the project:

```bash
npx changeset
```

1. **Select Packages:** You will be prompted to select which package the change affects (usually just `ant-cli`).
2. **Select Issue Type:** 
   - `major` for breaking changes.
   - `minor` for new features.
   - `patch` for bug fixes.
3. **Write a Summary:** Describe the change. This text will be written into the `CHANGELOG.md` upon release.

A `.md` file will be generated in the `.changeset/` folder. **Commit this file** along with the actual code changes into version control.

## 2. Versioning the Release

When you are ready to prepare a new release, you need to consume the accumulated `.changeset` markdown files into actual version bumps and update the `CHANGELOG.md`.

Run the following command:

```bash
npx changeset version
```

This will automatically:
- Read all pending changesets.
- Delete the consumed files from `.changeset/`.
- Bump the version in `package.json`.
- Prepend the release notes to `CHANGELOG.md`.

**Review the changes and commit them:**

```bash
git add package.json CHANGELOG.md
git commit -m "chore: version packages"
```

## 3. Publishing to npm

To officially release the bumped package to npm, make sure you are logged into npm first (`npm login`), and then run the release script:

```bash
pnpm run release
```

Under the hood, this executes `changeset publish`, which will package the code (`pnpm build` runs via `prepublishOnly`), publish the new version to the registry, and update git tags if configured.

## Summary Checklist

1. [ ] Make changes to the code.
2. [ ] Run `npx changeset` and commit the generated file.
3. [ ] (When ready to release) Run `npx changeset version` and commit the version bumps/changelog.
4. [ ] Run `pnpm run release` to publish.
