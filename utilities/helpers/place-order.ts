import { faker } from "@faker-js/faker"; // Import faker for generating random test data

export async function placeOrder({ page }) {
  // Generate random data for the purchase form using faker
  const randomName = faker.person.firstName();
  const randomCountry = faker.location.country();
  const randomCity = faker.location.city();
  const randomCreditCardNumber = faker.finance.creditCardNumber();
  const randomMonth = faker.date.month({ context: true });
  const randomYear = faker.number.int({ min: 1990, max: 2024 });

  // Fill in the order form with generated random data
  await page.getByLabel("Total:").click();
  await page.getByLabel("Total:").fill(randomName); // Fill in name
  await page.getByLabel("Country:").click();
  await page.getByLabel("Country:").fill(randomCountry); // Fill in country
  await page.getByLabel("City:").click();
  await page.getByLabel("City:").fill(randomCity); // Fill in city
  await page.getByLabel("Credit card:").click();
  await page.getByLabel("Credit card:").fill(randomCreditCardNumber); // Fill in credit card number
  await page.getByLabel("Month:").click();
  await page.getByLabel("Month:").fill(randomMonth); // Fill in month
  await page.getByLabel("Year:").click();
  await page.getByLabel("Year:").fill(String(randomYear)); // Fill in year

  // Complete the purchase
  await page.getByRole("button", { name: "Purchase" }).click(); // Click 'Purchase' button
}
