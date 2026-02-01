import { test, expect } from '@playwright/test';
import LoginPage from '../POM/Login';

test('Practice POM Login MSI page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.openApplication(); // URL is hardcoded in POM
  await loginPage.login('ORM_Program_Manager', 'welcome*12');
  
});
