var squares_container = document.getElementById("squares_container");
var color_bar = document.getElementById('color_bar');

//MobileControls
var MUpBtn = false
var MLeftBtn = false
var MRightBtn = false
var MDownBtn = false

var MUp = document.getElementById("MUp");
var MLeft = document.getElementById("MLeft");
var MRight = document.getElementById("MRight");
var MDown = document.getElementById("MDown");

MUp.addEventListener("touchstart", function(){MUpBtn = true;})
MUp.addEventListener("touchend", function(){MUpBtn = false;})

MLeft.addEventListener("touchstart",function(){MLeftBtn = true})
MLeft.addEventListener("touchend",function(){MLeftBtn = false})

MRight.addEventListener("touchstart",function(){MRightBtn = true})
MRight.addEventListener("touchend",function(){MRightBtn = false})

MDown.addEventListener("touchstart",function(){MDownBtn = true})
MDown.addEventListener("touchend",function(){MDownBtn = false})

//PCKeyVariables
var IsW = false;
var IsS = false;
var IsD = false;
var IsA = false;

//Movement variables

var VelVecX = 0; 
var VelVecY = 0;

var velx = 0;
var highdirvel = 0;
var terminalvel = 1;

var right = false;
var left = false;
var jump = false;
var up = false;
var down = false;
var onmoving = false;
var IsPc = false;
var IsGrounded = false
var DidJump = false
var OnWater = false
var IsClimbing = false

var gravity = 3; //3
var maxXvel = 3; //3
var highdirMAXvel = -9 //9

var levelwidth = 0;
var levelheight = 0;

var selectedspawn

//Scren Square Size
var SSSX = 12
var SSSY = 8
var SSSTotal = SSSX*SSSY

var boundchecksYUp = SSSTotal
var boundchecksYDown = SSSTotal
var boundchecksXLeft = SSSTotal
var boundchecksXRight = SSSTotal

//Reversed Axis

var maxright = -20
var maxleft = 76
var maxup = -17
var maxdown = 51

//Corner Square Coordinates

var CSCX = -6
var CSCY = -3

var farthestRight = 5;
var farthestLeft = CSCX;

var farthestUp = 4;
var farthestDown = CSCY;

var CSCXChanged = false;
var CSCYChanged = false;

//PC controls
document.addEventListener("keydown",function(key){
    if(key.key == "w" && IsGrounded && DidJump==false){IsW=true;}
    if(key.key == "a"){IsA=true;}
    if(key.key == "d"){IsD=true;}
    if(key.key == "s"){IsS=true;}
});

document.addEventListener("keyup",function(key){
    if(key.key == "w"){IsW=false;}
    if(key.key == "a"){IsA=false;}
    if(key.key == "d"){IsD=false;}
    if(key.key == "s"){IsS=false;}
});

//Misc Functions

function SetToWater(){
    gravity = 1
    IsGrounded = true
    DidJump = false
    OnWater = true
    IsClimbing = false
    terminalvel=0
}

function SetToPlant(){
    gravity = 0
    IsGrounded = true
    DidJump = false
    IsClimbing = true
    terminalvel=0
}

function SetToNormal(){
    //IsGrounded = false
    IsClimbing = false
    OnWater = false
    gravity = 3
}

//Game Functions

function getSizeFromString(str){
    //_ for x
    //, for y
    var rowsarray = str.split('_')
    levelwidth = rowsarray.length-1
    levelheight = rowsarray[0].split(',').length-1
}

function LoadCamera(){
    for(var i=-2; i<(SSSX-2); i++){
        for(var j=-2; j<(SSSY-2); j++){
            var normalX = i*8;
            var normalY = j*8;
            
            var block = document.createElement("div")
            block.className = "block"

            block.setAttribute("gamex",CSCX)
            block.setAttribute("gamey",CSCY)
            block.setAttribute("type","0")
            
            squares_container.appendChild(block)

            block.style.transform = "translate("+normalX+"vw,"+normalY*-1+"vw)"
            block.setAttribute("screenx",normalX);
            block.setAttribute("screeny",normalY);

            CSCY++
        }
        CSCX++
        CSCY = -3
    }
    CSCY = -3
    CSCX = -6
    InitializeLevel()
}

