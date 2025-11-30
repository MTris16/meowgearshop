/* ============================
        CART PAGE FUNCTION
============================ */
// Function to read the cart and update the badge count (moved here for completeness)
function updateCartCount() {
    // Uses the same key as renderCart()
    const cart = JSON.parse(localStorage.getItem("cart") || "[]"); 
    let totalCount = 0;
    
    // Sum the quantity of all items, using the correct key: item.qty
    cart.forEach(item => {
        totalCount += parseInt(item.qty) || 0; 
    });

    const cartCountElement = document.getElementById('cart-count'); 
    if (cartCountElement) {
        cartCountElement.textContent = totalCount;
    }
}


function renderCart() {
    // CRITICAL: Uses the key "cart"
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const cartBody = document.getElementById("cart-body");
    // Assuming cartTotalEl is the element for "Tổng cộng" (Total)
    const cartTotalEl = document.getElementById("cart-total"); 
    // Assuming cartSubTotalEl is the element for "Tạm tính" (Subtotal)
    const cartSubTotalEl = document.getElementById("cart-subtotal"); 

    if (!cartBody) return;

    cartBody.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        // --- FIX FOR NaN₫ ---
        // 1. Clean the price string: remove ₫ and remove all periods (thousand separators)
        const cleanedPrice = item.price.replace(/₫/g, '').replace(/\./g, ''); 
        // 2. Perform math using the cleaned number and item.qty
        const itemTotal = parseInt(cleanedPrice) * item.qty;
        total += itemTotal;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>
                <img src="${item.image}" alt="${item.title}"><br>
                ${item.title}
            </td>
            <td>${item.price}</td>
            <td>
                <button class="qty-btn" data-id="${item.id}" data-action="minus">-</button>
                <span>${item.qty}</span>
                <button class="qty-btn" data-id="${item.id}" data-action="plus">+</button>
            </td>
            <td>${itemTotal.toLocaleString()}₫</td>
            <td><button class="remove-btn" data-id="${item.id}">Xóa</button></td>
        `;
        cartBody.appendChild(tr);
    });

    // Update Totals (using the standard toLocaleString format)
    if (cartTotalEl) cartTotalEl.innerText = total.toLocaleString() + "₫";
    if (cartSubTotalEl) cartSubTotalEl.innerText = total.toLocaleString() + "₫"; // Subtotal is the same as total if no tax/shipping

    // Button actions (updated to use item.qty)
    const qtyBtns = document.querySelectorAll(".qty-btn");
    qtyBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            const action = btn.dataset.action;
            const cart = JSON.parse(localStorage.getItem("cart") || "[]");
            // Find item by ID
            const item = cart.find(i => i.id == id); 

            if (!item) return;

            if (action === "plus") item.qty += 1;
            // Uses item.qty
            if (action === "minus") item.qty = Math.max(1, item.qty - 1); 

            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
            updateCartCount();
        });
    });

    const removeBtns = document.querySelectorAll(".remove-btn");
    removeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            let cart = JSON.parse(localStorage.getItem("cart") || "[]");
            cart = cart.filter(i => i.id != id);
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
            updateCartCount();
        });
    });
}

// Checkout button (demo)
const checkoutBtn = document.getElementById("checkout-btn");
if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
        alert("Đây là demo, bạn chưa kết nối backend. Vui lòng tích hợp payment gateway sau!");
    });
}

// Render cart on page load
renderCart();
// Also update count on page load
updateCartCount();