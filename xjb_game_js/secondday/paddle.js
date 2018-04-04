//img的属性
var Paddle = function () {
    var image = ImageFromPath('meizi.png')
    var o = {
        image: image,
        x: 100,
        y: 100,
        speed: 15,
    }
    o.moveLeft = function () {
        o.x -= o.speed
        if (o.x < 0) {
            o.x = 0
        }
    }
    o.moveRight = function () {
        o.x += o.speed
        if (o.x > 800 - o.image.width) {
            o.x = 800 - o.image.width
        }
    }
    o.moveTop = function () {
        o.y -= o.speed
        if (o.y < 0) {
            o.y = 0
        }
    }
    o.moveDown = function () {
        o.y += o.speed
        if (o.y > 800 - o.image.height) {
            o.y = 800 - o.image.height
        }
    }
    o.collide = function (ball) {
        if (ball.y + ball.image.height > o.y) {
            if (ball.x > o.x && ball.x < o.x + o.image.width) {
                console.log('相撞')
                return true
            }
        }
        return false
    }

    return o
}