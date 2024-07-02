import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, resp) => {
  resp.status(201).json({ mensaje: "Servidor ok" });
});

app.listen(8080, () => {
  console.log("Servidor dado de alta");
});
