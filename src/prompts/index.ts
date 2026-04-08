import { confirm, select } from "@inquirer/prompts";
import { Framework, IDE } from "../types/framework";
import { logger } from "../utils/logger";

export async function promptConfirmFramework(
  framework: Framework,
): Promise<boolean> {
  return await confirm({
    message: `Detected framework: ${framework}. Do you want to initialize for this framework?`,
    default: true,
  });
}

export async function promptSelectFramework(): Promise<Framework> {
  const answer = await select({
    message: "Select framework to initialize .agent for:",
    choices: [
      { name: "ReactJS (Vite, Next, CRA, etc.)", value: Framework.ReactJS },
      { name: "NestJS", value: Framework.NestJS },
      { name: "React Native / Expo", value: Framework.ReactNative },
    ],
  });
  return answer as Framework;
}

export async function promptSelectIDE(): Promise<IDE> {
  const answer = await select({
    message: "Select your AI IDE:",
    choices: [
      { name: "🚀 Antigravity", value: IDE.Antigravity },
      { name: "🔒 Cursor (Coming soon)", value: IDE.Cursor, disabled: true },
    ],
  });
  return answer as IDE;
}

export async function promptConfirmOverwrite(): Promise<boolean> {
  logger.warn(".agent directory already exists in this folder!");
  return await confirm({
    message:
      "Do you want to overwrite the existing .agent directory? (Files may be replaced)",
    default: false,
  });
}
