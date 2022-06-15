class Carrito {
  constructor(productos, iva = 1.21) {
    this.productos = productos;
    this.IVA = iva;
  }

  renderCartWidget = () => {
    const cartCount = d.querySelector('.cartCount');
    const cartItems = this.productos.map(({quantity}) => quantity).reduce((acc, quantity) => acc + quantity, 0);
    cartCount.innerHTML = cartItems > 99 ? "99+" : cartItems;
  }

  renderTotal = () => {
    const total = d.getElementById("carritoTotal");
    total.innerText = this.getTotalNeto().toLocaleString();
  };

  renderCarrito = () => {
    //La plantilla de cada fila es devuelta por la funcion cartRow dentro de dynamicElements.js
    const bodyCarrito = d.getElementById("bodyCarrito");
    bodyCarrito.innerHTML = this.productos
      .map((producto, index) => cartRow(producto, index))
      .join("\n");
    this.renderTotal();
    this.guardarLocal();
    this.renderCartWidget();
  };

  cargarProducto = (nuevoProducto) => {
    this.productos = this.productos.some(
      (producto) => producto.id == nuevoProducto.id
    )
      ? this.productos.map((producto) =>
          producto.id == nuevoProducto.id
            ? {
                ...producto,
                quantity: producto.quantity + nuevoProducto.quantity,
              }
            : producto
        )
      : [...this.productos, nuevoProducto];

    this.renderCarrito();
  };

  guardarLocal = () => {
    this.productos.length > 0
      ? localStorage.setItem("cart", JSON.stringify(this.productos))
      : localStorage.removeItem("cart");
  };

  eliminarProducto = (productoIndice) => {
    this.productos.splice(productoIndice, 1);
    this.renderCarrito();
  };

  vaciarCarrito = () => {
    this.productos = [];
    this.renderCarrito();
  };

  getTotalBruto = () =>
    this.productos
      .map((producto) => producto.price * producto.quantity)
      .reduce((acc, precio) => (acc += precio), 0);

  getTotalNeto = () => this.getTotalBruto() * this.IVA;

  getCantidadProductos = () => this.productos.length;
}
