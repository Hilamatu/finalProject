document.addEventListener('DOMContentLoaded', () => {
    const paymentMethodSelect = document.getElementById('payment-method');
    const creditCardInfo = document.getElementById('credit-card-info');
    const bankTransferInfo = document.getElementById('bank-transfer-info');

    paymentMethodSelect.addEventListener('change', () => {
        const paymentMethod = paymentMethodSelect.value;

        // Hide all optional sections and reset required attributes
        toggleRequiredFields(creditCardInfo, false);
        toggleRequiredFields(bankTransferInfo, false);
        creditCardInfo.style.display = 'none';
        bankTransferInfo.style.display = 'none';

        // Show and apply required attributes to relevant fields
        if (paymentMethod === 'credit-card') {
            creditCardInfo.style.display = 'block';
            toggleRequiredFields(creditCardInfo, true);
        } else if (paymentMethod === 'bank-transfer') {
            bankTransferInfo.style.display = 'block';
            toggleRequiredFields(bankTransferInfo, true);
        }
    });
});

function toggleRequiredFields(container, isRequired) {
    const inputs = container.querySelectorAll('input');
    inputs.forEach(input => {
        if (isRequired) {
            input.setAttribute('required', 'required');
        } else {
            input.removeAttribute('required');
        }
    });
}

function checkout(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const address = document.getElementById('address').value.trim();
    const paymentMethod = document.getElementById('payment-method').value;

    if (!name || !address) {
        alert('Please fill out your name and address.');
        return;
    }

    if (paymentMethod === 'credit-card') {
        const cardNumber = document.getElementById('card-number').value.trim();
        const expiryDate = document.getElementById('expiry-date').value.trim();
        const cvv = document.getElementById('cvv').value.trim();

        if (!validateCreditCardInfo(cardNumber, expiryDate, cvv)) {
            return; // Stop checkout if validation fails
        }
    } else if (paymentMethod === 'bank-transfer') {
        const bankName = document.getElementById('bank-name').value.trim();
        const bankAccount = document.getElementById('bank-account').value.trim();

        if (!bankName || !bankAccount) {
            alert('Please fill out all bank transfer details.');
            return;
        }
    }

    // Display success message and clear cart
    alert('Your checkout has succeeded! Thank you for your purchase.');

    localStorage.removeItem('cart');
    window.location.href = 'index.html';
}

function validateCreditCardInfo(cardNumber, expiryDate, cvv) {
    const cardNumberRegex = /^\d{16}$/; // Exactly 16 digits
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/; // Format MM/YY
    const cvvRegex = /^\d{3}$/; // Exactly 3 digits

    if (!cardNumberRegex.test(cardNumber)) {
        alert('Invalid card number. Please enter a 16-digit number.');
        return false;
    }

    if (!expiryDateRegex.test(expiryDate)) {
        alert('Invalid expiry date. Please use the format MM/YY.');
        return false;
    }

    if (!cvvRegex.test(cvv)) {
        alert('Invalid CVV. Please enter a 3-digit number.');
        return false;
    }

    return true;
}
