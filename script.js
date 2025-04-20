const products = [
    { name: "Jabón Líquido", price: 3 },
    { name: "Limpiador Multiusos", price: 4 },
    { name: "Esponja", price: 1 },
];

const cart = [];

function createProductCards() {
    const container = document.getElementById("product-list");
    products.forEach((product, index) => {
        const card = document.createElement("div");
        card.className = "product";
        card.innerHTML = `
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <div class="controls">
                <button onclick="changeQty(${index}, -1)">-</button>
                <span id="qty-${index}">0</span>
                <button onclick="changeQty(${index}, 1)">+</button>
                <button onclick="addToCart(${index})">🛒</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function changeQty(index, delta) {
    const qtyElement = document.getElementById(`qty-${index}`);
    let qty = parseInt(qtyElement.textContent);
    qty = Math.max(0, qty + delta);
    qtyElement.textContent = qty;
}

function addToCart(index) {
    const qty = parseInt(document.getElementById(`qty-${index}`).textContent);
    if (qty > 0) {
        const existing = cart.find(item => item.index === index);
        if (existing) {
            existing.qty += qty;
        } else {
            cart.push({ index, qty });
        }
        document.getElementById(`qty-${index}`).textContent = 0;
        updateCartUI();
    }
}

function updateCartUI() {
    const list = document.getElementById("cart-items");
    list.innerHTML = "";
    cart.forEach(item => {
        const product = products[item.index];
        const li = document.createElement("li");
        li.textContent = `${product.name} x ${item.qty}`;
        list.appendChild(li);
    });
}

function toggleCart() {
    const cartDiv = document.getElementById("cart");
    cartDiv.classList.toggle("hidden");
}

function sendOrder() {
    if (cart.length === 0) return;
    const phone = "+5355019702";
    const message = "Hola, este sería mi pedido 🙂%0A" + cart.map(item => {
        const p = products[item.index];
        return `- ${p.name} x ${item.qty}`;
    }).join("%0A");
    const url = `https://wa.me/${phone}?text=${message}`;
    window.open(url, "_blank");
}
createProductCards();