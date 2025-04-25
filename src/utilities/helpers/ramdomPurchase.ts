import { Product } from "./product";

export class RamdomPurchase {
  products: Product[] = [];
  totalPrice: number = 0;

  constructor() {
    // Adjust for 0-based indexing
    // Create an array of numbers from 0 to 14 (15 items)
    const numbers = Array.from({ length: 15 }, (_, i) => i);

    // Shuffle the array
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    // Now pick the first 5 numbers for the loop
    // Loop through the first 5 numbers and create products
    for (let i = 0; i < 5; i++) {
      const product = new Product();
      const uniqueNumber = numbers[i];
      product.getProduct(uniqueNumber);
      this.products.push(product);
      this.totalPrice += product.price;
    }
  }
}
