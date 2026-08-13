const { When, Then, Given } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { chromium } = require('playwright');
const testData = require('./RiskAssessmentWFTestData');

//Scenario 1
Given('Login to application with {string} and {string}', { timeout: 60 * 1000 }, async (username, password) => {

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage();
    await this.page.goto(testData.URL);
    await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.page.getByRole('button', { name: 'Sign In' }).click();

});

When('open the Risk Assessment Plan form', { timeout: 60 * 1000 }, async () => {

    await this.page.getByRole('link', { name: 'Risk Assessments' }).click();
    await this.page.getByRole('button', { name: 'Forms' }).click();
    await this.page.getByRole('link', { name: 'Open Form Risk Assessment Plan' }).click();
    await this.page.waitForLoadState('networkidle');

});


Then('Fill Risk Assessment Plan with title {string},and Assessment title as {string} and other details', { timeout: 100 * 1000 }, async (PlanName, AssessmentTitle) => {
    // Fill Title
    const nameField = this.page.getByRole('textbox', { name: 'Name' });
    await nameField.fill(PlanName);
    await expect(nameField).toHaveValue(PlanName);
    // Select Perspective
    await this.page.getByRole('combobox', { name: 'Perspective' }).click();
    await this.page.locator('.select2-result-label').filter({ hasText: testData.Perspective }).click();
    await this.page.keyboard.press('Escape');
    // selecting Use Settings from Perspective
    await this.page.getByRole('checkbox', { name: 'Use Settings from Perspective' }).check();
    //selecting the Purpose/scope
    await this.page.locator('#rtfDataread_PURPOSE_SCOPE').click();
    // Wait for iframe to be attached 
    const PurposeFrame = this.page.frameLocator('#mce_0_ifr');
    await PurposeFrame.locator('#tinymce').fill(testData.PurposeScope);
    await this.page.getByRole('button', { name: 'Save Changes' }).click();
    // Select Owner Organization
    await this.page.getByRole('button', { name: /Owner Organizations, Press to Change required/i }).click();
    await this.page.getByRole('treeitem', { name: testData.OwnerOrg }).click();
    await this.page.getByRole('button', { name: 'Add' }).click();
    //Selecting the Frequency 
    await this.page.getByRole('combobox', { name: 'Frequency' }).click();
    await this.page.locator('.select2-result-label').filter({ hasText: testData.Frequency }).click();
    await this.page.keyboard.press('Escape');
    //selecting the specific date
    await this.page.getByRole('textbox', { name: 'Next Scheduled Date' }).fill(testData.NextReviewDate);
    await this.page.keyboard.press('Enter');
    //Assessment scope
    await this.page.getByRole('button', { name: 'Add Scope' }).click();
    await this.page.locator("//fieldset[@class='dropdownCartridge']//input[@placeholder='Name']").fill(AssessmentTitle);
    await this.page.locator("//div[contains(@class,'btn btn-default bhwIcon ASSESS_BH_BHWidget invokeBHWidget')]//i[contains(@class,'icn icn-plus-t')]").click();
    await this.page.getByRole('treeitem', { name: testData.OwnerOrg }).click();
    await this.page.getByRole('button', { name: 'Add' }).click();
    // Selecting Assessable items
    const assessableBtn = this.page.locator("button[title^='Assessable Items']");
    await expect(assessableBtn).toBeVisible({ timeout: 15000 });
    await expect(assessableBtn).toBeEnabled({ timeout: 15000 });
    await assessableBtn.click();
    const assessableInput = this.page.locator('.popupSearchbox');
    await assessableInput.fill(testData.Process);
    await this.page.keyboard.press('Enter');
    await this.page.getByRole('checkbox', { name: `${testData.Process}` }).check();
    await this.page.getByTitle('Done').click();
    const Riskbtn = this.page.locator("button[title^='Risks']");
    await expect(Riskbtn).toBeVisible({ timeout: 15000 });
    await expect(Riskbtn).toBeEnabled({ timeout: 15000 });
    await Riskbtn.click();
    const riskInput = this.page.locator('.tp-search-input');
    await riskInput.fill(testData.Risk);
    await this.page.keyboard.press('Enter');
    await this.page.getByRole('checkbox', { name: `${testData.Risk}` }).check();
    await this.page.getByRole('button', { name: 'Done' }).click();
    await this.page.getByRole('button', { name: 'Done' }).click();

});

