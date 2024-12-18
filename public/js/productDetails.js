import { generateStarRating, getProductIdFromURL, fetchJSON } from './utils.mjs';

document.addEventListener('DOMContentLoaded', () => {
    const productId = getProductIdFromURL();
    if (productId) {
        fetchProductDetails(productId);
        fetchProductReviews(productId);
    } else {
        console.error('No product ID found in the URL.');
    }
});

function fetchProductDetails(productId) {
    fetchJSON('products.json')
        .then(products => {
            const product = products.find(p => p.id == productId); // Use == to compare string and number
            if (!product) {
                console.error(`Product with ID ${productId} not found.`);
                return;
            }

            // Populate product details
            document.getElementById('product-name').textContent = product.name;
            document.getElementById('product-image').src = product.image;
            document.getElementById('product-description').textContent = product.description;
            document.getElementById('product-price').textContent = `Price: $${product.price}`;
            document.getElementById('product-rating').innerHTML = generateStarRating(product.rating);
        })
        .catch(error => {
            console.error('Error fetching product details:', error);
        });
}

function fetchProductReviews(productId) {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
    const productReviews = reviews[productId] || [];

    updateReviews(productReviews, productId);
}

function updateReviews(reviews, productId) {
    const reviewList = document.getElementById('review-list');
    if (!reviewList) {
        console.error('Review list element not found in the DOM.');
        return;
    }

    reviewList.innerHTML = ''; // Clear current reviews

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


