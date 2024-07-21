import fs from "node:fs/promises";

class CartManager {
  constructor(path) {
    this.path = path;
    this.carts = [];
  }

  async getCarts() {
    const data = await fs.readFile(this.path, "utf-8");
    this.carts = JSON.parse(data).data;
    return this.carts;
  }

  async addProductToCart(id, productId) {
    try {
      this.carts = await this.getCarts();
      const cartsUpdated = this.carts.map((cart) => {
        if (cart.id !== id) return cart;

        const indexProd = cart.products.findIndex(
          (prod) => prod.id === productId
        );
        if (indexProd === -1) {
          cart.products.push({ id: productId, quantity: 1 });
        } else {
          cart.products[indexProd] = {
            ...cart.products[indexProd],
            quantity: cart.products[indexProd].quantity + 1,
          };
        }
        return cart;
      });

      this.carts = cartsUpdated;
      await fs.writeFile(this.path, JSON.stringify({ data: this.carts }));
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error);
      throw error;
    }
  }
}

export default CartManager;

/*import fs from "node:fs/promises";

class CartManager {
  constructor(path) {
    this.path = path;
    this.carts = [];
  }

  async getCarts() {
    const data = await fs.readFile(this.path, "utf-8");
    this.carts = JSON.parse(data).data;
    //console.log(this.carts);
    return this.carts;
  }

  async addProductToCart(id, productId) {
    this.carts = await this.getCarts();
    const cartsUpdated = this.carts.map((cart) => {
      if (cart.id !== id) return cart;

      const indexProd = cart.products.findIndex(
        (prod) => prod.id === productId
      );
      if (indexProd === -1) {
        cart.products.push({ id: productId, quantity: 1 });
        return cart;
      }
      cart.products[indexProd] = {
        ...cart.products[indexProd],
        quantity: cart.products[indexProd].quantity + 1,
      };
      return cart;
    });
    this.carts = [...cartsUpdated];
    await fs.writeFile(this.path, JSON.stringify({ data: this.carts }));
  }
}

export default CartManager;*/
