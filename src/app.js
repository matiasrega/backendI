import express from "express";

import UserRoute from "./routes/products.routes.js";

const app = express();
//const productManager = new ProductManager(__dirname + "/data/product.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", UserRoute);

app.get("/", (req, resp) => {
  resp.status(201).json({ mensaje: "Servidor ok" });
});

app.listen(8080, () => {
  console.log("Servidor dado de alta");
});
