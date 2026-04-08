import { spawn } from "node:child_process";
import path from "node:path";
import { Command } from "commander";
import { logger } from "../utils/logger";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** The shell command used to launch the IDE. */
const IDE_COMMAND = "antigravity";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Resolves the absolute path to open from the user-supplied CLI argument.
 *
 * @param targetPath - Relative or absolute path (defaults to `"."`).
 * @returns Absolute path to the target directory.
 */
function resolveTargetPath(targetPath: string): string {
  return path.resolve(process.cwd(), targetPath);
}

/**
 * Spawns the Antigravity IDE as a detached child process pointing at the
 * given directory, then exits the CLI so the terminal is freed.
 *
 * The child process is fully detached (`detached: true`) and un-referenced
 * so Node.js can exit immediately without waiting for the IDE to close.
 *
 * @param cwd - Absolute path of the project to open in the IDE.
 */
function launchIDE(cwd: string): void {
  const child = spawn(IDE_COMMAND, [cwd], {
    stdio: "ignore",
    detached: true,
    shell: true,
  });

  // Handle spawn errors (e.g. command not found)
  child.on("error", (error) => {
    logger.error(`Failed to launch IDE: ${error.message}`);
    logger.dim(
      `Ensure '${IDE_COMMAND}' shell command is installed and available in your shell PATH.`,
    );
  });

  // Detach so the CLI process can exit independently
  child.unref();
}

// ---------------------------------------------------------------------------
// Command definition
// ---------------------------------------------------------------------------

/**
 * `ant open [path]`
 *
 * Opens the specified project directory (or the current directory) in the
 * Antigravity IDE as a detached background process and exits immediately.
 */
export const openCommand = new Command("open")
  .argument("[path]", "Path to open", ".")
  .description("Open project in Antigravity IDE")
  .action(async (targetPath: string) => {
    logger.empty();

    const cwd = resolveTargetPath(targetPath);

    logger.info("Opening target repository via Antigravity...");

    try {
      launchIDE(cwd);

      // Exit gracefully so we don't hold the terminal
      process.exit(0);
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error.message);
      }
    }
  });
