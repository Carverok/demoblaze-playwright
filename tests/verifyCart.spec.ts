import { test, expect } from "@playwright/test";
import { credentials } from "../utilities/data-set/users";
import { login, logout } from "../utilities/helpers/auth";
import { selectCategory } from "../utilities/helpers/categories";
import { addItem, removeItem } from "../utilities/helpers/cart";

test("Verify cart, add and delete items", async ({ page }) => {
  // Add a test annotation to provide metadata
  test.info().annotations.push({
    type: "Test",
    description: "This test aims to verify cart functionalities",
  });

  // Go to home page
  await page.goto("/");

  const username = credentials?.normal?.username || "admin";
  const password = credentials?.normal?.password || "admin";
  const welcomeMessage = `Welcome ${username}`;
  await login({ page, username, password });

  // Expect that page get element link with text Welcome admin
  await expect(page.getByRole("link", { name: welcomeMessage })).toBeVisible();

  await selectCategory(page, "Phones");
  await addItem(page, "Samsung galaxy s6");

  // Add laptop to the cart
  await selectCategory(page, "Laptops");
  await addItem(page, "Sony vaio i5");

  // Add monitor to the cart
  await selectCategory(page, "Monitors");
  await addItem(page, "ASUS Full HD");

  // Remove items from the cart
  await removeItem(page, "Samsung galaxy s6");
  await removeItem(page, "Sony vaio i5");
  await removeItem(page, "ASUS Full HD");

  // Logout
  await logout(page);
});
