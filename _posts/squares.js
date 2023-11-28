window.addEventListener('load', function() {
    var squareImages = [
        'C:/Users/venka/OneDrive/Pictures/redsquare.jpg',
        'C:/Users/venka/OneDrive/Pictures/orangesquare.jpg',
        'C:/Users/venka/OneDrive/Pictures/yellowsquare.jpg',
        'C:/Users/venka/OneDrive/Pictures/greensquare.jpg',
        'C:/Users/venka/OneDrive/Pictures/bluesquare.jpg',
        'C:/Users/venka/OneDrive/Pictures/purplesquare.jpg'
    ];

    function getRandomColorIndex() {
        return Math.floor(Math.random() * colors.length);
    }

    var randomIndex = getRandomColorIndex();
    var selectedColor = colors[randomIndex];

    var squareElement = document.createElement('div');
    squareElement.className = 'color-square';
    squareElement.style.backgroundColor = selectedColor;

    document.body.appendChild(squareElement);
});