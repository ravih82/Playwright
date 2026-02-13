import { test, expect } from '@playwright/test';

test('RskAssessment Form', async ({ page }) => {
    test.setTimeout(70000);
    // Test data
    const Username = 'ERM_Program_Manager';
    const Password = 'welcome*12';
    const AssessmentTitle = 'Assessment Feb13';
    const Process = 'ABFL - Policy Governance - CSB';
    const Risk = 'Strategic Risk';
    const FinancialRating = 'High';
    const ReputationalRating = 'Medium';
    const Likelihood = 'Likely';


    // Login
    await page.goto('https://e1-poc-sandbox.a99d04.metricstream.com/metricstream/auth/signin.jsp');
    await page.getByRole('textbox', { name: 'Username' }).fill(Username);
    await page.getByRole('textbox', { name: 'Password' }).fill(Password);
    await page.getByRole('button', { name: 'Sign In' }).click();

    //Accessing the Risk Assessment from the tasks

    await page.getByRole('button', { name: 'My Tasks,List all Tasks' }).click();
    await page.getByRole('link', { name: AssessmentTitle }).click();
    await page.waitForLoadState('networkidle');
    await page.getByRole('link', { name: Risk }).click();
    await page.waitForTimeout(5000);
   

    await page.locator('.grid-dropdown.editable.gridCell-has-constraints').nth(0).click();
    await page.locator('#select2-drop').filter(FinancialRating).click();
    await page.locator('.grid-dropdown.editable.gridCell-has-constraints').nth(1).click();
    await page.locator('#select2-drop').filter(ReputationalRating).click();
    await page.locator('.grid-dropdown.editable.gridCell-has-constraints').nth(2).click();
    await page.locator('#select2-drop').filter(Likelihood).click();

    await page.locator('button.btn.btn-default.cartridge-action.msi-tooltip.rsk-close-Assess.aui-text-overflow').click();
    //Submission of the assessment

    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('link', { name: 'Send for Approval' }).click();
    await page.locator('#submit').click();
    const submission = page.locator('[data-action="formSubmitSuccess"]');
    await expect(submission).toBeVisible();
    await page.screenshot({ path: 'tests/screenshots/MS-RiskAssessment.png', fullPage: true });




});