import fs from "fs/promises";

class ProductManager {
  constructor(path) {
    this.path = path;
    this.productList = [];
    this.newId = 1;
  }

  async getProductList() {
    const data = await fs.readFile(this.path, "utf-8");
    this.productList = JSON.parse(data).data;
    this.updateNewId();
    return [...this.productList];
  }

  async getProductById(id) {
    await this.getProductList();
    return this.productList.find((product) => product.id == id);
  }

  updateNewId() {
    const maxId = this.productList.reduce(
      (max, product) => (product.id > max ? product.id : max),
      0
    );
    this.newId = maxId + 1;
  }

  async addProduct(product) {
    await this.getProductList();
    const newProduct = {
      id: this.newId++,
      title: product.title,
      description: product.description,
      code: product.code,
      price: product.price,
      status: true,
      stock: product.stock,
      category: product.category,
      thumbnails: product.thumbnails || [],
    };
    this.productList.push(newProduct);
    await this.saveProductListChange();
    return newProduct;
  }

  async saveProductListChange() {
    await fs.writeFile(this.path, JSON.stringify({ data: this.productList }));
  }

  async deleteAllProductById(id) {
    await this.getProductList();
    const initialLength = this.productList.length;
    this.productList = this.productList.filter((product) => product.id != id);
    if (this.productList.length < initialLength) {
      await this.saveProductListChange();
      return true; // Indicar que se eliminó correctamente
    } else {
      throw new Error("Producto no encontrado");
    }
  }

  async deleteProductById(id) {
    await this.getProductList();
    const productIndex = this.productList.findIndex(
      (product) => product.id == id
    );

    if (productIndex !== -1) {
      const product = this.productList[productIndex];

      if (product.stock > 1) {
        product.stock--;
      } else {
        this.productList.splice(productIndex, 1);
      }

      await this.saveProductListChange();

      return { id: product.id, stock: product.stock };
    } else {
      throw new Error("Producto no encontrado");
    }
  }

  async updateProductById(id, updatedProduct) {
    await this.getProductList();
    const index = this.productList.findIndex((product) => product.id == id);
    if (index !== -1) {
      this.productList[index] = {
        ...this.productList[index],
        ...updatedProduct,
        id: parseInt(id),
      };
      await this.saveProductListChange();
      return this.productList[index];
    } else {
      throw new Error("Producto no encontrado");
    }
  }
}

export default ProductManager;
