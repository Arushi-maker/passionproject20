window.addEventListener('load', function() {
    var squareImages = [
        'redsquare.jpg',
        'orangesquare.jpg',
        'yellowsquare.jpg',
        'greensquare.jpg',
        'bluesquare.jpg',
        'purplesquare.jpg'
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