function CheckPlayerPos(){
    //In Game Screened
    var MaxheigthIGS=0
    var MinheigthIGS=0
    var MaxLengthIGS=0
    var MinLengthIGS=0

    var NearPlayerBArray = []

    var CY = 0
    var CX = 0

    var OnRY = true
    var OnRX = true

    var PlayerXCheck = PlrPositionX/8

    for(var i=0;i<squares_container.children.length;i++){
        var pixel = squares_container.children[i];
        var ScreenPointX = parseInt(pixel.getAttribute("gamex"))
        var ScreenPointY = parseInt(pixel.getAttribute("gamey"))
        var type = parseInt(pixel.getAttribute("type"))

       
        if(ScreenPointX >= PlayerXCheck-3 && ScreenPointX <= PlayerXCheck+3){
            NearPlayerBArray.push(ScreenPointX+","+ScreenPointY+","+type)
        }
        
        var ScreenWrldX = parseInt(selectedspawn.split(',')[0])+(ScreenPointX)
        var ScreenWrldY = parseInt(selectedspawn.split(',')[1])-(ScreenPointY)

        var ScreenCol = lvlstring.split("_")[ScreenWrldX]
        
        if(ScreenCol != undefined && ScreenCol != ""){
            var ScreenRow = ScreenCol.split(',')[ScreenWrldY]
            if(ScreenRow != undefined && ScreenRow != ""){
                CY = ScreenPointY
                CX = ScreenPointX
                
                if(CY >= 0){
                    if(OnRY){
                        OnRY = false
                        MinheigthIGS = CY
                    }
                    if(CY > MaxheigthIGS){
                        MaxheigthIGS = CY
                    }
                    if(CY<MinheigthIGS){
                        MinheigthIGS = CY
                    }
                }
                else{

                    if(OnRY){
                        OnRY = false
                        MaxheigthIGS = CY
                    }
                    if(CY>MaxheigthIGS){
                        MaxheigthIGS = CY
                    }

                    if(CY < MinheigthIGS){
                        MinheigthIGS = CY
                    }
                }

                if(CX >= 0){
                    
                    if(OnRX){
                        OnRX = false
                        MinLengthIGS = CX
                    }
                    if(CX<MinLengthIGS){
                        MinLengthIGS = CX
                    }

                    if(CX > MaxLengthIGS){
                        //OnRX = false
                        MaxLengthIGS = CX
                    }
                }
                else{
                    if(OnRX){
                        OnRX = false
                        MaxLengthIGS = CX
                    }
                    if(CX>MaxLengthIGS){
                        MaxLengthIGS = CX
                    }

                    if(CX < MinLengthIGS){
                        MinLengthIGS = CX
                    }
                }
            }            
        }
    }

    var UnadditedPX = PlrPositionX/8
    var UnadditedPY = PlrPositionY/8

    var PlayerXAdditions = (PlrPositionX+VelVecX)/8
    var PlayerYAdditions = ((PlrPositionY+1)-VelVecY)/8

    //Block Detection
    for(var i=0;i<NearPlayerBArray.length;i++){
        //Not solid = 0
        //Solid = 1
        //Finish = 2
        //Dies = 3
        //Low gravity//Swiming = 4
        //Zero gravity//Climbing = 5
        //Is a key = 6
        //Is a door = 7

        if(NearPlayerBArray[i]!=undefined){
            var BX = parseInt(NearPlayerBArray[i].split(",")[0])
            var BY = parseInt(NearPlayerBArray[i].split(",")[1])
            var BType = parseInt(NearPlayerBArray[i].split(",")[2])
            
            //Y
            if(UnadditedPX<BX+1 && UnadditedPX>BX-0.375){
                if(PlayerYAdditions<=(BY+0.125) && PlayerYAdditions>(BY-0.25)){
                    if(CheckInteraction(BType)==1){
                        VelVecY = 1
                        PlayerYAdditions = ((PlrPositionY+1)-VelVecY)/8
                        if(PlayerYAdditions<=(BY+0.125) && PlayerYAdditions>(BY-0.25)){
                            VelVecY = 0
                            IsGrounded = true
                            DidJump = false
                        }
                    }
                    else if(CheckInteraction(BType)==2){
                        SendWinScreen();
                    }
                    else if(CheckInteraction(BType)==3){
                        SendFailScreen()
                    }
                    else if(CheckInteraction(BType)==4){
                        SetToWater()
                    }
                    else if(CheckInteraction(BType)==5){
                        SetToPlant();
                    }
                    else if(CheckInteraction(BType)==6){
                        SetToNormal()
                        ObtainKey(BX,BY)
                    }
                    else if(CheckInteraction(BType)==7){
                        SetToNormal()
                        DestroyDoor(BX,BY)
                    }
                    else{
                        SetToNormal()
                    }
                }
                
                if(PlayerYAdditions>=(BY-0.875) && PlayerYAdditions<(BY)){
                    if(CheckInteraction(BType)==1){
                        highdirvel=0

                        //To prevent the browser from crashing/get unresponsive,
                        //the following code got unused, but take
                        //in mind that if enabled it would have worked
                        //perfectly, but since a web page isn't intended to
                        //handle a videogame-like behaviour, and even less using
                        //the page elements themselves to do so, it is understandable
                        //why this shortcut was taken.

                        //Something is better than nothing

                        //This will probably lead to some bugs, probably with corners 
                        //but I don't think there is anything I can do about it.

                        /////////////////////////////////////////
                        /*for(var i=highdirMAXvel; i<0;i++){
                            VelVecY++
                            PlayerYAdditions = ((PlrPositionY+1)-VelVecY)/8
                            if(PlayerYAdditions>=(BY-0.875) && PlayerYAdditions<(BY)){
                                if(i==-1){
                                    VelVecY=0
                                    break
                                }  
                            }
                            else{
                                break
                            }
                        }*/
                        /////////////////////////////////////////
                    }
                    else if(CheckInteraction(BType)==2){
                        SendWinScreen();
                    }
                    else if(CheckInteraction(BType)==3){
                        SendFailScreen()
                    }
                    else if(CheckInteraction(BType)==4){
                        SetToWater()
                    }
                    else if(CheckInteraction(BType)==5){
                        SetToPlant();
                    }
                    else if(CheckInteraction(BType)==6){
                        SetToNormal()
                        ObtainKey(BX,BY)
                    }
                    else if(CheckInteraction(BType)==7){
                        SetToNormal()
                        DestroyDoor(BX,BY)
                    }
                    else{
                        SetToNormal()
                    }
                }
            }

            //X
            if(UnadditedPY<=(BY) && UnadditedPY>(BY-1.125)){
                if(PlayerXAdditions>=(BX-0.25) && PlayerXAdditions<=(BX)){
                    if(CheckInteraction(BType)==1){
                        VelVecX = 1
                        PlayerXAdditions = (PlrPositionX+VelVecX)/8
                        if(PlayerXAdditions>=(BX-0.25) && PlayerXAdditions<=(BX)){
                            VelVecX = 0
                        }
                    }
                    else if(CheckInteraction(BType)==2){
                        SendWinScreen();
                    }
                    else if(CheckInteraction(BType)==3){
                        SendFailScreen()
                    }
                    else if(CheckInteraction(BType)==4){
                        SetToWater()
                    }
                    else if(CheckInteraction(BType)==5){
                        SetToPlant();
                    }
                    else if(CheckInteraction(BType)==6){
                        SetToNormal()
                        ObtainKey(BX,BY)
                    }
                    else if(CheckInteraction(BType)==7){
                        SetToNormal()
                        DestroyDoor(BX,BY)
                    }
                    else{
                        SetToNormal()
                    }
                }
                if(PlayerXAdditions<= BX+0.875 && PlayerXAdditions>=(BX)){
                    if(CheckInteraction(BType)==1){
                        VelVecX = -1
                        PlayerXAdditions = (PlrPositionX+VelVecX)/8
                        if(PlayerXAdditions<=BX+0.875 && PlayerXAdditions>=(BX)){
                            VelVecX = 0
                        }
                    }
                    else if(CheckInteraction(BType)==2){
                        SendWinScreen();
                    }
                    else if(CheckInteraction(BType)==3){
                        SendFailScreen()
                    }
                    else if(CheckInteraction(BType)==4){
                        SetToWater()
                    }
                    else if(CheckInteraction(BType)==5){
                        SetToPlant();
                    }
                    else if(CheckInteraction(BType)==6){
                        SetToNormal()
                        ObtainKey(BX,BY)
                    }
                    else if(CheckInteraction(BType)==7){
                        SetToNormal()
                        DestroyDoor(BX,BY)
                    }
                    else{
                        SetToNormal()
                    }
                }
            }
        }
    }

    //Y

    /*
    Since there is only one check, this variation
    of the ceiling detection doesn't crash the page.
    */

    if(PlayerYAdditions>(MaxheigthIGS-0.125)){
        highdirvel=0
        for(var i=highdirMAXvel; i<0;i++){
            VelVecY++
            PlayerYAdditions = ((PlrPositionY+1)-VelVecY)/8
            if(PlayerYAdditions>(MaxheigthIGS-0.125)){
                if(i==-1){
                    VelVecY=0
                }   
            }
            else{
                break
            }
        }
    }

    if(PlayerYAdditions<(MinheigthIGS-0.75)){
        VelVecY = 1
        PlayerYAdditions = ((PlrPositionY+1)-VelVecY)/8
        if(PlayerYAdditions<(MinheigthIGS-0.75)){
            VelVecY=0
            SendFailScreen()
        }
    }

    //X
    if(PlayerXAdditions<MinLengthIGS){
        VelVecX=-1
        PlayerXAdditions = (PlrPositionX+VelVecX)/8
        if(PlayerXAdditions<MinLengthIGS){
            VelVecX=0
        }
    }
    if(PlayerXAdditions-0.625>MaxLengthIGS){
        VelVecX=1
        PlayerXAdditions = (PlrPositionX+VelVecX)/8
        if(PlayerXAdditions-0.625>MaxLengthIGS){
            VelVecX=0
        }
    }
}

