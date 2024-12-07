import { faker } from "@faker-js/faker";

export async function placeOrder(page) {
  // Generate random data for the purchase form using faker
  const randomName = faker.person.firstName();
  const randomCountry = faker.location.country();
  const randomCity = faker.location.city();
  const randomCreditCardNumber = faker.finance.creditCardNumber();
  const randomMonth = faker.date.month({ context: true });
  const randomYear = faker.number.int({ min: 1990, max: 2024 });

  // Fill in the order form with generated random data
  await page.locator("#name").click();
  await page.locator("#name").fill(randomName);
  await page.locator("#country").click();
  await page.locator("#country").fill(randomCountry);
  await page.locator("#city").click();
  await page.locator("#city").fill(randomCity);
  await page.locator("#card").click();
  await page.locator("#card").fill(randomCreditCardNumber);
  await page.locator("#month").click();
  await page.locator("#month").fill(randomMonth);
  await page.locator("#year").click();
  await page.locator("#year").fill(String(randomYear));
}
