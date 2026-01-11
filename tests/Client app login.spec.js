const{test, expect} = require('@playwright/test');

test ('@Web Client app login',async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill("ravikumar18246@gmail.com");
    await page.locator("#userPassword").fill("Welcome*12");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);



}

);