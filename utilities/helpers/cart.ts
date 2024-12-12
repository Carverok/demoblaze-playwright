export async function addItem(page, item) {
  // Click on the item and add it to the cart
  await page.getByRole("link", { name: item }).click();
  await page.getByRole("link", { name: "Add to cart" }).click();
  await page.getByRole("link", { name: "Cart", exact: true }).click();
}

export async function removeItem(page, item) {
  // Remove item from the cart
  await page.getByRole("row", { name: item }).getByRole("link").click();
}

export async function addItemForPurchase(page, item, bill) {
  // Click on the item and add it to the cart
  await page.getByRole("link", { name: item }).click();

  // Take the price of the item and add it to the bill
  const stringPrice = await page.locator("h3.price-container").textContent();
  const numberPrice = parseFloat(stringPrice.replace(/[$,]+/g, ""));
  bill.addProduct({ name: item, price: numberPrice });

  // Continue shopping
  await page.getByRole("link", { name: "Add to cart" }).click();
  await page.getByRole("link", { name: "Cart", exact: true }).click();
}

export async function placeOrder(page, customer) {
  // Fill in the customer details in the place order form
  await page.locator("#name").click();
  await page.locator("#name").fill(customer.name);
  await page.locator("#country").click();
  await page.locator("#country").fill(customer.country);
  await page.locator("#city").click();
  await page.locator("#city").fill(customer.city);
  await page.locator("#card").click();
  await page.locator("#card").fill(customer.creditCardNumber);
  await page.locator("#month").click();
  await page.locator("#month").fill(customer.month);
  await page.locator("#year").click();
  await page.locator("#year").fill(String(customer.year));
}
