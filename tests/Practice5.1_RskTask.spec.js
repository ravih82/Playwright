import { test, expect } from '@playwright/test';

test('RskTask Form', async ({ page }) => {
    test.setTimeout(60000);
    // Test data
    const Username = 'ORM_Program_Manager';
    const Password = 'welcome*12';
    const assignmentTitle = 'Rskplan-PW FEB-09';
    const Assessor = 'ERM Program Manager';
    const Approver = 'ORM Risk Manager';
    const DueDate = '05/30/2026';

    // Login
    await page.goto('https://e1-poc-sandbox.a99d04.metricstream.com/metricstream/auth/signin.jsp');
    await page.getByRole('textbox', { name: 'Username' }).fill(Username);
    await page.getByRole('textbox', { name: 'Password' }).fill(Password);
    await page.getByRole('button', { name: 'Sign In' }).click();

    //Generating the Risk Assessment from the Adhoc task
    await page.getByRole('link', { name: 'Risk Assessments' }).click();
    await page.getByRole('button', { name: 'Forms' }).click();
    await page.getByRole('link', { name: 'Open Form Risk Assessment Task' }).click();

    //Fill details in the form

    await page.locator('b.pick.icon-format.icn.icn-list-search.searchInsideIcon').click();
    await page.locator('.popupSearchbox').fill(assignmentTitle);
    await page.keyboard.press('Enter');
    await page.getByRole('radio', { name: `${assignmentTitle}, Select the row` }).nth(0).check();
    await page.getByRole('button', { name: 'Done' }).click();
    await page.getByRole('checkbox', { name: 'Inherit Assessment Scope' }).check();

    await page.getByRole('application').filter({ hasText: 'Assessor' }).click();
    await page.locator('.popupSearchbox').fill(Assessor);
    await page.keyboard.press('Enter');
    await page.getByRole('radio', { name: `${Assessor}, Select the row` }).check();
    await page.getByRole('button', { name: 'Done' }).click();

    await page.getByRole('application').filter({ hasText: 'Approver' }).click();
    await page.locator('.popupSearchbox').fill(Approver);
    await page.keyboard.press('Enter');
    await page.getByRole('radio', { name: `${Approver}, Select the row` }).check();
    await page.getByRole('button', { name: 'Done' }).click();
    await page.getByPlaceholder('Due Date').fill(DueDate);
    await page.keyboard.press('Enter');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.locator('#submit').click();
    const submission = page.locator('[data-action="formSubmitSuccess"]');
    await expect(submission).toBeVisible();
    await page.screenshot({ path: 'tests/screenshots/MS-Risktask.png', fullPage: true });




});