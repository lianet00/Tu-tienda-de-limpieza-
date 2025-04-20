const products = [
  { name: "Jabón Líquido", price: 3 },
  { name: "Limpiador Multiusos", price: 4 },
  { name: "Esponja", price: 1 }
];

let cart = [];

function renderProducts() {
  const container = document.getElementById("productos");
  products.forEach((p, i) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `<h3>${p.name}</h3><p>$${p.price}</p>
      <div class="controls">
        <button onclick="changeQty(${i}, -1)">-</button>
        <span id="qty-${i}">0</span>
        <button onclick="changeQty(${i}, 1)">+</button>
        <button onclick="addToCart(${i})">🛒</button>
      </div>`;
    container.appendChild(div);
  });
}

function changeQty(i, delta) {
  const span = document.getElementById(`qty-${i}`);
  let v = parseInt(span.textContent);
  v = Math.max(0, v + delta);
  span.textContent = v;
}

function addToCart(i) {
  const qty = parseInt(document.getElementById(`qty-${i}`).textContent);
  if (qty > 0) {
    const existing = cart.find(item => item.i === i);
    if (existing) existing.qty += qty;
    else cart.push({ i, qty });
    document.getElementById(`qty-${i}`).textContent = 0;
    updateCart();
  }
}

function updateCart() {
  const list = document.getElementById("cart-items");
  list.innerHTML = "";
  cart.forEach(item => {
    const p = products[item.i];
    const li = document.createElement("li");
    li.textContent = `${p.name} x ${item.qty}`;
    list.appendChild(li);
  });
}

function toggleCart() {
  document.getElementById("cart").classList.toggle("hidden");
}

function sendOrder() {
  if (cart.length === 0) return alert("Carrito vacío");
  let msg = "Hola, este sería mi pedido:%0A";
  cart.forEach(item => {
    const p = products[item.i];
    msg += `- ${p.name} x${item.qty}%0A`;
  });
  window.open(`https://wa.me/5355019702?text=${msg}`, "_blank");
}

document.getElementById("cart-icon").onclick = toggleCart;
document.getElementById("send-order").onclick = sendOrder;
renderProducts();
