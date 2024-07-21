import { Router } from "express";
import ProductManager from "../class/productManager.js";
//import { socketServer } from "../app.js";
import { __dirname } from "../utils.js";

const router = Router();
const productManager = new ProductManager(__dirname + "/data/product.json");

router.get("/", async (req, res) => {
  const productList = await productManager.getProductList();
  res.render("home", { productList });
  //console.log(productList);

  // Emitir evento "productList" solo cuando se actualice la lista de productos
  //socketServer.emit("productList", productList);
});

export default router;
