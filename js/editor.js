var lvl_edge = document.getElementById('lvl_edge');

var in_h = document.getElementById('in_h');
var dec_h = document.getElementById('dec_h');
var in_w = document.getElementById('in_w');
var dec_w = document.getElementById('dec_w');

var current_col = document.getElementById('current_col');
col = current_col.getAttribute("type")

var RE = document.getElementById('RE');

var color_bar = document.getElementById('color_bar');
var col_array = color_bar.children;

var data_string = document.getElementById('data_string');

var zoomin = document.getElementById('zoomin');
var zoomout = document.getElementById('zoomout');

var inv_mss_cont = document.getElementById('inv_mss_cont');

var IDAS = document.getElementById("IDAS")
var DDAS = document.getElementById("DDAS")

var figsize = 4;

var lvlsizex = 10
var lvlsizey = 7;

var issuescount = 0;
var spawnerscount = 0;

var forward_error = document.getElementById('forward_error');
var reset_lvl = document.getElementById('reset_lvl');
var level_validation = document.getElementById('level-validation');

forward_error.addEventListener('click', function(){
    inv_mss_cont.style.display = 'none';
    data_string.readOnly = false;
})

reset_lvl.addEventListener('click', function(){
    default_build();
    inv_mss_cont.style.display = 'none';
    code_lvl_status = 1
    data_string.readOnly = false;
    level_validation.style.backgroundColor = "#00ff00"
})

RE.addEventListener('click', function(){
    default_build();
    inv_mss_cont.style.display = 'none';
    code_lvl_status = 1
    data_string.readOnly = false;
    level_validation.style.backgroundColor = "#00ff00"
})

function validate_level(newsizex,newsizey){
    if(issuescount>0){
        code_lvl_status = 0
        level_validation.style.backgroundColor = "#ff0000"
    }
    else{
        lvlsizex = newsizex
        lvlsizey = newsizey
        code_lvl_status = 1
        level_validation.style.backgroundColor = "#00ff00"
    }
}

function InvalidationScreen(){
    data_string.readOnly = true;
    inv_mss_cont.style.display = 'block';
    code_lvl_status = 0
    level_validation.style.backgroundColor = "#ff0000"
}

function totext(){
    issuescount=0
    spawnerscount=0
    var inv = lvlsizex*lvlsizey
    editor_lvl_string = "";
    for (var i = 0; i <lvlsizex; i++){
        for (var j = 0; j<lvlsizey;j++){
            var curquad = lvl_edge.children[(lvlsizex*lvlsizey)+(inv*-1)]
            if(curquad != undefined){
                editor_lvl_string += curquad.getAttribute("type")+","
                inv -= 1
                if(curquad.getAttribute("type")=="1"){
                    spawnerscount++
                }
            }
        }
        editor_lvl_string += "_"
    }
    data_string.value = editor_lvl_string
    if(spawnerscount<1){
        issuescount++;
        if(code_lvl_status==1){
            InvalidationScreen();
        }
    }
    validate_level(lvlsizex,lvlsizey)
}

function tosquares(text){
    issuescount=0
    spawnerscount=0
    var current_col_size 
    var newrows
    var newcols
    newrows = text.split("_")
    lvl_edge.innerHTML = "";

    if(newrows.length-1 > 0){
        if(newrows.length-1 < 10){
            issuescount++
            if(code_lvl_status==1){InvalidationScreen();}
        }

        for (var i = 0; i < (newrows.length-1); i++){
            newcols = newrows[i].split(",")
            var current_col_size = newcols.length-1
            
            if(current_col_size < lvlsizey || current_col_size != newrows[0].split(",").length-1){
                issuescount++
                if(code_lvl_status==1)
                {
                    InvalidationScreen();
                }
            }

            for (var j = 0; j < current_col_size; j++){
                var col_num =  (col_array.length)*2

                var square = document.createElement('button');
                square.className = 'square';
                square.style.left = (i*figsize) + 'vw'
                square.style.top = (j*figsize) + 'vw'
                square.style.width = (figsize) + 'vw'
                square.style.height = (figsize) + 'vw'
                lvl_edge.appendChild(square);
                
                for (var c=0; c < col_array.length; c++){
                    if(newcols[j]==col_array[c].id){
                        if(newcols[j] =="1"){
                            spawnerscount++
                        }
                        square.setAttribute('type',newcols[j])
                        square.style.backgroundColor = col_array[c].style.backgroundColor
                    }
                    else{
                        col_num-=1;
                    }
                }

                if(col_num==0){
                    issuescount++
                    square.setAttribute('type',"0")
                    square.style.backgroundColor = col_array[0].style.backgroundColor
                }

                square.addEventListener('click',function(){
                    paint(this);
                })
            }
            
        }
        if(spawnerscount<1){
            issuescount++;
            if(code_lvl_status==1)
                {
                    InvalidationScreen();
                }
        }
        validate_level(newrows.length-1,current_col_size)
    }
    else{
        issuescount++;
        validate_level(0,0)
        InvalidationScreen();
    }
}

