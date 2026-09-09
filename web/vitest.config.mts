import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    // Honours the `@/*` alias declared in tsconfig.json.
    tsconfigPaths: true,
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
