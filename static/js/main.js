// MAIN JS – for Hugo Shop Website (no assets, static only)
document.addEventListener("DOMContentLoaded", () => {

    /* ============================
       1. CHANGE PRODUCT THUMBNAILS
    ============================= */
    const mainImg = document.querySelector(".main-image");
    const thumbs = document.querySelectorAll(".thumb");

    if (mainImg && thumbs.length > 0) {
        thumbs.forEach(t => {
            t.addEventListener("click", () => {
                mainImg.src = t.src;
            });
        });
    }

    /* ============================
       2. MOBILE MENU TOGGLE
    ============================= */
    const menuBtn = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("active");
        });
    }

    /* ============================
       3. STICKY HEADER
    ============================= */
    const header = document.querySelector("header");

    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 20) header.classList.add("sticky");
            else header.classList.remove("sticky");
        });
    }

    /* ============================
       4. CART SYSTEM (LocalStorage)
    ============================= */

    // ==== Load cart from localStorage ====
    function getCart() {
        return JSON.parse(localStorage.getItem("cart") || "[]");
    }

    // ==== Save cart ====
    function saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
    }

    // ==== Add to cart ====
    const addBtn = document.querySelector(".add-to-cart");

    if (addBtn) {
        addBtn.addEventListener("click", () => {
            const product = {
                id: document.body.dataset.id || Date.now(),
                title: document.querySelector("h1").innerText,
                price: document.querySelector(".price .new").innerText,
                image: mainImg ? mainImg.src : ""
            };

            let cart = getCart();

            // If exists → increase quantity
            const found = cart.find(i => i.id === product.id);

            if (found) {
                found.qty += 1;
            } else {
                product.qty = 1;
                cart.push(product);
            }

            saveCart(cart);
            alert("Đã thêm vào giỏ!");
        });
    }

    // ==== Update cart icon count ====
    function updateCartCount() {
        const cart = getCart();
        const countEl = document.querySelector(".cart-count");

        if (countEl) {
            const total = cart.reduce((sum, item) => sum + item.qty, 0);
            countEl.innerText = total;
        }
    }

    updateCartCount(); // run on page load

    /* ============================
       5. SCROLL TO TOP BUTTON
    ============================= */
    const scrollBtn = document.querySelector(".scroll-top");

    if (scrollBtn) {
        scrollBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        window.addEventListener("scroll", () => {
            scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
        });
    }

    /* ============================
       6. SEARCH PRODUCT (BASIC)
    ============================= */
    const searchInput = document.querySelector(".search-input");
    const productCards = document.querySelectorAll(".product-card");

    if (searchInput && productCards.length > 0) {
        searchInput.addEventListener("input", () => {
            const keyword = searchInput.value.toLowerCase();

            productCards.forEach(card => {
                const name = card.dataset.name.toLowerCase();
                card.style.display = name.includes(keyword) ? "block" : "none";
            });
        });
    }
});