When('Submit the Risk Assessment plan form.', { timeout: 60 * 1000 }, async () => {
    await this.page.getByRole('button', { name: 'Send for Approval' }).click();
    await this.page.getByRole('button', { name: 'Submit' }).click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(35000);
    const successMessage = this.page.getByText('Form submitted successfully');
    await expect(successMessage).toBeVisible();
    await successMessage.screenshot({ path: 'tests/screenshots/MS-Riskplan.png' });
    await this.page.waitForTimeout(3000);
});

//Scenario 2

Given('Login as ORM Program Manager with {string} and {string}', { timeout: 60 * 1000 }, async (TaskInitiator, TaskInitiatorPassword) => {

    await this.page.goto(testData.URL);
    await this.page.getByRole('textbox', { name: 'Username' }).fill(TaskInitiator);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(TaskInitiatorPassword);
    await this.page.getByRole('button', { name: 'Sign In' }).click();
});

When('open the Risk Assessment Task form', { timeout: 60 * 1000 }, async () => {

    //Generating the Risk Assessment from the Adhoc task
    await this.page.getByRole('link', { name: 'Risk Assessments' }).click();
    await this.page.getByRole('button', { name: 'Forms' }).click();
    await this.page.getByRole('link', { name: 'Open Form Risk Assessment Task' }).click();
    await this.page.waitForLoadState('networkidle');

});

Then('Fill Risk Assessment Task form by selecting {string},and other details', { timeout: 60 * 1000 }, async (PlanName) => {

    await this.page.locator('b.pick.icon-format.icn.icn-list-search.searchInsideIcon').click();
    await this.page.locator('.popupSearchbox').fill(PlanName);
    await this.page.keyboard.press('Enter');
    await this.page.getByRole('radio', { name: `${PlanName}, Select the row` }).check();
    await this.page.getByRole('button', { name: 'Done' }).click();
    await this.page.getByRole('checkbox', { name: 'Inherit Assessment Scope' }).check();
    await this.page.waitForTimeout(2000);
    await this.page.getByRole('combobox', { name: 'Available To' }).click();
    await this.page.locator('.select2-result-label').filter({ hasText: 'Assessor' }).click();

    await this.page.getByRole('application').filter({ hasText: 'Assessor' }).click();
    await this.page.locator('.popupSearchbox').fill(testData.Assessor);
    await this.page.keyboard.press('Enter');
    await this.page.getByRole('radio', { name: `${testData.Assessor}, Select the row` }).check();
    await this.page.getByRole('button', { name: 'Done' }).click();

    await this.page.getByRole('application').filter({ hasText: 'Approver' }).click();
    await this.page.locator('.popupSearchbox').fill(testData.Approver);
    await this.page.keyboard.press('Enter');
    await this.page.getByRole('radio', { name: `${testData.Approver}, Select the row` }).check();
    await this.page.getByRole('button', { name: 'Done' }).click();
    await this.page.getByPlaceholder('Due Date').fill(testData.DueDate);
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(2000);
});

When('Submit the Risk Assessment Task form.', { timeout: 60 * 1000 }, async () => {
    await this.page.locator('#btn-submit').click();
    await this.page.locator('#submit').click();
    const submission = this.page.locator('[data-action="formSubmitSuccess"]');
    await expect(submission).toBeVisible();
    await this.page.screenshot({ path: 'tests/screenshots/MS-Risktask.png', fullPage: true });
    await this.page.waitForTimeout(3000);
    await this.page.getByLabel('User Profile,Show my Profile details and options', { exact: true }).hover();
    await this.page.locator('//li[@class=\'dropdown users-menu\']//a[@data-bypass=\'true\'][normalize-space()=\'Sign Out\']').click();
    await this.page.getByRole('button', { name: 'Sign Out' }).click();
});

