const { When, Then, Given } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { chromium } = require('playwright');
const testData = require('./ISMTestdata');

//scenario 1

Given('Login to as Issue initiator', { timeout: 60 * 1000 }, async () => {

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage();
    await this.page.goto(testData.URL);
    await this.page.getByRole('textbox', { name: 'Username' }).fill(testData.Username);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(testData.Password);
    await this.page.getByRole('button', { name: 'Sign In' }).click();

});

When('open the Issue creation form', { timeout: 60 * 1000 }, async () => {
    await this.page.getByRole('button', { name: 'More InfoCenters,Press escape to close the menu' }).hover();
    await this.page.getByRole('link', { name: 'Issues' }).click();
    await this.page.getByRole('button', { name: 'Forms' }).click();
    await this.page.getByRole('link', { name: 'Open Form Issue' }).click();
    await this.page.waitForLoadState('networkidle');

});


Then('Fill the Issue details and action details', { timeout: 60 * 1000 },  async () => {

    await this.page.getByRole('textbox', { name: 'Title' }).fill(testData.IssueTitle);
    await this.page.locator('#rtfDataread_ISSUE_DETAILS').click();
    // Wait for iframe to be attached 
    const DescriptionFrame = this.page.frameLocator('#mce_0_ifr');
    await DescriptionFrame.locator('#tinymce').fill(testData.IssueDescription);
    await this.page.getByRole('button', { name: 'Save Changes' }).click();
    await this.page.getByRole('textbox', { name: 'Issue Due Date' }).fill(testData.IssueDueDate);
    await this.page.locator("//a[contains(@aria-label,'Action Approval By: Issue Owner')]//b[contains(@class,'pick icon-format icn icn-caret-down')]").click();
    await this.page.locator('.select2-result-label').filter({ hasText: testData.ActionApprovalBy }).click();
    await this.page.keyboard.press('Escape');
    //await this.page.getByRole('textbox', { name: 'Rating' }).click();
    await this.page.getByRole('combobox', { name: 'Rating' }).click();
    await this.page.locator('.select2-result-label').filter({ hasText: testData.Rating }).click();
    await this.page.keyboard.press('Escape');
    await this.page.getByRole('combobox', { name: 'Source Type' }).click();
    await this.page.locator('.select2-result-label').filter({ hasText: testData.IssueSourcetype }).click();
    await this.page.keyboard.press('Escape');
    await this.page.getByRole('button', { name: 'Owner Organization, Press to' }).click();
    await this.page.getByRole('treeitem', { name: testData.OwnerOrg }).click();
    await this.page.locator('#addTuple').click();
    await this.page.getByTitle('Owner, Press to Change').click();
    await this.page.getByRole('searchbox', { name: 'Owner Type a name' }).fill(testData.Owner);
    await this.page.keyboard.press('Enter');
    await this.page.getByRole('radio', { name: `${testData.Owner}, Select the row` }).click();
    await this.page.getByRole('button', { name: 'Done' }).click();
    await this.page.getByRole('button', { name: 'Initial Approver Organization' }).click();
    await this.page.getByRole('treeitem', { name: testData.InitialApproverOrg }).click();
    await this.page.locator('#addTuple').click();
    await this.page.getByTitle('Initial Approver, Press to').click();
    await this.page.getByRole('searchbox', { name: 'Initial Approver Type a name' }).fill(testData.InitialApprover);
    await this.page.keyboard.press('Enter');
    await this.page.getByRole('radio', { name: `${testData.InitialApprover}, Select the row` }).click();
    await this.page.getByRole('button', { name: 'Done' }).click();
    await this.page.getByRole('button', { name: 'Action Plan Approver' }).click();
    await this.page.getByRole('treeitem', { name: testData.ActionPlanApproverOrg }).click();
    await this.page.locator('#addTuple').click();
    await this.page.getByTitle('Action Plan Approver, Press').click();
    await this.page.getByRole('searchbox', { name: 'Action Plan Approver Type a name' }).fill(testData.ActionPlanApprover);
    await this.page.keyboard.press('Enter');
    await this.page.getByRole('radio', { name: `${testData.ActionPlanApprover}, Select the row` }).click();
    await this.page.getByRole('button', { name: 'Done' }).click();
    await this.page.getByRole('button', { name: 'Final Approver Organization,' }).click();
    await this.page.getByRole('treeitem', { name: testData.FinalApproverOrg }).click();
    await this.page.locator('#addTuple').click();
    await this.page.getByTitle('Final Approver, Press to').click();
    await this.page.getByRole('searchbox', { name: 'Final Approver Type a name' }).fill(testData.FinalApprover);
    await this.page.keyboard.press('Enter');
    await this.page.getByRole('radio', { name: `${testData.FinalApprover}, Select the row` }).click();
    await this.page.getByRole('button', { name: 'Done' }).click();
    // Action Plan tab
    await this.page.getByRole('button', { name: 'Add Actions' }).click();
    await this.page.getByRole('gridcell', { name: 'Press enter to edit' }).first().click();
    await this.page.getByRole('textbox', { name: 'Maximum number of characters' }).fill(testData.ActionTitle);
    await this.page.getByRole('gridcell', { name: 'Press enter to edit' }).nth(1).click();
    const ActionDescriptionFrame = this.page.frameLocator('#mce_19_ifr');
    await ActionDescriptionFrame.locator('#tinymce').fill(testData.ActionDescription);
    await this.page.getByRole('button', { name: 'Save Changes' }).click();
    await this.page.getByRole('gridcell', { name: 'Press enter to edit' }).nth(2).click();
    await this.page.getByRole('searchbox', { name: 'Owner Type a name' }).fill(testData.ActionOwner);
    await this.page.keyboard.press('Enter');
    await this.page.getByRole('radio', { name: `${testData.ActionOwner}, Select the row` }).click();
    await this.page.getByRole('button', { name: 'Done' }).click();
    await this.page.getByRole('gridcell', { name: 'Press enter to edit' }).nth(3).click();
    await this.page.getByRole('textbox', { name: 'MM/DD/YYYY' }).fill(testData.ActionStartDate);
    await this.page.keyboard.press('Enter');
});

