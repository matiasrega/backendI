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

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use("/api/products", ProductRoute);
app.use("/api/carts", CartRoute);
app.use("/", ViewRoutes);
app.use("/realTimeProducts", RealTimeProducts);

const httpServer = app.listen(8080, () => {
  console.log("Servidor dado de alta");
});

const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket) => {
  const productList = await productManager.getProductList();
  socket.emit("home", productList);
  socket.emit("realTimeProducts", productList);

  socket.on("newProduct", async (product) => {
    try {
      await productManager.addProduct(product);
      const updatedProductList = await productManager.getProductList();
      socketServer.emit("realTimeProducts", updatedProductList);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  });

  socket.on("deleteProduct", async (productId) => {
    try {
      await productManager.deleteProductById(productId);
      const updatedProductList = await productManager.getProductList();
      socketServer.emit("realTimeProducts", updatedProductList);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  });

  socket.on("deleteAllProducts", async () => {
    try {
      await productManager.deleteAllProductById();
      const updatedProductList = await productManager.getProductList();
      socketServer.emit("realTimeProducts", updatedProductList);
    } catch (error) {
      console.error("Error deleting all products:", error);
    }
  });

  socket.on("updateProductById", async (updatedProduct) => {
    try {
      console.log("Updating product with ID:", updatedProduct.id);
      const updatedProductData = await productManager.updateProductById(
        updatedProduct
      );
      const updatedProductList = await productManager.getProductList();
      socketServer.emit("realTimeProducts", updatedProductList);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  });
});
