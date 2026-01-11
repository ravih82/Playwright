import { test, expect } from '@playwright/test';
test('@Web Frames&alerts', async ({page})=> {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    //await page.pause();
    page.on('dialog',dialog =>dialog.accept());
    await page.locator("#confirmbtn").click();
    //mousehover method
    await page.locator("#mousehover").hover();
    //Framework
   const Framespage =  page.frameLocator("#courses-iframe");
   //accessing the locators for framespage
   await Framespage.locator("li a[href*='lifetime-access']:visible").click();
   const textcheck = await Framespage.locator(".text h2").textContent();
   console.log(textcheck.split(" ")[1]);


});