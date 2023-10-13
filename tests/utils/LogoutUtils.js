const { expect } = require("@playwright/test");

async function logout(page) {
  const select = page.locator("#logout-select");
  await select.click();
  await expect(page.locator("#logout-option")).toContainText("Log Out");
  await page.locator("#logout-option").click();
  await expect(page.locator("#login")).toContainText("LOGIN");
  console.log("Logged out successfully");
}

module.exports = {
  logout,
};
