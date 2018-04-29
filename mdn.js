function Person(first, last, age, gender, interests) {
    this.name = {
        first,
        last
    }
    this.age = age
    this.gender = gender
    this.interests = interests
    // this.bio = function(){
    //     alert(this.name.first + ' ' + this.name.last + ' is ' + this.age + ' years old. He likes ' + this.interests[0] + ' and ' + this.interests[1] + '.')
    // }
    // this.greeting = function (){
    //     alert('Hi! I\'m ' + this.name.first + '.')
    // }
}

var person1 = new Person('Bob', 'Smith', 32, 'male', ['music', 'skiing']);

person1['age']
person1.interests[1]
person1.bio()




function P2(first, last, age, gender, interests) {
    this.name = {
        first,
        last
    };
    this.age = age;
    this.gender = gender;
    this.interests = interests;
}

P2.prototype.greeting = function() {
    alert('Hi! I\'m ' + this.name.first + '.');
};

/**
 * 
 * @param {*} first 
 * @param {*} last 
 * @param {*} age 
 * @param {*} gender 
 * @param {*} interests 
 * @param {*} subject 
 * call 是允许调用别处定义的函数，并且制定this的值 就是对应的运行上下文
 */

function Teacher(first, last, age, gender, interests, subject) {
    P2.call(this, first, last, age, gender, interests);
    this.subject = subject;
  }

// 要让teacher从Person的原型对象里继承方法
// Teacher.prototype = Object.create(Person.prototype)
// Teacher.prototype现在会继承Person.prototype的所有属性和方法
//将Teacher.prototype.constructor 指向的是Person()
// Teacher.prototype.constructor = Teacher;