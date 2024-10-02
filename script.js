// Initialize canvas and context
const canvas = document.getElementById('sandwichCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 300; // Update width to match CSS
canvas.height = 400; // Update height to match CSS

// Ingredient images
const ingredientImages = {
    'Bread': 'bread.png',
    'Lettuce': 'lettuce.png',
    'Tomato': 'tomato.png',
    'Meat': 'meat.png',
    'Cheese': 'cheese.png',
    'Onions': 'onions.png',
    'Under Toasted': 'under_toasted.png',
    'Perfectly Toasted': 'perfectly_toasted.png',
    'Overly Toasted': 'over_toasted.png'
};

// Load ingredient images
const images = {};
let imagesLoaded = 0;
const totalImages = Object.keys(ingredientImages).length;

Object.keys(ingredientImages).forEach(ingredient => {
    const img = new Image();
    img.src = ingredientImages[ingredient];
    img.onload = () => {
        images[ingredient] = img;
        imagesLoaded++;
        if (imagesLoaded === totalImages) {
            console.log('All images loaded!');
        }
    };
});

// Fuzzy logic simulation
function fuzzyLogic(toastingTime, ingredientsCount) {
    if (toastingTime < 5 || ingredientsCount <= 2) {
        return "Under Toasted";
    } else if (toastingTime >= 5 && toastingTime <= 10) {
        return "Perfectly Toasted";
    } else if (toastingTime > 10) {
        return "Overly Toasted";
    }
}

// Timer button functionality
let toastingTime = 5;
function setTimer() {
    toastingTime = parseInt(document.getElementById('toastingTimeInput').value);
    document.getElementById('status').textContent = `Toasting Time Set: ${toastingTime} seconds`;
}

// Simulate sandwich cooking process
function cookSandwich() {
    // Get selected ingredients
    const selectedIngredients = Array.from(document.querySelectorAll('.ingredient:checked'))
                                     .map(input => input.value);

    if (selectedIngredients.length === 0) {
        alert('Please select at least one ingredient.');
        return;
    }

    // Clear canvas and hide output images
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Turn on red light (cooking)
    document.getElementById('redLight').classList.add('on');
    document.getElementById('yellowLight').classList.remove('on');
    document.getElementById('status').textContent = "Cooking in progress...";

    // Show the timer box
    const timerDisplay = document.getElementById('timerDisplay');
    const timerBox = document.getElementById('timerBox');
    timerBox.style.display = 'block';

    let countdown = toastingTime;
    timerDisplay.textContent = countdown;

    const timerInterval = setInterval(() => {
        countdown--;
        timerDisplay.textContent = countdown;

        if (countdown <= 0) {
            clearInterval(timerInterval);
            document.getElementById('redLight').classList.remove('on');
            document.getElementById('yellowLight').classList.add('on');
            const result = fuzzyLogic(toastingTime, selectedIngredients.length);
            document.getElementById('status').textContent = "Cooking finished!";
            document.getElementById('fuzzyResult').textContent = `Result: ${result}`;

            // Draw the result on the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
            ctx.drawImage(images[result], 0, 0, canvas.width, canvas.height); // Display the result image
        }
    }, 1000);
}
