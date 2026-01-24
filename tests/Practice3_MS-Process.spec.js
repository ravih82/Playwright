import { test, expect } from '@playwright/test';

test('MSI Process Form', async ({ page }) => {

    test.setTimeout(60000); // increased timeout for stability

    // Dynamic data
    const assignmentTitle = 'Process Sanity-pwFramework';
    const OwnerOrg = 'ACME Corp';
    const Owner = 'ERM Admin';
    const Username = 'ORM_Program_Manager';
    const Password = 'welcome*12';
    const DescriptionText = 'Description entered';
    const businessCriticality = 'High';

    // Login
    await page.goto('https://e1-poc-sandbox.a99d04.metricstream.com/metricstream/auth/signin.jsp');
    await page.getByRole('textbox', { name: 'Username' }).fill(Username);
    await page.getByRole('textbox', { name: 'Password' }).fill(Password);
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Navigate to form
    await page.getByRole('link', { name: 'Libraries' }).click();
    await page.getByRole('button', { name: 'Forms' }).click();
    await page.getByRole('link', { name: 'Open Form Process' }).click();

    // Fill form details
    const nameField = page.getByRole('textbox', { name: 'Name' });
    await nameField.fill(assignmentTitle);
    await expect(nameField).toHaveValue(assignmentTitle);

    await page.locator('#rtfDataread_DESCRIPTION').click();
    const DescriptionFrame = page.frameLocator('#mce_0_ifr');
    await DescriptionFrame.getByLabel('DESCRIPTION').fill(DescriptionText);

    await page.getByRole('button', { name: 'Save Changes' }).click();

    // Select Business Criticality

    await page.getByRole('combobox', { name: /Business Criticality/i }).click();
    const dropdown = page.locator('#select2-drop');
    await dropdown.waitFor({ state: 'visible' });
    // Click the option that matches the variable
    await dropdown.locator(`li:has-text("${businessCriticality}")`).click();


    // Select Owner Organization
    await page.getByRole('button', { name: /Owner Organizations/ }).click();
    await page.getByRole('treeitem', { name: OwnerOrg }).click();
    await page.getByRole('button', { name: 'Add' }).click();

    // Select User dynamically
    await page.getByTitle('Owners, Press to Change').click();
    const userCheckboxLocator = page.getByRole('checkbox', { name: `${Owner}, Select the row` });
    await userCheckboxLocator.waitFor({ state: 'visible' });
    await userCheckboxLocator.check();
    await page.getByRole('button', { name: 'Done' }).click();
    await page.waitForTimeout(3000);

    // Submission
    await page.getByRole('button', { name: 'Send for Approval' }).click();
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.locator('div.users-icon:visible').hover();
    await page.locator('a').filter({ hasText: 'Sign Out' }).last().click();
    
   
});
