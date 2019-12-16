var context;
var width;
var height;
var start;
const objs = [];
const levelObjs = [];

var elapsed
var fpsInterval;
var then;
var startTime;

$("document").ready(function() {

    width = window.innerWidth || window.document.documentElement.clientWidth || window.document.documentElement.getElementsByTagName('body')[0].clientWidth;
    height = window.innerHeight || window.document.documentElement.clientHeight || window.document.documentElement.getElementsByTagName('body')[0].clientHeight;

    var canvas = document.createElement("canvas");
    canvas.id = "mainCanvas";
    canvas.height = height;
    canvas.width = width;

    $("body").append(canvas);

    context = canvas.getContext("2d");

    objs.push(new PhysObj(10, 10, 10, 10));

    levelObjs.push(new SolidObj(5, 5, 5, 100));
    levelObjs.push(new SolidObj(5, 5, 75, 5));
    levelObjs.push(new SolidObj(5, 80, 5, 100));
    levelObjs.push(new SolidObj(105, 5, 80, 5));

    FrameRenderLoop(50);
});

FrameRender = function() {

    requestAnimationFrame(FrameRender);

    //now = Date.now();
    //elapsed = now - then

    //if (elapsed > fpsInterval) {
    //    then = now - (elapsed % fpsInterval);


    context.clearRect(0, 0, width, height);

        for (var i = 0; i < objs.length; i++) {
            context.fillRect(
                objs[i].x,
                objs[i].y,
                objs[i].width,
                objs[i].height
            );
            objs[i].nextFrame();
        }

        for (var i = 0; i < levelObjs.length; i++) {
            context.fillRect(
                levelObjs[i].x,
                levelObjs[i].y,
                levelObjs[i].width,
                levelObjs[i].height
            );
        }
    //} 
}

FrameRenderLoop = function(frameRate) {

    fpsInterval = 1000 / frameRate;
    then = Date.now();
    startTime = then;
    
    FrameRender();
}

ColliderCheck = function(ball, wall) {
    
    var ballX = Math.round(ball.x);
    var ballY = Math.round(ball.y);

    if (ballX > wall.x && ballX < wall.x + wall.width && ballY > wall.y && ballY < wall.y + wall.height) {
        console.log("collision");
        ball.xVel = -ball.xVel;
        ball.yVel = -ball.yVel;
    }

}

var PhysObj = function(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.height = h;
    this.width = w;

    this.xVel = 0.5;
    this.yVel = 0.5;

    this.addXVel = function(vel) {
        this.xVel += vel;
    }

    this.addYVel = function(vel) {
        this.yVel += vel;
    }

    this.addXYVel = function(xVel, yVel) {
        this.xVel += xVel;
        this.yVel = yVel;
    }

    this.nextFrame = function() {
        this.x += this.xVel;
        this.y += this.yVel;

        for (var i = 0; i < levelObjs.length; i++) {
            ColliderCheck(this, levelObjs[i]);
        }

        if (this.xVel > 0.1 || this.xVel < -0.1) {
            this.xVel = (this.xVel * 0.9);
        }
        else {
            this.xVel = 0;
        }

        if (this.yVel > 0.1 || this.yVel < -0.1) {
            this.yVel = (this.yVel * 0.9);
        }
        else {
            this.yVel = 0;
        }
    }
}

var SolidObj = function(x, y, h, w) {
    this.x = x;
    this.y = y;
    this.height = h;
    this.width = w;
}