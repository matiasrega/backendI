import { Router } from "express";
import { __dirname } from "../utils.js";
import CartManager from "../class/cartManager.js";

console.log(__dirname);

const router = Router();
const cartManager = new CartManager(__dirname + "/data/cart.json");

router.get("/:cid", async (req, res) => {});

router.post("/:cid/product/:pid", async (req, res) => {});
export default router;
