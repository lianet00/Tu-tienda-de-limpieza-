
const productos = [
    { nombre: "Jabón Líquido", precio: 3 },
    { nombre: "Limpiador Multiusos", precio: 4 },
    { nombre: "Esponja", precio: 1 },
];

const carrito = {};

function renderProductos() {
    const contenedor = document.getElementById("productos");
    productos.forEach((producto, i) => {
        carrito[i] = 0;
        const div = document.createElement("div");
        div.className = "producto";
        div.innerHTML = `
            <h2>${producto.nombre}</h2>
            <p>$${producto.precio}</p>
            <div class="botones">
                <button onclick="cambiarCantidad(${i}, -1)">-</button>
                <span id="cantidad-${i}">0</span>
                <button onclick="cambiarCantidad(${i}, 1)">+</button>
                <button onclick="agregarAlCarrito(${i})">🛒</button>
            </div>
        `;
        contenedor.appendChild(div);
    });
}

function cambiarCantidad(i, valor) {
    carrito[i] = Math.max(0, carrito[i] + valor);
    document.getElementById(`cantidad-${i}`).textContent = carrito[i];
}

function agregarAlCarrito(i) {
    alert(`Agregado al carrito: ${productos[i].nombre} (${carrito[i]})`);
}

document.getElementById("verCarrito").onclick = () => {
    let mensaje = "Hola, este sería mi pedido 🙂:%0A";
    productos.forEach((p, i) => {
        if (carrito[i] > 0) {
            mensaje += `- ${p.nombre} x ${carrito[i]}%0A`;
        }
    });
    const telefono = "5355019702";
    window.open(`https://wa.me/${telefono}?text=${mensaje}`, "_blank");
};

renderProductos();
