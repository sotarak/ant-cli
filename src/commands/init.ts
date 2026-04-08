import path from "node:path";
import { Command } from "commander";
import fs from "fs-extra";
import ora from "ora";
import { detectFramework } from "../core/framework-detector";
import { bootstrapTemplates } from "../core/template-engine";
import {
  promptConfirmFramework,
  promptConfirmOverwrite,
  promptSelectFramework,
  promptSelectIDE,
} from "../prompts";
import type { Framework } from "../types/framework";
import { logger } from "../utils/logger";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Resolved filesystem paths used throughout the init flow. */
interface InitPaths {
  /** Absolute path to the target project root. */
  cwd: string;
  /** Absolute path to the `.agent` directory inside the project. */
  agentDir: string;
}

/** CLI options parsed from commander flags. */
interface InitOptions {
  /** When `true`, skip the overwrite confirmation prompt. */
  force?: boolean;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Resolves the working directory and `.agent` path from the user-provided
 * directory argument (defaults to `"."`).
 *
 * @param dir - Relative or absolute directory supplied via CLI argument.
 * @returns Resolved paths for the project root and `.agent` directory.
 */
function resolvePaths(dir: string): InitPaths {
  const cwd = path.resolve(process.cwd(), dir);
  const agentDir = path.join(cwd, ".agent");
  return { cwd, agentDir };
}

/**
 * Checks whether a `.agent` directory already exists and, if so, prompts the
 * user for overwrite confirmation (unless `--force` is set).
 *
 * @param agentDir - Absolute path to the `.agent` directory.
 * @param force    - Whether to skip the confirmation prompt.
 * @returns `true` if the flow should continue, `false` if the user cancelled.
 */
async function guardExistingAgent(
  agentDir: string,
  force: boolean,
): Promise<boolean> {
  const exists = await fs.pathExists(agentDir);
  if (!exists) return true;

  // `--force` bypasses the interactive prompt
  if (force) return true;

  const confirmed = await promptConfirmOverwrite();
  if (!confirmed) {
    logger.info("Initialization cancelled by user.");
    return false;
  }

  return true;
}

/**
 * Determines which framework to use for scaffolding.
 *
 * The flow is:
 *  1. Auto-detect framework from `package.json` dependencies.
 *  2. If detected → ask the user to confirm.
 *  3. If not confirmed (or nothing detected) → show a selection prompt.
 *
 * @param cwd - Absolute path to the project root.
 * @returns The selected {@link Framework}.
 */
async function resolveFramework(cwd: string): Promise<Framework> {
  const { detected, framework } = await detectFramework(cwd);

  // Auto-detected → confirm with user
  if (detected && framework) {
    const accepted = await promptConfirmFramework(framework);
    if (accepted) return framework;
  }

  // Fallback → manual selection
  return promptSelectFramework();
}

/**
 * Runs the actual scaffolding process: copies templates, writes metadata,
 * and prints the list of created files.
 *
 * Uses `ora` to show a spinner while files are being generated.
 *
 * @param cwd       - Absolute path to the project root.
 * @param framework - The framework to scaffold templates for.
 */
async function scaffoldAgent(cwd: string, framework: Framework): Promise<void> {
  logger.empty();
  const spinner = ora(`Initializing .agent for ${framework}...`).start();

  try {
    const createdFiles = await bootstrapTemplates(cwd, framework);

    spinner.succeed(`Done! .agent has been initialized for ${framework}.`);
    logCreatedFiles(createdFiles);
    printNextSteps();
  } catch (error) {
    spinner.fail("Failed to initialize templates.");

    if (error instanceof Error) {
      logger.error(error.message);
    }
  }
}

/**
 * Logs the list of files that were created during scaffolding.
 *
 * @param files - Relative paths of created files.
 */
function logCreatedFiles(files: string[]): void {
  logger.empty();
  for (const file of files) {
    logger.success(`Created ${file}`);
  }
}

/**
 * Prints post-initialization guidance so the user knows what to do next.
 */
function printNextSteps(): void {
  logger.empty();
  logger.step("Next steps:");
  logger.dim("  1. Open your project: ant .");
  logger.dim("  2. Check config:      ant doctor");
  logger.dim("  3. Customize templates in .agent/");
  logger.empty();
}

// ---------------------------------------------------------------------------
// Command definition
// ---------------------------------------------------------------------------

/**
 * `ant init [dir]`
 *
 * Initializes a `.agent` configuration directory for the target project.
 *
 * Flow:
 *  1. Guard against overwriting an existing `.agent` directory.
 *  2. Detect or prompt the user to select a framework.
 *  3. Prompt the user to select an IDE (Antigravity only for now).
 *  4. Scaffold templates and output results.
 */
export const initCommand = new Command("init")
  .description("Initialize .agent configuration for your project")
  .argument("[dir]", "Directory to initialize the project in", ".")
  .option("-f, --force", "Force overwrite if .agent directory exists")
  .action(async (dir: string, options: InitOptions) => {
    logger.empty();

    // 1. Resolve target paths
    const { cwd, agentDir } = resolvePaths(dir);

    // 2. Guard: handle existing `.agent` directory
    const shouldContinue = await guardExistingAgent(agentDir, !!options.force);
    if (!shouldContinue) return;

    // 3. Determine framework (auto-detect or prompt)
    const framework = await resolveFramework(cwd);

    // 4. Select IDE (single option for now — extensible later)
    await promptSelectIDE();

    // 5. Scaffold `.agent` templates
    await scaffoldAgent(cwd, framework);
  });
