import { expect, type Locator, type Page } from "@playwright/test";
import { RamdomPurchase } from "../utilities/helpers/ramdomPurchase";

export class CartPage {
  readonly page: Page;

  // Locators for cart elements
  readonly cartTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartTitle = this.page.locator("h2").first();
  }

  async goTo() {
    await this.page.goto("https://www.demoblaze.com/cart.html");
  }

  async checkCartTitle(title: string) {
    await expect(this.cartTitle).toHaveText(title);
  }

  async checkProduct(cell: Locator, productName: string) {
    await expect(cell).toBeVisible();
    await expect(cell).toHaveText(productName);
  }

  async checkCartProducts(ramdomPurchase: RamdomPurchase) {
    ramdomPurchase.products.forEach((item) => {
      const cell = this.page.getByRole("cell", { name: item.itemName });
      this.checkProduct(cell, item.itemName);
    });
  }

  async checkCartTotalPrice(totalPrice: string) {
    const totalPriceLocator = await this.page.getByRole("heading", {
      name: totalPrice,
    });
    await expect(totalPriceLocator).toBeVisible();
    await expect(totalPriceLocator).toHaveText(totalPrice);
  }

  async removeProductFromCart(productName: string) {
    const removeButton = this.page
      .getByRole("row", { name: productName })
      .getByRole("link");

    await removeButton.click();
  }

  async removeProductsFromCart(ramdomPurchase: RamdomPurchase) {
    await Promise.all(
      ramdomPurchase.products.map(async (item) => {
        await this.removeProductFromCart(item.itemName);
      })
    );
  }
}
