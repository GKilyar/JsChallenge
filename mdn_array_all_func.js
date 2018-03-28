
var fruits = [
  'Apple',
  'Banana'
];
//1
fruits.forEach((item,index,array) => {
  console.log(item,index,array)
})
//2
fruits.push('orange')
console.log(fruits)
//3 返回删除项
var delfruits = fruits.pop() //shift()删除第一 unshift()添加第一
console.log(delfruits)

//4 索引 
const index = fruits.indexOf('Apple')
console.log(index)

//5 通过索引删除元素,返回删除项 并原数组被更改
var vegetables = ['Cabbage', 'Turnip', 'Radish', 'Carrot'];
var position = 1,number = 2;
var removedItems = vegetables.splice(position, number);
console.log(vegetables);  //["Cabbage", "Carrot"]
console.log(removedItems); //["Turnip", "Radish"]

//6 复制数组
var copy_fruits = fruits.slice();



// func.apply(this,[arguments]) 用于调用函数，其具有一个指定的this指和一个参数数组
// call()和apply()的区别 就是 call 接受若干参数的列表 apply接受包含多个参数的数组



/*   ---------------------     */ 
// 1. Array.from()

console.log(Array.from('abcde')) //["a", "b", "c", "d", "e"]
function f() {
  return Array.from(arguments);
}
f(1, 2, 3); // [1, 2, 3]
Array.from([1, 2, 3], x => x + x); // 2 4 6

//数组去重合并
function combine(){
  let arr =[].concat.apply([],arguments) //没有去重复的新数组
  console.log(arr)
  return Array.from(new Set(arr));
}
var m = [1,2,3],n=[2,3,4];

console.log(combine(m,n))


/*   ---------------------     */ 
// 2. Array.isArray() 返回boolean
Array.isArray([1,2,3,4]) //true
Array.isArray(new Array());//true
Array.isArray(Array.prototype);//true
// 判断数组优于 instanceof
if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

//这里
Array.isThatFuckingArray = function(arg) {
  return Object.prototype.toString.call(arg) === '[object Array]';
};
Array.isThatFuckingArray([1,2,3,4]) //true

// 3. Array.concat() 拼接数组 返回一个新数组
// var c = a.concat([b])

//every() 方法测试数组的所有元素是否都通过了指定函数的测试。

//filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。 
var filtered = [12, 5, 8, 130, 44].filter(item => item <=10);
console.log(filtered)

//find() 返回数组中满足提供的测试函数的第一个元素的值 也就是返回一个
var objArr = [{id:1, name:'jiankian'}, {id:23, name:'anan'}, {id:188, name:'superme'}, {id:233, name:'jobs'}, {id:288, name:'bill', age:89}, {id:333}] ;
var arr2 = objArr.find(item => item.id===233);
console.log(arr2); //{id: 233, name: "jobs"}
/*   ---------------------     */ 


// forEach() 对数组的每个元素执行一次提供的函数

function Counter(){
  this.num = 0;
  this.count = 0;
}

Counter.prototype.add = function(arr){
  arr.forEach(function(entry) {
    this.sum += entry;
    ++this.count;
}, this);

  console.log(this);

}

var obj = new Counter();
obj.add([1,2,3,4,5]);

console.log(obj.count);

console.log(obj.sum)


// 对象复制的函数
/*
  Object.getOwnPropertyNames
  Object.create
  Object.defineProperty
  Object.getOwnPropertyDescriptor
*/ 
function copy(obj){
  var copy = Object.create(Object.getPrototypeOf(obj));
  var propNames =Object.getOwnPropertyNames(obj);

  propNames.forEach(function(name){
    var desc = Object.getOwnPropertyDescriptor(obj,name);
    Object.defineProperty(copy,name,desc);
  });
  return copy;
}

var obj1 = {a:1,b:2};
var obj2 = copy(obj1)
console.log(obj2) //社会社会 这个方法让我学到很多东西
/*   ---------------------     */ 

// includes() 用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。
let a = [1,2,3,4]
console.log(a.includes(2))

/*   ---------------------     */ 



//indexOf()方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。 
var arr = ['a','b','a','d','a'];
var indics = [];
var idx = arr.indexOf('a');
while(idx != -1){
    indics.push(idx);
    idx = arr.indexOf('a',idx+1);
}
console.log(indics);
/*   ---------------------     */ 

//map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果 操作数组种的每一项
let number = [1,12,234,5464];
console.log(number.map(x=>x/20))

// 这是个用法
var elems = document.querySelectorAll('li');
var values = Array.prototype.map.call(elems, function(obj) {
  return obj.value;
});

//反转字符串
var str = '12345';
Array.prototype.map.call(str,function(x){
  return x;
}).reverse().join('');

/*   ---------------------     */ 


//reduce() 方法对累加器和数组中的每个元素（从左到右）应用一个函数，将其减少为单个值。
var sum = ['a','b','c'].reduce((a,b) => a+b)
console.log(sum);

//二维数组转化为一维
var flattened = [[0, 1], [2, 3], [4, 5]].reduce((a,b)=> 
  a.concat(b),
  []
);
console.log(flattened)

//计算数组中每个元素出现的次数
var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];

var countedNames = names.reduce(function (allNames, name) { 
  console.log(allNames,name)
  if (name in allNames) {
    allNames[name]++;
  }
  else {
    allNames[name] = 1;
  }
  return allNames;
}, {});
console.log(countedNames);

// 使用扩展运算符和initialValue绑定包含在对象数组中的数组
var friends = [{
  name: 'Anna',
  books: ['Bible', 'Harry Potter'],
  age: 21
}, {
  name: 'Bob',
  books: ['War and peace', 'Romeo and Juliet'],
  age: 26
}, {
  name: 'Alice',
  books: ['The Lord of the Rings', 'The Shining'],
  age: 18
}];

var allbooks = friends.reduce(function(pre,cur){
    return [...pre, ...cur.books];
},[]);
console.log(allbooks); //["Bible", "Harry Potter", "War and peace", "Romeo and Juliet", "The Lord of the Rings", "The Shining"]
 
//数组去重


