import { test, expect } from "@playwright/test";
import { credentials } from "../utilities/data-set/users";
import { login, logout } from "../utilities/helpers/auth";

test("Verify about us modal", async ({ page }) => {
  // Add a test annotation to provide metadata
  test.info().annotations.push({
    type: "Test",
    description: "This test aims to verify the about us modal",
  });

  // Go to home page
  await page.goto("/");

  const username = credentials?.normal?.username || "test";
  const password = credentials?.normal?.password || "test";
  const welcomeMessage = `Welcome ${username}`;
  await login({ page, username, password });

  // Expect that page get element link with text Welcome admin
  await expect(page.getByRole("link", { name: welcomeMessage })).toBeVisible();

  // Click on about us link
  await page.getByRole("link", { name: "About us" }).click();

  // Close the modal
  await page.locator("#videoModal").getByText("Close", { exact: true }).click();

  // Logout
  await logout(page);
});
