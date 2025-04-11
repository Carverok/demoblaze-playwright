import { test } from "@playwright/test";
import { credentials } from "../src/utilities/data-set/users";
import { DemoBlazePage } from "../src/pages/demoBlazePage";

test("Verify about us modal", async ({ page }) => {
  // Add a test annotation to provide metadata
  test.info().annotations.push({
    type: "Test",
    description: "This test aims to verify the about us modal",
  });

  // Go to home page
  const demoBlazePage = new DemoBlazePage(page);
  await demoBlazePage.goTo();

  // Login as a test user
  const username = credentials?.normal?.username || "test";
  const password = credentials?.normal?.password || "test";
  await demoBlazePage.logIn(username, password);
  await demoBlazePage.verifyLogin(username);

  // Click on about us link
  await demoBlazePage.verifyAboutUsModal();

  // Logout
  await demoBlazePage.logOut();
});
