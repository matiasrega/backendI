import express from "express";
import CartRoute from "./routes/cart.routes.js";
import ProductRoute from "./routes/products.routes.js";
import ViewRoutes from "./routes/views.routes.js";
import RealTimeProducts from "./routes/realTimeProducts.routes.js";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import ProductManager from "./class/productManager.js";

const app = express();
const productManager = new ProductManager(__dirname + "/data/product.json");

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
app.use("/", ViewRoutes);
app.use("/realTimeProducts", RealTimeProducts);

const httpServer = app.listen(8080, () => {
  console.log("Servidor dado de alta");
});

export const socketServer = new Server(httpServer); // exporto para utilizar en router

//Vista desde el Servidor
socketServer.on("connection", async (socket) => {
  console.log("Nuevo socket conectado");
  console.log("ID SOCKET CONECTADO: " + socket.id);
  console.log("Conexiones: " + socketServer.engine.clientsCount);
  const productList = await productManager.getProductList();
  //console.log(productList);
  socket.emit("home", productList);
  socket.emit("realTimeProducts", productList);
});
