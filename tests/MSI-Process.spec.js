import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    test.setTimeout(60000); // 2 minutes
    await page.goto('https://e1-poc-sandbox.a99d04.metricstream.com/metricstream/auth/signin.jsp');
    await page.getByRole('textbox', { name: 'Username' }).fill('ORM_Program_Manager');
    await page.getByRole('textbox', { name: 'Password' }).fill('welcome*12');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByRole('link', { name: 'Libraries' }).click();
    await page.getByRole('button', { name: 'Forms' }).click();
    await page.getByRole('link', { name: 'Open Form Process' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill('Process-Jan17-6:00');
    await page.getByRole('button', { name: 'Owner Organizations, Press to' }).click();
    await page.getByRole('treeitem', { name: 'ACME Corp' }).click();
    await page.getByRole('button', { name: 'Add' }).click();
    await page.locator("//b[@class='external-icon icn icn-user-search']").click();
    await page.waitForTimeout(3000);
    await page.getByRole('checkbox', { name: 'ERM Admin, Select the row' }).check();
    await page.getByRole('button', { name: 'Done' }).click();
    await page.getByText('Process STAGE 1 of').click();
    // Click Send for Approval
    await page.getByRole('button', { name: 'Send for Approval' }).click();
    // Wait for the dialog Submit button to appear, then click it
    const submitButton = page.getByRole('button', { name: 'Submit' });
    await expect(submitButton).toBeVisible();
    await submitButton.click();
    
});