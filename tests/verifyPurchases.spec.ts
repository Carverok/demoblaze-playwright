import { test, expect } from "@playwright/test";
import { Customer } from "../src/model/customer";
import { Bill } from "../src/model/bill";
import { credentials } from "../src/utilities/data-set/users";
import { DemoBlazePage } from "../src/pages/demoBlazePage";
import { addItemForPurchase, placeOrder } from "../src/utilities/helpers/cart";

test("Verify cart, place order and purchase details", async ({ page }) => {
  // Add a test annotation to provide metadata
  test.info().annotations.push({
    type: "Test",
    description:
      "This test aims to verify the place order functionaliy and the purchase details",
  });

  const username = credentials?.admin?.username || "admin";
  const password = credentials?.admin?.password || "admin";
  const customer = new Customer();
  const bill = new Bill();
  const demoBlazePage = new DemoBlazePage(page);

  // Go to home page
  await demoBlazePage.goTo();
  await demoBlazePage.logIn(username, password);
  await demoBlazePage.verifyLogin(username);

  // Add phone to the cart
  await demoBlazePage.selectCategory("Phones");
  await addItemForPurchase(page, "Samsung galaxy s6", bill);

  // Add laptop to the cart
  await demoBlazePage.selectCategory("Laptops");
  await addItemForPurchase(page, "Sony vaio i5", bill);

  // Add monitor to the cart
  await demoBlazePage.selectCategory("Monitors");
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
  await demoBlazePage.logOut();
});
