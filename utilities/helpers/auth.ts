export async function login({ page, username, password }) {
  // Click on the login link
  await page.getByRole("link", { name: "Log in" }).click();

  // Enter username
  await page.locator("#loginusername").click();
  await page.locator("#loginusername").fill(username);

  // Enter password
  await page.locator("#loginpassword").click();
  await page.locator("#loginpassword").fill(password);

  // Submit login
  await page.getByRole("button", { name: "Log in" }).click();
}

export async function logout(page) {
  //click on the logout link
  await page.getByRole("link", { name: "Home" }).click();
  await page.getByRole("link", { name: "Log out" }).click();
}
