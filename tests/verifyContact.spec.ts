import { test } from "@playwright/test";
import { credentials } from "../src/utilities/data-set/users";
import { Contact } from "../src/model/contact";
import { DemoBlazePage } from "../src/pages/demoBlazePage";

test("Verify contact, send email", async ({ page }) => {
  // Add a test annotation to provide metadata
  test.info().annotations.push({
    type: "Test",
    description: "This test aims to verify contact functionality",
  });

  // Log in as administrator user
  const username = credentials?.admin?.username || "admin";
  const password = credentials?.admin?.password || "admin";
  const demoBlazePage = new DemoBlazePage(page);
  await demoBlazePage.goTo();
  await demoBlazePage.logIn(username, password);
  await demoBlazePage.verifyLogin(username);

  // Verify and fill contact form
  const contact = new Contact();
  await demoBlazePage.verifyContactModal();
  await demoBlazePage.fillContactForm(
    contact.email,
    contact.name,
    contact.message
  );

  // Logout
  await demoBlazePage.logOut();
});
