var levelObjects = [];

function InitLevel() {
    
    gameBall = new CircleObj(295, 75, 5, false);
    hole = new CircleObj(500, 75, 5.5, true);

    levelObjects.push(new SolidObj(500, 5, 500, 5));

    return levelObjects;
}