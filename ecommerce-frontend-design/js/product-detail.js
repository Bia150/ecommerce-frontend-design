let activeProduct = null;

function money(value) {
  return `$${value.toFixed(2)}`;
}

function setText(selector, value) {
  const node = document.querySelector(selector);
  if (node) node.textContent = value;
}

function renderGallery(product) {
  const mainImage = document.querySelector("#main-product-image");
  const thumbnailRow = document.querySelector(".thumbnail-row");
  if (!mainImage || !thumbnailRow) return;

  mainImage.src = product.image;
  mainImage.alt = product.alt;

  thumbnailRow.innerHTML = product.thumbnails
    .map((image, index) => `
      <button class="thumb ${index === 0 ? "is-active" : ""}" type="button" data-image="${image}" data-alt="${product.title}">
        <img src="${image}" alt="${product.title} thumbnail ${index + 1}">
      </button>
    `)
    .join("");
}

function renderProductDetail(product) {
  activeProduct = product;
  document.title = `Brand - ${product.title}`;

  renderGallery(product);
  setText("#product-title", product.title);
  setText("#product-rating", product.rating.toFixed(1));
  setText("#product-reviews", `${product.reviews} reviews`);
  setText("#product-sold", `${product.sold} sold`);
  setText("#tier-price-one", money(product.price));
  setText("#tier-price-two", money(Math.max(product.price - 8, 1)));
  setText("#tier-price-three", money(Math.max(product.price - 20, 1)));
  setText("#meta-price", money(product.price));
  setText("#meta-type", product.type);
  setText("#meta-material", product.material);
  setText("#meta-design", product.design);
  setText("#meta-customization", product.customization);
  setText("#meta-warranty", product.warranty);
  setText("#supplier-name", product.supplier);
  setText("#detail-description", product.description);
}

function bindGallery() {
  const mainImage = document.querySelector("#main-product-image");
  const thumbnailRow = document.querySelector(".thumbnail-row");
  if (!mainImage || !thumbnailRow) return;

  thumbnailRow.addEventListener("click", (event) => {
    const thumbnail = event.target.closest(".thumb");
    if (!thumbnail) return;
    thumbnailRow.querySelectorAll(".thumb").forEach((item) => item.classList.remove("is-active"));
    thumbnail.classList.add("is-active");
    mainImage.src = thumbnail.dataset.image;
    mainImage.alt = thumbnail.dataset.alt || "Product image";
  });
}

function bindTabs() {
  const buttons = document.querySelectorAll(".tab-button");
  const panels = document.querySelectorAll(".tab-panel");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => {
        item.classList.remove("is-active");
        item.setAttribute("aria-selected", "false");
      });
      panels.forEach((panel) => panel.classList.remove("is-active"));

      button.classList.add("is-active");
      button.setAttribute("aria-selected", "true");
      document.querySelector(`#${button.dataset.tab}`)?.classList.add("is-active");
    });
  });
}

function bindSaveForLater() {
  const button = document.querySelector(".save-later");
  if (!button) return;

  button.addEventListener("click", () => {
    const active = button.classList.toggle("is-active");
    button.innerHTML = active ? "&#9829; Saved" : "&#9825; Save for later";
  });
}

function readCartItems() {
  try {
    return JSON.parse(localStorage.getItem("cartItems")) || [];
  } catch {
    return [];
  }
}

function writeCartItems(items) {
  localStorage.setItem("cartItems", JSON.stringify(items));
}

function addActiveProductToCart() {
  if (!activeProduct) return;
  const quantity = Number(document.querySelector("#detail-quantity")?.value || 1);
  const items = readCartItems();
  const existing = items.find((item) => item.id === activeProduct.id);

  if (existing) {
    existing.quantity += quantity;
  } else {
    items.push({
      id: activeProduct.id,
      title: activeProduct.title,
      price: activeProduct.price,
      image: activeProduct.image,
      alt: activeProduct.alt,
      quantity,
      seller: activeProduct.supplier,
    });
  }

  writeCartItems(items);
  showToast("Added to cart");
}

function bindCartButtons() {
  document.querySelector("#add-to-cart")?.addEventListener("click", addActiveProductToCart);
  document.querySelector("#supplier-add-to-cart")?.addEventListener("click", addActiveProductToCart);
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  renderProductDetail(findCatalogProduct(params.get("id")));
  bindGallery();
  bindTabs();
  bindSaveForLater();
  bindCartButtons();
});
