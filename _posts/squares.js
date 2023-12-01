window.addEventListener('load', function() {
    var imagePaths = [
        redsquare.jpg,
        orangesquare.jpg,
        yellowsquare.jpg,
        greensquare.jpg,
        bluesquare.jpg,
        purplesquare.jpg
    ];

    var randomIndex = Math.floor(Math.random () * imagePaths.length); 
    var selectedImagePath = imagePaths[randomIndex];

    var imageElement = document.createElement('img');
    imageElement.src = selectedImagePath;
    imageElement.alt = 'Color Square';
    imageElement.width = 100;
    imageElement.height = 100;

    document.body.appendChild(imageElement);
});