var hole;
var gameBall;
var level = [];

var elapsed
var fpsInterval;
var then;
var startTime;

var clickedX;
var clickedY;
var releaseX;
var releaseY;

var canvasOffsetX; 
var canvasOffsetY;

var lvlStrokes = 0;

var animationRequest;

var highScores;

$("document").ready(function() {

    include("physicsengine.js", "physeng");
    //include("levelengine.js", "leveleng");
    //include("scoresys.js", "scoresys");
    if (sessionStorage.getItem("level") === null) {
        sessionStorage.setItem("level", 1);
    }
    include("Levels/level_" + sessionStorage.getItem("level") + ".js", "level");

    InitContext();
    var counter = $("<h1></h1>").attr("id", "lvlStroke");
    var totalCounter = $("<h1></h1>").attr("id", "totalStroke");
    $("#pointDiv").append(counter);
    $("#pointDiv").append(totalCounter);

    level = InitLevel();

    canvasOffsetX = $("canvas").offset().left;
    canvasOffsetY = $("canvas").offset().top;

    // define the initial points for force calculation
    $("canvas").mousedown(function(event) {
        var localclickedX = event.originalEvent.clientX - canvasOffsetX;
        var localclickedY = event.originalEvent.clientY - canvasOffsetY;

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

    // define the end points for force calculation
    $("canvas").mouseup(function(event) {
        if (clickedX != null && clickedY != null) {
            releaseX = event.originalEvent.clientX - canvasOffsetX;
            releaseY = event.originalEvent.clientY - canvasOffsetY;
            BallHit(clickedX, releaseX, clickedY, releaseY);
        }

        document.body.style.cursor = "default";
    });

    /* TRYING TO SETUP TOUCH DEVICES
    canvas.addEventListener("touchstart", function(event) {
        console.log(event.touches[0].clientX + " " + event.touches[0].clientY);
    });

    canvas.addEventListener("touchend", function(event) {
        console.log(event.changedTouches[0].pageX);
    });
    */

    GetHighScores();

    FrameRenderLoop(50);
});

FrameRender = function() {

    animationRequest = requestAnimationFrame(FrameRender);

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

function include(file, id) {
    var script = $("<script></script>");
    script.attr("src", file)
    script.attr("type", "text/javascript");
    script.attr("id", id)

    $("head").append(script);
}