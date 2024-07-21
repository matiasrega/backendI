const socket = io(); // Configuracion del cliente

const realTimeProductContainer = document.querySelector(
  ".realTimeProductContainer"
);

socket.on("realTimeProducts", (data) => {
  realTimeProductContainer.innerHTML = "";

  data.forEach((product) => {
    const div = document.createElement("div");
    div.classList.add(`${product.id}`, `cart`);

    const id = document.createElement("p");
    id.classList.add(`tag`);
    id.innerText = product.id;

    const title = document.createElement("p");
    title.classList.add(`title`);
    title.innerText = product.title;

    const description = document.createElement("p");
    description.innerText = "Descripción: " + product.description;

    const code = document.createElement("p");
    code.innerText = "Código: " + product.code;

    const price = document.createElement("p");
    price.innerText = "Precio: $" + product.price;

    const stock = document.createElement("p");
    stock.innerText = "Stock: " + product.stock;

    const category = document.createElement("p");
    category.innerText = "Categoría: " + product.category;

    const deleteButtonOne = document.createElement("button");
    deleteButtonOne.innerText = "Eliminar Uno";
    deleteButtonOne.classList.add("deleteButton");
    deleteButtonOne.addEventListener("click", () => {
      socket.emit("deleteProduct", product.id);
    });

    const deleteButtonAll = document.createElement("button");
    deleteButtonAll.innerText = "Eliminar Todos";
    deleteButtonAll.classList.add("deleteButton");
    deleteButtonAll.addEventListener("click", () => {
      socket.emit("deleteAllProduct", product.id);
    });

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    buttonContainer.appendChild(deleteButtonOne);
    buttonContainer.appendChild(deleteButtonAll);

    div.appendChild(title);
    div.appendChild(description);
    div.appendChild(code);
    div.appendChild(price);
    div.appendChild(stock);
    div.appendChild(category);
    div.appendChild(buttonContainer);

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
  Swal.fire({
    icon: "success",
    title: "Producto agregado con éxito",
    showConfirmButton: false,
    timer: 1000,
  });
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
