var character = document.getElementById("character");
var block1 = document.getElementById("block1");
var block2 = document.getElementById("block2");
var counter=0;

function jump(){
    if(character.classList.contains("animate")) {
        return;
    }
    character.classList.add("animate");
    setTimeout(function(){
        character.classList.remove("animate");
    },1000);
}

var checkDead = setInterval(function() {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let block1Left = parseInt(window.getComputedStyle(block1).getPropertyValue("left"));
    let block2Left = parseInt(window.getComputedStyle(block2).getPropertyValue("left"));
    
    if(
        (block1Left<20 && block1Left>-20 && characterTop>=130) ||
        (block2Left<20 && block2Left>-20 && characterTop>=130)
    ) {    
        block1.style.animation = "none";
        block1.style.display = "none";
        block2.style.animation = "none";
        block2.style.display = "none";
        alert("Game Over. score: "+Math.floor(counter/100));
        counter=0;
        block1.style.animation = "block 5s infinite linear";
        block2.style.animation = "block 8s infinite linear";
        block1.style.display = "block";
        block2.style.display = "block";
    } else{
        counter++;
        document.getElementById("scoreSpan").innerHTML = Math.floor(counter/100);
    }
}, 10);