



// Cache the '.hero' element to avoid querying the DOM repeatedly
const heroElement = document.querySelector('.hero');

function background(img) {
    // Set background directly without querying the DOM again
    heroElement.style.background = img;
    // Store background image in localStorage
    localStorage.setItem('backgroundImage', img);
}

function getBackground() {
    // Retrieve background image directly from localStorage
    const img = localStorage.getItem('backgroundImage');
    if (img) {
        // Set background directly without querying the DOM again
        heroElement.style.background = img;
    }
}

// Use addEventListener instead of directly assigning to window.onload
window.addEventListener('load', getBackground);
