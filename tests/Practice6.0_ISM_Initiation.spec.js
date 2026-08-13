import { test, expect } from '@playwright/test';

test('Issue Creation', async ({ page }) => {
    test.setTimeout(120000);

    // Test data
    const Username = 'ORM_Program_Manager';
    const Password = 'welcome*12';
    const IssueTitle = 'ISM-PB8';
    const OwnerOrg = 'ACME Corp';
    const Owner = 'ERM Business User';
    const OwnerUsername = 'ERM_Business_User';
    const IssueDescription = 'Issue description entered';
    const IssueDueDate = '04/30/2026';
    const ActionApprovalBy = 'No Approver';
    const Rating = 'High';
    const IssueSourcetype = 'Audits';
    const InitialApproverOrg = 'ACME Corp';
    const InitialApprover = 'ERM Program Manager';
    const InitialApproverUsername = 'ERM_Program_Manager';
    const ActionPlanApproverOrg = 'ACME Corp';
    const ActionPlanApprover = 'ERM Risk Manager';
    const ActionPlanApproverUsername = 'ERM_Risk_Manager';
    const FinalApproverOrg = 'ACME Corp';
    const FinalApprover = 'ERM Risk Analyst';
    const FinalApproverUsername = 'ERM_Risk_Analyst';
    const IssueResolutionSummary = 'Issue resolution details entered';
    const IssueClosureComments = 'Issue closure comments entered';
    //Action details
    const ActionTitle = 'ISM Action-PB8';
    const ActionDescription = 'Action description entered';
    const ActionStartDate = '04/20/2026';
    const ActionOwner = 'Application Admin';
    const ActionOwnerUsername = 'CSM_Application_Admin';
    const Actionworkdone = 'Work done details entered';
    const Actionresult = 'Action result details entered';
    const ActionComments = 'Closing the action';

    // Login
    await page.goto('https://e1-poc-sandbox.a99d04.metricstream.com/metricstream/auth/signin.jsp');
    await page.getByRole('textbox', { name: 'Username' }).fill(Username);
    await page.getByRole('textbox', { name: 'Password' }).fill(Password);
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Navigate to ISM form
    await page.getByRole('button', { name: 'More InfoCenters,Press escape to close the menu' }).hover();
    await page.getByRole('link', { name: 'Issues' }).click();
    await page.getByRole('button', { name: 'Forms' }).click();
    await page.getByRole('link', { name: 'Open Form Issue' }).click();
    await page.waitForLoadState('networkidle');

    // Fill Issue details
    await page.getByRole('textbox', { name: 'Title' }).fill(IssueTitle);
    await page.locator('#rtfDataread_ISSUE_DETAILS').click();
    // Wait for iframe to be attached 
    const DescriptionFrame = page.frameLocator('#mce_0_ifr');
    await DescriptionFrame.locator('#tinymce').fill(IssueDescription);
    await page.getByRole('button', { name: 'Save Changes' }).click();
    await page.getByRole('textbox', { name: 'Issue Due Date' }).fill(IssueDueDate);
    await page.locator("//a[contains(@aria-label,'Action Approval By: Issue Owner')]//b[contains(@class,'pick icon-format icn icn-caret-down')]").click();
    await page.locator('.select2-result-label').filter({ hasText: ActionApprovalBy }).click();
    await page.keyboard.press('Escape');
    //await page.getByRole('textbox', { name: 'Rating' }).click();
    await page.getByRole('combobox', { name: 'Rating' }).click();
    await page.locator('.select2-result-label').filter({ hasText: Rating }).click();
    await page.keyboard.press('Escape');
    await page.getByRole('combobox', { name: 'Source Type' }).click();
    await page.locator('.select2-result-label').filter({ hasText: IssueSourcetype }).click();
    await page.keyboard.press('Escape');
    await page.getByRole('button', { name: 'Owner Organization, Press to' }).click();
    await page.getByRole('treeitem', { name: OwnerOrg }).click();
    await page.locator('#addTuple').click();
    await page.getByTitle('Owner, Press to Change').click();
    await page.getByRole('searchbox', { name: 'Owner Type a name' }).fill(Owner);
    await page.keyboard.press('Enter');
    await page.getByRole('radio', { name: `${Owner}, Select the row` }).click();
    await page.getByRole('button', { name: 'Done' }).click();
    await page.getByRole('button', { name: 'Initial Approver Organization' }).click();
    await page.getByRole('treeitem', { name: InitialApproverOrg }).click();
    await page.locator('#addTuple').click();
    await page.getByTitle('Initial Approver, Press to').click();
    await page.getByRole('searchbox', { name: 'Initial Approver Type a name' }).fill(InitialApprover);
    await page.keyboard.press('Enter');
    await page.getByRole('radio', { name: `${InitialApprover}, Select the row` }).click();
    await page.getByRole('button', { name: 'Done' }).click();
    await page.getByRole('button', { name: 'Action Plan Approver' }).click();
    await page.getByRole('treeitem', { name: ActionPlanApproverOrg }).click();
    await page.locator('#addTuple').click();
    await page.getByTitle('Action Plan Approver, Press').click();
    await page.getByRole('searchbox', { name: 'Action Plan Approver Type a name' }).fill(ActionPlanApprover);
    await page.keyboard.press('Enter');
    await page.getByRole('radio', { name: `${ActionPlanApprover}, Select the row` }).click();
    await page.getByRole('button', { name: 'Done' }).click();
    await page.getByRole('button', { name: 'Final Approver Organization,' }).click();
    await page.getByRole('treeitem', { name: FinalApproverOrg }).click();
    await page.locator('#addTuple').click();
    await page.getByTitle('Final Approver, Press to').click();
    await page.getByRole('searchbox', { name: 'Final Approver Type a name' }).fill(FinalApprover);
    await page.keyboard.press('Enter');
    await page.getByRole('radio', { name: `${FinalApprover}, Select the row` }).click();
    await page.getByRole('button', { name: 'Done' }).click();
    // Action Plan tab
    await page.getByRole('button', { name: 'Add Actions' }).click();
    await page.getByRole('gridcell', { name: 'Press enter to edit' }).first().click();
    await page.getByRole('textbox', { name: 'Maximum number of characters' }).fill(ActionTitle);
    await page.getByRole('gridcell', { name: 'Press enter to edit' }).nth(1).click();
    const ActionDescriptionFrame = page.frameLocator('#mce_19_ifr');
    await ActionDescriptionFrame.locator('#tinymce').fill(ActionDescription);
    await page.getByRole('button', { name: 'Save Changes' }).click();
    await page.getByRole('gridcell', { name: 'Press enter to edit' }).nth(2).click();
    await page.getByRole('searchbox', { name: 'Owner Type a name' }).fill(ActionOwner);
    await page.keyboard.press('Enter');
    await page.getByRole('radio', { name: `${ActionOwner}, Select the row` }).click();
    await page.getByRole('button', { name: 'Done' }).click();
    await page.getByRole('gridcell', { name: 'Press enter to edit' }).nth(3).click();
    await page.getByRole('textbox', { name: 'MM/DD/YYYY' }).fill(ActionStartDate);
    await page.keyboard.press('Enter');
    //Form submission
    await page.locator('#btn-submit').click();
    await page.getByRole('link', { name: 'Send for Approval' }).click();
    await page.locator('#submit').click();
    const submission = page.locator('[data-action="formSubmitSuccess"]');
    await expect(submission).toBeVisible();
    await page.waitForTimeout(5000);
    await page.getByLabel('User Profile,Show my Profile details and options', { exact: true }).hover();
    await page.locator('//li[@class=\'dropdown users-menu\']//a[@data-bypass=\'true\'][normalize-space()=\'Sign Out\']').click();
    await page.getByRole('button', { name: 'Sign Out' }).click();


    /* Login as Initial Approver to approve the issue
    await page.getByRole('textbox', { name: 'Username' }).fill(InitialApproverUsername);
    await page.getByRole('textbox', { name: 'Password' }).fill(Password);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'My Tasks,List all Tasks' }).click();
    await page.waitForLoadState('networkidle');
    await page.getByRole('link', { name: IssueTitle }).click();
    await page.waitForTimeout(5000);
    await page.locator('#btn-submit').click();
    await page.getByRole('link', { name: 'Approve Issue' }).click();
    await page.locator('#submit').click();
    const submission2 = page.locator('[data-action="formSubmitSuccess"]');
    await expect(submission2).toBeVisible();
    await page.waitForTimeout(5000);
    await page.getByLabel('User Profile,Show my Profile details and options', { exact: true }).hover();
    await page.locator('//li[@class=\'dropdown users-menu\']//a[@data-bypass=\'true\'][normalize-space()=\'Sign Out\']').click();
    await page.getByRole('button', { name: 'Sign Out' }).click();

    //Login as Owner and send it for approval (3rd stage)
    await page.getByRole('textbox', { name: 'Username' }).fill(OwnerUsername);
    await page.getByRole('textbox', { name: 'Password' }).fill(Password);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'My Tasks,List all Tasks' }).click();
    await page.waitForLoadState('networkidle');
    await page.getByRole('link', { name: IssueTitle }).click();
    await page.waitForTimeout(5000);
    await page.locator('#btn-submit').click();
    await page.getByRole('link', { name: 'Send for Approval' }).click();
    await page.locator('#submit').click();
    const submission3 = page.locator('[data-action="formSubmitSuccess"]');
    await expect(submission3).toBeVisible();
    await page.waitForTimeout(5000);
    await page.getByLabel('User Profile,Show my Profile details and options', { exact: true }).hover();
    await page.locator('//li[@class=\'dropdown users-menu\']//a[@data-bypass=\'true\'][normalize-space()=\'Sign Out\']').click();
    await page.getByRole('button', { name: 'Sign Out' }).click();

    //Login as Action Plan Approver and initiate the actions (4th stage)
    await page.getByRole('textbox', { name: 'Username' }).fill(ActionPlanApproverUsername);
    await page.getByRole('textbox', { name: 'Password' }).fill(Password);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'My Tasks,List all Tasks' }).click();
    await page.waitForLoadState('networkidle');
    await page.getByRole('link', { name: IssueTitle }).click();
    await page.waitForTimeout(5000);
    await page.locator('#btn-submit').click();
    await page.getByRole('link', { name: 'Approve and Initiate Actions' }).click();
    await page.locator('#submit').click();
    const submission4 = page.locator('[data-action="formSubmitSuccess"]');
    await expect(submission4).toBeVisible();
    await page.getByLabel('User Profile,Show my Profile details and options', { exact: true }).hover();
    await page.locator('//li[@class=\'dropdown users-menu\']//a[@data-bypass=\'true\'][normalize-space()=\'Sign Out\']').click();
    await page.getByRole('button', { name: 'Sign Out' }).click();

    //Login as Action owner and close the action. (5th stage)

    await page.getByRole('textbox', { name: 'Username' }).fill(ActionOwnerUsername);
    await page.getByRole('textbox', { name: 'Password' }).fill(Password);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'My Tasks,List all Tasks' }).click();
    await page.waitForTimeout(5000);
    await page.getByRole('link', { name: ActionTitle }).click();
    await page.waitForLoadState('load');
    await page.getByRole('textbox', { name: 'Work Done' }).click();
    const workdoneFrame = page.frameLocator('#mce_0_ifr');
    await workdoneFrame.locator('#tinymce').fill(Actionworkdone);
    await page.getByRole('button', { name: 'Save Changes' }).click();
    await page.getByRole('textbox', { name: 'Result' }).click();
    const resultFrame = page.frameLocator('#mce_19_ifr');
    await resultFrame.locator('#tinymce').fill(Actionresult);
    await page.getByRole('button', { name: 'Save Changes' }).click();
    await page.locator('#btn-submit').click();
    await page.getByRole('link', { name: 'Close Action' }).click();
    await page.getByRole('textbox', { name: 'Comments' }).fill(ActionComments);
    await page.locator('#submit').click();
    const submission5 = page.locator('[data-action="formSubmitSuccess"]');
    await expect(submission5).toBeVisible();
    await page.getByLabel('User Profile,Show my Profile details and options', { exact: true }).hover();
    await page.locator('//li[@class=\'dropdown users-menu\']//a[@data-bypass=\'true\'][normalize-space()=\'Sign Out\']').click();
    await page.getByRole('button', { name: 'Sign Out' }).click();

    //Login as Issue Owner at monitor stage to send the issue for closure (6th stage)
    await page.getByRole('textbox', { name: 'Username' }).fill(OwnerUsername);
    await page.getByRole('textbox', { name: 'Password' }).fill(Password);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'My Tasks,List all Tasks' }).click();
    await page.waitForLoadState('networkidle');
    await page.getByRole('link', { name: IssueTitle }).click();
    await page.waitForTimeout(5000);
    await page.getByRole('textbox', { name: 'Issue Resolution Summary' }).click();
    const IssueresolutionFrame = page.frameLocator('#mce_0_ifr');
    await IssueresolutionFrame.locator('#tinymce').fill(IssueResolutionSummary);
    await page.getByRole('button', { name: 'Save Changes' }).click();
    await page.locator('#btn-submit').click();
    await page.getByRole('link', { name: 'Close Issue' }).click();
    await page.getByRole('textbox', { name: 'Comments' }).fill(IssueClosureComments);
    await page.locator('#submit').click();
    const submission6 = page.locator('[data-action="formSubmitSuccess"]');
    await expect(submission6).toBeVisible();
    await page.getByLabel('User Profile,Show my Profile details and options', { exact: true }).hover();
    await page.locator('//li[@class=\'dropdown users-menu\']//a[@data-bypass=\'true\'][normalize-space()=\'Sign Out\']').click();
    await page.getByRole('button', { name: 'Sign Out' }).click();

    //Login as Final Approver to approve the issue closure
    await page.getByRole('textbox', { name: 'Username' }).fill(FinalApproverUsername);
    await page.getByRole('textbox', { name: 'Password' }).fill(Password);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'My Tasks,List all Tasks' }).click();
    await page.waitForLoadState('load');
    await page.getByRole('link', { name: IssueTitle }).click();
    await page.waitForTimeout(5000);
    await page.locator('#btn-submit').click();
    await page.getByRole('link', { name: 'Approve and Close Issue' }).click();
    await page.locator('#submit').click();
    const submission7 = page.locator('[data-action="formSubmitSuccess"]');
    await expect(submission7).toBeVisible();*/















});

