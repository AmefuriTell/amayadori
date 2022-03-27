var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var ballRadius = 10;
var x = new Array(), y = new Array();
var dx = new Array(), dy = new Array();
var color = new Array();
var ballNum = 0;


function drawBall(argx, argy, argRadius, argColoer)
{
    ctx.beginPath();
    ctx.arc(argx, argy, argRadius, 0, Math.PI * 2);
    ctx.fillStyle = argColoer;
    ctx.fill();
    ctx.closePath();
}
function drawAllBall()
{
    for (let i = 0; i < ballNum; i++)
    {
        drawBall(x[i], y[i], ballRadius, color[i]);
    }
}

function moveAllBall()
{
    for (let i = 0; i < ballNum; i++) {
        if(x[i] + dx[i] < ballRadius || x[i] + dx[i] > canvas.width - ballRadius)dx[i] = -dx[i];
        x[i] += dx[i];
        if(y[i] + dy[i] < ballRadius || y[i] + dy[i] > canvas.height - ballRadius)dy[i] = -dy[i];
        y[i] += dy[i];
    }
}

function createBall()
{
    x.push(Math.floor(Math.random() * (canvas.width - ballRadius * 2)) + ballRadius);
    y.push(Math.floor(Math.random() * (canvas.height - ballRadius * 2)) + ballRadius);
    dx.push(Math.floor(Math.random() * 10) + 1);
    if(Math.random() < 0.5)dx[ballNum] = -dx[ballNum];
    dy.push(Math.floor(Math.random() * 10) + 1);
    if(Math.random() < 0.5)dy[ballNum] = -dy[ballNum];
    color.push("#" + Math.floor(Math.random() * 16777215).toString(16));

    ballNum++;
}

function draw()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawAllBall();
}

function main()
{
    draw();
    moveAllBall();
}
document.addEventListener("click", clickHandler, false);
function clickHandler(e)
{
    createBall();
}
setInterval(main, 10);