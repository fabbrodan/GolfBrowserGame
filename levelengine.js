var context;
var width;
var height;

function InitContext() {

    width = window.innerWidth || window.document.documentElement.clientWidth || window.document.documentElement.getElementsByTagName('body')[0].clientWidth;
    height = window.innerHeight || window.document.documentElement.clientHeight || window.document.documentElement.getElementsByTagName('body')[0].clientHeight;
    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    $("body").append(canvas);

    context = canvas.getContext("2d");
}


function Draw(objects, gameBall, hole) {

    context.clearRect(0, 0, width, height);
    
    context.beginPath();

    context.arc(
            gameBall.x,
            gameBall.y,
            gameBall.rad,
            gameBall.sAngle,
            gameBall.eAngle
        );
            gameBall.nextFrame();
            
    context.arc(
            hole.x,
            hole.y,
            hole.rad,
            hole.sAngle,
            hole.eAngle
        );
    context.fill();
    $.each(objects, function(index, object) {
    context.fillRect(
            object.x,
            object.y,
            object.width,
            object.height
        );
    });
}