let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const renderProducts = (arrayPorductos) => {
  let containerCart = document.getElementById("containerCart");
  containerCart.innerHTML = "";

  arrayPorductos.forEach((producto) => {
    let productsCard = document.createElement("div");
    productsCard.className = "producto";
    productsCard.innerHTML = `
      <h3>${producto.title}</h3>
      <img src=${producto.image} class="ropa" />
      <div class="p-cart">
      <p>${producto.description}</p>
      <p >Precio: $${producto.price}  </p>
      <div>
      <div class="containerbtn">
      <button onclick="sumarCantidad(${producto.id})">+</button>

      <h5 class="price">${producto.quantity}</h5>
      
      <button onclick="restarCantidad(${producto.id})">-</button>
      <div>

      <div class="btn-eliminar">
      <button onclick="eliminarDelCarrito(${producto.id})">Eliminar del carrito</button>
      <div>

      `;
    containerCart.appendChild(productsCard);
  });
};

renderProducts(carrito);

const eliminarDelCarrito = (id) => {
  carrito = carrito.filter((elemento) => elemento.id !== id);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderProducts(carrito);
};

const sumarCantidad = (id) => {
  let productoEncontrado = carrito.find((elemento) => elemento.id === id);
  if (productoEncontrado) {
    productoEncontrado.quantity += 1;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderProducts(carrito);
  }
};

const restarCantidad = (id) => {
  let productoEncontrado = carrito.find((elemento) => elemento.id === id);
  if (productoEncontrado && productoEncontrado.quantity > 1) {
    productoEncontrado.quantity -= 1;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderProducts(carrito);
  } else if (productoEncontrado && productoEncontrado.quantity === 1) {
    eliminarDelCarrito(productoEncontrado.id);
  }
};

const btn = document.getElementById("finalizarCompra");
const modal = document.getElementById("modal");
const span = document.getElementById("closeModal");
const modalBody = document.getElementById("modal-body");

const showModal = () => {
  modal.style.display = "block"; // Muestra el modal
  btn.classList.add("hide"); // Oculta el botón
};

// Función para cerrar el modal
const closeModal = () => {
  modal.style.display = "none"; // Oculta el modal
  btn.classList.remove("hide"); // Muestra el botón nuevamente
};

// Función para generar el resumen del carrito
const updateModalContent = () => {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  if (carrito.length === 0) {
    modalBody.innerHTML = "<p>No hay productos en el carrito.</p>";
  } else {
    let resumen = "<ul>";
    let total = 0;

    carrito.forEach((item) => {
      // Encuentra el producto en el array de productos
      let producto = carrito.find((prod) => prod.id === item.id);
      if (producto) {
        const subtotal = producto.price * item.quantity;
        total += subtotal;
        resumen += `<li>
                              <img src="${producto.image}" alt="${producto.title}" style="width: 50px; height: auto; margin-right: 10px;">
                              ${producto.title} - Cantidad: ${item.quantity} - Precio: $${subtotal}
                          </li>`;
      }
    });

    resumen += "</ul>";
    resumen += `<p><strong>Total: $${total}</strong></p>`;
    resumen += `<button id="comprarBtn">Comprar</button>`;
    modalBody.innerHTML = resumen;
    const comprarBtn = document.getElementById("comprarBtn");
    if (comprarBtn) {
      comprarBtn.addEventListener("click", () => {
        Swal.fire({
          title: "¡Gracias por su compra!",
          icon: "success",
        });
      });
    }
  }
};

// Muestra el modal y actualiza el contenido al hacer clic en el botón
btn.addEventListener("click", () => {
  updateModalContent(); // Actualiza el contenido del modal
  showModal(); // Muestra el modal
});

// Cierra el modal al hacer clic en el botón de cerrar
span.addEventListener("click", closeModal);

// Cierra el modal si se hace clic fuera del contenido del modal
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});