When('Submit the Issue form.',{ timeout: 90 * 1000 }, async () => {
    await this.page.locator('#btn-submit').click();
    await this.page.getByRole('link', { name: 'Send for Approval' }).click();
    await this.page.locator('#submit').click();
    //const submission = this.page.locator('[data-action="formSubmitSuccess"]');
    //await expect(submission).toBeVisible();
    await this.page.waitForTimeout(35000);
    await this.page.getByLabel('User Profile,Show my Profile details and options', { exact: true }).hover();
    await this.page.locator('//li[@class=\'dropdown users-menu\']//a[@data-bypass=\'true\'][normalize-space()=\'Sign Out\']').click();
    await this.page.getByRole('button', { name: 'Sign Out' }).click();
});

//Scenario 2

Given('Login as Initial approver', { timeout: 90 * 1000 },async () => {
    await this.page.getByRole('textbox', { name: 'Username' }).fill(testData.InitialApproverUsername);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(testData.Password);
    await this.page.getByRole('button', { name: 'Sign In' }).click();
    await this.page.waitForLoadState('networkidle');
});


When('Access the Issue form at initial approver stage from my task list',{ timeout: 90 * 1000 }, async () => {
    await this.page.getByRole('button', { name: 'My Tasks,List all Tasks' }).click();
    await this.page.waitForLoadState('networkidle');
    await this.page.getByRole('link', { name: testData.IssueTitle }).nth(0).click();
    await this.page.waitForTimeout(5000);
});


Then('Review the Issue details and approve it.', { timeout: 90 * 1000 }, async () => {
    await this.page.waitForTimeout(5000);
    await this.page.locator('#btn-submit').click();
    await this.page.getByRole('link', { name: 'Approve Issue' }).click();
    await this.page.locator('#submit').click();
    await this.page.waitForTimeout(10000);
    await this.page.getByLabel('User Profile,Show my Profile details and options', { exact: true }).hover();
    await this.page.locator('//li[@class=\'dropdown users-menu\']//a[@data-bypass=\'true\'][normalize-space()=\'Sign Out\']').click();
    await this.page.getByRole('button', { name: 'Sign Out' }).click();
});


