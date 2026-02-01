import { test, expect } from '@playwright/test';

test('MSI Risk Form', async ({ page }) => {

    test.setTimeout(60000); // increased timeout for stability

    // Dynamic data
    const assignmentTitle = 'Risk-PW JAN31-2nd time';
    const OwnerOrg = 'ACME Corp';
    const Owner = 'ORM Admin';
    const Username = 'ORM_Program_Manager';
    const Password = 'welcome*12';
    const DescriptionText = 'Description entered';
    const Category = 'Business Strategy';
    const level = 'Level 1';

    // Login
    await page.goto('https://e1-poc-sandbox.a99d04.metricstream.com/metricstream/auth/signin.jsp');
    await page.getByRole('textbox', { name: 'Username' }).fill(Username);
    await page.getByRole('textbox', { name: 'Password' }).fill(Password);
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Navigate to form
    await page.getByRole('link', { name: 'Libraries' }).click();
    await page.getByRole('button', { name: 'Forms' }).click();
    await page.getByRole('link', { name: 'Open Form Risk' }).click();

    // Fill Title
    const nameField = page.getByRole('textbox', { name: 'Name' });
    await nameField.fill(assignmentTitle);
    await expect(nameField).toHaveValue(assignmentTitle);
    // Select Level
    await page.getByRole('combobox', { name: /^Level:/ }).click();
    await page.getByRole('option', { name: level }).click();
    // Fill Description
    await page.locator('#rtfDataread_DESCRIPTION').click();
    const DescriptionFrame = page.frameLocator('#mce_0_ifr');
    await DescriptionFrame.getByLabel('DESCRIPTION').fill(DescriptionText);
    await page.getByRole('button', { name: 'Save Changes' }).click();
    // Select Category
    await page.getByRole('combobox', { name: 'Categories' }).click();
    await page.locator('.select2-result-label').filter({ hasText: Category }).click();
    await page.keyboard.press('Escape');


    // Select Owner Organization

    await page.getByTitle('Owner Organizations, Press to Change  required').click();
    await page.waitForTimeout(10000);
    await page.locator('.filterText').fill(OwnerOrg);
    await page.keyboard.press('Enter');
    await page.getByRole('treeitem', { name: OwnerOrg }).check();
    await page.getByRole('button', { name: 'Add' }).click();

    // Select User dynamically
    await page.getByTitle('Owners, Press to Change').click();
    await page.getByPlaceholder('Type a name').fill(Owner);
    await page.keyboard.press('Enter');
    await expect(Owner).toBeVisible()
    const userCheckboxLocator = page.getByRole('checkbox', { name: `${Owner}, Select the row` });
    await userCheckboxLocator.waitFor({ state: 'visible' });
    await userCheckboxLocator.check();
    await page.getByRole('button', { name: 'Done' }).click();


    // Submission
    await page.getByRole('button', { name: 'Send for Approval' }).click();
    await page.getByRole('button', { name: 'Submit' }).click();
    const successMessage = page.getByText('Form submitted successfully');
    await expect(successMessage).toBeVisible();
    await successMessage.screenshot({ path: 'tests/screenshots/MS-Risk-Form-Submission.png' });

    /*await page.locator('div.users-icon:visible').hover();
    await page.locator('a').filter({ hasText: 'Sign Out' }).last().click();*/


});
