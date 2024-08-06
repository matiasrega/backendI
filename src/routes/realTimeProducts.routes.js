import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("realTimeProducts");
});

router.put("/", (req, res) => {
  res.render("realTimeProducts");
});

export default router;
