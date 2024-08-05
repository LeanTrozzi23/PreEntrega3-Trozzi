const productos = [
  {
    id: 1,
    category: "Ropa",
    description: "Remera del cantante Duki negra con estampado del artista",
    image: "Imagenes/remera-duki.webp",
    price: 30000,
    rating: 4.7,
    title: "Remera Duki Negra",
  },
  {
    id: 2,
    category: "Ropa",
    description: "Remera del artista Duki blanca con letras negras",
    image: "Imagenes/remera-duki3.webp",
    price: 30000,
    rating: 4.4,
    title: "Remera Duki Blanca",
  },
  {
    id: 3,
    category: "Ropa",
    description: "Remera del artista Duki azul estampada",
    image: "Imagenes/remera-azul-duki.webp",
    price: 30000,
    rating: 4.6,
    title: "Remera Duki Azul",
  },
  {
    id: 4,
    category: "Ropa",
    description: "Buzo del artista Duki negro con letras rojas",
    image: "Imagenes/buzo-duki.jpeg",
    price: 90000,
    rating: 4.6,
    title: "Buzo Duki Negro",
  },
  {
    id: 5,
    category: "Ropa",
    description: "Buzo del artista Duki negro edicion Fin del Mundo",
    image: "Imagenes/buzo-duki2.webp",
    price: 90000,
    rating: 4.7,
    title: "Buzo Duki Negro",
  },
  {
    id: 6,
    category: "Ropa",
    description: "Buzo del artista Duki blanco con letras negras",
    image: "Imagenes/buzo-duki3.webp",
    price: 90000,
    rating: 4.6,
    title: "Buzo Duki Blanco",
  },
  {
    id: 7,
    category: "Ropa",
    description: "Buzo del artista Duki rosa con estampado negro",
    image: "Imagenes/buzo-rosa.jpg",
    price: 90000,
    rating: 4.7,
    title: "Buzo Duki Rosa",
  },
  {
    id: 8,
    category: "Accesorio",
    description: "Gorra del artista Duki curva negra con letras blancas",
    image: "Imagenes/gorra-duki.jpg",
    price: 15000,
    rating: 4.5,
    title: "Gorra Duki Curva",
  },
  {
    id: 9,
    category: "Accesorio",
    description: "Gorra del artista Duki estilo piluso negro",
    image: "Imagenes/gorra-duki1.webp",
    price: 15000,
    rating: 4.5,
    title: "Gorra Duki Piluso",
  },
];

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
