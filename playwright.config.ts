import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

const ENV = process.env.ENV || 'local';
dotenv.config({ path: `.env.${process.env.ENV}` })
// const environments = {
//   local: { baseURL: 'https://demo.nopcommerce.com' },
//   dev: { baseURL: 'https://demo.nopcommerce.com' },
//   staging: { baseURL: 'https://demo.nopcommerce.com' },
// } as const;

// const selectedEnv = (environments as Record<string, { baseURL: string }>)[ENV] || environments.local;
console.log(`[Playwright] ENV=${ENV}`);

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 4 : 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? 'blob' : 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    headless: true,
    screenshot: 'on-first-failure', // support fix flaky test later
    video: 'retain-on-failure',
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.URL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

  },

  /* Configure projects for major browsers */
  projects: [
    // Environment-specific Chromium projects
    {
      name: 'chromium-local',
      use: { ...devices['Desktop Chrome']},
    },
  ],


  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
