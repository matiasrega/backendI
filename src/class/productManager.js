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
    await fs.writeFile(
      this.path,
      JSON.stringify({ data: this.productList }, null, 2)
    );
    return newProduct;
  }
}

export default ProductManager;
