window.addEventListener('load', function() {
    // Create an array of image sources with associated file paths
    const imagePaths = [
        { src: 'redsquare.jpg', path: 'C:\\Users\\venka\\.vscode\\redsquare.jpg' },
        { src: 'orangesquare.jpg', path: 'C:\\Users\\venka\\.vscode\\orangesquare.jpg' },
        { src: 'yellowsquare.jpg', path: 'C:\\Users\\venka\\.vscode\\yellowsquare.jpg' },
        { src: 'greensquare.jpg', path: 'C:\\Users\\venka\\.vscode\\greensquare.jpg' },
        { src: 'bluesquare.jpg', path: 'C:\\Users\\venka\\.vscode\\bluesquare.jpg' },
        { src: 'purplesquare.jpg', path: 'C:\\Users\\venka\\.vscode\\purplesquare.jpg' }
    ];

    // Loop through the array and create image elements with links
    imagePaths.forEach(item => {
        // Create an anchor element
        const link = document.createElement("a");
        link.href = item.path;
        link.target = "_blank"; // Open link in a new tab or window

        // Create an image element
        const img = document.createElement("img");

        // Set the source attribute
        img.src = item.src;

        // Set other attributes if needed
        img.alt = 'Color Square';
        img.width = 100;
        img.height = 100;

        // Append the image to the anchor
        link.appendChild(img);

        // Append the anchor to the body
        document.body.appendChild(link);
    });
});