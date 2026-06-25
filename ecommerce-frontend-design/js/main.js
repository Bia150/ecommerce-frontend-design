function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "site-toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("is-visible"));
  window.setTimeout(() => {
    toast.classList.remove("is-visible");
    window.setTimeout(() => toast.remove(), 200);
  }, 1800);
}

function bindPassiveForms() {
  document.querySelectorAll(".header-search, .newsletter-form, .request-card").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      showToast(form.classList.contains("header-search") ? "Search UI is ready" : "Request received");
    });
  });
}

function bindPagination() {
  document.querySelectorAll(".catalog-pagination a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      document.querySelectorAll(".catalog-pagination a").forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  bindPassiveForms();
  bindPagination();
});
