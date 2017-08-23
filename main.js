
//----------------------------------------- Class

function Vector (paraX , paraY){
    this.x = paraX ;
    this.y = paraY ;
}

function Rectangle( paraX , paraY , paraWidth, paraHeight ){
    this.x = paraX ;
    this.y = paraY ;
    this.w = paraWidth ;
    this.h = paraHeight ;
}

function Button( paraX , paraY , paraWidth, paraHeight ) {
    this.rect = new Rectangle(paraX , paraY , paraWidth, paraHeight) ;
    
    this.high = "#FF0000" ;    // pure red color
    this.low = "#FF9980" ;  // faint red
    
    this.on = false ;
}

Button.prototype.Draw = function(ctx) { 
    if(this.on)
        ctx.fillStyle = this.high ;
    else    
        ctx.fillStyle = this.low ;
    
    ctx.fillRect( this.rect.x ,this.rect.y ,this.rect.w ,this.rect.h );
}

function Circuit(paraX , paraY , paraWidth, paraHeight) {
    this.rect = new Rectangle(paraX , paraY , paraWidth, paraHeight) ;
    
    this.gate = "" ;
    this.data = "" ;
    
}

Circuit.prototype.Draw = function(ctx) {
    ctx.fillStyle = "#e6e6ff" ;
    ctx.fillRect( this.rect.x ,this.rect.y ,this.rect.w ,this.rect.h );
    
    ctx.fillStyle = "black" ;
    ctx.font = "30px Arial" ;
    
    if(this.data.name) {
        ctx.fillText(this.data.name , this.rect.x + 20 , this.rect.y + 30 ) ;
            
            var y = 0 , radius = 5 ;
            
            ctx.fillStyle = "cyan" ;
            for(var i = 0 ; i < this.data.iportLeft.length ; i++) {
                if(this.data.iportLeft[i] == "GND" || this.data.iportLeft[i] == "VCC") {
                    ctx.fillStyle = "red" ;
                }
                else {
                    ctx.fillStyle = "cyan" ;
                }
                ctx.beginPath() 
                ctx.moveTo(this.rect.x + radius + 15 , this.rect.y + y + radius + 50);
                ctx.arc(this.rect.x + 15 , this.rect.y +  radius + y + 50, radius , 0 , 2*Math.PI);
                ctx.closePath() ;
                ctx.fill() ;
                
                y += 30 ;
            }   
            y = 0 ;
            for(var i = 0 ; i < this.data.iportRight.length ; i++) {
                if(this.data.iportRight[i] == "GND" || this.data.iportRight[i] == "VCC") {
                    ctx.fillStyle = "red" ;
                }
                else {
                    ctx.fillStyle = "cyan" ;
                }
                ctx.beginPath() ;
                ctx.moveTo(this.rect.x + radius + 135 , this.rect.y + y + radius + 50);
                ctx.arc(this.rect.x + 135 , this.rect.y +  radius + y + 50, radius , 0 , 2*Math.PI);
                ctx.closePath() ;
                
                ctx.fill() ;
                
                y += 30 ;
            }   
    }
    else
         ctx.fillText( "none" , this.rect.x + 20 , this.rect.y + 30 ) ;
    
    
    
    
}

//----------------------------------------- Variables , Objects

var c = document.getElementById("toolkit"); // toolkit is id of canvas element from html
var ctx = c.getContext("2d");
//var mouseData = new CustomMouse(1,2) ;

var ButtonObjects = [] ;
var CircuitObjects = [] ;
//----------------------------------------- Main Functions

window.onload = function() { // This functions whenever the page is loaded
    Start() ;
    Draw() ;
}

function Start() { 
    var buttonStartX = 40 ;
    
    for(var i = 0 ; i < 5 ; i++) {  // Initiating our buttons
        var tempButton = new Button(buttonStartX , 100 , 30 , 30) ;
        ButtonObjects.push(tempButton) ;
        
        buttonStartX += 45 ;
    }
    
    var circuitStartX = 40 ;
    for(var i = 0 ; i < 4 ; i++) {
        var tempCircuit = new Circuit(circuitStartX , 200 , 150 , 250) ;
        CircuitObjects.push(tempCircuit) ;
        
        circuitStartX += 180 ;
    }
    
}


