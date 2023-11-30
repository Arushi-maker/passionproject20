window.addEventListener('load', function() {
    var imagePaths = [
        'redsquare.jpg',
        'orangesquare.jpg',
        'yellowsquare.jpg',
        'greensquare.jpg',
        'bluesquare.jpg',
        'purplesquare.jpg'
    ];

    function getRandomImage() {
        return imagePaths[Math.floor(Math.random() * imagePaths.length)];
    }

    var imagePaths = document.createElement('img');
    imagePaths.src = getRandomImage();
    imagePaths.alt = 'Square Image';

    document.body.appendChild(imagePaths);
});