const socket = io(); // Configuracion del cliente

const realTimeProductContainer = document.querySelector(
  ".realTimeProductContainer"
);

socket.on("realTimeProducts", (data) => {
  //console.log("Datos recibidos del servidor:", data);

  realTimeProductContainer.innerHTML = "";
  data.forEach((product) => {
    const div = document.createElement("div");
    div.classList.add(`${product.id}`, `cart`);
    const id = document.createElement("p");
    id.classList.add(`tag`);
    id.innerText = id.title;
    const title = document.createElement("p");
    title.classList.add(`tag`);
    title.innerText = product.title;
    const description = document.createElement("p");
    description.innerText = "Descripción: " + product.description;
    const code = document.createElement("p");
    code.innerText = "Codigo: " + product.code;
    const price = document.createElement("p");
    price.innerText = "Precio: $" + product.price;
    const stock = document.createElement("p");
    stock.innerText = "Stock: " + product.stock;
    const category = document.createElement("p");
    category.innerText = "Categoria: " + product.category;
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Eliminar";
    deleteButton.classList.add("deleteButton");

    deleteButton.addEventListener("click", () => {
      // Aquí puedes emitir un evento al servidor para eliminar el producto
      socket.emit("deleteProduct", product.id); // Asumiendo que `product.id` es el identificador único del producto
    });

    div.appendChild(id);
    div.appendChild(title);
    div.appendChild(description);
    div.appendChild(code);
    div.appendChild(price);
    div.appendChild(stock);
    div.appendChild(category);
    div.appendChild(deleteButton);
    realTimeProductContainer.appendChild(div);
  });
});

const addProduct = () => {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const code = document.getElementById("code").value;
  const stock = document.getElementById("stock").value;
  const category = document.getElementById("category").value;

  if (!title || !description || !price || !code || !stock || !category) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Todos los campos son obligatorios.",
    });
    return;
  }

  const info = { title, description, price, code, stock, category };
  socket.emit("newProduct", info);

  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("price").value = "";
  document.getElementById("code").value = "";
  document.getElementById("stock").value = "";
  document.getElementById("category").value = "";
};

document
  .getElementById("addProductButton")
  .addEventListener("click", addProduct);
