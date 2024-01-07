var character = document.getElementById("character");
var block = document.getElementById("block");
var counter=0;
function jump(){
    if(character.classList == "animate"){return;}
    character.classList.add("animate");
    setTimeout(function(){
        character.classList.remove("animate");
    },1000);
}
var checkDead = setInterval(function() {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let block1Left = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    if(block1Left<20 && block1Left>-20 && characterTop>=130){
        block.style.animation = "none";
        alert("Game over. score: "+Math.floor(counter/100));
        counter=0;
        block.style.animation = "block 5s infinite linear";
    if(block2Left<20 && block2Left>-20 && characterTop>=130){
        block.style.animation = "none";
        alert("Game over. score: "+Math.floor(counter/100));
        counter=0;
        block.style.animation = "block 5s infinite linear";
    }else{
        counter++;
        document.getElementById("scoreSpan").innerHTML = Math.floor(counter/100);
    }
}},10);