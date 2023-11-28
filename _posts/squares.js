window.addEventListener('load', function() {
    var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple'];

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