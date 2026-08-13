const { When, Then, Given } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { chromium } = require('playwright');
const testData = require('./NordeaISM-Testdata');


Given('Login to as valid user.',{ timeout: 60 * 1000 }, async () => {
        const browser = await chromium.launch({ headless: false });
        const context = await browser.newContext();
        this.page = await context.newPage();
        await this.page.goto(testData.URL);
        await this.page.getByRole('textbox', { name: 'Username' }).fill(testData.Username);
        await this.page.getByRole('textbox', { name: 'Password' }).fill(testData.Password);
        await this.page.getByRole('button', { name: 'Sign In' }).click();
        
});

When('open the Issue form',{ timeout: 60 * 1000 }, async () => {
        //open the Issue form
        await this.page.getByRole('button', { name: 'More InfoCenters,Press escape to close the menu' }).click();
        await this.page.getByRole('link', { name: 'Issue Management' }).click();
        await this.page.getByRole('link', { name: 'Issues', exact: true }).click();
        await this.page.getByRole('button', { name: 'Forms' }).click();
        await this.page.getByRole('link', { name: 'Open Form Issue' }).click();
        await this.page.waitForLoadState('networkidle');
  
});

Then('Fill the Issue details and action details.',{ timeout: 60 * 1000 }, async () =>
     {
  //Fill the Issue details and action details
         await this.page.getByRole('textbox', { name: 'Title' }).fill(testData.IssueTitle);
 
         await this.page.locator('#rtfDataread_ISSUE_DETAILS').click();
         // Wait for iframe to be attached 
         const DescriptionFrame = this.page.frameLocator('#mce_0_ifr');
         await DescriptionFrame.locator('#tinymce').fill(testData.IssueDescription);
         await this.page.getByRole('button', { name: 'Save Changes' }).click();
 
         await this.page.getByRole('textbox', { name: 'Issue Due Date' }).fill(testData.IssueDueDate);
          await this.page.keyboard.press('Escape');
         await this.page.getByRole('combobox', { name: 'Rating' }).click();
         await this.page.locator('.select2-result-label').filter({ hasText: testData.Rating }).click();
         await this.page.keyboard.press('Escape');
         //Related Risks, Press to Change, Required
         await this.page.getByTitle('Related Risks, Press to Change, Required').click();
         await this.page.waitForLoadState('networkidle');
         await this.page.locator('input.tp-search-input').fill(testData.RelatedRisk);
         await this.page.keyboard.press('Enter');
         await this.page.getByRole('checkbox', { name: `${testData.RelatedRisk}` }).click();
         await this.page.getByRole('button', { name: 'Done' }).click();
 
         await this.page.getByRole('combobox', { name: 'Source Type' }).click();
         await this.page.locator('.select2-result-label').filter({ hasText: testData.IssueSourcetype }).click();
         await this.page.keyboard.press('Escape');
 
         await this.page.getByRole('button', { name: 'Owner Organization, Press to' }).click();
         await this.page.getByRole('treeitem', { name: testData.OwnerOrg_LOB , exact: true }).click();
         await this.page.getByRole('treeitem', { name: testData.OwnerOrg_Location , exact: true }).click();
         await this.page.getByRole('treeitem', { name: testData.OwnerOrg_LE , exact: true }).click();
         await this.page.locator('#addTuple').click();
 
         await this.page.getByTitle('Owner, Press to Change').click();
         await this.page.getByRole('searchbox', { name: 'Type a name' }).fill(testData.IssueOwner);
         await this.page.keyboard.press('Enter');
         await this.page.getByRole('radio', { name: `${testData.IssueOwner}, Select the row` }).click();
         await this.page.getByRole('button', { name: 'Done' }).click();
 
 
         await this.page.getByRole('button', { name: 'Approver Organization, Press to' }).click();
         await this.page.getByRole('treeitem', { name: testData.ApproverOrg_LOB , exact: true }).click();
         await this.page.getByRole('treeitem', { name: testData.ApproverOrg_Location , exact: true }).click();
         await this.page.getByRole('treeitem', { name: testData.ApproverOrg_LE , exact: true }).click();
         await this.page.locator('#addTuple').click();
 
         await this.page.locator('#s2id_DUMMY_APPROVER').click();
         await this.page.getByRole('searchbox', { name: 'Type a name' }).fill(testData.Approver);
         await this.page.keyboard.press('Enter');
         await this.page.getByRole('radio', { name: `${testData.Approver}, Select the row` }).click();
         await this.page.getByRole('button', { name: 'Done' }).click();
         
         //Action details
         await this.page.getByRole('button', { name: 'Add Actions' }).click();
         await this.page.getByRole('gridcell', { name: 'Press enter to edit' }).first().click();
         await this.page.getByRole('textbox', { name: 'Maximum number of characters' }).fill(testData.ActionTitle);
         await this.page.getByRole('gridcell', { name: 'Press enter to edit' }).nth(1).click();
         const ActionDescriptionFrame = this.page.frameLocator('#mce_19_ifr');
         await ActionDescriptionFrame.locator('#tinymce').fill(testData.ActionDescription);
         await this.page.getByRole('button', { name: 'Save Changes' }).click();
         await this.page.getByRole('gridcell', { name: 'Press enter to edit' }).nth(2).click();
         await this.page.getByRole('treeitem', { name: testData.ActionOwnerOrg_LOB , exact: true }).click();
         await this.page.getByRole('treeitem', { name: testData.ActionOwnerOrg_Location , exact: true }).click();
         await this.page.getByRole('treeitem', { name: testData.ActionOwnerOrg_LE , exact: true }).click();
         await this.page.locator('#addTuple').click();
         await this.page.getByRole('gridcell', { name: 'Press enter to edit' }).nth(3).click();
         await this.page.getByRole('searchbox', { name: 'Type a name' }).fill(testData.ActionOwner);
         await this.page.keyboard.press('Enter');
         await this.page.getByRole('radio', { name: `${testData.ActionOwner}, Select the row` }).click();
         await this.page.getByRole('button', { name: 'Done' }).click();
         await this.page.getByRole('gridcell', { name: 'Press enter to edit' }).nth(4).click();
         await this.page.getByRole('treeitem', { name: testData.ActionApproverOrg_LOB , exact: true }).click();
         await this.page.getByRole('treeitem', { name: testData.ActionApproverOrg_Location , exact: true }).click();
         await this.page.getByRole('treeitem', { name: testData.ActionApproverOrg_LE , exact: true }).click();
         await this.page.locator('#addTuple').click();
         await this.page.getByRole('gridcell', { name: 'Press enter to edit' }).nth(5).click();
         await this.page.getByRole('searchbox', { name: 'Type a name' }).fill(testData.ActionApprover);
         await this.page.keyboard.press('Enter');
         await this.page.getByRole('radio', { name: `${testData.ActionApprover}, Select the row` }).click();
         await this.page.getByRole('button', { name: 'Done' }).click();
 
         await this.page.getByRole('gridcell', { name: 'Press enter to edit' }).nth(7).click();
         await this.page.getByRole('textbox', { name: 'DD/MM/YYYY' }).fill(testData.ActionDueDate);
         await this.page.keyboard.press('Enter');
});

