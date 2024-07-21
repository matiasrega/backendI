import { Router } from "express";
import { __dirname } from "../utils.js";
import ProductManager from "../class/productManager.js";
//import { socketServer } from "../app.js";

console.log(__dirname);
const router = Router();
const productManager = new ProductManager(__dirname + "/data/product.json");

router.post("/", async (req, res) => {
  //console.log("entro al post");
  try {
    const { title, description, code, price, stock, category, thumbnails } =
      req.body;
    console.log(title);
    if (!title || !description || !code || !price || !stock || !category) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios." });
    }
    const newProduct = await productManager.addProduct({
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnails,
    });

    //res.status(201).json(newProduct); Devuelve el producto añadido con éxito
    res.status(201).json({ message: "producto añadido" });
  } catch (error) {
    console.log("Error al agregar producto");
    //console.log(error);

    res.status(500).json({ error: "Error interno al agregar producto." });
  }
});

router.get("/", async (req, res) => {
  const productList = await productManager.getProductList();
  res.status(200).json(productList);
});

router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const productFinded = await productManager.getProductById(pid);

    if (!productFinded) {
      return res.status(404).json({ error: "Producto no encontrado." });
    }
    //console.log(productFinded);
    res.status(200).json({ resultado: productFinded });
  } catch (error) {
    //console.log("Error al obtener el producto:");
    res.status(500).json({ error: "Error interno al obtener el producto." });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;

  try {
    const product = await productManager.updateProductById(id, updatedProduct);
    res
      .status(200)
      .json({ message: "Producto actualizado correctamente", product });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ error: "Error interno al actualizar producto." });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const productToDelete = await productManager.getProductById(pid);

    if (!productToDelete) {
      return res.status(404).json({ error: "Producto no encontrado." });
    }
    productManager.productList = productManager.productList.filter(
      (product) => product.id !== parseInt(pid)
    );
    await productManager.saveProductListChange();
    res
      .status(200)
      .json({ message: "Producto eliminado correctamente", productToDelete });
  } catch (error) {
    res.status(500).json({ error: "Error interno al eliminar el producto." });
  }
});

export default router;
