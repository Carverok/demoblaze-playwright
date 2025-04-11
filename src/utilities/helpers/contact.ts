export async function newMessage(page, contact) {
  await page.locator("#recipient-email").click();
  await page.locator("#recipient-email").fill(contact.email);

  await page.locator("#recipient-name").click();
  await page.locator("#recipient-name").fill(contact.name);

  await page.locator("#message-text").click();
  await page.locator("#message-text").fill(contact.message);
}
