var screen = document.getElementById("screen");
var menu = document.getElementById("menu");
var game_gui = document.getElementById("game_gui")
var environment = document.getElementById("environment")
var cancel_gm = document.getElementById("cancel_gm");
var retry_gm = document.getElementById("retry_gm");
var fail = document.getElementById('fail');
var win = document.getElementById('win');

var editor_container = document.getElementById("editor_container")
var data_string = document.getElementById("data_string")
var lvl_name = document.getElementById("lvl_name")
var RC = document.getElementById("RC")

var pausedelay = false
var framerate = 50
var game
var player

function Cancel(ScreenID){
    clearInterval(game);
    if(player){
        player.remove();
    }
    
    PlrPositionX = 0
    PlrPositionY = -2
    PrintPlrPos(PlrPositionX,PlrPositionY)

    game_gui.style.display = "none"
    win.style.display = "none"
    fail.style.display = "none"
    menu.style.display = "none"
    menu_start.style.display = 'none';
    menu_lvls.style.display = 'none';

    if(ScreenID==1){
        editor_container.hidden = false;
        data_string.disabled = false;
        RC.disabled = false;
        menu.style.display = "block"
        menu_start.style.display = 'block';
        menu_lvls.style.display = 'none';
    }
    else if(ScreenID==2){
        menu_lvls.style.display = 'block';
        menu.style.display = "block"
    }
    else if(ScreenID==3){
        menu.style.display = "block"
        fail.style.display = "block"
    }
    else if(ScreenID==4){
        menu.style.display = "block"
        win.style.display = "block"
    }
    
    for(var i=0; i<environment.children.length;i++){
        environment.children[i].innerHTML = ""
    }

    tosquares(editor_lvl_string);
    
    CSCX = -6
    CSCY = -3
    farthestRight = 5;
    farthestLeft = CSCX;
    farthestUp = 4;
    farthestDown = CSCY;
}

function GameEvents(){
    ProcessGame(); 
}

function SetMovementtoZero(){
    VelVecX = 0
    VelVecY = 0

    velx = 0;
    highdirvel = 0;
    terminalvel = 1;

    MUpBtn = false
    MLeftBtn = false
    MRightBtn = false
    MDownBtn = false

    IsW = false;
    IsS = false;
    IsD = false;
    IsA = false;
    
    right = false;
    left = false;
    jump = false;
    up = false;
    down = false;
    onmoving = false;
    IsPc = false;
    IsGrounded = false
    DidJump = false
    OnWater = false
    IsClimbing = false
}

const screenobserver = new MutationObserver(function(mutation){
    var attr = mutation[0].attributeName
    if(attr === "mode"){
        if(screen.getAttribute(attr)==="1"){
            SetMovementtoZero()
            Keys = []
            Doors = []
            DigitalKeyCount = 0
            ChangeKeyCount(0)
            getSizeFromString(lvlstring);
            lvl_name.innerHTML = level_name
            editor_container.hidden = true;
            data_string.disabled = true;
            RC.disabled = true;
            game_gui.style.display = "block"
            menu.style.display = "none"
            code_lvl_status = 1
            level_validation.style.backgroundColor = "#00ff00"
            player = document.createElement("div");
            player.id = "player";
            environment.appendChild(player);
            LoadCamera();
            game = setInterval(GameEvents,framerate);
        }
        else if (screen.getAttribute(attr)==="0"){Cancel(1)}
        else if (screen.getAttribute(attr)==="2"){Cancel(2)}
        else if (screen.getAttribute(attr)==="3"){Cancel(3);}
        else if (screen.getAttribute(attr)==="4"){Cancel(4);}
    }
})

screenobserver.observe(screen,{attributes:true})

cancel_gm.addEventListener("click",function(){
    Cancel(1);
})

retry_gm.addEventListener("click",function(){
    Cancel(1);
    screen.setAttribute('mode',"1")
})

document.addEventListener("keypress",function(par){
    if(parseInt(screen.getAttribute('mode'))){
        if(par.key == 'r'){
            if(pausedelay==false){
                pausedelay = true;
                Cancel(1);
                screen.setAttribute('mode',"1")
                setTimeout(function(){pausedelay=false},2000)
            }
        }
    }
})