// tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/utils/asyncValidators.ts"],
  format: ["esm", "cjs"],
  dts: true,
  external: ["react", "react-dom"], 
  clean: true,
});
