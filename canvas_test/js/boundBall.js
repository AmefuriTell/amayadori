var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var ballRadius = 10;
var x = canvas.width / 2, y = canvas.height / 2;
var dx = 2, dy = -2;

function drawBall(argx, argy, argRadius)
{
    ctx.beginPath();
    ctx.arc(argx, argy, argRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();
}
function moveBall()
{
    if(x + dx < ballRadius || x + dx > canvas.width - ballRadius)dx = -dx;
    x += dx;
    if(y + dy < ballRadius || y + dy > canvas.height - ballRadius)dy = -dy;
    y += dy;
}

function draw()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall(x, y, ballRadius);
}

function main()
{
    draw();
    moveBall();
}
setInterval(main, 1);