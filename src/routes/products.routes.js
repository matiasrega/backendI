import { Router } from "express";
import { __dirname } from "../utils.js";
import ProductManager from "../class/productManager.js";

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
  const productId = parseInt(req.params.pid);

  try {
    const productList = await productManager.getProductList();
    const product = productList.find((p) => p.id === productId);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado." });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    res.status(500).json({ error: "Error interno al obtener el producto." });
  }
});

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const { title, description, code, price, stock, category, thumbnails } =
    req.body;

  if (!title || !description || !code || !price || !stock || !category) {
    return res
      .status(400)
      .json({ error: "Todos los campos son obligatorios." });
  }

  const productList = await productManager.getProductList();
  const index = productList.findIndex(
    (product) => product.id === parseInt(pid)
  );

  if (index === -1) {
    return res.status(404).json({ error: "Producto no encontrado." });
  }

  const updatedProduct = {
    id: productList[index].id,
    title: title || productList[index].title,
    description: description || productList[index].description,
    code: code || productList[index].code,
    price: price || productList[index].price,
    status: productList[index].status,
    stock: stock || productList[index].stock,
    category: category || productList[index].category,
    thumbnails: thumbnails || productList[index].thumbnails,
  };

  productList[index] = updatedProduct;
  await productManager.saveProductListChange();

  res
    .status(200)
    .json({ message: "Producto actualizado correctamente", updatedProduct });
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;

  await productManager.getProductList();

  const index = productManager.productList.findIndex(
    (product) => product.id === parseInt(pid)
  );

  if (index === -1) {
    return res.status(404).json({ error: "Producto no encontrado." });
  }
  productManager.productList.splice(index, 1);
  await productManager.saveProductListChange();
  res.status(200).json({ message: "Producto eliminado correctamente" });
});

export default router;