function paint(obj){
    obj.setAttribute('type',col)
    obj.style.backgroundColor = current_col.style.backgroundColor
    totext();
}

for(var i = 0; i < col_array.length; i++){
    col_array[i].addEventListener('click', function(){
        current_col.setAttribute("type",this.id)
        current_col.style.backgroundColor = this.style.backgroundColor
        col = current_col.getAttribute("type")
    });
}

function default_build(){
    lvl_edge.innerHTML = "";
    editor_lvl_string = ""
    for (var i = 0; i <lvlsizex;i++){
        for (var j = 0; j <lvlsizey;j++){
            var square = document.createElement('button');
            if(i==5 && j==0){
                square.setAttribute('type',"1")
            }else{
                square.setAttribute('type',"0")
            }
            
            square.className = 'square';
            square.style.left = (i*figsize) + 'vw'
            square.style.top = (j*figsize) + 'vw'
            square.style.width = (figsize) + 'vw'
            square.style.height = (figsize) + 'vw'
            lvl_edge.appendChild(square);
            editor_lvl_string += square.getAttribute('type')+","
            square.addEventListener('click',function(){
                paint(this);
            })
        }
        editor_lvl_string += "_"
    }
    data_string.value = editor_lvl_string
    tosquares(editor_lvl_string)
}

data_string.addEventListener("input", function(){
    tosquares(this.value)
    editor_lvl_string = this.value
})

function magnification(change){
    var inv = lvlsizex*lvlsizey
    if((figsize+change)<8 && (figsize+change)>=0){
        figsize+=change
        
        for (var i = 0; i <lvlsizex;i++){
            for (var j = 0; j <lvlsizey;j++){
                var curquad = lvl_edge.children[(lvlsizex*lvlsizey)+(inv*-1)]
                if(curquad != undefined){
                    curquad.style.left = (i*figsize) + 'vw'
                    curquad.style.top = (j*figsize) + 'vw'
                    curquad.style.width = (figsize) + 'vw'
                    curquad.style.height = (figsize) + 'vw'
                    inv -= 1
                }   
            }
        }
        
    }
}

zoomin.addEventListener("click", function(){
    magnification(0.5)
})

zoomout.addEventListener("click",function(){
    magnification(-0.5)
});

function rearrange(axis,change){
    issuescount=0
    var leveldatabackup = editor_lvl_string;
    editor_lvl_string = "";
    
    if(axis == 0){
        if(lvlsizex+change > 9){
            lvlsizex += change
        }
    }
    else if(axis == 1){
        if(lvlsizey+change > 6){
            lvlsizey += change
        }
    }
    
    lvl_edge.innerHTML = "";
    
    for (var i = 0; i <lvlsizex;i++){
        for (var j = 0; j <lvlsizey;j++){
            
            var square = document.createElement('button');

            square.setAttribute('type',"0")

            square.className = 'square';
            square.style.left = (i*figsize) + 'vw'
            square.style.top = (j*figsize) + 'vw'
            square.style.width = (figsize) + 'vw'
            square.style.height = (figsize) + 'vw'
            
            lvl_edge.appendChild(square);

            var rows = leveldatabackup.split("_");

            if(rows[i] == undefined || rows[i]==""){
                square.setAttribute("type","0")
            }
            else{
                var col = rows[i].split(",")
                if (col[j] != ""){
                    square.setAttribute('type',col[j])
                    for (var c = 0; c < col_array.length; c++){
                        if (square.getAttribute("type")==col_array[c].id){
                            square.style.backgroundColor =col_array[c].style.backgroundColor
                        }
                    }
                }
                else{
                    square.setAttribute("type","0")
                }
            }

            editor_lvl_string += square.getAttribute("type")+","
            
            square.addEventListener('click',function(){
                paint(this);
            })
        }
        editor_lvl_string += "_"
    }
    
    data_string.value = editor_lvl_string
    leveldatabackup = "";

    validate_level(lvlsizex,lvlsizey)
}

function ChangeDAS(newval){
     if(newval >=8){
           data_string.style.height = newval + "vw"
     }
     else{
           DAS = 8
     }
}

in_h.addEventListener("click",function(){
    rearrange(1,1)
})

dec_h.addEventListener("click",function(){
    rearrange(1,-1)
})

in_w.addEventListener("click",function(){
    rearrange(0,1)
})

dec_w.addEventListener("click",function(){
    rearrange(0,-1)
})

default_build()
validate_level(lvlsizex,lvlsizey)
ChangeDAS(8)

IDAS.addEventListener("click",function(){
    if(DAS < 12){
        DAS++
    }
    else if(DAS>=12){
        DAS+=10
    }
    else if(DAS>=100 && DAS < 1000){
        DAS+=100
    }
    else if(DAS>1000){
         DAS+=1000    
    }
    
    ChangeDAS(DAS)
})

DDAS.addEventListener("click",function(){
     if(DAS < 12){
        DAS--
    }
    else if(DAS>=12){
        DAS-=10
    }
    else if(DAS>=100 && DAS < 1000){
        DAS-=100
    }
    else if(DAS>1000){
         DAS-=1000    
    }
    ChangeDAS(DAS)
})