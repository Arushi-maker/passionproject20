window.addEventListener('load', function() {
    var squareImages = [
        'redsquare.jpg',
        'orangesquare.jpg',
        'yellowsquare.jpg',
        'greensquare.jpg',
        'bluesquare.jpg',
        'purplesquare.jpg'
    ];

    function getRandomImage() {
        return squareImages[Math.floor(Math.random() * squareImages.length)];
    }

    var imageElement = document.createElement('img');
    imageElement.src = getRandomImage();
    imageElement.alt = 'Square Image';

    document.body.appendChild(imageElement);
});