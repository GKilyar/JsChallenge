var Game = function (fps) {
    var g = {
        actions: {},
        keydowns: {},
    }
    var canvas = document.querySelector('#canvas')
    var context = canvas.getContext('2d')
    g.canvas = canvas
    g.context = context

    window.addEventListener('keydown', (e) => {
        g.keydowns[e.key] = true
    })
    window.addEventListener('keyup', (e) => {
        g.keydowns[e.key] = false
    })

    //注册函数
    g.register = function (key, callback) {
        g.actions[key] = callback;
    }

    //timer
    window.fps = 30
    var runloop = function() {
        
        // events
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if(g.keydowns[key]) {
                // 如果按键被按下, 调用注册的 action
                g.actions[key]()
            }
        }
        // update
        g.update()
        // clear
        context.clearRect(0, 0, canvas.width, canvas.height)
        // draw
        g.draw()
        // next run loop
        setTimeout(function(){
            runloop()
        }, 1000/window.fps)
    }

    setTimeout(function(){
        runloop()
    }, 1000/fps)

    return g
}