document.addEventListener('DOMContentLoaded', () => {
    fetchProductListings();
});

function fetchProductListings() {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            // Filter products with a rating over 4
            const highRatedProducts = data.filter(product => product.rating >= 4);

            // Shuffle the filtered products
            const shuffledProducts = highRatedProducts.sort(() => 0.5 - Math.random());

            // Select the first 7 products
            const selectedProducts = shuffledProducts.slice(0, 7);

            // Render the selected products
            displayProducts(selectedProducts);
            });
        }   

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear existing products
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <div>${generateStarRating(product.rating)}</div>
            <a href="product-detail.html?id=${product.id}">View Details</a>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productCard);
    });
}

function generateStarRating(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        stars += i < rating ? '★' : '☆';
    }
    return stars;
}

function addToCart(productId) {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            const product = data.find(p => p.id === productId);
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Product added to cart!');
        });
}

function updateHomePageRatings() {
    fetchProductListings();
}