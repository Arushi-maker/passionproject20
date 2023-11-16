function myColour() { 

	// Get the value of red color 
	var red = document.getElementById('red').value; 

	// Get the value of green color 
	var green = document.getElementById('green').value; 

	// Get the value of blue color 
	var blue = document.getElementById('blue').value; 

	// rgb() function is used to create the color 
	// from red, green and blue values 
	var colour = 'rgb(' + red + ',' + green + ',' + blue + ')'; 

	// Change background colour with the 
	// color obtained by rgb function 
	document.body.style.backgroundColor = colour; 

	// Set the obtained rgb() colour code in the 
	// input text field having id=box 
	document.getElementById('box').value = colour; 

} 

// On changing red range slider myColour() 
// function is called 
document.getElementById('red') 
	.addEventListener('input', myColour); 

// On changing green range slider myColour() 
// function is called 
document.getElementById('green') 
	.addEventListener('input', myColour); 

// On changing blue range slider myColour() 
// function is called 
document.getElementById('blue') 
	.addEventListener('input', myColour); 