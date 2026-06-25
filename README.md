# Ecommerce Frontend Design

Static HTML, CSS, and JavaScript implementation of the provided ecommerce Figma screens. The pages use only the supplied local assets from `../assets`.

## Pages

- `pages/home.html` - marketplace home page
- `pages/product-list.html` - product listing grid/list page
- `pages/product-detail.html` - product detail page
- `pages/cart.html` - shopping cart page

## Structure

```text
ecommerce-frontend-design/
  css/
    variables.css
    reset.css
    header.css
    footer.css
    components.css
    home.css
    product-list.css
    product-detail.css
    cart.css
  js/
    main.js
    home.js
    product-list.js
    product-detail.js
    cart.js
  pages/
    home.html
    product-list.html
    product-detail.html
    cart.html
  README.md
```

## Run

Open any page directly in the browser, for example:

```text
pages/home.html
```

You can also use a local static server from this folder:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/pages/home.html
```

## Notes

- Built with modular CSS files for shared layout, header, footer, and each page.
- Uses the provided product images, flags, backgrounds, logo, and app badges only.
- Includes responsive layouts for desktop, tablet, and mobile widths.
- JavaScript handles styled search/newsletter submits, product list sorting/view toggle, product detail gallery/tabs, and cart remove/recalculate behavior.
