import { faker } from "@faker-js/faker";

export class Customer {
  name: string;
  country: string;
  city: string;
  creditCardNumber: string;
  month: string;
  year: number;

  constructor() {
    this.name = faker.person.firstName();
    this.country = faker.location.country();
    this.city = faker.location.city();
    this.creditCardNumber = faker.finance.creditCardNumber();
    this.month = faker.date.month({ context: true });
    this.year = faker.number.int({ min: 1990, max: 2025 });
  }
}
