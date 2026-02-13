import { test, expect } from '@playwright/test';

test('Rskplan Form', async ({ page }) => {
    test.setTimeout(90000);

    // Test data
    const Username = 'ORM_Program_Manager';
    const Password = 'welcome*12';
    const assignmentTitle = 'Rskplan-PW FEB-13';
    const OwnerOrg = 'ACME Corp';
    const Perspective = 'Operational Risk (Scoring Algorithm)';
    const PurposeScope = 'Purpose scope entered';
    const Frequency = 'Specific Date';
    const NextReviewDate = '02/25/2026';
    const AssessmentTitle = 'Assessment Feb13';
    const Process = 'ABFL - Policy Governance - CSB';
    const Risk = 'Strategic Risk';
    const Assessor = 'ERM Program Manager';

    // Login
    await page.goto('https://e1-poc-sandbox.a99d04.metricstream.com/metricstream/auth/signin.jsp');
    await page.getByRole('textbox', { name: 'Username' }).fill(Username);
    await page.getByRole('textbox', { name: 'Password' }).fill(Password);
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Navigate to Risk plan form
    await page.getByRole('link', { name: 'Risk Assessments' }).click();
    await page.getByRole('button', { name: 'Forms' }).click();
    await page.getByRole('link', { name: 'Open Form Risk Assessment Plan' }).click();
    await page.waitForLoadState('networkidle');

    // Fill Title
    const nameField = page.getByRole('textbox', { name: 'Name' });
    await nameField.fill(assignmentTitle);
    await expect(nameField).toHaveValue(assignmentTitle);
    // Select Perspective
    await page.getByRole('combobox', { name: 'Perspective' }).click();
    await page.locator('.select2-result-label').filter({ hasText: Perspective }).click();
    await page.keyboard.press('Escape');
    // selecting Use Settings from Perspective
    await page.getByRole('checkbox', { name: 'Use Settings from Perspective' }).check();


    //selecting the Purpose/scope
    await page.locator('#rtfDataread_PURPOSE_SCOPE').click();
    // Wait for iframe to be attached 
    const PurposeFrame = page.frameLocator('#mce_0_ifr');
    await PurposeFrame.locator('#tinymce').fill(PurposeScope);

    await page.getByRole('button', { name: 'Save Changes' }).click();

    // Select Owner Organization
    await page.getByRole('button', { name: /Owner Organizations, Press to Change required/i }).click();
    await page.getByRole('treeitem', { name: OwnerOrg }).click();
    await page.getByRole('button', { name: 'Add' }).click();
    //Selecting the Frequency 
    await page.getByRole('combobox', { name: 'Frequency' }).click();
    await page.locator('.select2-result-label').filter({ hasText: Frequency }).click();
    await page.keyboard.press('Escape');
    //selecting the specific date
    await page.getByRole('textbox', { name: 'Next Scheduled Date' }).fill(NextReviewDate);
    await page.keyboard.press('Enter');
    //Assessment scope
    await page.getByRole('button', { name: 'Add Scope' }).click();
    await page.locator("//fieldset[@class='dropdownCartridge']//input[@placeholder='Name']").fill(AssessmentTitle);
    await page.locator("//div[contains(@class,'btn btn-default bhwIcon ASSESS_BH_BHWidget invokeBHWidget')]//i[contains(@class,'icn icn-plus-t')]").click();
    await page.getByRole('treeitem', { name: OwnerOrg }).click();
    await page.getByRole('button', { name:'Add'}).click();
    // Selecting Assessable items
    const assessableBtn = page.locator("button[title^='Assessable Items']");
    await expect(assessableBtn).toBeVisible({ timeout: 15000 });
    await expect(assessableBtn).toBeEnabled({ timeout: 15000 });
    await assessableBtn.click();
    const assessableInput = page.locator('.popupSearchbox');
    await assessableInput.fill(Process);
    await page.keyboard.press('Enter');
    await page.getByRole('checkbox', { name: `${Process}` }).check();
    await page.getByTitle('Done').click();
    //await page.getByRole('button', { name: 'Done' }).click();
    //Selecting the Risk 
    const Riskbtn = page.locator("button[title^='Risks']");
    await expect(Riskbtn).toBeVisible({ timeout: 15000 });
    await expect(Riskbtn).toBeEnabled({ timeout: 15000 });
    await Riskbtn.click();
    const riskInput = page.locator('.tp-search-input');
    await riskInput.fill(Risk);
    await page.keyboard.press('Enter');
    await page.getByRole('checkbox', { name: `${Risk}` }).check();
    await page.getByRole('button', { name: 'Done' }).click();

    /* Selecting the Assessor
    const assessorBtn = page.locator("button[title^='Assessor']");
    await expect(assessorBtn).toBeVisible({ timeout: 15000 });
    await expect(assessorBtn).toBeEnabled({ timeout: 15000 });
    await assessorBtn.click();
    await page.getByRole('textbox', { name: 'Assessor Type a name' }).fill(Assessor);
    await page.keyboard.press('Enter');
    await page.getByRole('checkbox', { name: `${Assessor}, Select the row` }).check();
    await page.getByRole('button', { name: 'Done' }).click();*/
    //Closing the assessment selection popup.

    await page.getByRole('button', { name: 'Done' }).click();

    // Submission
    await page.getByRole('button', { name: 'Send for Approval' }).click();
    await page.getByRole('button', { name: 'Submit' }).click();

    const successMessage = page.getByText('Form submitted successfully');
    await expect(successMessage).toBeVisible();
    await successMessage.screenshot({ path: 'tests/screenshots/MS-Riskplan.png' });




});

