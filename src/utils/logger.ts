import pc from "picocolors";

export const logger = {
  info: (msg: string) => console.log(`${pc.blue(pc.bold("ℹ"))} ${msg}`),
  success: (msg: string) => console.log(`${pc.green(pc.bold("✔"))} ${msg}`),
  warn: (msg: string) => console.log(`${pc.yellow(pc.bold("⚠"))} ${msg}`),
  error: (msg: string) => console.log(`${pc.red(pc.bold("✖"))} ${msg}`),
  step: (msg: string) => console.log(`${pc.cyan(pc.bold("▸"))} ${msg}`),
  dim: (msg: string) => console.log(pc.dim(msg)),
  empty: () => console.log(""),
};
