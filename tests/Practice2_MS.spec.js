const { test, expect } = require('@playwright/test');

test('@Web MSI Login', async ({ page }) => {

    page.setDefaultTimeout(60000);
    const UserName = "ORM_Program_Manager";
    const Password = "welcome*12"
    await page.goto("https://e1-poc-sandbox.a99d04.metricstream.com/metricstream/auth/signin.jsp");
    await page.locator("#username").fill(UserName);
    await page.locator("#passwordHolder").fill(Password);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForLoadState("load");
    await page.locator("#displayMore").hover();
    const IssueLink = page.locator("a[id='100262']");
    await IssueLink.waitFor({ state: 'visible' });
    await IssueLink.click();
    await page.locator("div[id='infoport-formlink-tour'] span[class='link-type']").click();
    await page.locator("div[class='infocenter-action-button dropdown open'] div[class='dropdown-menu page-header-menu link-infoport'] div a[title='Issue']").click();
    await page.waitForLoadState();

    const titleInput = page.locator("//input[@placeholder='Title']");
    await titleInput.waitFor({ state: 'visible' });
    await titleInput.fill("Playwright Issue");
    expect(titleInput).toHaveValue("Playwright Issue");


  //  await page.locator('#rtfDataread_ISSUE_DETAILS').fill('Entered the data into Issue description');

    //await page.getByRole('button', { name: 'Save Changes' }).click();

//    await page.waitForTimeout(3000);






});