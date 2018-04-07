### Spend 11hours in day to finished this class
**learn from the class [前端常用的库和实用技术](https://www.bilibili.com/video/av19955995)**

####模块化
> Nodejs 打成包 require使用 类似用seajs requireks commonjs

Amd requirejs规范化产出
* 异步加载，依赖前置，提前执行
* Define(['require','foo'],function(){return})

Cmd seajs规范化产出
* Define(function(require,exports,module){})
* require(./a_module)直接引入。Require.async异步引入。
* 同步加载，依赖就近，延迟执行
`Seajs代码实现原理`

####面向切面编程
> 对概念有点模糊，多看几遍就好了，刚开始确实不适应。


``` javascript
//统计所有函数谁的耗时最长，做性能优化

function test(){
    // var start =;
    // console.log('1')
    // var end =;
    // console.log(end -start)
    console.log('1')
    return 'test me'
}
Function.prototype.before = function(fn){
    //获得当前test函数
    var __self = this;
    fn();
    return __self.apply(this,arguments)
}
Function.prototype.after = function(fn){
    var __self = this;
    __self.apply(this,arguments)
    fn()
}
//默认执行两遍    test作为中转 
//before 回调和before一起送到after去
//after 把after和test一起送到before去
test.before(function(){
    console.log('0');
})

test.after(function(){
    console.log('2')
})
```
![在test前后执行，test执行了两遍](./1523082162850.png)


####高级函数
* 惰性载入函数
* 函数柯里化
* 级联函数


惰性函数
```javascript
//对象被创建了无数次 没有处理好 可能会造成内存泄漏
function creatXHR() {
    var xhr = null
    try {
        xhr = new XMLHttpRequest()
    } catch (e) {
        try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP")
        } catch (e) {
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP")
            } catch (e) {
                xhr = null
            }
        }
    }

    return xhr
}
//惰性函数
function creatXHR() {
    var xhr = null
    if (typeof XMLHttpRequest != 'undefined') {
        xhr = new XMLHttpRequest()
        creatXHR = function () {
            return new XMLHttpRequest()
        }
    } else {
        try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP")
            creatXHR = function () {
                return new ActiveXObject("Msxml2.XMLHTTP")
            }
        } catch (e) {
            try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP")
                creatXHR = function () {
                    return new ActiveXObject("Msxml2.XMLHTTP")
                }
            } catch (e) {
                creatXHR = function () {
                    return null
                }
            }
        }
    }
    return xhr
}
```

函数柯里化
