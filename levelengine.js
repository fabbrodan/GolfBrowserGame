var context;
var canvas
var width;
var height;

var XOffset;
var YOffset

// setup the canvas and drawing context using and X and Y offset to move the positioning of the level objects
function InitContext(xOffset, yOffset) {

    // use the div size for canvas size
    width = $("#gameDiv").width();
    height = $("#gameDiv").height();

    // create canvas element
    canvas = document.createElement("canvas");
    canvas.width = width ;
    canvas.height = height;

    // assign offset values
    XOffset = xOffset;
    YOffset = yOffset;

    // append the div to the page
    $("#gameDiv").append(canvas);

    // assign context from canvas
    context = canvas.getContext("2d");
}

// the main drawing function, called on each game loop
function Draw(objects, gameBall, hole) {

    // clear everything
    context.clearRect(0, 0, width, height);
    
    // draw level background
    $.each(backgrounds, function(index, background) {
        context.fillStyle="green";
        context.fillRect(background.X + XOffset, background.Y + YOffset, background.W, background.H);
    });

    context.fillStyle = "black";

    // draw walls and obstacles
    $.each(objects, function(index, object) {
        context.fillRect(
                object.x + XOffset,
                object.y + YOffset,
                object.width,
                object.height
            );
            if (object instanceof(PhysObj)) {
                object.nextFrame();
            }
        });

    // draw the ball
    context.beginPath();
    context.fillStyle = "white";
    context.arc(
            gameBall.x + XOffset,
            gameBall.y + YOffset,
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
            hole.x + XOffset,
            hole.y + YOffset,
            hole.rad,
            hole.sAngle,
            hole.eAngle
        );
        context.lineWidth = 2;
        context.stroke();
        context.closePath();

        // update the text elements to display score
        $("#lvlStroke").text("Strokes: " + lvlStrokes);
        $("#totalStroke").text("Total: " + (sessionStorage.getItem("strokes") == null ? 0 : sessionStorage.getItem("strokes")));
}

// function to check for the ball "going in" the hole
function WinCondition(gameBall, hole) {
    
    // setup of collision borders of both ball and hole

    var distX = gameBall.x - hole.x;
    var distY = gameBall.y - hole.y;

    var distance = Math.sqrt(distX * distX + distY * distY);

    // check for collision
    if ((distance * 1.85) < gameBall.rad + hole.rad) {
        
        // play win audio
        let audio = new Audio("Assets/Sounds/success.wav");
        audio.play();

        // stop the animations
        cancelAnimationFrame(animationRequest);

        let levelNum = parseInt(sessionStorage.getItem("level")) + 1;
        
            // load the sweet alert box using promise callback
            swal("Congratulations!", "You cleared the level!", "success").then(() => {
                
                // Check for the last level
            if (levelNum <= 4) {
                    // if session storage does not contain stroke, assign it;
                if (sessionStorage.getItem("strokes") == null) {
                    sessionStorage.setItem("strokes", lvlStrokes);
                }
                else {
                    // update session storage
                    var totalstrokes = parseInt(sessionStorage.getItem("strokes"));
                    totalstrokes += lvlStrokes;
                    sessionStorage.setItem("strokes", totalstrokes)
                }
                // set new current level variable
                sessionStorage.setItem("level", levelNum);
                // reload page and let main script handle the next level drawing
                location.reload();
        } else {

            var totalstrokes = parseInt(sessionStorage.getItem("strokes"));
            totalstrokes += lvlStrokes;
            sessionStorage.setItem("strokes", totalstrokes)

            // if last level was cleared, load the upload highscore page
            location = "highscore.html";
            }
        });
    }
}