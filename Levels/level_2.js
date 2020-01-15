var levelObjects = [];
var backgrounds = [];
var movement;

function InitLevel() {
    
    gameBall = new CircleObj(450, 75, 5, false);
    hole = new CircleObj(675, 300, 5.5, true);

    levelObjects.push(new SolidObj(400, 25, 5, 100)); // top left vertical
    levelObjects.push(new SolidObj(400, 25, 350, 5)); // top horizontal
    levelObjects.push(new SolidObj(400, 125, 250, 5)); // mid horizontal
    levelObjects.push(new SolidObj(600, 125, 5, 200)) // left down short
    levelObjects.push(new SolidObj(750, 25, 5, 300)); // right down long
    levelObjects.push(new SolidObj(600, 325, 155, 5)); // bottom horizontal
    levelObjects.push(new SolidObj(685, 225, 65, 5)); // second obstacle wall

    backgrounds.push( { X: 405, Y: 30, W: 345, H: 95 });
    backgrounds.push( { X: 600, Y: 95, W: 155, H: 235});

    return levelObjects;
}