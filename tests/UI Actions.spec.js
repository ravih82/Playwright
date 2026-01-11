const { test, expect } = require('@playwright/test');

test('@Web LoginPage', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const UserName = page.locator('#username');
    const Password = page.locator('#password');
    const SignIn = page.locator('#signInBtn');
    const dropdown = page.locator(".radiotextsty").last().click(); //radio button selection
    await page.locator("#okayBtn").click();
    //screenshot
    await page.screenshot({ path: 'Downloads/login.png' });
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    // await page.pause();

});