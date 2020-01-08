var context;
var width;
var height;

function InitContext() {

    width = window.innerWidth || window.document.documentElement.clientWidth || window.document.documentElement.getElementsByTagName('body')[0].clientWidth;
    height = window.innerHeight || window.document.documentElement.clientHeight || window.document.documentElement.getElementsByTagName('body')[0].clientHeight;
    var canvas = document.createElement("canvas");
    canvas.width = width - (width * 0.25);
    canvas.height = height - (height * 0.25);

    $("#gameDiv").append(canvas);

    context = canvas.getContext("2d");
}


function Draw(objects, gameBall, hole) {

    // clear everything
    context.clearRect(0, 0, width, height);
    
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
        
        // stop the animations
        cancelAnimationFrame(animationRequest);

        let levelNum = parseInt(localStorage.getItem("level")) + 1;
        // Check for the last level
        if (levelNum <= 3) {
            swal("Congratulations!", "You cleared the level!", "success").then(() => {
                // move on to next level
                let lvl = "Level_" + (levelNum - 1);
                localStorage.setItem(lvl, lvlStrokes)
                localStorage.setItem("level", levelNum);
                location.reload();
            });
        } else {
            // load the upload highscore page
            location = "highscore.html";
        }
    }
}