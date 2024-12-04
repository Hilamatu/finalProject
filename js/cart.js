document.addEventListener('DOMContentLoaded', () => {
    updateCart();
});

function updateCart() {
    const cartList = document.getElementById('cart-list');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartList.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
        `;
        cartList.appendChild(cartItem);
    });
}

function clearCart() {
    localStorage.removeItem('cart');
    updateCart();
}

function proceedToCheckout() {
    window.location.href = 'checkout.html';
}