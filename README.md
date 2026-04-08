<div align="center">
  <h1>🐜 Ant CLI</h1>
  <p>A powerful, framework-aware CLI tool designed to bootstrap, manage, and upgrade <strong><code>.agent</code></strong> configurations within your projects (powered by Antigravity).</p>

  <p>
    <a href="https://www.npmjs.com/package/@sotarak/ant-cli"><img src="https://img.shields.io/npm/v/@sotarak/ant-cli.svg?style=flat-square&color=blue" alt="NPM Version"></a>
    <a href="https://www.npmjs.com/package/@sotarak/ant-cli"><img src="https://img.shields.io/npm/dt/@sotarak/ant-cli.svg?style=flat-square&color=green" alt="NPM Downloads"></a>
    <a href="https://github.com/sotarak/ant-cli/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@sotarak/ant-cli.svg?style=flat-square&color=yellow" alt="License"></a>
  </p>
</div>

## ✨ Features

- **🎯 Framework Auto-Discovery:** Automatically detects ReactJS, Next.js, Create React App, NestJS, React Native, and Expo via codebase dependencies.
- **⚡️ Agent Initialization:** Instantly scaffolds an `.agent/` directory with pre-configured AI `workflows/` and `skills/` specially tailored to your tech stack.
- **🩺 Diagnostic Scans:** Use the built-in `doctor` command to validate your agent's health, verify file structures, and detect out-of-sync configurations.
- **🚀 One-Click IDE Launch:** Open the project seamlessly in the native Antigravity IDE without leaving your terminal.
- **🔄 Smart Updates:** Keeps your `.agent` setups modern and up-to-date with the latest templates bundled in the CLI using intelligent patching.

---

## 📦 Installation

You can run Ant CLI directly using `npx` (recommended) or install it globally on your machine.

### Using `npx` (Recommended)

This guarantees you are always using the latest agent configurations locally without polluting your global dependencies.

```bash
npx @sotarak/ant-cli init
```

### Global Install

If you prefer having the `ant` executable command available anywhere on your system:

```bash
npm install -g @sotarak/ant-cli
# or
pnpm add -g @sotarak/ant-cli
```

> **Note:** The package name is scoped as `@sotarak/ant-cli`, but the terminal executable installed is simply `ant`.

---

## 🛠 Usage

### Bootstrap your project

Initializes a new `.agent` directory in your project. It safely checks for existing configurations, detects your framework automatically, and bootstraps the correct workflows and skills.

```bash
ant init         # Run in the current directory
ant init ./src   # Specify a target project directory
ant init -f      # Force an overwrite of an existing .agent directory
```

### Check agent health

Validates the diagnostic health of the `.agent` setup in your project. It checks for the required folder structure (e.g., `workflows/`, `skills/`) and verifies if your project templates are outdated compared to the CLI version.

```bash
ant doctor
```

### Update agent templates

Upgrades an existing `.agent` directory to the latest CLI template version. It automatically pulls the stored framework selection and safely patches your templates without breaking your custom modifications.

```bash
ant update
```

### Open in Antigravity IDE

Opens the current project repository directly in the Antigravity IDE natively as a detached background process.

```bash
ant .            # Shortcut to open the current directory
ant open         # Open current directory explicitly
ant open ./apps  # Open a specific path
```

---

## 🧑‍💻 Contributing & Development

We welcome contributions! If you're looking to modify Ant CLI locally:

1. **Clone the repository & Install dependencies**

   ```bash
   git clone git@github.com:sotarak/ant-cli.git
   cd ant-cli
   pnpm install
   ```

2. **Run Locally during Development**

   ```bash
   pnpm dev init ./example
   ```

3. **Check Code Quality**
   We enforce strict linting and formatting. Run these before committing:

   ```bash
   pnpm run format      # Formats code using Prettier
   pnpm run lint        # Verifies code rules using Biome
   pnpm run typecheck   # Validates TypeScript compilation
   pnpm run test        # Runs unit test suites via Vitest
   ```

4. **Build Production Distribution**
   ```bash
   pnpm run build
   ```

## 📄 License

This project is licensed under the [MIT](LICENSE) License.
