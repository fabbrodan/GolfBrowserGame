var levelObjects = [];
var backgrounds = [];

function InitLevel() {
    
    gameBall = new CircleObj(450, 75, 5, false);
    hole = new CircleObj(950, 75, 5.5, true);

    // solid level objects
    levelObjects.push(new SolidObj(400, 25, 5, 100)); // left vertical
    levelObjects.push(new SolidObj(1000, 25, 5, 100)) // right vertical
    levelObjects.push(new SolidObj(400, 25, 600, 5)) // top horizontal
    levelObjects.push(new SolidObj(400, 125, 605, 5)) // bottom horizontal

    // moving level objects
    levelObjects.push(new PhysObj(500, 60, 50, 5)); // first
    levelObjects.push(new PhysObj(800, 80, 50, 5)); // fourth
    levelObjects.push(new PhysObj(700, 60, 50, 5)); // third
    levelObjects.push(new PhysObj(600, 80, 50, 5)) // second

    // setting up movement patterns for moving level objects
    levelObjects[4].movementPattern.ticks = 140;
    levelObjects[4].movementPattern.Xspeed = 0;
    levelObjects[4].movementPattern.Yspeed = 0.6;

    levelObjects[5].movementPattern.ticks = 140;
    levelObjects[5].movementPattern.Xspeed = 0;
    levelObjects[5].movementPattern.Yspeed = -0.6;

    levelObjects[6].movementPattern.ticks = 140;
    levelObjects[6].movementPattern.Xspeed = 0;
    levelObjects[6].movementPattern.Yspeed = 0.6;

    levelObjects[7].movementPattern.ticks = 140;
    levelObjects[7].movementPattern.Xspeed = 0;
    levelObjects[7].movementPattern.Yspeed = -0.6;

    backgrounds.push( { X: 405, Y: 30, W: 595, H: 95 } );

    return levelObjects;
}