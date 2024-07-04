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

//router.get("/api/products", () => {});

export default router;
