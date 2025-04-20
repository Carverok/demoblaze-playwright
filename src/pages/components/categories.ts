import { expect, type Locator, type Page } from "@playwright/test";

export class Categories {
  readonly page: Page;

  // Locators for category elements
  readonly phonesCategoryLink: Locator;
  readonly laptopsCategoryLink: Locator;
  readonly monitorsCategoryLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators for category elements
    this.phonesCategoryLink = page.getByRole("link", { name: "Phones" });
    this.laptopsCategoryLink = page.getByRole("link", { name: "Laptops" });
    this.monitorsCategoryLink = page.getByRole("link", { name: "Monitors" });
  }

  async selectCategory(categoryName: string) {
    // use switch case to select category
    switch (categoryName) {
      case "Phones":
        await this.phonesCategoryLink.click();
        break;
      case "Laptops":
        await this.laptopsCategoryLink.click();
        break;
      case "Monitors":
        await this.monitorsCategoryLink.click();
        break;
      default:
        throw new Error(`Unknown category: ${categoryName}`);
    }
  }
}
