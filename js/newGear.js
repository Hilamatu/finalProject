import { toggleMenu } from "./utils.mjs";

window.toggleMenu = toggleMenu;

document.getElementById('main-category').addEventListener('change', updateSubCategory);
document.getElementById('sub-category').addEventListener('change', updateBoardCategory);

function updateSubCategory() {
    const subCategory = document.getElementById('sub-category');
    subCategory.value = ''; // Reset sub-category selection
    updateBoardCategory(); // Reset board category options
}

function updateBoardCategory() {
    const subCategory = document.getElementById('sub-category').value;
    const boardCategory = document.getElementById('board-category');
    boardCategory.innerHTML = ''; // Clear previous options

    if (subCategory === 'boots') {
        boardCategory.innerHTML = `
            <option value="" disabled selected hidden>Select Size</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="big">Big</option>
        `;
    } else if (subCategory === 'boards') {
        boardCategory.innerHTML = `
            <option value="" disabled selected hidden>Select Type</option>
            <option value="all-mountain">All Mountain</option>
            <option value="freerider">Freerider</option>
            <option value="powder">Powder</option>
            <option value="freestyle">Freestyle</option>
        `;
    }
}

document.getElementById('add-product-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const newProduct = {
        id: Date.now(), // Generate a unique ID
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

    // Save to local storage
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));

    // Display the product list
    displayProducts();
    
    // Clear the form
    document.getElementById('add-product-form').reset();
});

function displayProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear previous list

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.innerHTML = `
            <h3>${product.name}</h3>
            <img src="${product.image}" alt="${product.name}" />
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <p>Rating: ${product.rating}</p>
            <p>Main Category: ${product.mainCategory}</p>
            <p>Sub Category: ${product.subCategory}</p>
            <p>Board Category: ${product.boardCategory}</p>
        `;
        productList.appendChild(productItem);
    });
}

// Initial display of products
displayProducts();