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

    // Loop through the array and create image elements
    imageSources.forEach(src => {
        // Create an image element
        const img = document.createElement("img");
        
        // Set the source attribute
        img.src = src;
        
        // Set other attributes if needed
        img.alt = 'Color Square';
        img.width = 100;
        img.height = 100;

        // Append the image to the body
        document.body.appendChild(img);
    });
});