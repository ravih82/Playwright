import { test, expect } from '@playwright/test';
const testData = require('../features/step_definitions/NordeaISM-Testdata');

test('Nordea Issue Creation', async ({ page }) => {
    test.setTimeout(900000); // 15 minutes
    
        //login to application
        await page.goto(testData.URL);
        await page.getByRole('textbox', { name: 'Username' }).fill(testData.Username);
        await page.getByRole('textbox', { name: 'Password' }).fill(testData.Password);
        await page.getByRole('button', { name: 'Sign In' }).click();
        await page.waitForLoadState('networkidle');

        //open the Issue form
        await page.getByRole('button', { name: 'More InfoCenters,Press escape to close the menu' }).hover();
        await page.getByRole('link', { name: 'Issue Management' }).click();
        await page.getByRole('link', { name: 'Issues', exact: true }).click();
        await page.getByRole('button', { name: 'Forms' }).click();
        await page.getByRole('link', { name: 'Open Form Issue' }).click();
        await page.waitForLoadState('networkidle');

        //Fill the Issue details and action details
        await page.getByRole('textbox', { name: 'Title' }).fill(testData.IssueTitle);

        await page.locator('#rtfDataread_ISSUE_DETAILS').click();
        // Wait for iframe to be attached 
        const DescriptionFrame = page.frameLocator('#mce_0_ifr');
        await DescriptionFrame.locator('#tinymce').fill(testData.IssueDescription);
        await page.getByRole('button', { name: 'Save Changes' }).click();

        await page.getByRole('textbox', { name: 'Issue Due Date' }).fill(testData.IssueDueDate);
         await page.keyboard.press('Escape');
        await page.getByRole('combobox', { name: 'Rating' }).click();
        await page.locator('.select2-result-label').filter({ hasText: testData.Rating }).click();
        await page.keyboard.press('Escape');
        //Related Risks, Press to Change, Required
        await page.getByTitle('Related Risks, Press to Change, Required').click();
        await page.waitForLoadState('networkidle');
        await page.locator('input.tp-search-input').fill(testData.RelatedRisk);
        await page.keyboard.press('Enter');
        await page.getByRole('checkbox', { name: `${testData.RelatedRisk}` }).click();
        await page.getByRole('button', { name: 'Done' }).click();

        await page.getByRole('combobox', { name: 'Source Type' }).click();
        await page.locator('.select2-result-label').filter({ hasText: testData.IssueSourcetype }).click();
        await page.keyboard.press('Escape');

        await page.getByRole('button', { name: 'Owner Organization, Press to' }).click();
        await page.getByRole('treeitem', { name: testData.OwnerOrg_LOB , exact: true }).click();
        await page.getByRole('treeitem', { name: testData.OwnerOrg_Location , exact: true }).click();
        await page.getByRole('treeitem', { name: testData.OwnerOrg_LE , exact: true }).click();
        await page.locator('#addTuple').click();

        await page.getByTitle('Owner, Press to Change').click();
        await page.getByRole('searchbox', { name: 'Type a name' }).fill(testData.IssueOwner);
        await page.keyboard.press('Enter');
        await page.getByRole('radio', { name: `${testData.IssueOwner}, Select the row` }).click();
        await page.getByRole('button', { name: 'Done' }).click();


        await page.getByRole('button', { name: 'Approver Organization, Press to' }).click();
        await page.getByRole('treeitem', { name: testData.ApproverOrg_LOB , exact: true }).click();
        await page.getByRole('treeitem', { name: testData.ApproverOrg_Location , exact: true }).click();
        await page.getByRole('treeitem', { name: testData.ApproverOrg_LE , exact: true }).click();
        await page.locator('#addTuple').click();

        await page.locator('#s2id_DUMMY_APPROVER').click();
        await page.getByRole('searchbox', { name: 'Type a name' }).fill(testData.Approver);
        await page.keyboard.press('Enter');
        await page.getByRole('radio', { name: `${testData.Approver}, Select the row` }).click();
        await page.getByRole('button', { name: 'Done' }).click();
        
        //Action details
        await page.getByRole('button', { name: 'Add Actions' }).click();
        await page.getByRole('gridcell', { name: 'Press enter to edit' }).first().click();
        await page.getByRole('textbox', { name: 'Maximum number of characters' }).fill(testData.ActionTitle);
        await page.getByRole('gridcell', { name: 'Press enter to edit' }).nth(1).click();
        const ActionDescriptionFrame = page.frameLocator('#mce_19_ifr');
        await ActionDescriptionFrame.locator('#tinymce').fill(testData.ActionDescription);
        await page.getByRole('button', { name: 'Save Changes' }).click();
        await page.getByRole('gridcell', { name: 'Press enter to edit' }).nth(2).click();
        await page.getByRole('treeitem', { name: testData.ActionOwnerOrg_LOB , exact: true }).click();
        await page.getByRole('treeitem', { name: testData.ActionOwnerOrg_Location , exact: true }).click();
        await page.getByRole('treeitem', { name: testData.ActionOwnerOrg_LE , exact: true }).click();
        await page.locator('#addTuple').click();
        await page.getByRole('gridcell', { name: 'Press enter to edit' }).nth(3).click();
        await page.getByRole('searchbox', { name: 'Type a name' }).fill(testData.ActionOwner);
        await page.keyboard.press('Enter');
        await page.getByRole('radio', { name: `${testData.ActionOwner}, Select the row` }).click();
        await page.getByRole('button', { name: 'Done' }).click();
        await page.getByRole('gridcell', { name: 'Press enter to edit' }).nth(4).click();
        await page.getByRole('treeitem', { name: testData.ActionApproverOrg_LOB , exact: true }).click();
        await page.getByRole('treeitem', { name: testData.ActionApproverOrg_Location , exact: true }).click();
        await page.getByRole('treeitem', { name: testData.ActionApproverOrg_LE , exact: true }).click();
        await page.locator('#addTuple').click();
        await page.getByRole('gridcell', { name: 'Press enter to edit' }).nth(5).click();
        await page.getByRole('searchbox', { name: 'Type a name' }).fill(testData.ActionApprover);
        await page.keyboard.press('Enter');
        await page.getByRole('radio', { name: `${testData.ActionApprover}, Select the row` }).click();
        await page.getByRole('button', { name: 'Done' }).click();

        await page.getByRole('gridcell', { name: 'Press enter to edit' }).nth(7).click();
        await page.getByRole('textbox', { name: 'DD/MM/YYYY' }).fill(testData.ActionDueDate);
        await page.keyboard.press('Enter');

        //Form submission
        await page.locator('#btn-submit').click();
        await page.getByRole('link', { name: 'Send for Approval' }).click();
      
        const submit = page.locator('#submit');
        for (let i = 0; i < 2; i++)
         { await submit.click(); }

        //const submission = page.locator('[data-action="formSubmitSuccess"]');
        //await expect(submission).toBeVisible();
        await page.waitForTimeout(10000);
        await page.getByLabel('User Profile,Show my Profile details and options', { exact: true }).hover();
        await page.locator('//li[@class=\'dropdown users-menu\']//a[@data-bypass=\'true\'][normalize-space()=\'Sign Out\']').click();
        await page.getByRole('button', { name: 'Sign Out' }).click();
        
   // Initiate the approval process by logging in as the approver
        await page.getByRole('textbox', { name: 'Username' }).fill(testData.ApproverUsername);
        await page.getByRole('textbox', { name: 'Password' }).fill(testData.Password);
        await page.getByRole('button', { name: 'Sign In' }).click();
        await page.waitForLoadState('networkidle');
        await page.getByRole('button', { name: 'My Tasks,List all Tasks' }).click();
        await page.waitForLoadState('networkidle');
        await page.getByRole('link', { name: testData.IssueTitle }).click();
        await page.waitForTimeout(7000);
        await page.locator('#btn-submit').click();
        await page.getByRole('link', { name: 'Approve Issue' }).click();
        await page.locator('#submit').click();
        await page.waitForTimeout(10000);
        await page.getByLabel('User Profile,Show my Profile details and options', { exact: true }).hover();
        await page.locator('//li[@class=\'dropdown users-menu\']//a[@data-bypass=\'true\'][normalize-space()=\'Sign Out\']').click();
        await page.getByRole('button', { name: 'Sign Out' }).click();

    //Manage issue by logging in as the issue owner
        await page.getByRole('textbox', { name: 'Username' }).fill(testData.IssueOwnerUsername);
        await page.getByRole('textbox', { name: 'Password' }).fill(testData.Password);
        await page.getByRole('button', { name: 'Sign In' }).click();
        await page.waitForLoadState('networkidle');
        await page.getByRole('button', { name: 'My Tasks,List all Tasks' }).click();
        await page.waitForLoadState('networkidle');
        await page.getByRole('link', { name: testData.IssueTitle }).click();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(7000);
        await page.locator('#btn-submit').click();
        await page.getByRole('link', { name: 'Trigger Actions' }).click();
        await page.locator('#submit').click();
        await page.waitForTimeout(10000);
        await page.getByLabel('User Profile,Show my Profile details and options', { exact: true }).hover();
        await page.locator('//li[@class=\'dropdown users-menu\']//a[@data-bypass=\'true\'][normalize-space()=\'Sign Out\']').click();
        await page.getByRole('button', { name: 'Sign Out' }).click();
        await page.waitForTimeout(5000);
    //Action owner to complete the action by logging in as the action owner
        await page.getByRole('textbox', { name: 'Username' }).fill(testData.ActionOwnerUsername);
        await page.getByRole('textbox', { name: 'Password' }).fill(testData.Password);
        await page.getByRole('button', { name: 'Sign In' }).click();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(5000);
        await page.getByRole('button', { name: 'My Tasks,List all Tasks' }).click();
        await page.getByRole('link', { name: testData.ActionTitle }).click();
        await page.waitForLoadState('load');
        await page.waitForTimeout(5000);
        await page.getByRole('textbox', { name: 'Work Done' }).click();
        const workdoneFrame = page.frameLocator('#mce_0_ifr');
        await workdoneFrame.locator('#tinymce').fill(testData.Actionworkdone);
        await page.getByRole('button', { name: 'Save Changes' }).click();
        await page.getByRole('textbox', { name: 'Result' }).click();
        const resultFrame = page.frameLocator('#mce_19_ifr');
        await resultFrame.locator('#tinymce').fill(testData.Actionresult);
        await page.getByRole('button', { name: 'Save Changes' }).click();
        await page.locator('#btn-submit').click();
        await page.getByRole('link', { name: 'Send for Approval' }).click();
        await page.getByRole('textbox', { name: 'Comments' }).fill(testData.ActionComments);
        await page.locator('#submit').click();
        await page.waitForTimeout(10000);
        await page.getByLabel('User Profile,Show my Profile details and options', { exact: true }).hover();
        await page.locator('//li[@class=\'dropdown users-menu\']//a[@data-bypass=\'true\'][normalize-space()=\'Sign Out\']').click();
        await page.getByRole('button', { name: 'Sign Out' }).click();

        //action approver to approve the action by logging in as the action approver
        await page.getByRole('textbox', { name: 'Username' }).fill(testData.ActionApproverUsername);
        await page.getByRole('textbox', { name: 'Password' }).fill(testData.Password);
        await page.getByRole('button', { name: 'Sign In' }).click();   
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(5000);
        await page.getByRole('button', { name: 'My Tasks,List all Tasks' }).click();
        await page.getByRole('link', { name: testData.ActionTitle }).click();
        await page.waitForLoadState('load'); 
        await page.waitForTimeout(7000);
         await page.locator('#btn-submit').click();
        await page.getByRole('link', { name: 'Approve Action' }).click();
        await page.locator('#submit').click();
        await page.waitForTimeout(10000);
        await page.getByLabel('User Profile,Show my Profile details and options', { exact: true }).hover();
        await page.locator('//li[@class=\'dropdown users-menu\']//a[@data-bypass=\'true\'][normalize-space()=\'Sign Out\']').click();
        await page.getByRole('button', { name: 'Sign Out' }).click();


        //Monitor issue form by issue owner.

        await page.getByRole('textbox', { name: 'Username' }).fill(testData.IssueOwnerUsername);
        await page.getByRole('textbox', { name: 'Password' }).fill(testData.Password);
        await page.getByRole('button', { name: 'Sign In' }).click();
        await page.waitForLoadState('networkidle');
        await page.getByRole('button', { name: 'My Tasks,List all Tasks' }).click();
        await page.waitForLoadState('networkidle');
        await page.getByRole('link', { name: testData.IssueTitle }).click();
        await page.waitForTimeout(7000);
        await page.getByRole('textbox', { name: 'Issue Resolution Summary' }).click();
        const IssueresolutionFrame = page.frameLocator('#mce_0_ifr');
        await IssueresolutionFrame.locator('#tinymce').fill(testData.IssueResolutionSummary);
        await page.getByRole('button', { name: 'Save Changes' }).click();
        await page.locator('#btn-submit').click();
        await page.getByRole('link', { name: 'Close Issue' }).click();
        await page.getByRole('textbox', { name: 'Comments' }).fill(testData.IssueClosureComments);
        await page.locator('#submit').click();
        await page.waitForTimeout(10000);
        await page.getByLabel('User Profile,Show my Profile details and options', { exact: true }).hover();
        await page.locator('//li[@class=\'dropdown users-menu\']//a[@data-bypass=\'true\'][normalize-space()=\'Sign Out\']').click();
        await page.getByRole('button', { name: 'Sign Out' }).click();
        //Final approval
        await page.getByRole('textbox', { name: 'Username' }).fill(testData.ApproverUsername);
        await page.getByRole('textbox', { name: 'Password' }).fill(testData.Password);
        await page.getByRole('button', { name: 'Sign In' }).click();
        await page.waitForLoadState('networkidle');
        await page.getByRole('button', { name: 'My Tasks,List all Tasks' }).click();
        await page.waitForLoadState('networkidle');
        await page.getByRole('link', { name: testData.IssueTitle }).click();
        await page.waitForTimeout(8000);
        await page.locator('#btn-submit').click();
        await page.getByRole('link', { name: 'Approve and Close Issue' }).click();
        await page.locator('#submit').click();
        await page.waitForTimeout(10000);
        await page.getByLabel('User Profile,Show my Profile details and options', { exact: true }).hover();
        await page.locator('//li[@class=\'dropdown users-menu\']//a[@data-bypass=\'true\'][normalize-space()=\'Sign Out\']').click();
        await page.getByRole('button', { name: 'Sign Out' }).click();

        
});
