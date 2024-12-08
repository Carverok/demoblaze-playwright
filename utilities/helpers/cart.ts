import { faker } from "@faker-js/faker";

export async function addItem(page, item) {
  // Click on the item and add it to the cart
  await page.getByRole("link", { name: item }).click();
  await page.getByRole("link", { name: "Add to cart" }).click();
  await page.getByRole("link", { name: "Cart", exact: true }).click();
}

export async function removeItem(page, item) {
  // Remove item from the cart
}

export async function placeOrder(page) {
  // Generate random data for the purchase form using faker
  const name = faker.person.firstName();
  const country = faker.location.country();
  const city = faker.location.city();
  const creditCardNumber = faker.finance.creditCardNumber();
  const month = faker.date.month({ context: true });
  const year = faker.number.int({ min: 1990, max: 2024 });

  // Fill in the order form with generated random data
  await page.locator("#name").click();
  await page.locator("#name").fill(name);
  await page.locator("#country").click();
  await page.locator("#country").fill(country);
  await page.locator("#city").click();
  await page.locator("#city").fill(city);
  await page.locator("#card").click();
  await page.locator("#card").fill(creditCardNumber);
  await page.locator("#month").click();
  await page.locator("#month").fill(month);
  await page.locator("#year").click();
  await page.locator("#year").fill(String(year));
}
