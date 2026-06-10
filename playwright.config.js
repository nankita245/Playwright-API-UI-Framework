// playwright.config.js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',            // folder containing your test files
  timeout: 60 * 1000,             // max time per test in milliseconds
  expect: {
    timeout: 5000,                // max time for expect conditions
  },
  // reporter: HTML, // reporters: console list + HTML report
  reporter: [
    ['html', { open: 'always', outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['list'],
    ['allure-playwright']
  ],
  use: {
    headless: false,              // change to true for CI runs
    screenshot: 'on',
    trace : 'retain-on-failure', // record trace on test failure
    //actionTimeout: 10000,         // max time for each action
     

     baseURL: 'https://www.saucedemo.com'
  },
  projects: [
  {
    name: 'setup',
    testMatch: /.*\.setup\.js/,
  },

  {
    name: 'chromium',
    use: {
      ...devices['Desktop Chrome'],
      storageState: 'playwright/.auth/user.json',
    },

    dependencies: ['setup'],
  },

  {
  name: 'webkit',
  use: {
    ...devices['Desktop Safari'],
    storageState: 'playwright/.auth/user.json',
  },
  dependencies: ['setup'],
},
],

});