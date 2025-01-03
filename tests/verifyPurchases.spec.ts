import { test, expect } from "@playwright/test";
import { Customer } from "../model/customer";
import { Bill } from "../model/bill";
import { credentials } from "../utilities/data-set/users";
import { login, logout } from "../utilities/helpers/auth";
import { selectCategory } from "../utilities/helpers/categories";
import { addItemForPurchase, placeOrder } from "../utilities/helpers/cart";

test("Verify cart, place order and purchase details", async ({ page }) => {
  // Add a test annotation to provide metadata
  test.info().annotations.push({
    type: "Test",
    description:
      "This test aims to verify the place order functionaliy and the purchase details",
  });

  // Go to home page
  await page.goto("/");

  const username = credentials?.admin?.username || "admin";
  const password = credentials?.admin?.password || "admin";
  await login({ page, username, password });

  // Create a new customer
  const customer = new Customer();
  const bill = new Bill();

  // Add phone to the cart
  await selectCategory(page, "Phones");
  await addItemForPurchase(page, "Samsung galaxy s6", bill);

  // Add laptop to the cart
  await selectCategory(page, "Laptops");
  await addItemForPurchase(page, "Sony vaio i5", bill);

  // Add monitor to the cart
  await selectCategory(page, "Monitors");
  await addItemForPurchase(page, "ASUS Full HD", bill);

  // Place order
  await page.getByRole("button", { name: "Place Order" }).click();
  await placeOrder(page, customer);

  // Calculate the total amount to compare with the purchase details
  bill.calculateTotal();

  // Complete the purchase
  await page.getByRole("button", { name: "Purchase" }).click();

  // Verify the success message modal
  await expect(page.getByText("Thank you for your purchase!")).toBeVisible();

  // Verify purchase details
  const purchaseDetails = await page.locator("p.lead.text-muted").textContent();
  expect(purchaseDetails).toContain(`Amount: ${bill.totalAmount}`);
  expect(purchaseDetails).toContain(
    `Card Number: ${customer.creditCardNumber}`
  );
  expect(purchaseDetails).toContain(`Name: ${customer.name}`);

  // Close the confirmation dialog
  await page.getByRole("button", { name: "OK" }).click();

  // Logout
  await logout(page);
});
