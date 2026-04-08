import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "bin/ant.ts"],
  format: ["esm"],
  target: "node18",
  clean: true,
  dts: true,
  sourcemap: true,
  splitting: false,
  tsconfig: "tsconfig.build.json",
});
