const { When, Then, Given } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { chromium } = require('playwright');

    Given('Login to MSI application with {string} and {string}', { timeout: 60 * 1000 }, async (username, password)=> {

        const browser = await chromium.launch({ headless: true });
        const context = await browser.newContext();
        this.page = await context.newPage();
        await this.page.goto('https://e1-poc-sandbox.a99d04.metricstream.com/metricstream/auth/signin.jsp');
        await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
        await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
        await this.page.getByRole('button', { name: 'Sign In' }).click();
    });

    When('open the Process form',{ timeout: 60 * 1000 }, async ()=>{
        await this.page.getByRole('link', { name: 'Libraries' }).click();
        await this.page.getByRole('button', { name: 'Forms' }).click();
        await this.page.getByRole('link', { name: 'Open Form Process' }).click();
    });

    Then('Fill Process with title {string} and other details',{ timeout: 70 * 1000 }, async (Title)=> {

        // Fill form details
        const OwnerOrg = 'ACME Corp';
        const Owner = 'ERM Admin';
        const DescriptionText = 'Description entered';
        const businessCriticality = 'High';
        const nameField = this.page.getByRole('textbox', { name: 'Name' });
        await nameField.fill(Title);
        await expect(nameField).toHaveValue(Title);
        await this.page.locator('#rtfDataread_DESCRIPTION').click();
        const DescriptionFrame = this.page.frameLocator('#mce_0_ifr');
        await DescriptionFrame.getByLabel('DESCRIPTION').fill(DescriptionText);
        await this.page.getByRole('button', { name: 'Save Changes' }).click();

        // Select Business Criticality
        await this.page.getByRole('combobox', { name: /Business Criticality/i }).click();
        const dropdown = this.page.locator('#select2-drop');
        await dropdown.waitFor({ state: 'visible' });
        // Click the option that matches the variable
        await dropdown.locator(`li:has-text("${businessCriticality}")`).click();


        // Select Owner Organization
        await this.page.getByRole('button', { name: /Owner Organizations/ }).click();
        await this.page.getByRole('treeitem', { name: OwnerOrg }).click();
        await this.page.getByRole('button', { name: 'Add' }).click();

        // Select User dynamically
        await this.page.getByTitle('Owners, Press to Change').click();
        const userCheckboxLocator = this.page.getByRole('checkbox', { name: `${Owner}, Select the row` });
        await userCheckboxLocator.waitFor({ state: 'visible' });
        await userCheckboxLocator.check();
        await this.page.getByRole('button', { name: 'Done' }).click();
        await this.page.waitForTimeout(3000);


    });

 When('Submit the form',{ timeout: 20* 1000 }, async ()=>{
    // Submission
    await this.page.getByRole('button', { name: 'Send for Approval' }).click();
    await this.page.getByRole('button', { name: 'Submit' }).click();
    await this.page.waitForTimeout(8000);
    await this.page.locator('div.users-icon:visible').hover();
    await this.page.locator('a').filter({ hasText: 'Sign Out' }).last().click();


 });
