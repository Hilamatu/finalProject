import { fetchJSON, toggleMenu } from './utils.mjs';

window.toggleMenu = toggleMenu;
document.addEventListener('DOMContentLoaded', () => {
    updateCart();
});

// expose clearCart and proceedToCheckout to the global scope by attaching it to window
window.clearCart = clearCart;
window.proceedToCheckout = proceedToCheckout;

function updateCart() {
    const cartList = document.getElementById('cart-list');
    const totalPriceElement = document.getElementById('total-price'); 
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartList.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img id="product-image" src="${item.image}" alt="Product Image">
            <div>
                <h1>${item.name}</h1>
                <h2>Description: ${item.description}</h2>
                <h3>Price: $${item.price}</h3>
            </div>
        `;
        cartList.appendChild(cartItem);

        // Accumulate total price
        totalPrice += item.price;
    });

    // Update total price display
    if (totalPriceElement) {
        totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
    }
}

function clearCart() {
    localStorage.removeItem('cart');
    updateCart();
}

function proceedToCheckout() {
    window.location.href = 'checkout.html';
}