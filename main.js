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

$("document").ready(function() {

    //include("physicsengine.js", "physeng");
    include("levelengine.js", "leveleng");
    if (localStorage.getItem("level") === null) {
        localStorage.setItem("level", 1);
    }
    include("Levels/level_" + localStorage.getItem("level") + ".js", "level");

    InitContext();

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

    FrameRender();
});



FrameRender = function() {
    gameBall.nextFrame();
    Draw(level, gameBall, hole);
    requestAnimationFrame(FrameRender);
}

FrameRenderLoop = function() {
    FrameRender();
}

function include(file, id) {
    var script = $("<script></script>");
    script.attr("src", file)
    script.attr("type", "text/javascript");
    script.attr("id", id)

    $("head").append(script);
}