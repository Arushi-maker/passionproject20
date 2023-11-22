window.addEventListener('load', function() {
    var colors = [
        'rgb(255, 0, 0)',   // red
        'rgb(255, 165, 0)', // orange
        'rgb(255, 255, 0)', // yellow
        'rgb(0, 128, 0)',   // green
        'rgb(0, 0, 255)',   // blue
        'rgb(75, 0, 130)',  // indigo
        'rgb(128, 0, 128)'  // purple
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

