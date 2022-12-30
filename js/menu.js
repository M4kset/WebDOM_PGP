var just_play = document.getElementById('just_play');
var to_levels = document.getElementById('to_levels');
var use_custom = document.getElementById('use_custom');
var menu_start = document.getElementById('menu_start');
var menu_lvls = document.getElementById('menu_lvls');
var lvl_container = document.getElementById('lvl_container');
var back = document.getElementById('back');

//Failbtns

var gomenuF = document.getElementById('gomenuF')
var retry = document.getElementById('retry')

//Winbtns/stuff
var endtitle = document.getElementById('endtitle')

var gomenuW = document.getElementById('gomenuW')
var ntxlvl = document.getElementById('ntxlvl')

var screen = document.getElementById('screen');
var mobile_ctrls = document.getElementById('mobile_ctrls');

var lvlamount = list.length

//When fail

function SendFailScreen(){
    screen.setAttribute('mode',"3")
}

retry.addEventListener('click', function(){
    screen.setAttribute('mode',"1")
})

gomenuF.addEventListener('click', function(){
    screen.setAttribute('mode',"0")
})

back.addEventListener('click', function(){
    menu_start.style.display = 'block';
    menu_lvls.style.display = 'none'
    screen.setAttribute('mode',"0")
})
 
//WhenWin

function SendWinScreen(){
    screen.setAttribute('mode',"4")
    if(isNaN(LvlPlayerIsIn)){
        ntxlvl.disabled = true
        endtitle.innerHTML = "Success!";
    }
    else{
        if(list[LvlPlayerIsIn+1]){
            endtitle.innerHTML = "Success!";
            ntxlvl.disabled = false;
        }
        else{
            endtitle.innerHTML = "You have reached the end :)";
            LvlPlayerIsIn = 0
            MainLvlPlayerIsIn = 0
            ntxlvl.disabled = true;
        }
    }
}

gomenuW.addEventListener("click",function(){
    screen.setAttribute('mode',"0")
})

ntxlvl.addEventListener("click",function(){
    if(list[LvlPlayerIsIn+1]){
        LvlPlayerIsIn++
        MainLvlPlayerIsIn++
        lvlstring = list[LvlPlayerIsIn][1]
        var newname = lvl_container.children[LvlPlayerIsIn].innerHTML
        screen.setAttribute('mode',"1")
        level_name = "Level "+list[LvlPlayerIsIn][0]+": "+newname
    }
})

//Normal

just_play.addEventListener('click',function(){
    if(isNaN(LvlPlayerIsIn)){
        LvlPlayerIsIn = MainLvlPlayerIsIn
    }
    var newname = lvl_container.children[LvlPlayerIsIn].innerHTML
    lvlstring = list[LvlPlayerIsIn][1]
    level_name = "Level "+list[LvlPlayerIsIn][0]+": "+newname
    screen.setAttribute('mode',"1")
})

to_levels.addEventListener('click', function(){
    screen.setAttribute('mode',"2")
})

use_custom.addEventListener('click', function(){
    if(code_lvl_status=="1"){
        menu_start.style.display = 'none';
        screen.setAttribute('mode',"1")
        lvlstring=editor_lvl_string;
        level_name = "Custom level"
        LvlPlayerIsIn = NaN
    }
})

for(var i=0; i<lvl_container.children.length;i++){
    var lvl = lvl_container.children[i]
    lvl.addEventListener('click', function(){
        LvlPlayerIsIn = NaN
        for(var j=0; j<lvlamount;j++){
            var lvlnum = list[j][0]
            var lvldata = list[j][1]
            if(this.id == lvlnum){
                lvlstring = lvldata
                level_name = "Level "+lvlnum +": "+this.innerHTML
                screen.setAttribute('mode',"1")
                break;
            }
        }
    })
}

