import { test } from "@playwright/test";
import { credentials } from "../src/utilities/data-set/users";
import { HomePage } from "../src/pages/homePage";
import { RamdomPurchase } from "../src/utilities/helpers/ramdomPurchase";
import { Categories } from "../src/pages/components/categories";
import { Item } from "../src/pages/components/item";
import { CartPage } from "../src/pages/cartPage";

test("Verify cart, add and delete items", async ({ page }) => {
  // Add a test annotation to provide metadata
  test.info().annotations.push({
    type: "Test",
    description: "This test aims to verify cart functionalities",
  });

  const username = credentials?.normal?.username || "test";
  const password = credentials?.normal?.password || "test";
  const ramdomPurchase = new RamdomPurchase();

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

  // Go to cart page and add products to the cart
  await cartPage.goTo();
  await cartPage.checkCartTitle("Products");
  await cartPage.checkCartProducts(ramdomPurchase);
  await cartPage.checkCartTotalPrice(ramdomPurchase.totalPrice.toString());

  // // Remove products from the cart
  await cartPage.removeProductsFromCart(ramdomPurchase);
  await cartPage.checkCartTitle("Products");

  // Logout
  await homePage.logOut();
});
