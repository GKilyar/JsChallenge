### this
保证当前代码上下文正确性，指向当前代码运行时的对象
var person1 = {
  name : 'Chris',
  greeting: function() {
    alert('Hi! I\'m ' + this.name + '.');
  }
}

var person2 = {
  name : 'Brian',
  greeting: function() {
    alert('Hi! I\'m ' + this.name + '.');
  }
}

> 一直在使用对象
string.split()
实际上字符串实例中有常见的方法和属性 直接可以调用

document.queryselector()
实际上页面加载完毕后 会有一个document实例 代表证页面结构

### 构建函数和对象实例
js在对象间的使用和其他语言共享机制不同
普通函数
function createNewPerson(name){
    var obj = {}
    obj.name = name
    obj.greeting = function(){
        alert(this.name)
    }

    return obj
}

var salva = createNewPerson('salva');
salva.name;
salva.greeting();

等同于
构造函数
function Person(name){
    this.name = name
    this.greeting = function(){
        alert(this.name)
    }
}

### 几种创建实例的方法
一个是声明一个对象
var p = {}
另一个是构造函数创建
var p = new Person()
还有一种不常见de
var p1 = new Object()
p1.name = 'asdf'
p1.['age'] = 30
p1.greeting = function(){}

还有一种create()
var p2 = Object.create(p1)
p2.name
p2.greeting()

### 对象原型 hjs基于原型的语言 对象以其原型为模板、从原型继承方法和属性
https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Object_prototypes 这是原型链东西

#### 继承
要让teacher从Person的原型对象里继承方法
Teacher.prototype = Object.create(Person.prototype)
Teacher.prototype现在会继承Person.prototype的所有属性和方法
将Teacher.prototype.constructor 指向的是Person()
Teacher.prototype.constructor = Teacher;

