import { test } from "@playwright/test";
import { credentials } from "../src/utilities/data-set/users";
import { DemoBlazePage } from "../src/pages/DemoBlazePage";

test.beforeEach(async ({ page }) => {
  // Go to home page before each test
  const demoBlazePage = new DemoBlazePage(page);
  await demoBlazePage.goTo();
});

test.afterEach(async ({ page }) => {
  // Logout after each test
  const demoBlazePage = new DemoBlazePage(page);
  await demoBlazePage.logOut();
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
  const demoBlazePage = new DemoBlazePage(page);
  await demoBlazePage.logIn(username, password);
  await demoBlazePage.verifyLogin(username);
});

test("Verify login, test user", async ({ page }) => {
  // Add a test annotation to provide metadata
  test.info().annotations.push({
    type: "Test",
    description: "This test aims to verify a successful login as a test user",
  });

  const username = credentials?.normal?.username || "test";
  const password = credentials?.normal?.password || "test";
  const demoBlazePage = new DemoBlazePage(page);
  await demoBlazePage.logIn(username, password);
  await demoBlazePage.verifyLogin(username);
});
