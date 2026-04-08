import { confirm } from "@inquirer/prompts";
import { Command } from "commander";
import ora from "ora";
import type { AgentMetadata } from "../core/metadata";
import { readMetadata } from "../core/metadata";
import { bootstrapTemplates } from "../core/template-engine";
import { logger } from "../utils/logger";
import { version } from "../utils/version";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Reads the existing `.agent/metadata.json` and guards against a missing or
 * corrupted configuration.
 *
 * @param cwd - Absolute path to the project root.
 * @returns The parsed metadata, or `null` if absent/corrupt (with user messaging).
 */
async function guardMetadata(cwd: string): Promise<AgentMetadata | null> {
  const meta = await readMetadata(cwd);

  if (!meta) {
    logger.error(
      "No .agent/metadata.json found. The .agent folder might be missing or corrupted.",
    );
    logger.dim("Please run 'ant init' to set up a new AI agent configuration.");
  }

  return meta;
}

/**
 * Checks whether the installed `.agent` templates are already at the latest
 * CLI version, logging a success message and returning `true` if so.
 *
 * @param installedVersion - Version string recorded in `metadata.json`.
 * @returns `true` if already up-to-date (no update needed).
 */
function guardAlreadyUpToDate(installedVersion: string): boolean {
  if (installedVersion !== version) return false;

  logger.success(
    `Your .agent templates are already on the latest version (v${version}).`,
  );
  return true;
}

/**
 * Shows a diff-like version banner and asks the user whether to proceed
 * with the update.
 *
 * @param fromVersion - Currently installed template version.
 * @returns `true` if the user confirmed, `false` if they cancelled.
 */
async function confirmUpdate(fromVersion: string): Promise<boolean> {
  logger.info(`Update available: v${fromVersion} ➔ v${version}`);
  logger.warn(
    "Updating will overwrite default template files in .agent/workflows and .agent/skills.",
  );

  const confirmed = await confirm({
    message: "Do you want to proceed with the update?",
    default: false,
  });

  if (!confirmed) {
    logger.info("Update cancelled.");
  }

  return confirmed;
}

/**
 * Re-runs `bootstrapTemplates` for the current framework to upgrade all
 * template files to the latest CLI version.
 *
 * Uses an `ora` spinner to show progress while files are written.
 *
 * @param cwd      - Absolute path to the project root.
 * @param meta     - Existing agent metadata (used for framework).
 */
async function runUpdate(cwd: string, meta: AgentMetadata): Promise<void> {
  const spinner = ora(`Updating templates for ${meta.framework}...`).start();

  try {
    await bootstrapTemplates(cwd, meta.framework);
    spinner.succeed(`Successfully updated .agent to v${version}!`);
  } catch (error) {
    spinner.fail("Failed to update templates.");

    if (error instanceof Error) {
      logger.error(error.message);
    }
  }
}

// ---------------------------------------------------------------------------
// Command definition
// ---------------------------------------------------------------------------

/**
 * `ant update`
 *
 * Upgrades the `.agent` configuration directory to the latest template
 * version bundled with the current CLI.
 *
 * Flow:
 *  1. Guard: ensure `metadata.json` exists (i.e. `ant init` was run).
 *  2. Guard: skip if templates are already at the latest version.
 *  3. Confirm: prompt user before overwriting files.
 *  4. Execute: re-bootstrap templates and update metadata.
 */
export const updateCommand = new Command("update")
  .description("Update .agent configuration to the latest CLI templates")
  .action(async () => {
    logger.empty();

    const cwd = process.cwd();

    // 1. Guard: metadata must exist
    const meta = await guardMetadata(cwd);
    if (!meta) return;

    // 2. Guard: skip if already up-to-date
    if (guardAlreadyUpToDate(meta.version)) return;

    // 3. Confirm update with user
    const confirmed = await confirmUpdate(meta.version);
    if (!confirmed) return;

    // 4. Run the update
    await runUpdate(cwd, meta);
  });
