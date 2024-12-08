export async function selectCategory(page, category) {
  await page.getByRole("link", { name: "Home" }).click();
  await page.getByRole("link", { name: category }).click();
}
