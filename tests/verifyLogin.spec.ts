import { test } from "@playwright/test";
import { credentials } from "../src/utilities/data-set/users";
import { HomePage } from "../src/pages/homePage";

test.beforeEach(async ({ page }) => {
  // Go to home page before each test
  const homePage = new HomePage(page);
  await homePage.goTo();
});

test.afterEach(async ({ page }) => {
  // Logout after each test
  const homePage = new HomePage(page);
  await homePage.logOut();
});

test("Verify login, admin user", async ({ page }) => {
  // Add a test annotation to provide metadata
  test.info().annotations.push({
    type: "Test",
    description:
      "This test aims to verify a successful login as an administrator user",
  });

  const username = credentials?.admin?.username || "admin";
  const password = credentials?.admin?.password || "admin";
  const homePage = new HomePage(page);
  await homePage.logIn(username, password);
  await homePage.checkLogin(username);
});

test("Verify login, test user", async ({ page }) => {
  // Add a test annotation to provide metadata
  test.info().annotations.push({
    type: "Test",
    description: "This test aims to verify a successful login as a test user",
  });

  const username = credentials?.normal?.username || "test";
  const password = credentials?.normal?.password || "test";
  const homePage = new HomePage(page);
  await homePage.logIn(username, password);
  await homePage.checkLogin(username);
});