When('Submit the Issue form to initial approval.',{ timeout: 60 * 1000 }, async () => {
          //Form submission
        await this.page.waitForTimeout(5000);
        await this.page.locator('#btn-submit').click();
        await this.page.getByRole('link', { name: 'Send for Approval' }).click();
        await this.page.locator('#submit').click();
        await this.page.waitForTimeout(4000);
        await this.page.locator('#submit').click();
      
       /* const submit = this.page.locator('#submit');
        for (let i = 0; i < 2; i++)
         { await submit.click(); }*/

        //const submission = this.page.locator('[data-action="formSubmitSuccess"]');
        //await expect(submission).toBeVisible();
        await this.page.waitForTimeout(8000);
        await this.page.getByLabel('User Profile,Show my Profile details and options', { exact: true }).hover();
        await this.page.locator('//li[@class=\'dropdown users-menu\']//a[@data-bypass=\'true\'][normalize-space()=\'Sign Out\']').click();
        await this.page.getByRole('button', { name: 'Sign Out' }).click();
});

Given('Login as Approver.',{ timeout: 60 * 1000 }, async () => {
            await this.page.getByRole('textbox', { name: 'Username' }).fill(testData.ApproverUsername);
            await this.page.getByRole('textbox', { name: 'Password' }).fill(testData.Password);
            await this.page.getByRole('button', { name: 'Sign In' }).click();
            await this.page.waitForLoadState('networkidle');

});

When('Access the Issue form at Approver stage from my task list.',{ timeout: 60 * 1000 }, async () => {
        await this.page.waitForTimeout(3000);
        await this.page.getByRole('button', { name: 'My Tasks,List all Tasks' }).click();
        await this.page.waitForLoadState('networkidle');
        await this.page.getByRole('link', { name: testData.IssueTitle }).click();
        await this.page.waitForTimeout(8000);
      
});

