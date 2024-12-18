import { addToCart, generateStarRating, fetchJSON } from './utils.mjs';

//expose addToCart to the global scope by attaching it to window
window.addToCart = addToCart;

document.addEventListener('DOMContentLoaded', () => {
    fetchProductListings();
});

function fetchProductListings() {
    fetchJSON('products.json')
        .then(data => {
            const highRatedProducts = data.filter(product => product.rating >= 4);
            const shuffledProducts = highRatedProducts.sort(() => 0.5 - Math.random());
            const selectedProducts = shuffledProducts.slice(0, 7);
            displayProducts(selectedProducts);
            initializeCarousel();
        });
}

function displayProducts(products) {
    const carouselInner = document.querySelector('.carousel-inner');
    carouselInner.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('carousel-item');
        productCard.innerHTML = `
            <img id="product-image" src="${product.image}" alt="Product Image">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <div>${generateStarRating(product.rating)}</div>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        carouselInner.appendChild(productCard);
    });
}


function initializeCarousel() {
    const carousel = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');

    let currentIndex = 0; // Start at the first item

    function updateCarousel() {
        const offset = -currentIndex * items[0].offsetWidth; // Calculate offset
        carousel.style.transition = 'transform 0.5s ease';
        carousel.style.transform = `translateX(${offset}px)`;

        // Disable/enable buttons based on the current index
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === items.length - 1;
    }

    nextButton.addEventListener('click', () => {
        if (currentIndex < items.length - 5) {
            currentIndex++;
            updateCarousel();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    // Initialize the carousel
    updateCarousel();
}



function updateHomePageRatings() {
    fetchProductListings();
}