import { Router } from "express";
import { __dirname } from "../utils.js";
import CartManager from "../class/cartManager.js";

console.log(__dirname);

const router = Router();
const cartManager = new CartManager(__dirname + "/data/cart.json");

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;

  try {
    const carts = await cartManager.getCarts();
    const cart = carts.find((cart) => cart.id === parseInt(cid));

    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    res.status(200).json(cart.products);
  } catch (error) {
    console.error("Error al obtener productos del carrito:", error);
    res
      .status(500)
      .json({ error: "Error interno al obtener productos del carrito" });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;

  try {
    await cartManager.addProductToCart(parseInt(cid), parseInt(pid));
    res
      .status(200)
      .json({ message: "Producto agregado al carrito correctamente" });
  } catch (error) {
    console.error("Error al agregar producto al carrito:", error);
    res
      .status(500)
      .json({ error: "Error interno al agregar producto al carrito" });
  }
});
export default router;
