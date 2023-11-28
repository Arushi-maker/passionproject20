window.addEventListener('load', function() {
    var colors = ['red', 'green', 'blue'];

    function convertToBinary(rgb) {
        return rgb.map(decimalToBinary);
    }

    function decimalToBinary(decimal) {
        return decimal.toString(2).padStart(8, '0');
    }

    var redElement = document.getElementById('red');
    var greenElement = document.getElementById('green');
    var blueElement = document.getElementById('blue');

    var redRGB = getRGB(redElement);
    var greenRGB = getRGB(greenElement);
    var blueRGB = getRGB(blueElement);

    var redBinary = convertToBinary(redRGB);
    var greenBinary = convertToBinary(greenRGB);
    var blueBinary = convertToBinary(blueRGB);

    document.querySelector('h2').textContent += 'Binary Representation:';
    document.querySelector('p2').innerHTML += `<br>
        Red: ${redBinary.join('')}<br>
        Green: ${greenBinary.join('')}<br>
        Blue: ${blueBinary.join('')}
    `;

    function getRGB(element) {
        var rgbString = element.getAttribute('data-rgb');
        return rgbString.split(',').map(Number);
    }
});