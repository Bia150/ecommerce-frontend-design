function currency(value) {
  return `$${value.toFixed(2)}`;
}

function readStoredCartItems() {
  try {
    return JSON.parse(localStorage.getItem("cartItems")) || [];
  } catch {
    return [];
  }
}

function writeStoredCartItems(items) {
  localStorage.setItem("cartItems", JSON.stringify(items));
}

function cartItemTemplate(item) {
  const lineTotal = item.price * item.quantity;
  return `
    <article class="cart-item stored-cart-item" data-id="${item.id}" data-price="${lineTotal}">
      <img src="${item.image}" alt="${item.alt}">
      <div class="cart-item-info">
        <h2>${item.title}</h2>
        <p>Size: standard, Color: default, Material: Mixed</p>
        <p>Seller: ${item.seller}</p>
        <div class="cart-item-actions">
          <button type="button" class="remove-item">Remove</button>
          <button type="button">Save for later</button>
        </div>
      </div>
      <div class="cart-item-side">
        <strong class="cart-line-price">${currency(item.price)}</strong>
        <select class="qty-select" aria-label="Quantity" data-id="${item.id}">
          ${[1, 2, 3, 4, 5].map((qty) => `<option value="${qty}" ${qty === item.quantity ? "selected" : ""}>Qty: ${qty}</option>`).join("")}
        </select>
      </div>
    </article>
  `;
}

function renderStoredCartItems() {
  const target = document.querySelector("#stored-cart-items");
  if (!target) return;
  target.innerHTML = readStoredCartItems().map(cartItemTemplate).join("");
}

function recalculateCart() {
  const rows = Array.from(document.querySelectorAll(".cart-item"));
  const subtotal = rows.reduce((sum, row) => sum + Number(row.dataset.price || 0), 0);
  const discount = rows.length ? 60 : 0;
  const tax = rows.length ? 14 : 0;
  const total = Math.max(subtotal - discount + tax, 0);

  document.querySelector(".cart-title").textContent = `My cart (${rows.length})`;
  document.querySelector("#subtotal").textContent = currency(subtotal);
  document.querySelector("#total").textContent = currency(total);
}

document.addEventListener("DOMContentLoaded", () => {
  renderStoredCartItems();

  document.querySelector(".cart-items")?.addEventListener("click", (event) => {
    const removeButton = event.target.closest(".remove-item");
    if (!removeButton) return;

    const row = removeButton.closest(".cart-item");
    const id = Number(row?.dataset.id);
    if (id) {
      writeStoredCartItems(readStoredCartItems().filter((item) => item.id !== id));
    }
    row?.remove();
    recalculateCart();
  });

  document.querySelector(".cart-items")?.addEventListener("change", (event) => {
    const select = event.target.closest(".stored-cart-item .qty-select");
    if (!select) return;

    const id = Number(select.dataset.id);
    const items = readStoredCartItems();
    const item = items.find((entry) => entry.id === id);
    if (!item) return;

    item.quantity = Number(select.value);
    writeStoredCartItems(items);
    renderStoredCartItems();
    recalculateCart();
  });

  document.querySelector("#remove-all")?.addEventListener("click", () => {
    writeStoredCartItems([]);
    document.querySelectorAll(".cart-item").forEach((item) => item.remove());
    recalculateCart();
  });

  document.querySelectorAll(".saved-grid button").forEach((button) => {
    button.addEventListener("click", () => {
      showToast("Product moved to cart");
    });
  });

  recalculateCart();
});
