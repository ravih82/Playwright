import { test, expect } from '@playwright/test';

test('RskAssessment Approval Form', async ({ page }) => {
    test.setTimeout(70000);
    // Test data
    const Username = 'ORM_Risk_Manager';
    const Password = 'welcome*12';
    const AssessmentTitle = 'Assessment Feb13';
    const ApproverComments = 'Approved Risk Assessment';

    // Login
    await page.goto('https://e1-poc-sandbox.a99d04.metricstream.com/metricstream/auth/signin.jsp');
    await page.getByRole('textbox', { name: 'Username' }).fill(Username);
    await page.getByRole('textbox', { name: 'Password' }).fill(Password);
    await page.getByRole('button', { name: 'Sign In' }).click();

    //Accessing the Risk Assessment from the tasks

    await page.getByRole('button', { name: 'My Tasks,List all Tasks' }).click();
    await page.getByRole('link', { name: AssessmentTitle }).click();
    await page.waitForLoadState('networkidle');

    //Submission of the assessment

    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('link', { name: 'Approve' }).click();
    await page.locator("textarea[title='Comments']").fill(ApproverComments);
    await page.locator('#submit').click();
    const submission = page.locator('[data-action="formSubmitSuccess"]');
    await expect(submission).toBeVisible();
    await page.screenshot({ path: 'tests/screenshots/MS-RiskAssessmentApproval form.png', fullPage: true });




});