var levelObjects = [];

function InitLevel() {
    
    gameBall = new CircleObj(450, 75, 5, false);
    hole = new CircleObj(675, 300, 5.5, true);

    levelObjects.push(new SolidObj(400, 25, 100, 5)); // top left vertical
    levelObjects.push(new SolidObj(400, 25, 5, 350)); // top horizontal
    levelObjects.push(new SolidObj(400, 125, 5, 200)); // mid horizontal 
    levelObjects.push(new SolidObj(600, 125, 200, 5)) // left down short
    levelObjects.push(new SolidObj(750, 25, 300, 5)); // right down long
    levelObjects.push(new SolidObj(600, 325, 5, 155)); // bottom horizontal

    return levelObjects;
}