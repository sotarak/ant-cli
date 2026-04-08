import { Command } from "commander";
import { doctorCommand } from "./commands/doctor";
import { initCommand } from "./commands/init";
import { openCommand } from "./commands/open";
import { updateCommand } from "./commands/update";
import { version } from "./utils/version";

export const program = new Command()
  .name("ant")
  .description("🐜 Ant CLI — Initialize .agent configuration for your project")
  .version(version, "-v, --version");

program.addCommand(initCommand);
program.addCommand(openCommand);
program.addCommand(doctorCommand);
program.addCommand(updateCommand);

// `ant .` shortcut — treat "." as open command
program.argument("[path]", "Open project in Antigravity").action((path) => {
  if (path === ".") {
    openCommand.parseAsync(["."], { from: "user" });
  }
});
