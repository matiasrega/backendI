import express from "express";
import ProductManager from "./class/ProductManager.js";
import { __dirname } from "./utils.js";

//console.log(__dirname);

const app = express();
const productManager = new ProductManager(__dirname + "/data/product.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, resp) => {
  resp.status(201).json({ mensaje: "Servidor ok" });
});

/*app.post("/", async (req, resp) => {
  //console.log("Se ejecuto el post");
  await productManager.addProduct();
  //console.log("Se creo el archivo product.json");
  resp.status(201).json({ message: "Producto añadido" });
});*/

app.post("/", async (req, res) => {
  try {
    const { title, description, code, price, stock, category, thumbnails } =
      req.body;

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

    res.status(201).json(newProduct); // Devolvemos el producto añadido con éxito
  } catch (error) {
    console.log("Error al agregar producto");

    res.status(500).json({ error: "Error interno al agregar producto." });
  }
});

app.listen(8080, () => {
  console.log("Servidor dado de alta");
});
