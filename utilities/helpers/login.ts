export async function login({ page, username, password }) {
  await page.goto("/"); // Navigate to the base URL
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
  await page.getByRole("link", { name: "Log out" }).click();
}