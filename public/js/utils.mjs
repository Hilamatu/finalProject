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

// Load template
export async function loadTemplate(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to load template: ${url}`);
    }
    return await response.text();
}

// Load header and footer
export async function loadHeaderFooter() {
    const headerTemplate = await loadTemplate("partials/header.html");
    const headerElement = document.querySelector("#main-header");
    const footerTemplate = await loadTemplate("partials/footer.html");
    const footerElement = document.querySelector("#main-footer");

    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);
}

// Render with template
function renderWithTemplate(template, element) {
    element.innerHTML = template;
}

export function toggleMenu() {
    let nav = document.getElementById("mobile-nav");
    nav.classList.toggle("show");
    }