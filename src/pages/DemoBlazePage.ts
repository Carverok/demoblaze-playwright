import { expect, type Locator, type Page } from "@playwright/test";

export class DemoBlazePage {
  readonly page: Page;

  // Locators for login elements
  readonly logInLink: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly logInButton: Locator;
  readonly homeLink: Locator;
  readonly logOutLink: Locator;

  //locators for about us elements
  readonly aboutUsLink: Locator;
  readonly aboutUsModal: Locator;
  readonly aboutUsModalCloseButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators for login elements
    this.logInLink = page.getByRole("link", { name: "Log in" });
    this.usernameInput = page.locator("#loginusername");
    this.passwordInput = page.locator("#loginpassword");
    this.logInButton = page.getByRole("button", { name: "Log in" });
    this.homeLink = page.getByRole("link", { name: "Home" });
    this.logOutLink = page.getByRole("link", { name: "Log out" });

    // Initialize locators for about us elements
    this.aboutUsLink = page.getByRole("link", { name: "About us" });
    this.aboutUsModal = page.locator("#videoModal");
    this.aboutUsModalCloseButton = page
      .locator("#videoModal")
      .getByText("Close", { exact: true });
  }

  async goTo() {
    await this.page.goto("https://www.demoblaze.com/");
  }

  async logIn(username: string, password: string) {
    await this.logInLink.click();
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.logInButton.click();
  }

  async verifyLogin(username: string) {
    const welcomeMessage = `Welcome ${username}`;
    await expect(
      this.page.getByRole("link", { name: welcomeMessage })
    ).toBeVisible();
  }

  async logOut() {
    await this.homeLink.click();
    await this.logOutLink.click();
  }

  async verifyAboutUsModal() {
    await this.aboutUsLink.click();
    await expect(this.aboutUsModal).toBeVisible();
    await this.aboutUsModalCloseButton.click();
  }
}