function StarCycle(originx,originy,offsetx,offsety){
    var newposx = (parseInt(originx))+(parseInt(offsetx))
    var newposy = (parseInt(originy))+(parseInt(offsety)*-1)

    var newrow = lvlstring.split("_")[newposx]
    
    if(newrow != undefined && newrow != ""){
        var newcol = newrow.split(",")[newposy]
        if(newcol != undefined && newcol != ""){
            return newcol
        }
        
    }
}

function InitializeLevel(){
    var spawnlist = []
    for(var i=0; i<levelwidth+1;i++){
        for(var j=0; j<levelheight+1;j++){
            var char = lvlstring.split("_")[i].split(",")
            if(char[j] == "1"){
                spawnlist.push(i+","+j)
            }
        }
    }

    var randomSpawn = Math.round(Math.random()*(spawnlist.length-1))
    
    if(randomSpawn == -0){
        randomSpawn = 0;
    }

    selectedspawn = spawnlist[randomSpawn];
    var SspawnX = selectedspawn.split(",")[0];
    var SspawnY = selectedspawn.split(",")[1];

    //Offset cycle

    for(var a=0;a<squares_container.children.length;a++){
        var CS = squares_container.children[a];
        var CCX = CS.getAttribute("gamex");
        var CCY = CS.getAttribute("gamey");

        //cycle through the text using the offset numbs from the screen, starting from the spawn
        
        var blockvaluestart = StarCycle(SspawnX,SspawnY,CCX,CCY)
        
        if(blockvaluestart != undefined && blockvaluestart != ""){
            for(var c=0;c<color_bar.children.length;c++){
                if(blockvaluestart == color_bar.children[c].id){
                    CS.style.backgroundColor = color_bar.children[c].style.backgroundColor
                    CS.setAttribute("type",color_bar.children[c].id)
                }
            }
        }
        else{
            CS.style.backgroundColor = "#fff"
        }
    }
}