// Scenario 3

Given('Login as Issue owner at manage stage', { timeout: 90 * 1000 }, async () => {
    await this.page.getByRole('textbox', { name: 'Username' }).fill(testData.OwnerUsername);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(testData.Password);
    await this.page.getByRole('button', { name: 'Sign In' }).click();
    await this.page.waitForLoadState('networkidle');

});

When('Access the Manage Issue task from my task list', { timeout: 90 * 1000 }, async () => {
    await this.page.getByRole('button', { name: 'My Tasks,List all Tasks' }).click();
    await this.page.waitForLoadState('networkidle');
    await this.page.getByRole('link', { name: testData.IssueTitle }).nth(0).click();
    await this.page.waitForTimeout(5000);
});

Then('submit for approval.', { timeout: 90 * 1000 }, async () => {
    await this.page.waitForTimeout(3000);
    await this.page.locator('#btn-submit').click();
    await this.page.getByRole('link', { name: 'Send for Approval' }).click();
    await this.page.locator('#submit').click();
    await this.page.waitForTimeout(10000);
    await this.page.getByLabel('User Profile,Show my Profile details and options', { exact: true }).hover();
    await this.page.locator('//li[@class=\'dropdown users-menu\']//a[@data-bypass=\'true\'][normalize-space()=\'Sign Out\']').click();
    await this.page.getByRole('button', { name: 'Sign Out' }).click();
     
});


// Scenario 4

Given('Login as Action plan approver', { timeout: 90 * 1000 }, async () => {
    await this.page.getByRole('textbox', { name: 'Username' }).fill(testData.ActionPlanApproverUsername);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(testData.Password);
    await this.page.getByRole('button', { name: 'Sign In' }).click();
    await this.page.waitForLoadState('networkidle');
});

When('Access the Issue form at Action plan approver stage from my task list',{ timeout: 90 * 1000 },async () => {
    await this.page.getByRole('button', { name: 'My Tasks,List all Tasks' }).click();
    await this.page.waitForLoadState('networkidle');
    await this.page.getByRole('link', { name: testData.IssueTitle }).nth(0).click();
    await this.page.waitForLoadState('networkidle');
});

Then('Review the Issue details, Initiate the actions.', { timeout: 90 * 1000 }, async () => {
    await this.page.waitForTimeout(7000);
    await this.page.locator('#btn-submit').click();
    await this.page.getByRole('link', { name: 'Approve and Initiate Actions' }).click();
    await this.page.locator('#submit').click();
    await this.page.waitForTimeout(10000);
    await this.page.getByLabel('User Profile,Show my Profile details and options', { exact: true }).hover();
    await this.page.locator('//li[@class=\'dropdown users-menu\']//a[@data-bypass=\'true\'][normalize-space()=\'Sign Out\']').click();
    await this.page.getByRole('button', { name: 'Sign Out' }).click();
    await this.page.waitForTimeout(4000);
});


// Scenario 5

Given('Login as Action owner', { timeout: 90 * 1000 }, async () => {

    await this.page.getByRole('textbox', { name: 'Username' }).fill(testData.ActionOwnerUsername);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(testData.Password);
    await this.page.getByRole('button', { name: 'Sign In' }).click();
    await this.page.waitForLoadState('networkidle');
});

When('Access the action task from my task list.', { timeout: 90 * 1000 }, async () => {
    await this.page.getByRole('button', { name: 'My Tasks,List all Tasks' }).click();
    await this.page.waitForTimeout(3000);
    await this.page.getByRole('link', { name: testData.ActionTitle }).nth(0).click();
    await this.page.waitForLoadState('load');
});

