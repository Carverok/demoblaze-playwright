import { test, expect } from "@playwright/test";
import { credentials } from "../src/utilities/data-set/users";
import { DemoBlazePage } from "../src/pages/demoBlazePage";
import { addItem, removeItem } from "../src/utilities/helpers/cart";

test("Verify cart, add and delete items", async ({ page }) => {
  // Add a test annotation to provide metadata
  test.info().annotations.push({
    type: "Test",
    description: "This test aims to verify cart functionalities",
  });

  const username = credentials?.normal?.username || "test";
  const password = credentials?.normal?.password || "test";
  const demoBlazePage = new DemoBlazePage(page);

  // Go to home page
  await demoBlazePage.goTo();
  await demoBlazePage.logIn(username, password);
  await demoBlazePage.verifyLogin(username);

  await demoBlazePage.selectCategory("Phones");
  await addItem(page, "Samsung galaxy s6");

  // Add laptop to the cart
  await demoBlazePage.selectCategory("Laptops");
  await addItem(page, "Sony vaio i5");

  // Add monitor to the cart
  await demoBlazePage.selectCategory("Monitors");
  await addItem(page, "ASUS Full HD");

  // Remove items from the cart
  await removeItem(page, "Samsung galaxy s6");
  await removeItem(page, "Sony vaio i5");
  await removeItem(page, "ASUS Full HD");

  // Logout
  await demoBlazePage.logOut();
});
