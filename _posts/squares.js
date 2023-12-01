window.addEventListener('load', function() {
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