Then('Review the action details, fill the action details and complete the action.', { timeout: 90 * 1000 }, async () => {
    await this.page.waitForTimeout(5000);
    await this.page.getByRole('textbox', { name: 'Work Done' }).click();
    const workdoneFrame = this.page.frameLocator('#mce_0_ifr');
    await workdoneFrame.locator('#tinymce').fill(testData.Actionworkdone);
    await this.page.getByRole('button', { name: 'Save Changes' }).click();
    await this.page.getByRole('textbox', { name: 'Result' }).click();
    const resultFrame = this.page.frameLocator('#mce_19_ifr');
    await resultFrame.locator('#tinymce').fill(testData.Actionresult);
    await this.page.getByRole('button', { name: 'Save Changes' }).click();
    await this.page.locator('#btn-submit').click();
    await this.page.getByRole('link', { name: 'Close Action' }).click();
    await this.page.getByRole('textbox', { name: 'Comments' }).fill(testData.ActionComments);
    await this.page.locator('#submit').click();
    await this.page.waitForTimeout(10000);
    //const submission5 = this.page.locator('[data-action="formSubmitSuccess"]');
    //await expect(submission5).toBeVisible();
    await this.page.getByLabel('User Profile,Show my Profile details and options', { exact: true }).hover();
    await this.page.locator('//li[@class=\'dropdown users-menu\']//a[@data-bypass=\'true\'][normalize-space()=\'Sign Out\']').click();
    await this.page.getByRole('button', { name: 'Sign Out' }).click();
});


//Scenario 6
Given('Login as Issue owner at monitor stage', { timeout: 90 * 1000 }, async () => {
    await this.page.getByRole('textbox', { name: 'Username' }).fill(testData.OwnerUsername);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(testData.Password);
    await this.page.getByRole('button', { name: 'Sign In' }).click();
    await this.page.waitForLoadState('networkidle');
});

When('Access the Issue form', { timeout: 90 * 1000 }, async () => {
    await this.page.getByRole('button', { name: 'My Tasks,List all Tasks' }).click();
    await this.page.waitForLoadState('networkidle');
    await this.page.getByRole('link', { name: testData.IssueTitle }).nth(0).click();
    await this.page.waitForLoadState('networkidle');
});


Then('submit the Issue form to final approval.', { timeout: 90 * 1000 }, async () => {
    await this.page.waitForTimeout(5000);
    await this.page.getByRole('textbox', { name: 'Issue Resolution Summary' }).click();
    const IssueresolutionFrame = this.page.frameLocator('#mce_0_ifr');
    await IssueresolutionFrame.locator('#tinymce').fill(testData.IssueResolutionSummary);
    await this.page.getByRole('button', { name: 'Save Changes' }).click();
    await this.page.locator('#btn-submit').click();
    await this.page.getByRole('link', { name: 'Close Issue' }).click();
    await this.page.getByRole('textbox', { name: 'Comments' }).fill(testData.IssueClosureComments);
    await this.page.locator('#submit').click();
    await this.page.waitForTimeout(10000);
    //const submission6 = this.page.locator('[data-action="formSubmitSuccess"]');
    //await expect(submission6).toBeVisible();
    await this.page.getByLabel('User Profile,Show my Profile details and options', { exact: true }).hover();
    await this.page.locator('//li[@class=\'dropdown users-menu\']//a[@data-bypass=\'true\'][normalize-space()=\'Sign Out\']').click();
    await this.page.getByRole('button', { name: 'Sign Out' }).click();

});

//Scenario 7

Given('Login as Final approver', { timeout: 90 * 1000 }, async () => {
    await this.page.getByRole('textbox', { name: 'Username' }).fill(testData.FinalApproverUsername);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(testData.Password);
    await this.page.getByRole('button', { name: 'Sign In' }).click();
    await this.page.waitForLoadState('networkidle');
});

When('Access the Issue form at final approver stage', { timeout: 90 * 1000 }, async () => {
    await this.page.getByRole('button', { name: 'My Tasks,List all Tasks' }).click();
    await this.page.waitForLoadState('load');
    await this.page.getByRole('link', { name: testData.IssueTitle }).nth(0).click();
    await this.page.waitForLoadState('networkidle');
});

Then('close the Issue form..', { timeout: 90 * 1000 }, async () => {

    await this.page.waitForTimeout(6000);
    await this.page.locator('#btn-submit').click();
    await this.page.getByRole('link', { name: 'Approve and Close Issue' }).click();
    await this.page.locator('#submit').click();
    await this.page.waitForTimeout(10000);

    //const submission7 = this.page.locator('[data-action="formSubmitSuccess"]');
    //await expect(submission7).toBeVisible();
});
