function myColor() {

    // Get the value of red color
    var red = decimalToBinary(document.getElementById('red').value);

    // Get the value of green color
    var green = decimalToBinary(document.getElementById('green').value);

    // Get the value of blue color
    var blue = decimalToBinary(document.getElementById('blue').value);

    // rgb() function is used to create the color
    // from red, green and blue values
    var color = 'rgb(' + binaryToDecimal(red) + ',' + binaryToDecimal(green) + ',' + binaryToDecimal(blue) + ')';

    // Change background color with the
    // color obtained by rbg function
    document.body.style.backgroundColor = color;

    // Set the obtained rbg() color code in the
    // input text field having id=box
    document.getElementById('box').value = color;

}

// On changing red range slider myColor()
// function is called
document.getElementById('red')
    .addEventListener('input', myColor);

// On changing green range slider myColor()
// function is called
document.getElementById('green')
    .addEventListener('input', myColor);

// On changing blue range slider myColor()
// function is called
document.getElementById('blue')
    .addEventListener('input', myColor);

// Convert binary to decimal
function binaryToDecimal(binary) {
    return parseInt(binary, 2);
}

// Convert decimal to binary
function decimalToBinary(decimal) {
    return decimal.toString(2).padStart(8, '0');
}
