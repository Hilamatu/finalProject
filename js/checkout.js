document.addEventListener('DOMContentLoaded', () => {
    const paymentMethodSelect = document.getElementById('payment-method');
    const creditCardInfo = document.getElementById('credit-card-info');

    paymentMethodSelect.addEventListener('change', () => {
        if (paymentMethodSelect.value === 'credit-card') {
            creditCardInfo.style.display = 'block';
        } else {
            creditCardInfo.style.display = 'none';
        }
    });
});

function checkout(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const paymentMethod = document.getElementById('payment-method').value;

    if (paymentMethod === 'credit-card') {
        const cardNumber = document.getElementById('card-number').value;
        const expiryDate = document.getElementById('expiry-date').value;
        const cvv = document.getElementById('cvv').value;
        // Process credit card payment
    } else if (paymentMethod === 'paypal') {
        // Process PayPal payment
    } else if (paymentMethod === 'bank-transfer') {
        // Process bank transfer payment
    }

    // Clear the cart
    localStorage.removeItem('cart');

    // Display success message
    alert(`Thank you for your purchase, ${name}!`);

    // Redirect to home page
    window.location.href = 'index.html';
}