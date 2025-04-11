import { test, expect } from "@playwright/test";
import { credentials } from "../src/utilities/data-set/users";
import { login, logout } from "../src/utilities/helpers/auth";
import { Contact } from "../src/model/contact";
import { newMessage } from "../src/utilities/helpers/contact";

test("Verify contact, send email", async ({ page }) => {
  // Add a test annotation to provide metadata
  test.info().annotations.push({
    type: "Test",
    description: "This test aims to verify contact functionality",
  });

  // Go to home page
  await page.goto("/");

  const username = credentials?.admin?.username || "admin";
  const password = credentials?.admin?.password || "admin";
  const welcomeMessage = `Welcome ${username}`;
  await login({ page, username, password });

  // Expect that page get element link with text Welcome admin
  await expect(page.getByRole("link", { name: welcomeMessage })).toBeVisible();

  // Click on contact link
  await page.getByRole("link", { name: "Contact" }).click();

  // Fill new message form
  const contact = new Contact();
  await newMessage(page, contact);

  // catch dialog before click on send message button
  page.once("dialog", (dialog) => {
    dialog.dismiss().catch(() => {});
  });

  // Click on send message button
  await page.getByRole("button", { name: "Send message" }).click();

  // Logout
  await logout(page);
});
