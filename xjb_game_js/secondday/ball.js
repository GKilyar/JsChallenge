//画个球
var Ball = function () {
    var image = ImageFromPath('ball.png')
    var o = {
        image: image,
        x: 100,
        y: 200,
        speedX: 10,
        speedY: 10,
        fired: false,
    }
    o.move = function () {
        if (o.fired) {
            if (o.x < 0 || o.x > 800) {
                o.speedX *= -1
            }
            if (o.y < 0 || o.y > 800) {
                o.speedY *= -1
            }
            //move
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    o.fire = function () {
        o.fired = true;
    }

    o.反弹 = function () {
        o.speedY *= -1
    }
    return o
}