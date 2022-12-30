var squares_container = document.getElementById("squares_container");
var playerX = document.getElementById("playerX");
var playerY = document.getElementById("playerY");
var keycount = document.getElementById("keycount");

function ObtainKey(XtoCheck, YtoCheck){
    var IsEqual = false;
    for(var i=0;i<squares_container.children.length;i++){
        var Wsquare = squares_container.children[i];
        var WKeyX = parseInt(Wsquare.getAttribute("gamex"))
        var WKeyY = parseInt(Wsquare.getAttribute("gamey"))

        if(WKeyX==XtoCheck && WKeyY==YtoCheck){
            if(Keys.length==0){
                Keys.push((XtoCheck+","+YtoCheck))
                DigitalKeyCount++
                Wsquare.style.backgroundColor = "white"
                Wsquare.setAttribute("type","0")
                ChangeKeyCount(DigitalKeyCount)
            }else{
                for(var j=0;j<Keys.length;j++){
                                            
                    var keyx = parseInt(Keys[j].split(",")[0]);
                    var keyy = parseInt(Keys[j].split(",")[1]);
        
                    if(XtoCheck==keyx){
                        if(YtoCheck==keyy){
                            IsEqual = true;
                        }
                    }  
                }

                if(IsEqual==false){
                    Keys.push((XtoCheck+","+YtoCheck))
                    DigitalKeyCount++
                    Wsquare.style.backgroundColor = "white"
                    Wsquare.setAttribute("type","0")
                    ChangeKeyCount(DigitalKeyCount)
                }
            }
            break
        } 
    }
    
}

function DestroyDoor(DXCheck,DYCheck){
    var pastdoor = false
    var IsEqual = false;
    for(var i=0;i<squares_container.children.length;i++){
        var WDoor = squares_container.children[i];
        var WDoorX = parseInt(WDoor.getAttribute("gamex"))
        var WDoorY = parseInt(WDoor.getAttribute("gamey"))

        if(WDoorX==DXCheck && WDoorY==DYCheck){

            if(Doors.length==0){
                Doors.push((DXCheck+","+DYCheck))
                DigitalKeyCount--
                WDoor.style.backgroundColor = "white"
                WDoor.setAttribute("type","0")
                ChangeKeyCount(DigitalKeyCount)
            }
            else{
                for(var j=0;j<Doors.length;j++){
                    var doorx = parseInt(Doors[j].split(",")[0]);
                    var doory = parseInt(Doors[j].split(",")[1]);

                    if(DXCheck==doorx){
                        if(DYCheck==doory){
                            IsEqual = true;
                        }
                    }  
                }
                if(IsEqual==false){
                    for(var j=0;j<Doors.length;j++){
                        var doorx = parseInt(Doors[j].split(",")[0]);
                        var doory = parseInt(Doors[j].split(",")[1]);
    
                        if(DXCheck==doorx){
                            if(DYCheck==doory){
                                pastdoor = true
                            }
                        }  
                    }
                    if(pastdoor==false){
                        Doors.push((DXCheck+","+DYCheck))
                        WDoor.style.backgroundColor = "white"
                        WDoor.setAttribute("type","0")
                        DigitalKeyCount--
                        ChangeKeyCount(DigitalKeyCount)
                    }
                    
                }
            }
            break
        }
    }
}

function GottenKey(KX,KY){
    var IsGottenKey = false;
                    
    for(var j=0;j<Keys.length;j++){
        var ckx = parseInt(Keys[j].split(",")[0]);
        var cky = parseInt(Keys[j].split(",")[1]);

        
        if(KX==ckx){
            if(KY==cky){
                IsGottenKey = true;
            }
        }  
    }

    return IsGottenKey;
}

function OpenedDoor(DX,DY){
    var IsOpenDoor = false;
    for(var j=0;j<Doors.length;j++){
        var cdx = parseInt(Doors[j].split(",")[0]);
        var cdy = parseInt(Doors[j].split(",")[1]);

        if(DX==cdx){
            if(DY==cdy){
                IsOpenDoor = true;
            }
        }  
    }

    return IsOpenDoor
}

function ChangeKeyCount(num){
    keycount.innerHTML = ": "+num
}

function CheckInteraction(BlockType){
    /*Types&Names
    0: Air
    1: Spawn
    2: Goal
    3: Concrete
    4: The ouch one
    5: Liquid
    6: Climbable Plant
    7: Door
    8: Key
    9: Background Wall/Concrete
    10: Background Plant
    11: Purple concrete
    12: Pink background
    13: Grass
    14: Original concrete
    */

   
    if(BlockType == 2){
        return 2
    } 
    else if(BlockType == 3){
        return 1
    }
    else if(BlockType == 4){
        return 3
    }
    else if(BlockType == 5){
        return 4
    }
    else if(BlockType == 6){
        return 5
    }
    else if(BlockType == 7){
        if(DigitalKeyCount>0){
            return 7
        }
        else{
            return 1
        }
        
    }
    else if(BlockType == 8){
        return 6
    }
    else if(BlockType == 11){
        return 1
    }
    else if(BlockType == 13){
        return 1
    }
    else if(BlockType == 14){
        return 1
    }
    
}

function ProcessGame(){
    PrintPlrPos(playerX,playerY)
    CalculateAndRender()
}