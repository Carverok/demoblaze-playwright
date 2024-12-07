import { test, expect } from "@playwright/test";
import { login, logout } from "../utilities/helpers/login";
import { credentials } from "../utilities/data-set/credentials";
import { placeOrder } from "../utilities/helpers/place-order";
import { addItem } from "../utilities/helpers/cart";

test.beforeEach(async ({ page }) => {
  //got to home page
  await page.goto("/");

  const username = credentials?.admin?.username || "admin";
  const password = credentials?.admin?.password || "admin";
  const welcomeMessage = `Welcome ${username}`;
  await login({ page, username, password });

  //expect that page get element link with text Welcome admin
  await expect(page.getByRole("link", { name: welcomeMessage })).toBeVisible();
});

test.afterEach(async ({ page }) => {
  await logout(page);
});

// Test case to purchase a phone on Demoblaze
test("Purchase items", async ({ page }) => {
  // Add a test annotation to provide metadata
  test.info().annotations.push({
    type: "Test",
    description: "This test aims to verify a successful purchase on Demoblaze",
  });

  //navigate to the phones category
  await page.getByRole("link", { name: "Phones" }).click();

  // Add item to the cart
  await addItem(page, "Samsung galaxy s6");

  //navigate to the laptop category
  await page.getByRole("link", { name: "Home" }).click();
  await page.getByRole("link", { name: "Laptops" }).click();

  await addItem(page, "Sony vaio i5");

  //navigate to the monitor category
  await page.getByRole("link", { name: "Home" }).click();
  await page.getByRole("link", { name: "Monitors" }).click();

  // Navigate to the ASUS Full HD 8gb product page and add it to the cart
  await addItem(page, "ASUS Full HD");

  //place order
  await page.getByRole("button", { name: "Place Order" }).click();
  await placeOrder(page);

  // Complete the purchase
  await page.getByRole("button", { name: "Purchase" }).click();

  // Verify the success message
  await expect(page.getByText("Thank you for your purchase!")).toBeVisible();

  // Close the confirmation dialog
  await page.getByRole("button", { name: "OK" }).click();
});
