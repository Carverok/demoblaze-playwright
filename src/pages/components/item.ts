import { expect, type Locator, type Page } from "@playwright/test";

export class Item {
  readonly page: Page;

  //phones
  readonly phoneSamsungGalaxyS6: Locator;
  readonly phoneNokiaLumia1520: Locator;
  readonly phoneNexus6: Locator;
  readonly phoneSamsungGalaxyS7: Locator;
  readonly phoneIphone6_32gb: Locator;
  readonly phoneSonyXperiaZ5: Locator;
  readonly phoneHTCOneM9: Locator;

  //laptops
  readonly laptopSonyVaioI5: Locator;
  readonly laptopSonyVaioI7: Locator;
  readonly laptopMacBookAir: Locator;
  readonly laptopDellI78gb: Locator;
  readonly laptop2017Dell156Inch: Locator;
  readonly latopMacBookPro: Locator;

  //monitors
  readonly monitorAppleMonitor24: Locator;
  readonly monitorASUSFullHD: Locator;

  // Buttons
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators for phones
    this.phoneSamsungGalaxyS6 = page.getByRole("link", {
      name: "Samsung galaxy s6",
    });
    this.phoneNokiaLumia1520 = page.getByRole("link", {
      name: "Nokia lumia 1520",
    });
    this.phoneNexus6 = page.getByRole("link", { name: "Nexus 6" });
    this.phoneSamsungGalaxyS7 = page.getByRole("link", {
      name: "Samsung galaxy s7",
    });
    this.phoneIphone6_32gb = page.getByRole("link", {
      name: "Iphone 6 32gb",
    });
    this.phoneSonyXperiaZ5 = page.getByRole("link", {
      name: "Sony xperia z5",
    });
    this.phoneHTCOneM9 = page.getByRole("link", { name: "HTC One M9" });

    // Initialize locators for laptops
    this.laptopSonyVaioI5 = page.getByRole("link", {
      name: "Sony vaio i5",
    });
    this.laptopSonyVaioI7 = page.getByRole("link", {
      name: "Sony vaio i7",
    });
    this.laptopMacBookAir = page.getByRole("link", {
      name: "MacBook air",
    });
    this.laptopDellI78gb = page.getByRole("link", { name: "Dell i7 8gb" });
    this.laptop2017Dell156Inch = page.getByRole("link", {
      name: "2017 Dell 15.6 Inch",
    });
    this.latopMacBookPro = page.getByRole("link", { name: "MacBook Pro" });

    // Initialize locators for monitors
    this.monitorAppleMonitor24 = page.getByRole("link", {
      name: "Apple monitor 24",
    });
    this.monitorASUSFullHD = page.getByRole("link", {
      name: "ASUS Full HD",
    });

    this.addToCartButton = page.getByRole("link", { name: "Add to cart" });
  }

  async selectItem(itemName: string) {
    // use switch case to select item
    switch (itemName) {
      case "Samsung galaxy s6":
        await this.phoneSamsungGalaxyS6.click();
        break;
      case "Nokia lumia 1520":
        await this.phoneNokiaLumia1520.click();
        break;
      case "Nexus 6":
        await this.phoneNexus6.click();
        break;
      case "Samsung galaxy s7":
        await this.phoneSamsungGalaxyS7.click();
        break;
      case "Iphone 6 32gb":
        await this.phoneIphone6_32gb.click();
        break;
      case "Sony xperia z5":
        await this.phoneSonyXperiaZ5.click();
        break;
      case "HTC One M9":
        await this.phoneHTCOneM9.click();
        break;
      case "Sony vaio i5":
        await this.laptopSonyVaioI5.click();
        break;
      case "Sony vaio i7":
        await this.laptopSonyVaioI7.click();
        break;
      case "MacBook air":
        await this.laptopMacBookAir.click();
        break;
      case "Dell i7 8gb":
        await this.laptopDellI78gb.click();
        break;
      case "2017 Dell 15.6 Inch":
        await this.laptop2017Dell156Inch.click();
        break;
      case "MacBook Pro":
        await this.latopMacBookPro.click();
        break;
      case "Apple monitor 24":
        await this.monitorAppleMonitor24.click();
        break;
      case "ASUS Full HD":
        await this.monitorASUSFullHD.click();
        break;
      default:
        throw new Error(`Item "${itemName}" not found.`);
    }
  }

  async addItemToCart() {
    await this.addToCartButton.click();
    await this.page.getByRole("link", { name: "Cart", exact: true }).click();
  }
}
