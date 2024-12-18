import { generateStarRating, getProductIdFromURL, addToCart, fetchJSON } from './utils.mjs';

window.addToCart = addToCart;

// document.addEventListener('DOMContentLoaded', () => {
//     const productId = getProductIdFromURL();
//     fetchProductDetails(productId);
// });

// function fetchProductDetails(productId) {
//     fetchJSON('products.json').then(products => {
//         const product = products.find(p => p.id == productId);
//         document.getElementById('product-image').src = product.image;
//         document.getElementById('product-description').textContent = product.description;
//         document.getElementById('product-price').textContent = `Price: $${product.price}`;
//         document.getElementById('product-rating').innerHTML = generateStarRating(product.rating);
//     });
// }

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

let currentPage = 1;
const productsPerPage = 10;

function displayProducts(products, page = 1) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;
    const paginatedProducts = products.slice(start, end);

    paginatedProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img id="product-image" src="${product.image}" alt="Product Image">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <a href="product-detail.html?id=${product.id}">View Details</a>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productsContainer.appendChild(productCard);
    });

    displayPagination(products.length, page);
}

function displayPagination(totalProducts, currentPage) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(totalProducts / productsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.classList.add('page-button');
        if (i === currentPage) {
            pageButton.classList.add('active');
        }
        pageButton.addEventListener('click', () => {
            displayProducts(allProducts, i);
        });
        paginationContainer.appendChild(pageButton);
    }
}

function updateSubCategory() {
    const mainCategory = document.getElementById('main-category').value;
    const subCategory = document.getElementById('sub-category');
    subCategory.disabled = mainCategory === 'all';
    subCategory.value = 'all';
    updateSpecificCategory();
    
}
window.updateSubCategory = updateSubCategory;

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

window.updateSpecificCategory = updateSpecificCategory;

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
window.filterByCategory = filterByCategory;
