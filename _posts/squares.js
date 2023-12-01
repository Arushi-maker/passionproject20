window.addEventListener('load', function() {
    // Create an array of image sources
    const imageSources = [
        "redsquare.jpg",
        "orangesquare.jpg",
        "yellowsquare.jpg",
        "greensquare.jpg",
        "bluesquare.jpg",
        "purplesquare.jpg"
    ];

    // Get a random index to select a random image
    const randomIndex = Math.floor(Math.random() * imageSources.length);
    const selectedImagePath = imageSources[randomIndex];

    // Create an image element
    const img = document.createElement("img");

    // Set the source and other attributes
    img.src = selectedImagePath;
    img.alt = 'Color Square';
    img.width = 100;
    img.height = 100;

    // Append the image to the body
    document.body.appendChild(img);
});