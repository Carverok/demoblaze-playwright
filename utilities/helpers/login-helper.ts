export async function login({ page, username, password }) {
  await page.goto("/"); // Navigate to the base URL
  await page.getByRole("link", { name: "Log in" }).click(); // Click on the 'Log in' link

  // Enter username
  await page.locator("#loginusername").click(); // Click the username field
  await page.locator("#loginusername").fill(username); // Fill in the username

  // Enter password
  await page.locator("#loginpassword").click(); // Click the password field
  await page.locator("#loginpassword").fill(password); // Fill in the password

  // Submit login
  await page.getByRole("button", { name: "Log in" }).click(); // Click the 'Log in' button to submit
}

export async function logout(page) {
  await page.getByRole("link", { name: "Log out" }).click(); // Click on the 'Log out' link
}
