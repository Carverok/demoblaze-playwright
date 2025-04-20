import { test } from "@playwright/test";
import { credentials } from "../src/utilities/data-set/users";
import { Contact } from "../src/model/contact";
import { HomePage } from "../src/pages/homePage";

test("Verify contact, send email", async ({ page }) => {
  // Add a test annotation to provide metadata
  test.info().annotations.push({
    type: "Test",
    description: "This test aims to verify contact functionality",
  });

  // Log in as administrator user
  const homePage = new HomePage(page);
  const username = credentials?.admin?.username || "admin";
  const password = credentials?.admin?.password || "admin";

  await homePage.goTo();
  await homePage.logIn(username, password);
  await homePage.checkLogin(username);

  // Verify and fill contact form
  const contact = new Contact();
  await homePage.checkContactModal();
  await homePage.fillContactForm(contact);

  // Logout
  await homePage.logOut();
});
