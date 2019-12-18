var context;
var width;
var height;
var start;
var gameBall;
const levelObjs = [];

var elapsed
var fpsInterval;
var then;
var startTime;

var collision = false;

$("document").ready(function() {

    width = window.innerWidth || window.document.documentElement.clientWidth || window.document.documentElement.getElementsByTagName('body')[0].clientWidth;
    height = window.innerHeight || window.document.documentElement.clientHeight || window.document.documentElement.getElementsByTagName('body')[0].clientHeight;

    var canvas = document.createElement("canvas");
    canvas.id = "mainCanvas";
    canvas.height = height;
    canvas.width = width;

    $("body").append(canvas);

    context = canvas.getContext("2d");

    gameBall = new CircleObj(50, 75, 15);

    levelObjs.push(new SolidObj(5, 5, 5, 300));
    levelObjs.push(new SolidObj(5, 5, 150, 5));
    levelObjs.push(new SolidObj(5, 155, 5, 300));
    levelObjs.push(new SolidObj(305, 5, 155, 5));
    levelObjs.push(new SolidObj(150, 50, 50, 5));
    levelObjs.push(new SolidObj(15, 74, 5, 16));

    FrameRenderLoop(60);
});

FrameRender = function() {

    requestAnimationFrame(FrameRender);

    now = Date.now();
    elapsed = now - then

    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);


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
    context.fill();
    
        for (var i = 0; i < levelObjs.length; i++) {
            context.fillRect(
                levelObjs[i].x,
                levelObjs[i].y,
                levelObjs[i].width,
                levelObjs[i].height
            );
        }
    } 
}

FrameRenderLoop = function(frameRate) {

    fpsInterval = 1000 / frameRate;
    then = Date.now();
    startTime = then;
    
    FrameRender();
}

ColliderCheck = function(ball, wall) {
    
    var ballXRight = Math.round(ball.x) + ball.rad;
    var ballXLeft = Math.round(ball.x) - ball.rad;
    var ballYBottom = Math.round(ball.y) + ball.rad;
    var ballYTop = Math.round(ball.y) - ball.rad;

    if (ballXRight > wall.x && ballXLeft < wall.x + wall.width && ballYBottom > wall.y && ballYTop < wall.y + wall.height) {
        collision = true;

        var side;

        var deg = Math.atan2(ball.xVel, ball.yVel) * 180 / Math.PI;

        if (ballYTop < wall.y + wall.height && ballYBottom > wall.y && (deg > -90 && deg < 90) && wall.width > 5) {
            side = "bottom";
        } else if (ballYTop < wall.y + wall.height && ballYBottom > wall.y && (deg < -90 || deg > 90) && wall.width > 5) {
            side ="top";
        } else if (ballXLeft < wall.x + wall.width && ballXRight > wall.x && (deg < 0) && wall.height > 5) {
            side ="left";
        } else if (ballXRight > wall.x && ballXLeft < wall.x && (deg > 0) && wall.height > 5) {
            side ="right";
        }

        console.log("Deg: " + deg + "Side: " + side);
        if (deg === 0 || deg === 180) {
            ball.yVel = -ball.yVel;
        } else if (deg === -90 || deg === 90) {
            ball.xVel = -ball.xVel;
        } else if ((deg > 0 && deg < 90) && side === "right") {
            ball.xVel = -ball.xVel;
        } else if ((deg > 0 && deg < 90) && side === "bottom") {
            ball.yVel = -ball.yVel;
        } else if ((deg > 90 && deg < 180) && side === "right") {
            ball.xVel = -ball.xVel;
        } else if ((deg > 90 && deg < 180) && side === "top") {
            ball.yVel = -ball.yVel;
        } else if ((deg < 0 && deg > -90) && side === "bottom") {
            ball.yVel = -ball.yVel;
        } else if ((deg < 0 && deg > -90) && side == "left") {
            ball.xVel = -ball.xVel;
        } else if ((deg < -90) && side === "top") {
            ball.yVel = -ball.yVel;
        } else if ((deg < -90) && side === "left") {
            ball.xVel = -ball.xVel;
        }
    }

}

var CircleObj = function(x, y, r) {
    this.x = x,
    this.y = y;
    this.rad = r;
    this.sAngle = 0;
    this.eAngle = 360

    this.xVel = 0;
    this.yVel = 0;

    this.addXVel = function(vel) {
        this.xVel += vel;
    }

    this.addYVel = function(vel) {
        this.yVel += vel;
    }

    this.addXYVel = function(xVel, yVel) {
        this.xVel += xVel;
        this.yVel += yVel;
    }

    this.nextFrame = function() {
        this.x += this.xVel;
        this.y += this.yVel;

        if (!collision) {
            for (var i = 0; i < levelObjs.length; i++) {
                ColliderCheck(this, levelObjs[i]);
            }
        }

        if (this.xVel > 0.05 || this.xVel < -0.05) {
            this.xVel = (this.xVel * 0.97);
        }
        else {
            this.xVel = 0;
            collision = false;
        }

        if (this.yVel > 0.05 || this.yVel < -0.05) {
            this.yVel = (this.yVel * 0.97);
        }
        else {
            this.yVel = 0;
            collision = false;
        }
    }
}

var PhysObj = function(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.height = h;
    this.width = w;

    this.xVel = 0;
    this.yVel = 0;

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

        if (!collision) {
            for (var i = 0; i < levelObjs.length; i++) {
                ColliderCheck(this, levelObjs[i]);
            }
        }

        if (this.xVel > 0.1 || this.xVel < -0.1) {
            this.xVel = (this.xVel * 0.9);
        }
        else {
            this.xVel = 0;
            collision = false;
        }

        if (this.yVel > 0.1 || this.yVel < -0.1) {
            this.yVel = (this.yVel * 0.9);
        }
        else {
            this.yVel = 0;
            collision = false;
        }
    }
}

var SolidObj = function(x, y, h, w) {
    this.x = x;
    this.y = y;
    this.height = h;
    this.width = w;
}