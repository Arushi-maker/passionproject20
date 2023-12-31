function mycolor() {
    
    var red = decimalToBinary(document.getElementById('red').value);

    var green = decimalToBinary(document.getElementById('green').value);

    var blue = decimalToBinary(document.getElementById('blue').value);

    var color = 'rgb(' + binaryToDecimal(red) + ',' + binaryToDecimal(green) + ',' + binaryToDecimal(blue) + ')';

    document.body.style.backgroundColor = color;

    document.getElementById('box').value = color;
}

document.getElementById('red')
    .addEventListener('input', mycolor);

document.getElementById('green')
    .addEventListener('input', mycolor);

document.getElementById('blue')
    .addEventListener('input', mycolor);

function binaryToDecimal(binary) {
    return parseInt(binary, 2); // parseInt is a procedure that contributes to the program’s intended purpose, where I have defined:
    // the procedure’s name (binaryToDecimal)
    // the return type (integer value)
    // one or more parameters (binary, 2)
}

function decimalToBinary(decimal) {
    return decimal.toString(2).padStart(8, '0');
}