const socket = io();

const realTimeProductContainer = document.querySelector(
  ".realTimeProductContainer"
);

let productsData = [];

socket.on("realTimeProducts", (data) => {
  realTimeProductContainer.innerHTML = "";

  productsData = data;

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

    const updateButton = document.createElement("button");
    updateButton.innerText = "Modificar";
    updateButton.classList.add("updateButton");
    updateButton.addEventListener("click", () => {
      modifyProduct(product.id);
      console.log("ID del producto a modificar:", product.id);
    });

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    buttonContainer.appendChild(deleteButtonOne);
    buttonContainer.appendChild(deleteButtonAll);
    buttonContainer.appendChild(updateButton);

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

const modifyProduct = (productId) => {
  const product = productsData.find((product) => product.id == productId);

  if (!product) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Producto no encontrado.",
    });
    return;
  }

  Swal.fire({
    title: `Modificar Producto: ${product.title}`,
    html:
      `<input id="swal-title" class="swal2-input" placeholder="Título" value="${product.title}">` +
      `<input id="swal-description" class="swal2-input" placeholder="Descripción" value="${product.description}">` +
      `<input id="swal-code" class="swal2-input" placeholder="Código" value="${product.code}">` +
      `<input id="swal-price" class="swal2-input" placeholder="Precio" value="${product.price}">` +
      `<input id="swal-stock" class="swal2-input" placeholder="Stock" value="${product.stock}">` +
      `<input id="swal-category" class="swal2-input" placeholder="Categoría" value="${product.category}">`,
    showCancelButton: true,
    confirmButtonText: "Guardar cambios",
    cancelButtonText: "Cancelar",
    preConfirm: () => {
      return {
        id: productId,
        title: document.getElementById("swal-title").value,
        description: document.getElementById("swal-description").value,
        code: document.getElementById("swal-code").value,
        price: document.getElementById("swal-price").value,
        stock: document.getElementById("swal-stock").value,
        category: document.getElementById("swal-category").value,
      };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const updatedProduct = result.value;
      socket.emit("updateProductById", updatedProduct);
    }
  });
};

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
