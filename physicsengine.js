function BallHit(clickedX, releaseX, clickedY, releaseY) {

    var highX = Math.max(clickedX, releaseX);
    var highY = Math.max(clickedY, releaseY);
    var lowX = Math.min(clickedX, releaseX);
    var lowY = Math.min(clickedY, releaseY);

    var Xspeed = ((highX - lowX) / 3) > 15 ? 15 : (highX - lowX) * 0.25;
    var Yspeed = ((highY - lowY) / 3) > 15 ? 15 : (highY - lowY) * 0.25;

    if (releaseX > clickedX) {
        gameBall.addXVel(-Xspeed);
    } else if (releaseX < clickedX) {
        gameBall.addXVel(Xspeed);
    }

    if (releaseY > clickedY) {
        gameBall.addYVel(-Yspeed);
    } else if (releaseY < clickedY) {
        gameBall.addYVel(Yspeed);
    }

    lvlStrokes++;
}

ColliderCheck = function(ball, obj) {
    
    var ballXRight = Math.round(ball.x) + ball.rad;
    var ballXLeft = Math.round(ball.x) - ball.rad;
    var ballYBottom = Math.round(ball.y) + ball.rad;
    var ballYTop = Math.round(ball.y) - ball.rad;

    if (ballXRight > obj.x && ballXLeft < obj.x + obj.width && ballYBottom > obj.y && ballYTop < obj.y + obj.height) {

        var side;

        var deg = Math.atan2(ball.xVel, ball.yVel) * 180 / Math.PI;

        if (ballYTop < obj.y + obj.height && ballYBottom > obj.y && (deg > -90 && deg < 90) && obj.width > 5) {
            side = "bottom";
        } else if (ballYTop < obj.y + obj.height && ballYBottom > obj.y && (deg < -90 || deg > 90) && obj.width > 5) {
            side ="top";
        } else if (ballXLeft < obj.x + obj.width && ballXRight > obj.x && (deg < 0) && obj.height > 5) {
            side ="left";
        } else if (ballXRight > obj.x && ballXLeft < obj.x && (deg > 0) && obj.height > 5) {
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

        for (var i = 0; i < level.length; i++) {
                ColliderCheck(this, level[i]);
            }
            WinCondition(this, hole);

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

        for (var i = 0; i < level.length; i++) {
                ColliderCheck(this, level[i]);
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

var SolidObj = function(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
}