//Scenario 3

Given('Login as Assessor with {string} and {string}', { timeout: 60 * 1000 }, async (Assessor, AssessorPassword) => {

    await this.page.goto(testData.URL);
    await this.page.getByRole('textbox', { name: 'Username' }).fill(Assessor);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(AssessorPassword);
    await this.page.getByRole('button', { name: 'Sign In' }).click();
});

When('Access the Risk Assessment {string} from my task list', { timeout: 60 * 1000 }, async (AssessmentTitle) => {
    await this.page.getByRole('button', { name: 'My Tasks,List all Tasks' }).click();
    await this.page.getByRole('link', { name: AssessmentTitle }).click();
    await this.page.waitForLoadState('networkidle');

});

Then('Perform the Risk Assessment by filling the form and providing necessary details', { timeout: 80 * 1000 }, async () => {
    await this.page.getByRole('link', { name: testData.Risk }).click();
    await this.page.waitForTimeout(3000);
    await this.page.locator('.grid-dropdown.editable.gridCell-has-constraints').nth(0).click();
    await this.page.locator('#select2-drop').filter(testData.FinancialRating).click();
    await this.page.locator('.grid-dropdown.editable.gridCell-has-constraints').nth(1).click();
    await this.page.locator('#select2-drop').filter(testData.ReputationalRating).click();
    await this.page.locator('.grid-dropdown.editable.gridCell-has-constraints').nth(2).click();
    await this.page.locator('#select2-drop').filter(testData.Likelihood).click();
    await this.page.locator('button.btn.btn-default.cartridge-action.msi-tooltip.rsk-close-Assess.aui-text-overflow').click();
});


When('Submit the Risk Assessment form for approval.', { timeout: 100 * 1000 }, async () => {
    await this.page.getByRole('button', { name: 'Submit' }).click();
    await this.page.getByRole('link', { name: 'Send for Approval' }).click();
    await this.page.locator('#submit').click();
    const submission = this.page.locator('[data-action="formSubmitSuccess"]');
    await expect(submission).toBeVisible();
    await this.page.screenshot({ path: 'tests/screenshots/MS-RiskAssessment.png', fullPage: true });
    await this.page.waitForTimeout(8000);
    await this.page.getByLabel('User Profile,Show my Profile details and options', { exact: true }).hover();
    await this.page.locator('//li[@class=\'dropdown users-menu\']//a[@data-bypass=\'true\'][normalize-space()=\'Sign Out\']').click();
    await this.page.getByRole('button', { name: 'Sign Out' }).click();
});


//Scenario 4 

Given('Login as approver with {string} and {string}', { timeout: 60 * 1000 }, async (Approver, ApproverPassword) => {

    await this.page.goto(testData.URL);
    await this.page.getByRole('textbox', { name: 'Username' }).fill(Approver);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(ApproverPassword);
    await this.page.getByRole('button', { name: 'Sign In' }).click();
    await this.page.waitForLoadState('networkidle');
});

When('Access the Risk Assessment approval task {string} from my task list', { timeout: 80 * 1000 }, async (AssessmentTitle) => {

    await this.page.getByRole('button', { name: 'My Tasks,List all Tasks' }).click();
    await this.page.getByRole('link', { name: AssessmentTitle }).click();
    await this.page.waitForLoadState('networkidle');

});

Then('Review the Risk Assessment details and approve it.', { timeout: 80 * 1000 }, async () => {
    await this.page.waitForTimeout(3000);
    await this.page.getByRole('button', { name: 'Submit' }).click();
    await this.page.getByRole('link', { name: 'Approve' }).click();
    await this.page.locator("textarea[title='Comments']").fill(testData.ApproverComments);
    await this.page.locator('#submit').click();
    const submission = this.page.locator('[data-action="formSubmitSuccess"]');
    await expect(submission).toBeVisible();
    await this.page.screenshot({ path: 'tests/screenshots/MS-RiskAssessmentApproval form.png', fullPage: true });
    await this.page.waitForTimeout(3000);
});