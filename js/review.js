document.addEventListener('DOMContentLoaded', () => {
    const productId = getProductIdFromURL();
    fetchProductReviews(productId); // Ensure this function is called on page load
});

function fetchProductReviews(productId) {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
    const productReviews = reviews[productId] || [];
    updateReviews(productReviews);
}

function submitUserReview(event) {
    event.preventDefault();
    const reviewText = document.getElementById('review-text').value;
    const reviewRating = parseInt(document.getElementById('review-rating').value);
    const productId = getProductIdFromURL();

    const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
    const productReviews = reviews[productId] || [];
    productReviews.unshift({ text: reviewText, rating: reviewRating }); // Add new review at the top
    reviews[productId] = productReviews;
    localStorage.setItem('reviews', JSON.stringify(reviews));

    updateReviews(productReviews);
    updateProductRating(productId, productReviews);
}

function updateReviews(reviews) {
    const reviewList = document.getElementById('review-list');
    reviewList.classList.add('review-list');
    reviewList.innerHTML = '';
    reviews.forEach((review, index) => {
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review-item');
        reviewItem.innerHTML = `
            <div>${generateStarRating(review.rating)}</div>
            <p>${review.text}</p>
            <button onclick="deleteReview(${index})">Delete</button>
        `;
        reviewList.appendChild(reviewItem);
    });
}

function deleteReview(index) {
    const productId = getProductIdFromURL();
    const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
    const productReviews = reviews[productId] || [];
    productReviews.splice(index, 1);
    reviews[productId] = productReviews;
    localStorage.setItem('reviews', JSON.stringify(reviews));

    updateReviews(productReviews);
    updateProductRating(productId, productReviews);
}

function updateProductRating(productId, reviews) {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = reviews.length ? Math.round(totalRating / reviews.length) : 0;

    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === productId);
    product.rating = averageRating;
    localStorage.setItem('products', JSON.stringify(products));

    document.getElementById('product-rating').innerHTML = generateStarRating(averageRating);
    updateHomePageRatings(); // Refresh home page ratings
}

function generateStarRating(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        stars += i < rating ? '★' : '☆';
    }
    return stars;
}