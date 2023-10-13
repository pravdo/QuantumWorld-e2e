const { test, expect } = require("@playwright/test");
const dotenv = require("dotenv");
const { login } = require("./utils/LoginUtils");
const { logout } = require("./utils/LogoutUtils");

dotenv.config();

let page; // Declare a global 'page' variable

test.beforeEach(async ({ browser }) => {
  const context = await browser.newContext();
  page = await context.newPage(); // Assign 'page' to the global variable
});

test.only("Browser Context Playwright test", async () => {
  const password = process.env.PASSWORD;

  await page.goto("http://localhost:3000/");
  await expect(page).toHaveTitle("Quantum World");

  // Use the login function
  await login(page, password);

  await expect(page.locator(".sponsored")).toContainText("Sponsored");
  console.log("Ad found");
});

test("Page Platwright test", async () => {
  await page.goto("http://localhost:3000/");
  console.log(await page.title());
  await expect(page).toHaveTitle("Quantum World");
});

test.afterAll("Logout from the application", async () => {
  await logout(page);
});
