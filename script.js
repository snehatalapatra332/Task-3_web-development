const images = [
    'image1.jpg', // IMPORTANT: CHANGE THESE TO YOUR ACTUAL IMAGE FILENAMES
    'image2.jpg',
    'image3.jpg'
];

let currentImageIndex = 0;
const carouselImage = document.getElementById('carousel-image');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

function updateImage() {
  // Start fade-out
  carouselImage.classList.remove('show');

  // Wait a short moment before changing the image
  setTimeout(() => {
    carouselImage.src = images[currentImageIndex];
    // After the new image loads, fade-in
    carouselImage.onload = () => {
      carouselImage.classList.add('show');
    };
  }, 200);
}


function nextImage() {
    currentImageIndex++;
    // Loop back to the start
    if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }
    updateImage();
}

function prevImage() {
    currentImageIndex--;
    // Loop back to the end
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    }
    updateImage();
}

// Attach event listeners for user interaction
nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);

// Initialize with the first image
if (images.length > 0) {
    updateImage();
}


// =======================================================
// TASK 3: API DATA FETCH LOGIC
// =======================================================

const jokeDisplay = document.getElementById('joke-display');
const fetchButton = document.getElementById('fetch-button');
const API_URL = 'https://icanhazdadjoke.com/';

async function fetchJoke() {
    jokeDisplay.textContent = 'Fetching joke...';

    try {
        const response = await fetch(API_URL, {
            // Required header for JSON response
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Display the data dynamically
        jokeDisplay.textContent = data.joke;
        
    } catch (error) {
        console.error('Could not fetch the joke:', error);
        jokeDisplay.textContent = 'Oops! Failed to load a joke. Please check your network or try again.';
    }
}

// Attach event listener
fetchButton.addEventListener('click', fetchJoke);

// Fetch a joke on initial page load
async function fetchJoke() {
    // Show loading message with spinner
    jokeDisplay.innerHTML = 'Fetching joke... <span class="spinner"></span>';

    try {
        const response = await fetch(API_URL, {
            headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Display the fetched joke
        jokeDisplay.textContent = data.joke;

    } catch (error) {
        console.error('Could not fetch the joke:', error);
        jokeDisplay.textContent = 'Oops! Failed to load a joke. Please try again.';
    }
}