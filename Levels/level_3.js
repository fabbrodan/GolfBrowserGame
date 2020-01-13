var levelObjects = [];
var backgrounds = [];

function InitLevel() {
    
    gameBall = new CircleObj(425, 65, 5, false);
    hole = new CircleObj(525, 190, 5.5, true);

    levelObjects.push(new SolidObj(400, 25, 400, 5));
    levelObjects.push(new SolidObj(400, 25, 5, 75));
    levelObjects.push(new SolidObj(400, 100, 350, 5));
    levelObjects.push(new SolidObj(750, 100, 5, 50));
    levelObjects.push(new SolidObj(800, 25, 5, 200));
    levelObjects.push(new SolidObj(505, 150, 250, 5));
    levelObjects.push(new SolidObj(505, 225, 300, 5));
    levelObjects.push(new SolidObj(505, 150, 5, 75));

    backgrounds.push( {X: 405, Y: 30, W: 395, H: 70} );
    backgrounds.push( {X: 755, Y: 100, W: 45, H: 130} );
    backgrounds.push( {X: 510, Y: 155, W: 295, H: 70} );

    return levelObjects;
}