function displacement(array) {
    CheckPlayerPos()
    for(var j=0;j<array.length;j++){
        var block = array[j];
        var screenX = parseInt(block.getAttribute("screenx"))
        var screenY = parseInt(block.getAttribute("screeny"))

        var newScreenX = (screenX-VelVecX)
        var newScreenY = (screenY+VelVecY)
        
        block.style.transform = "translate("+(newScreenX)+"vw,"+(newScreenY)*-1+"vw)"
        block.setAttribute("screenx", newScreenX);
        block.setAttribute("screeny", newScreenY);
    }
}

function clip(array){
    for(var i=0; i<array.length;i++){
        array[i].style.backgroundColor = "#fff"
        array[i].setAttribute("type","0")

        var yval = parseInt(array[i].getAttribute("screeny"))
        var xval = parseInt(array[i].getAttribute("screenx"))

        if(yval >= maxdown){
                if(CSCYChanged){
                    CSCYChanged = false;
                    farthestDown--
                    farthestUp--
                }
            
                array[i].setAttribute("screeny",yval-(SSSY*8));
                array[i].setAttribute("gamey",farthestDown)        
        }
        else if( yval <= maxup){
                if(CSCYChanged){
                    CSCYChanged = false;
                    farthestDown++
                    farthestUp++
                }
            
                array[i].setAttribute("screeny",yval+(SSSY*8));
                array[i].setAttribute("gamey",farthestUp)
        }
        if(xval>maxleft){
                if(CSCXChanged){
                    CSCXChanged = false;
                    farthestLeft--
                    farthestRight--
                }
            
                array[i].setAttribute("screenx",xval-(SSSX*8));
                array[i].setAttribute("gamex",farthestLeft)
        }
        if(xval<maxright){
                if(CSCXChanged){
                    CSCXChanged = false;
                    farthestLeft++
                    farthestRight++
                }
            
                array[i].setAttribute("screenx",xval+(SSSX*8));
                array[i].setAttribute("gamex",farthestRight)
        }

        var clipgamex = parseInt(array[i].getAttribute("gamex"))
        var clipgamey = parseInt(array[i].getAttribute("gamey"))

        var clippedval = StarCycle(selectedspawn.split(",")[0],selectedspawn.split(",")[1],clipgamex,clipgamey)
        
        if(clippedval != undefined && clippedval != ""){
            for(var c=0;c<color_bar.children.length;c++){
                if(clippedval==color_bar.children[c].id){

                    if(GottenKey(clipgamex,clipgamey)==false){
                        if(OpenedDoor(clipgamex,clipgamey)==false){
                            array[i].style.backgroundColor = color_bar.children[c].style.backgroundColor
                            array[i].setAttribute("type",color_bar.children[c].id)
                        }
                    }
                }
            }
        }
        else{
            array[i].style.backgroundColor = "#fff"
        }
    }
}   

