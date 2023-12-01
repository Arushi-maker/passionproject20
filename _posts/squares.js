window.addEventListener('load', function() {
    // Create an array of image sources with associated links
    const imageLinks = [
        { src: 'redsquare.jpg', link: 'https://example.com/redsquare' },
        { src: 'orangesquare.jpg', link: 'https://example.com/orangesquare' },
        { src: 'yellowsquare.jpg', link: 'https://example.com/yellowsquare' },
        { src: 'greensquare.jpg', link: 'https://example.com/greensquare' },
        { src: 'bluesquare.jpg', link: 'https://example.com/bluesquare' },
        { src: 'purplesquare.jpg', link: 'https://example.com/purplesquare' }
    ];

    // Loop through the array and create image elements with links
    imageLinks.forEach(item => {
        // Create an anchor element
        const link = document.createElement("a");
        link.href = item.link;

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