import { expect, type Locator, type Page } from "@playwright/test";
import { RamdomPurchase } from "../utilities/helpers/ramdomPurchase";
import { Customer } from "../model/customer";

export class CartPage {
  readonly page: Page;

  // Locators for cart elements
  readonly cartTitle: Locator;
  readonly placeOrderButton: Locator;
  readonly placeOrderModal: Locator;
  readonly placeOrderModalTitle: Locator;

  readonly placeOrderModalTotal: Locator;
  readonly paceOrderModalNameField: Locator;
  readonly placeOrderModalCountryField: Locator;
  readonly placeOrderModalCityField: Locator;
  readonly placeOrderModalCreditCardField: Locator;
  readonly placeOrderModalMonthField: Locator;
  readonly placeOrderModalYearField: Locator;

  readonly placeOrderModalCloseButton: Locator;
  readonly placeOrderModalPurchaseButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartTitle = this.page.locator("h2").first();

    this.placeOrderButton = this.page.getByRole("button", {
      name: "Place Order",
    });
    this.placeOrderModal = this.page.getByRole("dialog", {
      name: "Place Order",
    });
    this.placeOrderModalTitle = this.placeOrderModal.getByRole("heading", {
      name: "Place Order",
    });
    this.placeOrderModalTotal = page.locator("#totalm");
    this.paceOrderModalNameField = page.locator("#name");
    this.placeOrderModalCountryField = page.locator("#country");
    this.placeOrderModalCityField = page.locator("#city");
    this.placeOrderModalCreditCardField = page.locator("#card");
    this.placeOrderModalMonthField = page.locator("#month");
    this.placeOrderModalYearField = page.locator("#year");
    this.placeOrderModalCloseButton = page
      .getByLabel("Place order")
      .getByText("Close");
    this.placeOrderModalPurchaseButton = page.getByRole("button", {
      name: "Purchase",
    });
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

  async placeOrder() {
    await this.placeOrderButton.click();
    await expect(this.placeOrderModal).toBeVisible();
    await expect(this.placeOrderModalTitle).toHaveText("Place order");
  }

  async checkPlaceOrderModalTotal(totalPrice: string) {
    await expect(this.placeOrderModalTotal).toHaveText(`Total: ${totalPrice}`);
  }

  async fillPlaceOrderModal(customer: Customer) {
    await this.paceOrderModalNameField.click();
    await this.paceOrderModalNameField.fill(customer.name);
    await this.placeOrderModalCountryField.click();
    await this.placeOrderModalCountryField.fill(customer.country);
    await this.placeOrderModalCityField.click();
    await this.placeOrderModalCityField.fill(customer.city);
    await this.placeOrderModalCreditCardField.click();
    await this.placeOrderModalCreditCardField.fill(customer.creditCardNumber);
    await this.placeOrderModalMonthField.click();
    await this.placeOrderModalMonthField.fill(customer.month);
    await this.placeOrderModalYearField.click();
    await this.placeOrderModalYearField.fill(String(customer.year));
  }

  async confirmPurchase() {
    await this.placeOrderModalPurchaseButton.click();
  }

  async checkThanksModal(customer: Customer) {
    const purchaseDetails = await this.page
      .locator("p.lead.text-muted")
      .textContent();

    await expect(
      this.page.getByText("Thank you for your purchase!")
    ).toBeVisible();

    expect(purchaseDetails).toContain(`Name: ${customer.name}`);

    // await this.page.getByRole("button", { name: "OK" }).click();
  }
}
