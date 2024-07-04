import express from "express";

import UserRoute from "./routes/products.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", UserRoute);

app.listen(8080, () => {
  console.log("Servidor dado de alta");
});
