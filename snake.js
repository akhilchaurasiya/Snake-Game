const game=document.getElementById("game-box")
const score=document.getElementById("score")
const score1=document.getElementById("score1")
const popup=document.getElementById("popup")
const box=document.getElementById("box")
const restart=document.getElementById("restart")

var snakeSpeed=2;
var lastTime=0;
let lastInputDirection=inputDirection;
var inputDirection={ x : 1 , y : 0}
const foodBody={x : Math.ceil(Math.random()*50) , y : Math.ceil(Math.random()*25)}
const expand= 1;
const bodyOfSnake=[
    {x : 20 , y : 10},
]
function cobra(currTime)
{
    var time= (currTime-lastTime)/1000;
    requestAnimationFrame(cobra)
    if(time< 1/snakeSpeed) return;
    lastTime=currTime;
    

    update()
    draw()
}
window.requestAnimationFrame(cobra)


function draw()
{
    drawTheSnake();
    drawFood();
}

function update(){
    game.innerHTML="";
    moveSnake();
    snakeFood();
    
}

function drawTheSnake(){

    bodyOfSnake.forEach((element,index) => {
        var snake=document.createElement("div")
        snake.style.gridColumnStart=element.x;
        snake.style.gridRowStart=element.y;
        if(index==0)
        {
            snake.classList.add("head")
            
        }
        else{
            snake.classList.add("snake")
        }
        
        game.appendChild(snake)
        
    });
}

function drawFood(){
    var food=document.createElement("div")
    food.style.gridColumnStart= foodBody.x;
    food.style.gridRowStart=foodBody.y;

    food.classList.add("food")

    game.appendChild(food)
}

function moveSnake(){

    inputDirection = getInputDirection();

    for(var i = bodyOfSnake.length - 2;i >=0; i--)
    {
         bodyOfSnake[i+1]={...bodyOfSnake[i]}
    }
    bodyOfSnake[0].x += inputDirection.x;
    bodyOfSnake[0].y += inputDirection.y;
    gameOver();
}

function getInputDirection(){
    window.addEventListener("keydown", e=>{
        console.log(e.key)
        switch(e.key)
        {
            case 'ArrowUp' : 
            if(lastInputDirection.y == 1) break;
            inputDirection= { x : 0 , y : -1}
            break;

            case 'w' : 
            if(lastInputDirection.y == 1) break;
            inputDirection= { x : 0 , y : -1}
            break;

            case 'ArrowDown' : 
            if(lastInputDirection.y == -1) break;
            inputDirection= { x : 0 , y : 1}
            break;

            case 's' : 
            if(lastInputDirection.y == -1) break;
            inputDirection= { x : 0 , y : 1}
            break;

            case 'ArrowRight' : 
            if(lastInputDirection.x == -1) break;
            inputDirection= { x : 1 , y : 0}
            break;

            case 'd' : 
            if(lastInputDirection.x == -1) break;
            inputDirection= { x : 1 , y : 0}
            break;

            case 'ArrowLeft' : 
            if(lastInputDirection.x == 1) break;
            inputDirection= { x : -1 , y : 0}
            break;

            case 'a' : 
            if(lastInputDirection.x == 1) break;
            inputDirection= { x : -1 , y : 0}
            break;

            default : inputDirection= { x : 0 , y : 0}
        }
    })
    lastInputDirection=inputDirection;
    return inputDirection;
}

var count=0;
function snakeFood()
{
    if(bodyOfSnake[0].x === foodBody.x && bodyOfSnake[0].y === foodBody.y)
    {
        let a,b,condition=true;
        while(condition)
        {
            a=Math.ceil(Math.random()*50);
            b=Math.ceil(Math.random()*25);
            condition=bodyOfSnake.some(element=>{
                return element.x===a && element.y===b;
            })
        }
        foodBody.x=a;
        foodBody.y=b;
        snakeExpansion();
        snakeSpeed++;
        count += 10;
        score.innerHTML=count;
        score1.innerHTML=count;
    }
}

function snakeExpansion(){
    for(var i=0;i<expand;i++)
    {
        bodyOfSnake.push(bodyOfSnake[bodyOfSnake.length-1])
    }
}

function gameOver(){
    if(outOfBox() || intersected())
    {
        inputDirection.x=0;
        inputDirection.y=0;
        popup.style.zIndex="20";
        box.style.opacity="0.4"
    }
}

function intersected(){
    for(var i=1;i<bodyOfSnake.length;i++)
    {
        if(bodyOfSnake[0].x === bodyOfSnake[i].x && bodyOfSnake[0].y === bodyOfSnake[i].y)
        {
            return true;
        }
    }
}
function  outOfBox(){
    return bodyOfSnake[0].x == 51 || bodyOfSnake[0].y==26 || bodyOfSnake[0].x == 0 || bodyOfSnake[0].y==0;
}

restart.addEventListener("click", ()=>{
    location.reload();
})