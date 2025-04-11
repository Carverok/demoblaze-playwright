import { faker } from "@faker-js/faker";

export class Contact {
  email: string;
  name: string;
  message: string;

  constructor() {
    this.email = faker.internet.email();
    this.name = faker.person.fullName();
    this.message = faker.lorem.sentence();
  }
}