Then('Review the Issue details & approve it.',{ timeout: 60 * 1000 }, async () => {

        await this.page.locator('#btn-submit').click();
        await this.page.getByRole('link', { name: 'Approve Issue' }).click();
        await this.page.locator('#submit').click();
        await this.page.waitForTimeout(10000);
        await this.page.getByLabel('User Profile,Show my Profile details and options', { exact: true }).hover();
        await this.page.locator('//li[@class=\'dropdown users-menu\']//a[@data-bypass=\'true\'][normalize-space()=\'Sign Out\']').click();
        await this.page.getByRole('button', { name: 'Sign Out' }).click();
});

Given('Login as Issue_owner at manage stage.',{ timeout: 60 * 1000 }, async () => {

            await this.page.getByRole('textbox', { name: 'Username' }).fill(testData.IssueOwnerUsername);
            await this.page.getByRole('textbox', { name: 'Password' }).fill(testData.Password);
            await this.page.getByRole('button', { name: 'Sign In' }).click();
            await this.page.waitForLoadState('networkidle');
});

When('Access the Manage Issue from my task list.',{ timeout: 60 * 1000 }, async () => {
            await this.page.getByRole('button', { name: 'My Tasks,List all Tasks' }).click();
            await this.page.waitForLoadState('networkidle');
            await this.page.getByRole('link', { name: testData.IssueTitle }).click();
            await this.page.waitForLoadState('networkidle');
            await this.page.waitForTimeout(7000);

});

Then('Trigger Actions.',{ timeout: 60 * 1000 }, async () => {
        await this.page.locator('#btn-submit').click();
        await this.page.getByRole('link', { name: 'Trigger Actions' }).click();
        await this.page.locator('#submit').click();
        await this.page.waitForTimeout(10000);
        await this.page.getByLabel('User Profile,Show my Profile details and options', { exact: true }).hover();
        await this.page.locator('//li[@class=\'dropdown users-menu\']//a[@data-bypass=\'true\'][normalize-space()=\'Sign Out\']').click();
        await this.page.getByRole('button', { name: 'Sign Out' }).click();
        await this.page.waitForTimeout(5000);
  
});

Given('Login as Implement Action owner',{ timeout: 60 * 1000 }, async () => {
        await this.page.getByRole('textbox', { name: 'Username' }).fill(testData.ActionOwnerUsername);
        await this.page.getByRole('textbox', { name: 'Password' }).fill(testData.Password);
        await this.page.getByRole('button', { name: 'Sign In' }).click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(5000);

});

When('Access the action task from my task.',{ timeout: 60 * 1000 }, async ()=> {
        await this.page.getByRole('button', { name: 'My Tasks,List all Tasks' }).click();
        await this.page.getByRole('link', { name: testData.ActionTitle }).click();
        await this.page.waitForLoadState('load');
        await this.page.waitForTimeout(5000);

});

Then('Review the action details, fill the action details & complete the action.',{ timeout: 60 * 1000 }, async () => {

        await this.page.getByRole('textbox', { name: 'Work Done' }).click();
        const workdoneFrame = this.page.frameLocator('#mce_0_ifr');
        await workdoneFrame.locator('#tinymce').fill(testData.Actionworkdone);
        await this.page.getByRole('button', { name: 'Save Changes' }).click();
        await this.page.getByRole('textbox', { name: 'Result' }).click();
        const resultFrame = this.page.frameLocator('#mce_19_ifr');
        await resultFrame.locator('#tinymce').fill(testData.Actionresult);
        await this.page.getByRole('button', { name: 'Save Changes' }).click();
        await this.page.locator('#btn-submit').click();
        await this.page.getByRole('link', { name: 'Send for Approval' }).click();
        await this.page.getByRole('textbox', { name: 'Comments' }).fill(testData.ActionComments);
        await this.page.locator('#submit').click();
        await this.page.waitForTimeout(10000);
        await this.page.getByLabel('User Profile,Show my Profile details and options', { exact: true }).hover();
        await this.page.locator('//li[@class=\'dropdown users-menu\']//a[@data-bypass=\'true\'][normalize-space()=\'Sign Out\']').click();
        await this.page.getByRole('button', { name: 'Sign Out' }).click();

});

Given('Login as Action Approver',{ timeout: 60 * 1000 }, async () => {
        await this.page.getByRole('textbox', { name: 'Username' }).fill(testData.ActionApproverUsername);
        await this.page.getByRole('textbox', { name: 'Password' }).fill(testData.Password);
        await this.page.getByRole('button', { name: 'Sign In' }).click();   
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(5000);

});

