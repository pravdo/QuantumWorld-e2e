const { test, expect, request } = require("@playwright/test");
const loginPayload = { email: "pravdo00@gmail.com", password: "" };
const { APIUtils } = require("./utils/APIUtils");
let token;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);
  token = await apiUtils.getToken(); // Call getToken() and await the result
  console.log("Token obtained:", token);
});

test("Page Playwright login", async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

  // Intercept and handle redirects
  await page.route("**/*", (route) => {
    if (route.request().url().includes("redirect-url")) {
      route.continue(null); // Block the redirect.
    } else {
      route.continue(); // Continue other requests.
    }
  });

  await page.goto("http://localhost:3000");
  await page.waitForURL(); // Wait for any possible redirects.

  // You can add some debugging statements to check if the token is properly set in local storage
  console.log(
    "Token in local storage: ",
    await page.evaluate(() => window.localStorage.getItem("token"))
  );

  // Perform your tests for authentication bypass here
  await expect(page.locator(".sponsored")).toContainText("Sponsored");
  console.log("Ad found");
});
