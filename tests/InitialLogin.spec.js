const { test, expect } = require("@playwright/test");
const dotenv = require("dotenv");
const { login } = require("./utils/Login");

dotenv.config();

test.only("Browser Context Playwright test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const password = process.env.PASSWORD;

  await page.goto("http://localhost:3000/");
  await expect(page).toHaveTitle("Quantum World");

  // Use the login function
  await login(page, password);

  await expect(page.locator(".sponsored")).toContainText("Sponsored");
  console.log("Ad found");
});

test("Page Platwright test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  console.log(await page.title());
  await expect(page).toHaveTitle("Quantum World");
});
