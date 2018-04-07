//画个砖
var Block = function (position) {
    var p = position
    var image = ImageFromPath('zhuan.png')
    var o = {
        image: image,
        x: p[0],
        y: p[1],
        w: 50,
        h: 20,
        alive: true,
        lifes: p[2] || 1,
    }
    o.kill = function () {
        o.lifes--
            if (o.lifes < 1) {
                o.alive = false
            }
    }
    o.collide = function (b) {
        // return rectIntersects(o,b) || rectIntersects(b,o)   
        //改正block碰撞消失后原位置还有碰撞bug
        return o.alive && (rectIntersects(o, b) || rectIntersects(b, o))
    }
    return o
}