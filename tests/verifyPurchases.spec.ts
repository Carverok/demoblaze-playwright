import { test } from "@playwright/test";
import { credentials } from "../src/utilities/data-set/users";
import { HomePage } from "../src/pages/homePage";
import { RamdomPurchase } from "../src/utilities/helpers/ramdomPurchase";
import { Categories } from "../src/pages/components/categories";
import { Item } from "../src/pages/components/item";
import { CartPage } from "../src/pages/cartPage";
import { Customer } from "../src/model/customer";

test("Verify cart, place order and purchase details", async ({ page }) => {
  // Add a test annotation to provide metadata
  test.info().annotations.push({
    type: "Test",
    description:
      "This test aims to verify the place order functionaliy and the purchase details",
  });

  const username = credentials?.admin?.username || "admin";
  const password = credentials?.admin?.password || "admin";
  const ramdomPurchase = new RamdomPurchase();
  const customer = new Customer();

  const homePage = new HomePage(page);
  const categories = new Categories(page);
  const item = new Item(page);
  const cartPage = new CartPage(page);

  // Go to home page
  await homePage.goTo();
  await homePage.logIn(username, password);
  await homePage.checkLogin(username);

  // Select random items and add them to the cart
  for (const product of ramdomPurchase.products) {
    await homePage.homeLink.click();
    await categories.selectCategory(product.category);
    await item.selectItem(product.itemName);
    await item.addItemToCart();
  }

  // Return to the home page
  await homePage.homeLink.click();

  // Go to cart page and check products in the cart
  await cartPage.goTo();
  await cartPage.checkCartTitle("Products");
  await cartPage.checkCartProducts(ramdomPurchase);
  await cartPage.checkCartTotalPrice(ramdomPurchase.totalPrice.toString());

  // Place order
  await cartPage.placeOrder();
  await cartPage.checkPlaceOrderModalTotal(
    ramdomPurchase.totalPrice.toString()
  );

  // Complete the purchase
  await cartPage.fillPlaceOrderModal(customer);
  await cartPage.confirmPurchase();
  await cartPage.checkThanksModal(customer);

  // Logout
  // await homePage.goTo();
  // await homePage.logOut();
});
