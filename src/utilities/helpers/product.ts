import fs from "fs";

export class Product {
  id: string;
  itemName: string;
  category: string;
  price: number;

  constructor() {
    this.id = "";
    this.itemName = "";
    this.category = "";
    this.price = 0;
  }

  async getProduct(id: number) {
    // Read the JSON file
    const data = JSON.parse(
      fs.readFileSync("src/utilities/data-set/items.json", "utf8")
    );

    // Get a random item from the items array
    const product = data.items[id];

    this.id = product.id;
    this.itemName = product.name;
    this.category = product.category;
    this.price = product.price;
  }
}