When('Access the action task from my task list',{ timeout: 60 * 1000 }, async () => {
 
        await this.page.getByRole('button', { name: 'My Tasks,List all Tasks' }).click();
        await this.page.getByRole('link', { name: testData.ActionTitle }).click();
        await this.page.waitForLoadState('load'); 
        await this.page.waitForTimeout(7000);

});

Then('Review the action details,Approve it.',{ timeout: 60 * 1000 }, async () => {

        await this.page.locator('#btn-submit').click();
        await this.page.getByRole('link', { name: 'Approve Action' }).click();
        await this.page.locator('#submit').click();
        await this.page.waitForTimeout(10000);
        await this.page.getByLabel('User Profile,Show my Profile details and options', { exact: true }).hover();
        await this.page.locator('//li[@class=\'dropdown users-menu\']//a[@data-bypass=\'true\'][normalize-space()=\'Sign Out\']').click();
        await this.page.getByRole('button', { name: 'Sign Out' }).click();
});

Given('Login as Issue owner at monitor stage.',{ timeout: 60 * 1000 }, async () => {

        await this.page.getByRole('textbox', { name: 'Username' }).fill(testData.IssueOwnerUsername);
        await this.page.getByRole('textbox', { name: 'Password' }).fill(testData.Password);
        await this.page.getByRole('button', { name: 'Sign In' }).click();
        await this.page.waitForLoadState('networkidle');
        await this.page.getByRole('button', { name: 'My Tasks,List all Tasks' }).click();
        await this.page.waitForLoadState('networkidle');

});

When('Access the Monitor Issue form',{ timeout: 60 * 1000 }, async () => {

        await this.page.getByRole('button', { name: 'My Tasks,List all Tasks' }).click();
        await this.page.waitForLoadState('networkidle');
        await this.page.getByRole('link', { name: testData.IssueTitle }).click();
        await this.page.waitForTimeout(7000);
        await this.page.getByRole('textbox', { name: 'Issue Resolution Summary' }).click();
        const IssueresolutionFrame = this.page.frameLocator('#mce_0_ifr');
        await IssueresolutionFrame.locator('#tinymce').fill(testData.IssueResolutionSummary);
        await this.page.getByRole('button', { name: 'Save Changes' }).click();
});

Then('submit the Issue form to final approval..',{ timeout: 60 * 1000 }, async () => {

        await this.page.locator('#btn-submit').click();
        await this.page.getByRole('link', { name: 'Close Issue' }).click();
        await this.page.getByRole('textbox', { name: 'Comments' }).fill(testData.IssueClosureComments);
        await this.page.locator('#submit').click();
        await this.page.waitForTimeout(10000);
        await this.page.getByLabel('User Profile,Show my Profile details and options', { exact: true }).hover();
        await this.page.locator('//li[@class=\'dropdown users-menu\']//a[@data-bypass=\'true\'][normalize-space()=\'Sign Out\']').click();
        await this.page.getByRole('button', { name: 'Sign Out' }).click();
});

Given('Login as Final approver.',{ timeout: 60 * 1000 }, async () => {

        await this.page.getByRole('textbox', { name: 'Username' }).fill(testData.ApproverUsername);
        await this.page.getByRole('textbox', { name: 'Password' }).fill(testData.Password);
        await this.page.getByRole('button', { name: 'Sign In' }).click();
        await this.page.waitForLoadState('networkidle');
;
});

When('Access the Issue form at final approver stage.',{ timeout: 60 * 1000 }, async () => {

        await this.page.getByRole('button', { name: 'My Tasks,List all Tasks' }).click();
        await this.page.waitForLoadState('networkidle');
        await this.page.getByRole('link', { name: testData.IssueTitle }).click();
        await this.page.waitForTimeout(8000);
});

Then('close the Issue form.',{ timeout: 60 * 1000 }, async () => {

        await this.page.locator('#btn-submit').click();
        await this.page.getByRole('link', { name: 'Approve and Close Issue' }).click();
        await this.page.locator('#submit').click();
        await this.page.waitForTimeout(10000);
        await this.page.getByLabel('User Profile,Show my Profile details and options', { exact: true }).hover();
        await this.page.locator('//li[@class=\'dropdown users-menu\']//a[@data-bypass=\'true\'][normalize-space()=\'Sign Out\']').click();
        await this.page.getByRole('button', { name: 'Sign Out' }).click();
    
});
