document.getElementById('add-product-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const newProduct = {
        id: Date.now().toString(), // Generate a unique ID
        name: document.getElementById('product-name').value,
        image: document.getElementById('product-image').value,
        description: document.getElementById('product-description').value,
        price: parseFloat(document.getElementById('product-price').value),
        rating: parseInt(document.getElementById('product-rating').value),
        mainCategory: document.getElementById('main-category').value,
        subCategory: document.getElementById('sub-category').value,
        boardCategory: document.getElementById('board-category').value
    };
    
    console.log('New Product:', newProduct); // Debugging log
    
    fetch('/add-product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Product added successfully!');
            // Clear the form
            document.getElementById('add-product-form').reset();
        } else {
            alert('Failed to add product.');
        }
    })
    .catch(error => {
        console.error('Error adding product:', error);
    });
});