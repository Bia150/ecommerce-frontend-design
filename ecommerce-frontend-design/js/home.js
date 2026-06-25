document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".deal-item, .product-tile, .service-card").forEach((card) => {
    card.addEventListener("mouseenter", () => card.classList.add("is-hovered"));
    card.addEventListener("mouseleave", () => card.classList.remove("is-hovered"));
  });
});
