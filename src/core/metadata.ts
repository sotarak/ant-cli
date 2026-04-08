import path from "node:path";
import fs from "fs-extra";
import type { Framework } from "../types/framework";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Relative path from the project root to the metadata file. */
const METADATA_RELATIVE_PATH = ".agent/metadata.json";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Shape of the `.agent/metadata.json` file written after `ant init` or
 * `ant update`. Tracks version alignment between the CLI and the project's
 * scaffolded templates.
 */
export interface AgentMetadata {
  /** CLI version that was used to generate the current templates. */
  version: string;
  /** Framework the project was scaffolded for. */
  framework: Framework;
  /** ISO 8601 timestamp of the last `init` / `update` run. */
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Resolves the absolute path to `metadata.json` for a given project root.
 *
 * @param cwd - Absolute path to the project root.
 * @returns Absolute path to `.agent/metadata.json`.
 */
function resolveMetadataPath(cwd: string): string {
  return path.join(cwd, METADATA_RELATIVE_PATH);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Reads and parses `.agent/metadata.json` from the project root.
 *
 * Returns `null` if the file does not exist or cannot be parsed, so callers
 * can handle both "not initialised" and "corrupted" cases without throwing.
 *
 * @param cwd - Absolute path to the project root.
 * @returns Parsed {@link AgentMetadata}, or `null` on failure.
 */
export async function readMetadata(cwd: string): Promise<AgentMetadata | null> {
  const metadataPath = resolveMetadataPath(cwd);

  if (!(await fs.pathExists(metadataPath))) {
    return null;
  }

  try {
    const raw = await fs.readFile(metadataPath, "utf-8");
    return JSON.parse(raw) as AgentMetadata;
  } catch {
    // Corrupted or non-JSON content — treat as missing
    return null;
  }
}

/**
 * Writes (or overwrites) `.agent/metadata.json` with the provided metadata.
 *
 * Ensures the `.agent/` directory exists before writing, so this function is
 * safe to call even on a fresh project.
 *
 * @param cwd      - Absolute path to the project root.
 * @param metadata - The metadata object to persist.
 */
export async function writeMetadata(
  cwd: string,
  metadata: AgentMetadata,
): Promise<void> {
  const metadataPath = resolveMetadataPath(cwd);

  // Guarantee the parent directory exists before writing
  await fs.ensureDir(path.dirname(metadataPath));
  await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2), "utf-8");
}
