# 🐜 Ant CLI

A powerful, framework-aware CLI tool designed to bootstrap, manage, and upgrade **`.agent`** configurations (powered by Antigravity) within your projects.

## Features

- **Framework Auto-Discovery:** Automatically detects ReactJS, Next.js, Create React App, NestJS, React Native, and Expo via dependencies.
- **Agent Initialization:** Scaffolds `.agent/` with pre-configured AI `workflows/` and `skills/` tailored to your stack.
- **Diagnostic Scans:** Built-in `doctor` command to validate your agent's health and file structure.
- **One-Click IDE Launch:** Opens the project seamlessly in the Antigravity IDE.
- **Smart Updates:** Keeps your `.agent` configurations up to date with the latest templates bundled in the CLI.

## Installation

You can run Ant CLI directly using `npx` or install it globally to your system.

```bash
# Using npx (Recommended for always using the latest version)
npx ant-cli init

# Using global install
npm install -g ant-cli
```

## Usage

### `ant init`
Initializes a new `.agent` directory in your project. It safely checks for existing configurations, detects your framework, and bootstraps the correct workflows and skills.

```bash
ant init      # Run in current directory
ant init ./   # Specify a target directory
ant init -f   # Force overwrite of an existing .agent directory
```

### `ant doctor`
Validates the diagnostic health of the `.agent` setup in your project. It checks for the correct folder structure (`workflows/`, `skills/`) and verifies if your templates are outdated compared to the CLI.

```bash
ant doctor
```

### `ant update`
Upgrades an existing `.agent` directory to the latest CLI template version. It automatically pulls the stored framework selection and safely patches your templates.

```bash
ant update
```

### `ant open` / `ant .`
Opens the current project repository in the Antigravity IDE natively as a detached background process.

```bash
ant .         # Shortcut to open the current directory
ant open      # Open current directory
ant open ./   # Open specific directory
```

## Development Setup

If you want to contribute or modify Ant CLI locally:

1. **Clone & Install**
   ```bash
   pnpm install
   ```

2. **Run Locally during Development**
   ```bash
   pnpm dev init ./example
   ```

3. **Check Code Quality**
   ```bash
   pnpm run format      # Prettier format
   pnpm run lint        # Biome check
   pnpm run typecheck   # TypeScript check
   pnpm run test        # Unit tests
   ```

4. **Build Production Dist**
   ```bash
   pnpm run build
   ```

## License
MIT
