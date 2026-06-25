const productCopy = "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.";

function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

function ratingMarkup(rating, orders) {
  return `<span aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span><span>${rating.toFixed(1)} - ${orders} orders</span>`;
}

function productCardTemplate(product) {
  return `
    <article class="catalog-card" data-price="${product.price}" data-rating="${product.rating}">
      <a class="catalog-card__image" href="./product-detail.html?id=${product.id}">
        <img src="${product.image}" alt="${product.alt}" loading="lazy">
      </a>
      <div class="catalog-card__body">
        <div class="catalog-card__price">
          <strong class="price">${formatPrice(product.price)}</strong>
          <span class="price-old">${formatPrice(product.oldPrice)}</span>
        </div>
        <div class="rating">${ratingMarkup(product.rating, product.orders)}</div>
        <a class="catalog-card__title" href="./product-detail.html?id=${product.id}">${product.title}</a>
        <span class="catalog-card__meta">Free Shipping</span>
        <p class="catalog-card__copy">${product.description || productCopy}</p>
        <a class="catalog-card__link" href="./product-detail.html?id=${product.id}">View details</a>
      </div>
      <button class="heart-button" type="button" aria-label="Save ${product.title}">&#9825;</button>
    </article>
  `;
}

function renderProducts(products) {
  const container = document.querySelector("#products-container");
  if (!container) return;
  container.innerHTML = products.map(productCardTemplate).join("");
}

function sortProducts(sortValue) {
  const sorted = [...CATALOG_PRODUCTS];

  if (sortValue === "price-low") {
    sorted.sort((a, b) => a.price - b.price);
  }

  if (sortValue === "price-high") {
    sorted.sort((a, b) => b.price - a.price);
  }

  if (sortValue === "rating") {
    sorted.sort((a, b) => b.rating - a.rating);
  }

  renderProducts(sorted);
}

function setView(view) {
  const container = document.querySelector("#products-container");
  const buttons = document.querySelectorAll(".view-btn");
  if (!container) return;

  container.classList.toggle("is-list", view === "list");
  buttons.forEach((button) => button.classList.toggle("is-active", button.dataset.view === view));
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts(CATALOG_PRODUCTS);

  const initialView = new URLSearchParams(window.location.search).get("view");
  if (initialView === "list") {
    setView("list");
  }

  document.querySelector("#sort-products")?.addEventListener("change", (event) => {
    sortProducts(event.target.value);
  });

  document.querySelectorAll(".view-btn").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });

  document.querySelector("#products-container")?.addEventListener("click", (event) => {
    const heart = event.target.closest(".heart-button");
    if (!heart) return;
    heart.classList.toggle("is-active");
    heart.innerHTML = heart.classList.contains("is-active") ? "&#9829;" : "&#9825;";
  });
});
