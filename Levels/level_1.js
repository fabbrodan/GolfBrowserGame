var levelObjects = [];
var backgrounds = [];
function InitLevel() {
    
    gameBall = new CircleObj(445, 100, 5, false);
    hole = new CircleObj(650, 100, 6, true);

    levelObjects.push(new SolidObj(400, 25, 5, 150)); // left vertical
    levelObjects.push(new SolidObj(400, 25, 300, 5)); // top horizontal
    levelObjects.push(new SolidObj(400, 175, 300, 5)); //bottom horizontal
    levelObjects.push(new SolidObj(700, 25, 5, 155)) // right vertical
    levelObjects.push(new SolidObj(550, 75, 5, 50)) // middle obstacle

    backgrounds.push( {X: 405, Y: 30, W: 295, H: 145} );

    return levelObjects;
}

