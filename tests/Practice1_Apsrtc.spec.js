const { test, expect } = require('@playwright/test');

test('@Web Apsrtc_Busbooking', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.apsrtconline.in/oprs-web/guest/home.do?h=1");

    const boradingCity = "KURNOOL";
    const destinationCity = "BANGALORE";
    const journetDate = "15/1/2026";

    // Boarding city
    const fromInput = page.locator("#fromPlaceName");
    await fromInput.fill(boradingCity);
    const fromDropdownValues = page.locator(".ui-autocomplete li");
    await fromDropdownValues.first().click();
    expect(fromInput).toHaveValue(boradingCity);

    // Destination city
    const toInput = await page.locator("#toPlaceName");
    await toInput.fill(destinationCity);
    const toInputDropdownvalues = page.locator(".ui-autocomplete li", { hasText: destinationCity });
    await toInputDropdownvalues.first().click();
    expect(toInput).toHaveValue(destinationCity);

    //Journey Date
    const departOn = page.locator("#txtJourneyDate")
    await departOn.fill(journetDate);
    expect(departOn).toHaveValue(journetDate);

    // Close date picker overlay
    await page.keyboard.press('Escape');

    // Search
    await page.getByRole('button', { name: 'Check Availability' }).click();

    // Assertions on results page
    await expect(page).toHaveURL("https://www.apsrtconline.in/oprs-web/avail/services.do");
    await expect(page.getByText('Choose your service, select the seat of your choice and book the ticket')).toBeVisible();

});
//edited the file from git
