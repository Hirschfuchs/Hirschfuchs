import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        ...(configDefaults.coverage.exclude ?? []),
        "src/runners/**",
        "src/data/**",
        "src/enums/**",
        "src/types/**",
        "**/*.helper.ts",
      ],
    },
  },
});
