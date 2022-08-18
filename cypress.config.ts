import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: 'src/__tests__/e2e/specs/**/*.{js,ts}',
    supportFile: 'src/__tests__/e2e/support/e2e.ts',
    baseUrl: 'http://localhost:8080'
  },
});
