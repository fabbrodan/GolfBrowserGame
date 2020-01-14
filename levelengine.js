var context;
var canvas
var width;
var height;

function InitContext() {

    width = $("#gameDiv").width();
    height = $("#gameDiv").height();

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

        $("#lvlStroke").text("Strokes: " + lvlStrokes);
        $("#totalStroke").text("Total: " + (sessionStorage.getItem("strokes") == null ? 0 : sessionStorage.getItem("strokes")));
}

function WinCondition(gameBall, hole) {
    
    // setup of collision borders of both ball and hole

    var distX = gameBall.x - hole.x;
    var distY = gameBall.y - hole.y;

    var distance = Math.sqrt(distX * distX + distY * distY);

    // check for collision
    if ((distance * 1.85) < gameBall.rad + hole.rad) {
        
        let audio = new Audio("Assets/Sounds/success.wav");
        audio.play();

        // stop the animations
        cancelAnimationFrame(animationRequest);

        let levelNum = parseInt(sessionStorage.getItem("level")) + 1;
        
            swal("Congratulations!", "You cleared the level!", "success").then(() => {
                // Check for the last level
                if (levelNum <= 3) {
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
        } else {
            // load the upload highscore page
            location = "highscore.html";
            }
        });
    }
}