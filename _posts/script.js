var character = document.getElementById("character");
document.addEventListener("click",jump);
function jump(){
    if(character.classList == "animate"){return;}
    character.classList.add("animate");
    setTimeout(removeJump,300);
};
function removeJump(){
    character.classList.remove("animate");
}