import { test } from "@playwright/test";
import { credentials } from "../src/utilities/data-set/users";
import { HomePage } from "../src/pages/homePage";

test("Verify about us modal", async ({ page }) => {
  // Add a test annotation to provide metadata
  test.info().annotations.push({
    type: "Test",
    description: "This test aims to verify the about us modal",
  });

  const username = credentials?.normal?.username || "test";
  const password = credentials?.normal?.password || "test";
  const homePage = new HomePage(page);

  // Login as a test user
  await homePage.goTo();
  await homePage.logIn(username, password);
  await homePage.checkLogin(username);

  // Click on about us link
  await homePage.checkAboutUsModal();

  // Logout
  await homePage.logOut();
});
