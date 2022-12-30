//Elements
var Most_editor = document.getElementById("Most_editor")
var editor_container = document.getElementById("editor_container")
var TC_Background = document.getElementById("TC_Background")
var RC_back = document.getElementById("RC_back")
var data_string = document.getElementById('data_string');

//Btns
var RC = document.getElementById("RC")
var RC_close = document.getElementById("RC_close")
var Randomize = document.getElementById("Randomize")

var HideE = document.getElementById("HideE");
var ShowE = document.getElementById("ShowE");

var OpenTC = document.getElementById("OpenTC")
var CloseTC = document.getElementById("CloseTC")
//Actions

HideE.addEventListener("click", function(){
    Most_editor.style.display = "none";
    editor_container.style.height = "0vw"
})

ShowE.addEventListener("click", function() {
    Most_editor.style.display = "block"
    editor_container.style.height = "40vw"
})

OpenTC.addEventListener("click", function() {
    TC_Background.style.display = "block"
})

CloseTC.addEventListener("click", function() {
    TC_Background.style.display = "none"
})

RC.addEventListener("click", function() {
    RC_back.style.display = "block"
})

RC_close.addEventListener("click", function() {
    RC_back.style.display = "none"
})

Randomize.addEventListener("click", function() {
    var randomdata = ""

    for(var col=0; col<10; col++){
        for(var row=0; row<7; row++){
            var RandomSquare = Math.round(Math.random()*14)
            randomdata += RandomSquare+","
        }
        randomdata += "_"
    }

    RC_back.style.display = "none"
    data_string.value = randomdata
    editor_lvl_string = randomdata
    tosquares(randomdata)
})