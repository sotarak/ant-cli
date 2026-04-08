import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs-extra";
import { Framework } from "../types/framework";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Name of the `.agent` directory written to the user's project root. */
const AGENT_DIR_NAME = ".agent";

/** Name of the shared template folder inside `templates/`. */
const SHARED_DIR_NAME = "_shared";

// ---------------------------------------------------------------------------
// Helpers — path resolution
// ---------------------------------------------------------------------------

/**
 * Locates the `templates/` directory at runtime, handling both the compiled
 * (`dist/`) layout and the source (`src/`) layout used during development.
 *
 * Candidate paths (evaluated in order):
 *  - `../templates`  — relative to `dist/core/` after `tsup` build
 *  - `../../templates` — relative to `src/core/` during `tsx` dev runs
 *
 * @throws {Error} If neither candidate path exists on disk.
 * @returns Absolute path to the `templates/` directory.
 */
export function getTemplatesDir(): string {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const candidates = [
    path.resolve(__dirname, "../templates"), // dist layout
    path.resolve(__dirname, "../../templates"), // src layout
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }

  throw new Error(
    `Templates directory not found. Searched:\n${candidates.join("\n")}`,
  );
}

// ---------------------------------------------------------------------------
// Helpers — file operations
// ---------------------------------------------------------------------------

/**
 * Copies a source directory into a target directory if the source exists,
 * overwriting any conflicting files.
 *
 * @param src    - Absolute path to the source directory.
 * @param target - Absolute path to the destination directory.
 * @returns `true` if the copy was performed, `false` if `src` was absent.
 */
async function copyDirectory(src: string, target: string): Promise<boolean> {
  if (!(await fs.pathExists(src))) return false;

  await fs.copy(src, target, { overwrite: true });
  return true;
}

/**
 * Scans `baseDir` recursively and returns the relative paths of all files,
 * formatted as `.agent/<relativeFilePath>` for user-facing output.
 *
 * @param baseDir  - Absolute path to the directory to scan.
 * @param agentDir - Absolute path to the `.agent` output directory
 *                   (used to compute readable relative paths).
 * @returns Array of formatted relative paths, e.g. `".agent/workflows/dev.md"`.
 */
async function scanCreatedFiles(
  baseDir: string,
  agentDir: string,
): Promise<string[]> {
  if (!(await fs.pathExists(baseDir))) return [];

  // Walk the directory tree recursively
  const walk = async (dir: string): Promise<string[]> => {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const results: string[] = [];

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        results.push(...(await walk(fullPath)));
      } else {
        // Format as ".agent/<relative>" for display
        const relative = path.relative(agentDir, fullPath);
        results.push(path.join(AGENT_DIR_NAME, relative));
      }
    }

    return results;
  };

  return walk(baseDir);
}

/**
 * Writes updated `metadata.json` into the `.agent` directory, recording the
 * CLI version, framework, and timestamp of this scaffold run.
 *
 * @param cwd       - Absolute path to the project root.
 * @param framework - Framework that was used for scaffolding.
 */
async function writeAgentMetadata(
  cwd: string,
  framework: Framework,
): Promise<void> {
  const { version } = await import("../utils/version");
  const { writeMetadata } = await import("./metadata");

  await writeMetadata(cwd, {
    version,
    framework,
    updatedAt: new Date().toISOString(),
  });
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Bootstraps the `.agent` configuration directory for a given framework.
 *
 * Steps performed:
 *  1. Ensure `.agent/` exists in the project root.
 *  2. Copy `templates/_shared/` → `.agent/` (shared workflows & rules).
 *  3. Copy `templates/<framework>/.agent/` → `.agent/` (framework-specific files).
 *  4. Write `metadata.json` to record version and framework.
 *
 * Created files are discovered via `fs.readdir` instead of being hardcoded,
 * so the list automatically reflects the real state of the templates folder.
 *
 * @param cwd       - Absolute path to the project root.
 * @param framework - The framework to scaffold templates for.
 * @returns Array of relative file paths that were written (for display).
 */
export async function bootstrapTemplates(
  cwd: string,
  framework: Framework,
): Promise<string[]> {
  const agentDir = path.join(cwd, AGENT_DIR_NAME);
  const templatesDir = getTemplatesDir();

  const sharedSrc = path.join(templatesDir, SHARED_DIR_NAME);
  const frameworkSrc = path.join(templatesDir, framework, AGENT_DIR_NAME);

  // Ensure output directory exists before any copy operations
  await fs.ensureDir(agentDir);

  const createdFiles: string[] = [];

  // Step 1 — Copy shared templates (available to all frameworks)
  const sharedCopied = await copyDirectory(sharedSrc, agentDir);
  if (sharedCopied) {
    const sharedFiles = await scanCreatedFiles(agentDir, agentDir);
    createdFiles.push(...sharedFiles);
  }

  // Step 2 — Copy framework-specific templates (may overwrite shared files)
  const frameworkCopied = await copyDirectory(frameworkSrc, agentDir);
  if (frameworkCopied) {
    // Re-scan to capture newly added / overwritten framework files
    const allFiles = await scanCreatedFiles(agentDir, agentDir);
    // Merge without duplicating files already captured from the shared step
    for (const file of allFiles) {
      if (!createdFiles.includes(file)) {
        createdFiles.push(file);
      }
    }
  }

  // Step 3 — Persist metadata
  await writeAgentMetadata(cwd, framework);

  return createdFiles;
}
