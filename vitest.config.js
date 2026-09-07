import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Everything under test is Node-side: the Express app, the asset pipeline,
    // and a fetch helper that only needs globalThis.fetch.
    environment: 'node',
    include: ['src/**/*.test.{js,jsx}', 'server/**/*.test.js', 'scripts/**/*.test.mjs'],
  },
})
