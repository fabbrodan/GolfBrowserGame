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

var levelOffsetX;
var levelOffsetY;

var lvlStrokes = 0;

var animationRequest;

$("document").ready(function() {

    /* UNCOMMENT TO INCLUDE SCRIPT FILES HERE INSTEAD OF IN HTML AND REMOVE FROM HTML HEAD SECTION */
    //include("physicsengine.js", "physeng");
    //include("levelengine.js", "leveleng");
    //include("scoresys.js", "scoresys");
    if (sessionStorage.getItem("level") === null) {
        sessionStorage.setItem("level", 1);
    }
    include("Levels/level_" + sessionStorage.getItem("level") + ".js", "level");

    levelOffsetX = -175;
    levelOffsetY = 100;

    InitContext(levelOffsetX, levelOffsetY);

    // get the offset of canvas for correct mouse point calculation
    canvasOffsetX = $("canvas").offset().left;
    canvasOffsetY = $("canvas").offset().top;

    var counter = $("<h1></h1>").attr("id", "lvlStroke");
    var totalCounter = $("<h1></h1>").attr("id", "totalStroke");
    $("#pointDiv").append(counter);
    $("#pointDiv").append(totalCounter);

    level = InitLevel();

    

    // define the initial points for force calculation
    $("canvas").mousedown(function(event) {
        // get the point of the mouse on the canvas based off of the offsets
        var localclickedX = event.originalEvent.clientX - canvasOffsetX - levelOffsetX;
        var localclickedY = event.originalEvent.clientY - canvasOffsetY - levelOffsetY;

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
            // get the point of mouse release based off of the canvas offsets
            releaseX = event.originalEvent.clientX - canvasOffsetX - levelOffsetX;
            releaseY = event.originalEvent.clientY - canvasOffsetY - levelOffsetY;
            BallHit(clickedX, releaseX, clickedY, releaseY);
        }

        document.body.style.cursor = "default";
    });

    $("canvas").mouseleave(function(event) {
        document.body.style.cursor = "default";
    });

    $("#resetBtn").click(function() {
        sessionStorage.setItem("level", 1);
        sessionStorage.setItem("strokes", 0);
        location.reload();
    });

    // fetch and display the highscore
    GetHighScores();

    // call drawing and game loop
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

// method for including additional script files without needing to have them in html file, thus removing the possibility to debug the game
function include(file, id) {
    var script = $("<script></script>");
    script.attr("src", file)
    script.attr("type", "text/javascript");
    script.attr("id", id)

    $("head").append(script);
}