function Draw() { // A normal function which inclues complete draw method
    
    ctx.clearRect(0, 0 , 800 , 600) ;
    
    for(var i = 0 ; i< 5 ; i++) {
        ButtonObjects[i].Draw(ctx) ;
    }
    
    for(var i = 0 ; i < CircuitObjects.length ; i++) {
        CircuitObjects[i].Draw(ctx) ;
    }
    
//    ctx.beginPath();
//    var x , y , radius ;
//    x = 40 ;
//    y = 20 ;
//    radius = 20 ;
//    
//    for(var i = 0 ; i < 10 ; i++) {   
//        ctx.moveTo(x+radius , y+radius);
//        ctx.arc(x  , y+radius , radius , 0 , 2*Math.PI);
//        ctx.stroke();
//        x += 45;
//    }
//    //to draw a line in canvas
//    ctx.moveTo(0,80);
//    ctx.lineTo(407,80);
//    ctx.stroke();
//    x=40,y=100;
//    
//    for(var i=0 ; i<5 ; i++){  //for rectangles
//        ctx.rect(x,y,30,30);
//        ctx.stroke();
//        x+=45;
//    }    
//    
//    ctx.moveTo(0,160);
//    ctx.lineTo(407,160);
//    ctx.stroke();
//    ctx.rect(10,y+100,190,310);
//    ctx.rect(x-50,200,190,310);
//    ctx.stroke();
    
}
    
    
//----------------------------------------- Basic Functions
 

function OnMouseClick(mouseData) { // when we click on canvas this functuion is called 
    var mouseLocation = new Vector(mouseData.clientX , mouseData.clientY) ;

    for(var i = 0 ; i < ButtonObjects.length ; i++) {
        if( isInside(mouseLocation , ButtonObjects[i].rect ) ){ // mouse location and button rect from each element of ButtonObjects array
            console.log("clicked on Button Object "+(1+i)); 
            if(ButtonObjects[i].on) {
                ButtonObjects[i].on = false ;
                console.log("false") ;
            }
            else {
                ButtonObjects[i].on = true ;
                console.log("true") ;
            }
            break ;
        }
    }
  
    for(var i = 0 ; i < CircuitObjects.length ; i++) {
        if( isInside(mouseLocation , CircuitObjects[i].rect)) {
            for( var j = 0 ; j < 14 ; j++) {}
        }
    }

    Draw() ;
}

function ICDrag(event, ic) {
    var pos = new Vector(event.clientX , event.clientY) ;
    for(var i = 0 ; i < CircuitObjects.length ; i++) {
        if(isInside(pos , CircuitObjects[i].rect )) {
            
            CircuitObjects[i].data = data_JSON.gate[ic] ;            

            console.log("Name : "+name+" i : "+(i+1)) ;
        }
    }
    
    Draw() ;
}


function isInside( pos, rect) { //to check mouse pos and rectangle pos
    if ((pos.x > rect.x) && (pos.x < (rect.x+rect.w)) ) {
        if(( pos.y < (rect.y+rect.h) && (pos.y > rect.y))) {
            return true;
        }
        else    
            return false ;
    }
    else
        return false ;
}

//----------------------------------------- Event Listeners

c.addEventListener("click" , OnMouseClick) ;

function NOTGATE(event) {
    ICDrag(event , "7404") ;
}
document.getElementById("NOT").addEventListener("dragend" , NOTGATE) ;

function ANDGATE(event) {
    ICDrag(event , "7408") ;
}
document.getElementById("AND").addEventListener("dragend" , ANDGATE) ;

function ORGATE(event) {
    ICDrag(event , "7432") ;
}
document.getElementById("OR").addEventListener("dragend" , ORGATE) ;
