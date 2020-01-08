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

var lvlStrokes = 0;

var animationRequest;

var highScores;

$("document").ready(function() {

    include("physicsengine.js", "physeng");
    //include("levelengine.js", "leveleng");
    //include("scoresys.js", "scoresys");
    if (localStorage.getItem("level") === null) {
        localStorage.setItem("level", 1);
    }
    include("Levels/level_" + localStorage.getItem("level") + ".js", "level");

    highScores = GetHighScores();
    $.each(highScores, function(index, object) {
        var row = $("<p></p>").text(object.name + " - " + object.score);
        $("#scoreDiv").append(row);
    });
    InitContext();
    var footer = $("<footer></footer>");
    var counter = $("<h1></h1>");
    footer.append(counter);
    $("#scoreDiv").append(footer);

    level = InitLevel();

    // define the initial points for force calculation
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

    // define the end points for force calculation
    $("canvas").mouseup(function(event) {
        if (clickedX != null && clickedY != null) {
            releaseX = event.originalEvent.clientX;
            releaseY = event.originalEvent.clientY;
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