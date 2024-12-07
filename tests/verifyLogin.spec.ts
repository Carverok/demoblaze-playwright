import { test, expect } from "@playwright/test";
import { login, logout } from "../utilities/helpers/login";
import { credentials } from "../utilities/data-set/credentials";

test.beforeEach(async ({ page }) => {
  // Go to home page
  await page.goto("/");
});

test.afterEach(async ({ page }) => {
  await logout(page);
});

test("Log in as Admin", async ({ page }) => {
  // Add a test annotation to provide metadata
  test.info().annotations.push({
    type: "Test",
    description:
      "This test aims to verify a successful login as an administrator user on Demoblaze",
  });

  const username = credentials?.admin?.username || "admin";
  const password = credentials?.admin?.password || "admin";
  const welcomeMessage = `Welcome ${username}`;
  await login({ page, username, password });

  // Expect that page get element link with text Welcome admin
  await expect(page.getByRole("link", { name: welcomeMessage })).toBeVisible();
});

test("Log in as User", async ({ page }) => {
  // Add a test annotation to provide metadata
  test.info().annotations.push({
    type: "Test",
    description:
      "This test aims to verify a successful login as a normal user on Demoblaze",
  });

  const username = credentials?.user?.username || "test";
  const password = credentials?.user?.password || "test";
  const welcomeMessage = `Welcome ${username}`;
  await login({ page, username, password });

  // Expect that page get element link with text Welcome test
  await expect(page.getByRole("link", { name: welcomeMessage })).toBeVisible();
});
