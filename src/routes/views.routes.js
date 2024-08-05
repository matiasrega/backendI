import { Router } from "express";
import ProductManager from "../class/productManager.js";
import { __dirname } from "../utils.js";

const router = Router();
const productManager = new ProductManager(__dirname + "/data/product.json");

router.get("/", async (req, res) => {
  const productList = await productManager.getProductList();
  res.render("home", { productList });
});

export default router;
