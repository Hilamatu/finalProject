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

            // Initialize the carousel
            initializeCarousel();
        });
}

function displayProducts(products) {
    const carouselInner = document.querySelector('.carousel-inner');
    carouselInner.innerHTML = ''; // Clear existing products
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('carousel-item');
        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <div>${generateStarRating(product.rating)}</div>
            <a href="product-detail.html?id=${product.id}">View Details</a>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        carouselInner.appendChild(productCard);
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

function initializeCarousel() {
    const carousel = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');

    let currentIndex = 0;

    function updateCarousel() {
        const offset = -currentIndex * (items[0].offsetWidth + 10); // Adjust offset to scroll by one item
        carousel.style.transform = `translateX(${offset}px)`;
    }

    nextButton.addEventListener('click', () => {
        if (currentIndex < items.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = items.length - 1;
        }
        updateCarousel();
    });

    // // Add an event listener to loop back to the first item when the 7th item is displayed
    // carousel.addEventListener('transitionend', () => {
    //     if (currentIndex === items.length -4) {
    //         carousel.style.transition = 'none';
    // //         currentIndex = 0;
    // //         updateCarousel();
    //         // setTimeout(() => {
    //         //     carousel.style.transition = 'transform 0.5s ease';
    //         // }, 0);
    //     }
    // });

    updateCarousel();
}

function updateHomePageRatings() {
    fetchProductListings();
}