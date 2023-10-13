async function login(page, password) {
  const email = page.locator("#email");
  const login = page.locator("#login");

  await email.fill("pravdo00@gmail.com");
  await page.locator("[type='password']").fill(password);
  await login.click();
  page.on("dialog", (dialog) => dialog.accept());
}

module.exports = {
  login,
};
