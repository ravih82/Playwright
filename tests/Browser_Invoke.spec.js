const{test, expect} = require('@playwright/test');

test('LoginPage', async ({browser})=>{

    const context =await browser.newContext();
    const page = await context.newPage();
    const UserName=page.locator('#username');
    const Password=page.locator('#password');
    const SignIn=page.locator('#signInBtn');

await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
//console.log (await page.title());

await UserName.fill("rahulshetty");
await Password.fill("learning");
await SignIn.click();
console.log (await page.locator("[style*='block']").textContent());
await expect(page.locator("[style*='block']")).toContainText('Incorrect');
await UserName.fill("");
await UserName.fill("rahulshettyacademy");
await SignIn.click();
console.log(await page.locator(".card-body a").first().textContent());
});
