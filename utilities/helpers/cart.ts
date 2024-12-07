export async function addItem(page, item) {
  // Click on the item and add it to the cart
  await page.getByRole("link", { name: item }).click();
  await page.getByRole("link", { name: "Add to cart" }).click();
  await page.getByRole("link", { name: "Cart", exact: true }).click();
}

export async function removeItem(page, item) {
  // Remove item from the cart
  await page.getByRole("link", { name: item }).click();
  await page.getByRole("link", { name: "Remove from cart" }).click();
  await page.getByRole("link", { name: "Cart", exact: true }).click();
}
