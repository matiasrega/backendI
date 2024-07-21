const socket = io(); // Configuracion del cliente

const realTimeProductContainer = document.querySelector(
  ".realTimeProductContainer"
);

socket.on("realTimeProducts", (data) => {
  console.log("Datos recibidos del servidor:", data);

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

    div.appendChild(id);
    div.appendChild(title);
    div.appendChild(description);
    div.appendChild(code);
    div.appendChild(price);
    div.appendChild(stock);
    div.appendChild(category);
    realTimeProductContainer.appendChild(div);
  });
});
