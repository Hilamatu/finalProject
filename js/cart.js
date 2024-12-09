import { fetchJSON } from './utils.mjs';

document.addEventListener('DOMContentLoaded', () => {
    updateCart();
});

// expose clearCart and proceedToCheckout to the global scope by attaching it to window
window.clearCart = clearCart;
window.proceedToCheckout = proceedToCheckout;

function updateCart() {
    const cartList = document.getElementById('cart-list');
    const totalPriceElement = document.getElementById('total-price'); // Ensure this element exists
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartList.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
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