function CalculateAndRender(){
    //Pc controls check
    if(IsW){
        IsW = false;
        IsPc = true;
        DidJump = true;
        jump=true;
        IsGrounded=false;
    }
    else{
        if(IsS || IsA || IsD){}
        else{IsPc = false;}
    }

    if(IsS){
        IsPc = true;
        down = true;
    }
    else{
        if(IsW || IsA || IsD){}
        else{IsPc = false;}
        down = false;
    }

    if(IsD){
        IsPc = true;
        right = true;
        onmoving=true;
        
    }
    else{
        if(IsW || IsS || IsA){}
        else{IsPc = false; onmoving=false;}
        right = false;
        
    }
    
    if(IsA){
        IsPc = true;
        left = true;
        onmoving=true;
    }
    else{
        if(IsW || IsS || IsD){}
        else{IsPc = false; onmoving=false;}
        left = false;
    }
    
    //Mobile controls check

    if(MUpBtn && IsPc == false && IsGrounded && DidJump==false){
        DidJump = true;
        jump=true;
        IsGrounded=false;
    }  

    if(MLeftBtn && IsPc == false){
        left = true;
        onmoving=true;
    }
    else{
        if(IsPc == false && left){
            onmoving=false;
            left = false; 
        }        
    }

    if(MRightBtn && IsPc == false){
        right = true; 
        onmoving=true;
    }
    else{
        if(IsPc == false && right){
            onmoving=false;
            right = false;
        }
    }

    if(MDownBtn && IsPc == false){
        down = true;  
    }
    else{
        if(IsPc == false){
            down = false;  
        }
    }

    //Alteration blocks variables being normalized in frame change

    if(OnWater==false){
        DidJump=true
    }

    if(DidJump && IsGrounded){
        IsGrounded = false;
    }

    if(IsGrounded){
        DidJump=false
    }

    VelVecX = 0; 
    VelVecY = 0;

    //Movement
    if(right){
        if(onmoving && velx<maxXvel){
            if(IsClimbing){velx = 1}
            else{velx += 1}
        }
    }
    if(left){
        if(onmoving && velx>(maxXvel*-1)){
            if(IsClimbing){ velx = -1}
            else{velx -= 1}
        }
    }
    if(jump){
        if(IsClimbing){
            VelVecY=-1
            up = false
            jump = false;
        }else{  
            jump = false;
            up = true
            highdirvel=highdirMAXvel
            terminalvel=0
        }
    }

    if(up){
        if(highdirvel<0){
            highdirvel+=1
        }
        else{
            up=false
        }
    }

    if(IsClimbing && down){
        VelVecY=1
    }

    if(terminalvel<gravity){terminalvel+=1}

    if(onmoving==false){
        if(velx>0){velx -=1}
        else if(velx<0){velx += 1}
    }

    //Render & Complements
    
    VelVecY = (parseInt(VelVecY))+(terminalvel+(highdirvel))

    VelVecX = (parseInt(VelVecX)+velx)

    displacement(squares_container.children,VelVecX,VelVecY)
    
    PlrPositionX += VelVecX
    PlrPositionY -= VelVecY

    CSCXChanged = true;
    CSCYChanged = true;

    clip(squares_container.children)
    
    boundchecksYUp = SSSTotal
    boundchecksYDown = SSSTotal
    boundchecksXLeft = SSSTotal
    boundchecksXRight = SSSTotal
}

function PrintPlrPos(DOMX,DOMY){
    DOMX.innerHTML = "x: "+Math.floor(PlrPositionX/8); 
    DOMY.innerHTML = "y: "+(Math.floor(PlrPositionY/8)+1);
}