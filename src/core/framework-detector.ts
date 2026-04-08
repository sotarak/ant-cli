import path from "node:path";
import fs from "fs-extra";
import { type DetectResult, Framework } from "../types/framework";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Minimal shape of a `package.json` used for framework detection.
 * Only `dependencies` and `devDependencies` are needed.
 */
interface PackageJson {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

/**
 * Maps a {@link Framework} to the package names that indicate its presence.
 * If **any** of the listed packages are found in `dependencies` or
 * `devDependencies`, the framework is considered detected.
 *
 * Order matters — higher-specificity frameworks (e.g. React Native) must
 * appear before more generic ones (e.g. ReactJS) so they are matched first.
 */
interface FrameworkSignal {
  framework: Framework;
  /** Package names whose presence signals this framework. */
  packages: string[];
}

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

/**
 * Declarative registry of framework detection signals.
 *
 * To add a new framework:
 *  1. Add its value to the `Framework` enum in `types/framework.ts`.
 *  2. Append a new entry here — no other code changes required.
 */
const FRAMEWORK_SIGNALS: FrameworkSignal[] = [
  // React Native / Expo must be checked before generic ReactJS
  {
    framework: Framework.ReactNative,
    packages: ["react-native", "expo"],
  },
  {
    framework: Framework.NestJS,
    packages: ["@nestjs/core"],
  },
  {
    framework: Framework.ReactJS,
    packages: ["react", "react-dom"],
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Reads `package.json` from the specified directory and merges
 * `dependencies` and `devDependencies` into a single flat record.
 *
 * @param cwd - Absolute path to the directory containing `package.json`.
 * @returns Merged dependency map, or `null` if the file is absent / invalid.
 */
async function readPackageDeps(
  cwd: string,
): Promise<Record<string, string> | null> {
  const pkgPath = path.join(cwd, "package.json");

  if (!(await fs.pathExists(pkgPath))) {
    return null;
  }

  try {
    const raw = await fs.readFile(pkgPath, "utf-8");
    const pkg = JSON.parse(raw) as PackageJson;
    return { ...pkg.dependencies, ...pkg.devDependencies };
  } catch {
    // Malformed JSON — treat as undetectable
    return null;
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Detects the framework used in a project by inspecting its `package.json`
 * dependencies against the {@link FRAMEWORK_SIGNALS} registry.
 *
 * Detection is order-sensitive: the first matching signal wins.
 *
 * @param cwd - Absolute path to the project root.
 * @returns A {@link DetectResult} indicating whether a framework was found.
 */
export async function detectFramework(cwd: string): Promise<DetectResult> {
  const deps = await readPackageDeps(cwd);

  // No package.json or parse error — cannot detect
  if (!deps) return { detected: false };

  for (const signal of FRAMEWORK_SIGNALS) {
    const matched = signal.packages.some((pkg) => pkg in deps);

    if (matched) {
      return { detected: true, framework: signal.framework };
    }
  }

  return { detected: false };
}
