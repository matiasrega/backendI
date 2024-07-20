import express from "express";
import CartRoute from "./routes/cart.routes.js";
import ProductRoute from "./routes/products.routes.js";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";

const app = express();

//HANDLEBARS
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//RUTAS
app.use("/api/products", ProductRoute);
app.use("/api/carts", CartRoute);

app.get("/", (req, res) => {
  res.render("home", {});
});

app.listen(8080, () => {
  console.log("Servidor dado de alta");
});
