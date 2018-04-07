  //加载img
  var ImageFromPath = function (path) {
    var img = new Image()
    img.src = path
    return img
}
 
var log = console.log.bind(console);



 
 //碰撞检测
 var rectIntersects = function (a, b) {
    var o = a;
    if (b.y > o.y && b.y < o.y + o.image.height) {
        if (b.x > o.x && b.x < o.x + o.image.width) {
            console.log('相撞')
            return true
        }
    }
    return false
}