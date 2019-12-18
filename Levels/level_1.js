var levelObjects = [];

function InitLevel() {
    
    gameBall = new CircleObj(295, 75, 5, false);
    hole = new CircleObj(500, 75, 5.5, true);

    levelObjects.push(new SolidObj(250, 5, 5, 300));
    levelObjects.push(new SolidObj(250, 5, 150, 5));
    levelObjects.push(new SolidObj(250, 155, 5, 300));
    levelObjects.push(new SolidObj(305+245, 5, 155, 5));
    levelObjects.push(new SolidObj(150+245, 50, 50, 5));
    levelObjects.push(new SolidObj(15+245, 74, 5, 16));

    return levelObjects;
}