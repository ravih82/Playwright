import { test, expect } from '@playwright/test';

test('MSI Process Form', async ({ page }) => {

  test.setTimeout(60000);
  // Login
  await page.goto('https://e1-poc-sandbox.a99d04.metricstream.com/metricstream/auth/signin.jsp');
  await page.getByRole('textbox', { name: 'Username' }).fill('ORM_Program_Manager');
  await page.getByRole('textbox', { name: 'Password' }).fill('welcome*12');
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Navigate to form
  await page.getByRole('link', { name: 'Libraries' }).click();
  await page.getByRole('button', { name: 'Forms' }).click();
  await page.getByRole('link', { name: 'Open Form Process' }).click();

  // Fill form details
  const nameField = page.getByRole('textbox', { name: 'Name' });
  await nameField.fill('Process-Jan18');
  await expect(nameField).toHaveValue('Process-Jan18');

  // Select owner organization
  await page.getByRole('button', { name: /Owner Organizations/ }).click();
  await page.getByRole('treeitem', { name: 'ACME Corp' }).click();
  await page.getByRole('button', { name: 'Add' }).click();

  // Select user
  await page.locator('b.external-icon.icn.icn-user-search').click();
  const userCheckbox = page.getByRole('checkbox', { name: /ERM Admin/ });
  await userCheckbox.waitFor({ state: 'visible' });
  await userCheckbox.check();
  await page.getByRole('button', { name: 'Done' }).click();

  // Submission
  await page.getByRole('button', { name: 'Send for Approval' }).click();
  const submitButton = page.getByRole('button', { name: 'Submit' });
  await submitButton.click();
});
