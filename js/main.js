import { addToCart, generateStarRating, fetchJSON, toggleMenu } from './utils.mjs';

// Expose addToCart to the global scope by attaching it to window
window.addToCart = addToCart;
window.toggleMenu = toggleMenu;

document.addEventListener('DOMContentLoaded', () => {
    fetchProductListings();
    fetchWeather();
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

function fetchWeather() {
    const apiKey = 'YOUR_API_KEY'; // Replace with your API key
    const city = 'Tokyo'; // Replace with your desired city
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherContainer = document.getElementById('weather-container');
            weatherContainer.innerHTML = `
                <h3>Weather in ${data.name}</h3>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Condition: ${data.weather[0].description}</p>
            `;
        })
        .catch(error => console.error('Error fetching weather data:', error));
}