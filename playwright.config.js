// @ts-check
import { defineConfig, devices } from '@playwright/test';
import AllureReporter from 'allure-playwright';

/** 

 * @see https://playwright.dev/docs/test-configuration
 */

export default defineConfig({
  testDir: './tests',
  
  use: {

    browserName: 'chromium',
    headless:true,
    screenshot: 'on',
    trace: 'retain-on-failure'

  },
  reporter: [
    ['list'],
    ['html', { outputFolder:'playwright-report', open: 'on-failure' }],
    ['allure-playwright']
  ]
  
});

