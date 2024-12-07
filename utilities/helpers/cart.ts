export async function addItem(page, item) {
  await page.getByRole("link", { name: item }).click();
  await page.getByRole("link", { name: "Add to cart" }).click();
  await page.getByRole("link", { name: "Cart", exact: true }).click();
}

export async function removeItem(page, item) {
  await page.getByRole("link", { name: item }).click();
  await page.getByRole("link", { name: "Remove from cart" }).click();
  await page.getByRole("link", { name: "Cart", exact: true }).click();
}
