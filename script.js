
let cart = [];

function changeQuantity(btn, change) {
  const span = btn.parentElement.querySelector("span");
  let quantity = parseInt(span.textContent);
  quantity = Math.max(0, quantity + change);
  span.textContent = quantity;
}

function addToCart(btn) {
  const product = btn.parentElement;
  const name = product.querySelector("h2").textContent;
  const quantity = parseInt(product.querySelector(".quantity span").textContent);
  if (quantity > 0) {
    const existing = cart.find(p => p.name === name);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ name, quantity });
    }
    updateCart();
  }
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name}: ${item.quantity}`;
    cartItems.appendChild(li);
  });
}

function toggleCart() {
  document.getElementById("cart").classList.toggle("hidden");
}

function sendToWhatsApp() {
  const phone = "5355019702";
  let message = "Hola, este sería mi pedido 🙂%0A";
  cart.forEach(item => {
    message += `• ${item.name}: ${item.quantity}%0A`;
  });
  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
}
