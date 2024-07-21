import { Router } from "express";
//import { socketServer } from "../app.js";
//import { __dirname } from "../utils.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("realTimeProducts");
});

export default router;
