var context;
var canvas
var width;
var height;

function InitContext() {

    //width = window.innerWidth || window.document.documentElement.clientWidth || window.document.documentElement.getElementsByTagName('body')[0].clientWidth * 0.25;
    //height = window.innerHeight || window.document.documentElement.clientHeight || window.document.documentElement.getElementsByTagName('body')[0].clientHeight * 0.25;

    width = window.innerWidth * 0.80;
    height = window.innerHeight * 0.80;

    canvas = document.createElement("canvas");
    canvas.width = width ;
    canvas.height = height;

    $("#gameDiv").append(canvas);

    context = canvas.getContext("2d");
}


function Draw(objects, gameBall, hole) {

    // clear everything
    context.clearRect(0, 0, width, height);
    
    $.each(backgrounds, function(index, background) {
        context.fillStyle="green";
        context.fillRect(background.X, background.Y, background.W, background.H);
    });

    context.fillStyle = "black";

    // draw walls and obstacles
    $.each(objects, function(index, object) {
        context.fillRect(
                object.x,
                object.y,
                object.width,
                object.height
            );
        });

    // draw the ball
    context.beginPath();
    context.fillStyle = "white";
    context.arc(
            gameBall.x,
            gameBall.y,
            gameBall.rad,
            gameBall.sAngle,
            gameBall.eAngle
        );
            gameBall.nextFrame();
            context.closePath();
            context.fill();
    
    // draw the hole
    context.beginPath();
    context.fillStyle = "black";
    context.arc(
            hole.x,
            hole.y,
            hole.rad,
            hole.sAngle,
            hole.eAngle
        );
        context.lineWidth = 2;
        context.stroke();
        context.closePath();

        $("h1").text(lvlStrokes);
}

function WinCondition(gameBall, hole) {
    
    // setup of collision borders of both ball and hole

    var gameBallXRight = Math.round(gameBall.x) + gameBall.rad;
    var gameBallXLeft = Math.round(gameBall.x) - gameBall.rad;
    var gameBallYBottom = Math.round(gameBall.y) + gameBall.rad;
    var gameBallYTop = Math.round(gameBall.y) - gameBall.rad;

    var holeXRight = Math.round(hole.x) + hole.rad;
    var holeXLeft = Math.round(hole.x) - hole.rad;
    var holeYBottom = Math.round(hole.y) + hole.rad;
    var holeYTop = Math.round(hole.y) - hole.rad;

    // check for collision
    if (gameBallXRight > holeXLeft && gameBallXLeft < holeXRight && gameBallYBottom < holeYBottom && gameBallYTop > holeYTop) {
        
        let audio = new Audio("Assets/Sounds/success.wav");
        audio.play();

        // stop the animations
        cancelAnimationFrame(animationRequest);

        let levelNum = parseInt(sessionStorage.getItem("level")) + 1;
        // Check for the last level
        if (levelNum <= 3) {
            swal("Congratulations!", "You cleared the level!", "success").then(() => {
                // move on to next level and update total strokes
                if (sessionStorage.getItem("strokes") == null) {
                    sessionStorage.setItem("strokes", lvlStrokes);
                }
                else {
                    var totalstrokes = parseInt(sessionStorage.getItem("strokes"));
                    totalstrokes += lvlStrokes;
                    sessionStorage.setItem("strokes", totalstrokes)
                }
                sessionStorage.setItem("level", levelNum);
                location.reload();
            });
        } else {
            // load the upload highscore page
            location = "highscore.html";
        }
    }
}