/*
                1 最外层一定不能有变量
                2 函数为基本单位
                3 怎样才能把代码写的更好 函数结构 一步一步从基础开始 优化代码

        */
       var blocks = []

       var loadLevel = function (n) {
           n = n - 1
           var level = levels[n]
           var blocks = []
           for (var i = 0; i < level.length; i++) {
               var p = level[i]
               var b = Block(p)
               blocks.push(b)
           }
           return blocks
       }


       var enableDebugMode = function (enable) {
           if (!enable) {
               return
           }
           window.paused = false
           window.addEventListener('keydown', function (event) {
               var k = event.key
               if (k == 'p') {
                   // 暂停功能
                   window.paused = !window.paused
               } else if ('1234567'.includes(k)) {
                   // 为了 debug 临时加的载入关卡功能
                   blocks = loadLevel(Number(k))
               }
           })
           // 控制速度
           document.querySelector('#id-input-speed').addEventListener('input', function (event) {
               var input = event.target
               // log(event, input.value)
               window.fps = Number(input.value)
           })
       }
          
       //定义入口
       var __enter = function () {
           enableDebugMode(true)

           var game = Game(30)
           var paddle = Paddle()
           var ball = Ball()
           var paused = false

           var score = 0;

           blocks = loadLevel(1)

           //game里的register函数对应的key 执行应得事件的注册函数
           game.register('a', () => {
               paddle.moveLeft()
           })
           game.register('d', () => {
               paddle.moveRight()
           })
           game.register('w', () => {
               paddle.moveTop()
           })
           game.register('s', () => {
               paddle.moveDown()
           })
           game.register('f', () => {
               ball.fire()
           })
       
           //update
           game.update = function () {

               if (paused) {
                   return
               }
               ball.move()
               //判断板子碰撞 
               if (paddle.collide(ball)) {
                   ball.反弹()
               }
               //判断ball 和 砖块 block相撞

               for (var i = 0; i < blocks.length; i++) {
                   var block = blocks[i];
                   if (block.collide(ball)) {
                       log('block 相撞')
                       block.kill()
                       ball.反弹()
                       //更新分数
                       score+=100
                   }
               }




           }
           // game.draw() 
           game.draw = function () {
               game.context.drawImage(paddle.image, paddle.x, paddle.y)
               game.context.drawImage(ball.image, ball.x, ball.y)


               for (let i = 0; i < blocks.length; i++) {
                   var block = blocks[i];
                   //判断砖块是否被打掉
                   if (block.alive) {
                       game.context.drawImage(block.image, block.x, block.y)
                   }
               }

               //draw 分数
               game.context.fillText('point'+score,20 ,780)

           }
       }

       __enter()