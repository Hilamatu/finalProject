// utils.mjs

// Add product to cart
export function addToCart(productId) {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            const product = data.find(p => p.id === productId);
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Product added to cart!');
        });
}

// Generate star rating HTML
export function generateStarRating(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        stars += i < rating ? '★' : '☆';
    }
    return stars;
}

// Get product ID from URL
export function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Update reviews
export function updateReviews(reviews, productId) {
    const reviewList = document.getElementById('review-list');
    reviewList.innerHTML = '';
    reviews.forEach((review, index) => {
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review-item');
        reviewItem.innerHTML = `
            <div>${generateStarRating(review.rating)}</div>
            <p>${review.text}</p>
            <button onclick="deleteReview(${index}, '${productId}')">Delete</button>
        `;
        reviewList.appendChild(reviewItem);
    });
}

// Fetch JSON file and parse
export function fetchJSON(filePath) {
    return fetch(filePath).then(response => response.json());
}
