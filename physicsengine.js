function BallHit(clickedX, releaseX, clickedY, releaseY) {

    let audio = new Audio("Assets/Sounds/ball_hit.wav");
    audio.volume = 0.5;
    audio.play();

    // find the higs and lows of X and Y positions of click
    var highX = Math.max(clickedX, releaseX);
    var highY = Math.max(clickedY, releaseY);
    var lowX = Math.min(clickedX, releaseX);
    var lowY = Math.min(clickedY, releaseY);

    // set the X and Y speeds with a limit of 15
    var Xspeed = ((highX - lowX) / 3) > 15 ? 15 : (highX - lowX) * 0.25;
    var Yspeed = ((highY - lowY) / 3) > 15 ? 15 : (highY - lowY) * 0.25;

    // switches for determining if the speed in both X and Y axis should be negative or positive
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

    // increase the number of strokes for current level
    lvlStrokes++;
}

ColliderCheck = function(ball, obj) {
    
    // define collision points for the ball
    var ballXRight = Math.round(ball.x) + ball.rad;
    var ballXLeft = Math.round(ball.x) - ball.rad;
    var ballYBottom = Math.round(ball.y) + ball.rad;
    var ballYTop = Math.round(ball.y) - ball.rad;

    // check for collision
    if (ballXRight > obj.x && ballXLeft < obj.x + obj.width && ballYBottom > obj.y && ballYTop < obj.y + obj.height) {

        if (ball.xVel != 0 && ball.yVel != 0) {
            let audio = new Audio("Assets/Sounds/hit_wall.wav");
            audio.play();
        }

        var side;

        // determine in which angular quadrant the ball is colliding with the wall
        var deg = Math.atan2(ball.xVel, ball.yVel) * 180 / Math.PI;

        // determine which side of the wall the ball is colliding
        if (ballYTop < obj.y + obj.height && ballYBottom > obj.y && (deg > -90 && deg < 90) && obj.width > 5) {
            side = "bottom";
        } else if (ballYTop < obj.y + obj.height && ballYBottom > obj.y && (deg < -90 || deg > 90) && obj.width > 5) {
            side ="top";
        } else if (ballXLeft < obj.x + obj.width && ballXRight > obj.x && (deg < 0) && obj.height > 5) {
            side ="left";
        } else if (ballXRight > obj.x && ballXLeft < obj.x && (deg > 0) && obj.height > 5) {
            side ="right";
        }

        // set the new velocities depending on angle and side
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

        // make sure that a moving level object pushes the ball once the ball is stationary
        if (obj instanceof(PhysObj) && (Math.round(ball.xVel) == 0) && (Math.round(ball.yVel == 0)))  {
            ball.x += obj.xVel;
            ball.y += obj.yVel;
        }
    }
}

var CircleObj = function(x, y, r) {
    this.x = x,
    this.y = y;

    //radius of circle
    this.rad = r;

    // start and end angles, should always be kept as is to form a full circle
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
    
    // X position of object
    this.x = x;
    
    // Y position of object
    this.y = y;

    // height of object
    this.height = h;

    // width of object
    this.width = w;

    // initial velocities - cannot be null or they will not be rendered!
    this.xVel = 0;
    this.yVel = 0;

    // movement pattern object initialization - cannot be null or the draw methods will throw errors
    this.movementPattern = {ticks: 0, Xspeed: 0, Yspeed: 0};
    // variable to keep track of movement pattern status
    this.currentTick = 0;

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

        // check which tick in movement pattern we are in
        if (this.currentTick < this.movementPattern.ticks / 2) {
            // if we are in first half, set the objects movement speed accordingly
                this.xVel = this.movementPattern.Xspeed;
                this.yVel = this.movementPattern.Yspeed;
            }
        else {
            // if we are in second half reverse the movement speed
                this.xVel = -this.movementPattern.Xspeed;
                this.yVel = -this.movementPattern.Yspeed;
            }

        // move object
        this.x += this.xVel;
        this.y += this.yVel;

        // check current game tick of movement pattern and update
        if (this.currentTick < this.movementPattern.ticks) {
            this.currentTick++;
        } else {
            this.currentTick = 0;
        }
    }
}

var SolidObj = function(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
}