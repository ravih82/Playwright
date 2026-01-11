const {test, expect} = require('@playwright/test');

test ('visual testing', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    expect (await page.screenshot()).toMatchSnapshot('visualScreenshot.png');
}
);