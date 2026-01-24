const { When, Then, Given } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { chromium } = require('playwright');


Given('Login to E-commerce application with {string} and {string}',{timeout: 100*1000}, async function (username, password) {
    const browser = await chromium.launch({ headless:true });
    const context = await browser.newContext();
    this.page = await context.newPage();
    await this.page.goto("https://rahulshettyacademy.com/client");
    await this.page.getByPlaceholder("email@example.com").fill(username);
    await this.page.getByPlaceholder("enter your passsword").fill(password);
    await this.page.getByRole('button', { name: "Login" }).click();
    //await this.page.waitForLoadState('load');

});
When('Add {string} to cart', async function (productName) {

    await this.page.locator(".card-body b").first().waitFor();
    await this.page.locator(".card-body").filter({ hasText: productName }).getByRole("button", { name: "Add to Cart" }).click();
    await this.page.getByRole("listitem").getByRole('button', { name: "Cart" }).click();
    // await page.pause();
    await this.page.locator("div li").first().waitFor();
    await expect(this.page.getByText(productName)).toBeVisible();
    await this.page.getByRole("button", { name: "Checkout" }).click();
    await this.page.getByPlaceholder("Select Country").pressSequentially("ind");
    await this.page.getByRole("button", { name: "India" }).nth(1).click();
    await this.page.getByText("PLACE ORDER").click();

});

Then('Verify {string} is displayed in the page', async function (message) {

    await expect(this.page.getByText(message)).toBeVisible();
    

});