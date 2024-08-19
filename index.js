let productos = [];

document.addEventListener("DOMContentLoaded", () => {
  const getProducts = fetch("./data.json");
  getProducts
    .then((res) => res.json())
    .then((res) => {
      productos = res;
      renderProducts(productos);
    });
});

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const renderProducts = (arrayPorductos) => {
  let containerProducts = document.getElementById("containerProducts");
  containerProducts.innerHTML = "";

  arrayPorductos.forEach((producto) => {
    let productsCard = document.createElement("div");
    productsCard.className = "producto";
    productsCard.innerHTML = `
    <h3>${producto.title}</h3>
    <img src=${producto.image} class="ropa" />
     <div class="p-cart">
    <p>${producto.description}</p>
    <p>Precio: $${producto.price}</p>
    <div>
    <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
    `;
    containerProducts.appendChild(productsCard);
  });
};

renderProducts(productos);

const agregarAlCarrito = (id) => {
  let producto = productos.find((elemento) => elemento.id === id);
  let productoEnElCarrito = carrito.find((elemento) => elemento.id === id);
  if (productoEnElCarrito) {
    productoEnElCarrito.quantity += 1;
    Toastify({
      text: "¡Se agrego al carrito!",
      gravity: "bottom",
      position: "right",
      style: {
        background: "green",
      },
    }).showToast();
  } else {
    carrito.push({ ...producto, quantity: 1 });
    Toastify({
      text: "Se agrego al carrito!",
      gravity: "bottom",
      position: "right",
      background: "#ffc0cbac",
      style: {
        background: "green",
      },
    }).showToast();
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

document.addEventListener("DOMContentLoaded", () => {
  const inputSearch = document.getElementById("search");
  const searchButton = document.getElementById("searchButton");
  const searchForm = document.getElementById("searchForm");

  const realizarBusqueda = (evento) => {
    evento.preventDefault();

    const value = inputSearch.value.toLowerCase();

    const arrayFiltrado = productos.filter((producto) =>
      producto.title.toLowerCase().includes(value)
    );

    renderProducts(arrayFiltrado);
  };

  searchForm.addEventListener("submit", realizarBusqueda);
});
