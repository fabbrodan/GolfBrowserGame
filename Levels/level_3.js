var levelObjects = [];
var backgrounds = [];
var movement;

function InitLevel() {
    
    gameBall = new CircleObj(425, 65, 5, false);
    hole = new CircleObj(525, 190, 5.5, true);

    levelObjects.push(new SolidObj(400, 25, 400, 5)); // Top corridow horizontal top
    levelObjects.push(new SolidObj(400, 25, 5, 75)); // top corridor vertical left
    levelObjects.push(new SolidObj(400, 100, 350, 5)); // top corridor horizontal bottom
    levelObjects.push(new SolidObj(750, 100, 5, 50)); // vertical corridor vertical left
    levelObjects.push(new SolidObj(800, 25, 5, 200)); // vertical corridor vertical right
    levelObjects.push(new SolidObj(505, 150, 250, 5)); //bottom corridor horizontal top
    levelObjects.push(new SolidObj(505, 225, 300, 5)); // bottom corridor horizontal bottom
    levelObjects.push(new SolidObj(505, 150, 5, 75)); // bottom corridor vertical left

    levelObjects.push(new SolidObj(525, 45, 5, 15)); // first obstacle
    levelObjects.push(new SolidObj(625, 75, 5, 15)); // second obstacle
    levelObjects.push(new SolidObj(725, 50, 5, 30)); // third obstacle
    levelObjects.push(new SolidObj(600, 200, 100, 5));
    levelObjects.push(new SolidObj(600, 175, 100, 5));

    backgrounds.push( {X: 405, Y: 30, W: 395, H: 70} );
    backgrounds.push( {X: 755, Y: 100, W: 45, H: 130} );
    backgrounds.push( {X: 510, Y: 155, W: 295, H: 70} );

    return levelObjects;
}