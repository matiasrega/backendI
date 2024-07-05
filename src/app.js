import express from "express";
import CartRoute from "./routes/cart.routes.js";
import ProductRoute from "./routes/products.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", ProductRoute);
app.use("/api/carts", CartRoute);

app.listen(8080, () => {
  console.log("Servidor dado de alta");
});
