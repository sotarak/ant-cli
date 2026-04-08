import path from "node:path";
import { Command } from "commander";
import fs from "fs-extra";
import type { AgentMetadata } from "../core/metadata";
import { logger } from "../utils/logger";
import { version } from "../utils/version";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Extension used for agent configuration files. */
const CONFIG_EXTENSION = ".md";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Represents a sub-directory inside `.agent` that should be validated.
 * Each entry defines how to label and report its health status.
 */
interface DiagnosticTarget {
  /** Directory name relative to `.agent/` (e.g. `"workflows"`). */
  name: string;
  /** Human-readable label for log output (e.g. `"workflows"`). */
  label: string;
  /** Description for counting items (e.g. `"workflows"`, `"core knowledge items"`). */
  itemLabel: string;
  /** Whether this directory is required (`error` if missing) or optional (`warn`). */
  required: boolean;
}

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

/**
 * Declarative list of directories to check inside `.agent/`.
 * Adding a new entry here automatically includes it in the diagnostic scan.
 */
const DIAGNOSTIC_TARGETS: DiagnosticTarget[] = [
  {
    name: "workflows",
    label: "workflows/",
    itemLabel: "workflows",
    required: true,
  },
  {
    name: "skills",
    label: "skills/",
    itemLabel: "core knowledge items",
    required: false,
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Verifies that the root `.agent` directory exists.
 *
 * @param agentDir - Absolute path to the `.agent` directory.
 * @returns `true` if it exists, `false` otherwise (with user-facing messaging).
 */
async function checkAgentDirectory(agentDir: string): Promise<boolean> {
  if (await fs.pathExists(agentDir)) {
    logger.success(".agent registry directory exists");
    return true;
  }

  logger.error(".agent directory NOT found in this project.");
  logger.dim("Run 'ant init' to set up a new AI agent configuration.");
  return false;
}

/**
 * Scans a single sub-directory inside `.agent/` and logs its health status.
 *
 * - Directory exists & has files → ✔ success
 * - Directory exists & empty     → ⚠ warn
 * - Directory missing & required → ✖ error
 * - Directory missing & optional → ⚠ warn
 *
 * @param agentDir - Absolute path to the `.agent` directory.
 * @param target   - The diagnostic target definition.
 */
async function checkSubDirectory(
  agentDir: string,
  target: DiagnosticTarget,
): Promise<void> {
  const dirPath = path.join(agentDir, target.name);
  const exists = await fs.pathExists(dirPath);

  if (!exists) {
    const message = `${target.label} configuration directory ${target.required ? "is missing!" : "not found (Optional)"}`;
    target.required ? logger.error(message) : logger.warn(message);
    return;
  }

  // Count only markdown config files
  const files = await fs.readdir(dirPath);
  const configFiles = files.filter((f) => f.endsWith(CONFIG_EXTENSION));

  if (configFiles.length > 0) {
    logger.success(
      `${target.label} module found (${configFiles.length} ${target.itemLabel})`,
    );
  } else {
    logger.warn(`${target.label} module is empty (0 files)`);
  }
}

/**
 * Reads and validates the `.agent/metadata.json` file, then compares
 * the template version against the current CLI version.
 *
 * @param cwd - Absolute path to the project root.
 */
async function checkVersionMetadata(cwd: string): Promise<void> {
  const { readMetadata } = await import("../core/metadata");
  const meta: AgentMetadata | null = await readMetadata(cwd);

  logger.empty();

  if (!meta) {
    logger.warn(
      "No metadata.json tracked! Template version is unknown. Run 'ant update' or 'ant init' to fix this.",
    );
    return;
  }

  logger.success(
    `Template version mapping: v${meta.version} (Framework: ${meta.framework})`,
  );

  // Compare installed template version with CLI version
  if (meta.version !== version) {
    logger.warn(
      `Your .agent configuration (v${meta.version}) is older than CLI (v${version}). Run 'ant update' to upgrade!`,
    );
  } else {
    logger.success("Your .agent templates are up to date with the CLI.");
  }
}

/**
 * Runs the full diagnostic scan: directory presence, sub-directory health,
 * and version metadata.
 *
 * @param cwd      - Absolute path to the project root.
 * @param agentDir - Absolute path to the `.agent` directory.
 */
async function runDiagnostics(cwd: string, agentDir: string): Promise<void> {
  logger.info("Diagnosing .agent configuration...");
  logger.empty();

  // Step 1 — Validate root `.agent` directory
  const exists = await checkAgentDirectory(agentDir);
  if (!exists) return;

  // Step 2 — Validate each sub-directory
  for (const target of DIAGNOSTIC_TARGETS) {
    await checkSubDirectory(agentDir, target);
  }

  // Step 3 — Validate version metadata
  await checkVersionMetadata(cwd);

  logger.empty();
}

// ---------------------------------------------------------------------------
// Command definition
// ---------------------------------------------------------------------------

/**
 * `ant doctor`
 *
 * Validates the health of the `.agent` configuration in the current project.
 *
 * Checks performed:
 *  1. `.agent/` directory existence.
 *  2. `workflows/` and `skills/` sub-directory presence & file counts.
 *  3. `metadata.json` version alignment with the CLI.
 */
export const doctorCommand = new Command("doctor")
  .description("Validate .agent diagnostic health configuration")
  .action(async () => {
    logger.empty();

    const cwd = process.cwd();
    const agentDir = path.join(cwd, ".agent");

    try {
      await runDiagnostics(cwd, agentDir);
    } catch (error) {
      logger.empty();
      logger.error("Failed to execute diagnostic scanner.");

      if (error instanceof Error) {
        logger.dim(error.message);
      }
    }
  });
