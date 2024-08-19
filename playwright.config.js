// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
//   fullyParallel: true,
//   forbidOnly: !!process.env.CI,  //useful to ensure all tests run in CI.
  retries: process.env.CI ? 2 : 0, //This sets the number of retry attempts for failed tests. In this case, it retries twice in CI environments, but doesn't retry in local runs.
  workers: process.env.CI ? 6 : undefined, //This sets the number of concurrent worker processes. In CI it's set to 1, while in local environments it uses the default (which is often based on the number of CPU cores).
  reporter: [['line'], ['allure-playwright']],
  use: {
    baseURL: 'https://expert.correlation-one.com/',
    headless: true,
    //slowMo: 1000,  // Slows down Playwright operations by 1000ms
    // trace: 'on-first-retry', //Enables trace collection on the first retry of a failed test.
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});