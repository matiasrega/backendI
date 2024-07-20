import express from "express";
import CartRoute from "./routes/cart.routes.js";
import ProductRoute from "./routes/products.routes.js";
import ViewRoutes from "./routes/views.routes.js";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";

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
app.use("/", ViewRoutes);

const httpServer = app.listen(8080, () => {
  console.log("Servidor dado de alta");
});

const socketServer = new Server(httpServer);

//Vista desde el Servidor
socketServer.on("connection", (socket) => {
  console.log("Nuevo socket conectado");
  console.log("ID SOCKET CONECTADO: " + socket.id);
  console.log(
    "TOTAL DISPOSITIVOS CONECTADOS: " + socketServer.engine.clientsCount
  );

  socket.on("mensaje", (data) => {
    console.log(data);
  });

  socket.emit("respuesta", "la conexion esta establecida");
});
