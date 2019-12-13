var context;
var width;
var height;
const objs = [];
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

    FrameRenderLoop();
    objs[0].addXVel(0.1);
});

FrameRender = function(w, h) {
    context.clearRect(0, 0, w, h);

    for (var i = 0; i < objs.length; i++) {
        context.fillRect(
            objs[i].x,
            objs[i].y,
            objs[i].width,
            objs[i].height
        );

        objs[i].nextFrame();
    }
}

FrameRenderLoop = function() {
    requestAnimationFrame(FrameRenderLoop);
    FrameRender(width, height);
}

var PhysObj = function(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.height = h;
    this.width = w;

    this.xVel = 0.1;
    this.yVel = 0.1;

    this.addXVel = function(vel) {
        this.xVel += vel;
    }

    this.addYVel = function(vel) {
        this.yVel += vel;
    }

    this.nextFrame = function() {
        this.x += this.xVel;
        this.y += this.yVel;
    }
}

var SolidObj = function(x, y, h, w) {
    this.x = x;
    this.y = y;
    this.height = h;
    this.width = w;
}