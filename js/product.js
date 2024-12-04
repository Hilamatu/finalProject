document.addEventListener('DOMContentLoaded', () => {
    const productId = getProductIdFromURL();
    fetchProductDetails(productId);
    fetchProductReviews(productId); // Ensure this function is called on page load
});

function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function fetchProductDetails(productId) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === productId);
    document.getElementById('product-image').src = product.image;
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('product-price').textContent = `Price: $${product.price}`;
    document.getElementById('product-rating').innerHTML = generateStarRating(product.rating);
}

function generateStarRating(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        stars += i < rating ? '★' : '☆';
    }
    return stars;
}

document.addEventListener('DOMContentLoaded', () => {
    fetchAllProducts();
});

let allProducts = [];

function fetchAllProducts() {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            allProducts = data;
            displayProducts(allProducts);
        });
}

function displayProducts(products) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <a href="product-detail.html?id=${product.id}">View Details</a>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productsContainer.appendChild(productCard);
    });
}

function updateSubCategory() {
    const mainCategory = document.getElementById('main-category').value;
    const subCategory = document.getElementById('sub-category');
    subCategory.disabled = mainCategory === 'all';
    subCategory.value = 'all';
    updateSpecificCategory();
}

function updateSpecificCategory() {
    const subCategory = document.getElementById('sub-category').value;
    const specificCategory = document.getElementById('specific-category');
    specificCategory.disabled = subCategory === 'all';

    specificCategory.innerHTML = '<option value="all">All</option>';

    if (subCategory === 'boots') {
        // Add size options for boots
        specificCategory.innerHTML += `
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
        `;
    } else if (subCategory === 'boards') {
        // Add board category options
        specificCategory.innerHTML += `
            <option value="all-mountain">All Mountain</option>
            <option value="freerider">Freerider</option>
            <option value="powder">Powder</option>
            <option value="freestyle">Freestyle</option>
        `;
    }

    filterByCategory();
}

function filterByCategory() {
    const mainCategory = document.getElementById('main-category').value;
    const subCategory = document.getElementById('sub-category').value;
    const specificCategory = document.getElementById('specific-category').value;

    let filteredProducts = allProducts;

    if (mainCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.mainCategory === mainCategory);
    }

    if (subCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.subCategory === subCategory);
    }

    if (subCategory === 'boots' && specificCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.size === specificCategory);
    } else if (subCategory === 'boards' && specificCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.boardCategory === specificCategory);
    }

    displayProducts(filteredProducts);
}


function addToCart() {
    const productId = getProductIdFromURL();
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === productId);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
}