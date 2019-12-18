var gameBall;
var hole;
var level = [];

var elapsed
var fpsInterval;
var then;
var startTime;

var clickedX;
var clickedY;
var releaseX;
var releaseY;

$("document").ready(function() {

    include("physicsengine.js");
    include("levelengine.js");
    include("Levels/level_1.js");

    InitContext();

    gameBall = new CircleObj(295, 75, 5, false);
    hole = new CircleObj(500, 75, 5.5, true);

    level = InitLevel();

    $("canvas").mousedown(function(event) {
        var localclickedX = event.originalEvent.clientX;
        var localclickedY = event.originalEvent.clientY;

        if ((localclickedX >= gameBall.x - (gameBall.rad * 2)) && (localclickedX <= gameBall.x + (gameBall.rad * 2))
        && (localclickedY >= gameBall.y - (gameBall.rad * 2)) && (localclickedY <= gameBall.y + (gameBall.rad * 2))) {
            clickedX = localclickedX;
            clickedY = localclickedY;
            document.body.style.cursor = "crosshair";
        } else {
            clickedX = null;
            clickedY = null;
        }
    });

    $("canvas").mouseup(function(event) {
        if (clickedX != null && clickedY != null) {
            releaseX = event.originalEvent.clientX;
            releaseY = event.originalEvent.clientY;
            BallHit(clickedX, releaseX, clickedY, releaseY);
        }

        document.body.style.cursor = "default";
    });

    FrameRenderLoop(50);
});



FrameRender = function() {

    requestAnimationFrame(FrameRender);

    now = Date.now();
    elapsed = now - then

    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);

        Draw(level, gameBall, hole);
    } 
}

FrameRenderLoop = function(frameRate) {

    fpsInterval = 1000 / frameRate;
    then = Date.now();
    startTime = then;
    
    FrameRender();
}

function include(file) {
    var script = $("<script></script>");
    script.attr("src", file)
    script.attr("type", "text/javascript");

    $("head").append(script);
}