export class Bill {
  products: { name: string; price: number }[];
  totalAmount: number;

  constructor() {
    this.products = [];
    this.totalAmount = 0;
  }

  // Add a new product to the products array
  addProduct(product: { name: string; price: number }) {
    this.products.push(product);
  }

  // Calculate the total price of the products
  calculateTotal() {
    this,
      (this.totalAmount = this.products.reduce(
        (total, product) => total + product.price,
        0
      ));
  }
}
