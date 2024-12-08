import { test, expect } from "@playwright/test";
import { credentials } from "../utilities/data-set/credentials";
import { login, logout } from "../utilities/helpers/auth";
import { selectCategory } from "../utilities/helpers/categories";
import { addItem, placeOrder } from "../utilities/helpers/cart";

test.beforeEach(async ({ page }) => {
  // Go to home page
  await page.goto("/");

  const username = credentials?.admin?.username || "admin";
  const password = credentials?.admin?.password || "admin";
  const welcomeMessage = `Welcome ${username}`;
  await login({ page, username, password });

  // Expect that page get element link with text Welcome admin
  await expect(page.getByRole("link", { name: welcomeMessage })).toBeVisible();
});

test.afterEach(async ({ page }) => {
  await logout(page);
});

test("Purchase items", async ({ page }) => {
  // Add a test annotation to provide metadata
  test.info().annotations.push({
    type: "Test",
    description: "This test aims to verify a successful purchase on Demoblaze",
  });

  // Add phone to the cart
  await selectCategory(page, "Phones");
  await addItem(page, "Samsung galaxy s6");

  // Add laptop to the cart
  await selectCategory(page, "Laptops");
  await addItem(page, "Sony vaio i5");

  // Add monitor to the cart
  await selectCategory(page, "Monitors");
  await addItem(page, "ASUS Full HD");

  // Place order
  await page.getByRole("button", { name: "Place Order" }).click();
  await placeOrder(page);

  // Complete the purchase
  await page.getByRole("button", { name: "Purchase" }).click();

  // Verify the success message
  await expect(page.getByText("Thank you for your purchase!")).toBeVisible();

  // Close the confirmation dialog
  await page.getByRole("button", { name: "OK" }).click();
});
