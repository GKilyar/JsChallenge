function test(){
    // var start =;
    // console.log('1')
    // var end =;
    // console.log(end -start)
    console.log('1')
    return 'test me'
}

//统计所有函数谁的耗时最长，做性能优化


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