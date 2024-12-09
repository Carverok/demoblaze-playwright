import { test, expect } from "@playwright/test";
import { credentials } from "../utilities/data-set/users";
import { login, logout } from "../utilities/helpers/auth";
import { selectCategory } from "../utilities/helpers/categories";
import { addItem, placeOrder } from "../utilities/helpers/cart";
import { Customer } from "../model/customer";

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
test("Verify purchase details", async ({ page }) => {
  // Add a test annotation to provide metadata
  test.info().annotations.push({
    type: "Test",
    description: "This test aims to verify the purchase details on Demoblaze",
  });

  // Create a new customer
  const customer = new Customer();

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
  await placeOrder(page, customer);

  // Complete the purchase
  await page.getByRole("button", { name: "Purchase" }).click();

  // Verify the success message modal
  await expect(page.getByText("Thank you for your purchase!")).toBeVisible();

  // Verify purchase details
  const purchaseDetails = await page.locator("p.lead.text-muted").textContent();
  expect(purchaseDetails).toContain("Id:");
  expect(purchaseDetails).toContain("Amount:");
  expect(purchaseDetails).toContain(
    `Card Number: ${customer.creditCardNumber}`
  );
  expect(purchaseDetails).toContain(`Name: ${customer.name}`);
  expect(purchaseDetails).toContain("Date:");

  // Close the confirmation dialog
  await page.getByRole("button", { name: "OK" }).click();
});
