// No.1 Sum All Numbers in a Range
/**
 * 
 * @param arr 
 * 包含两个数字的数组 返回这两个数字之间所有数字的合
 */

// function sumAll(arr){
//     var newarr = []
//     var max = Math.max(...arr)
//     var min = Math.min(...arr)
//     var sumValue = 0
//     var sumNum = function(mx,mn){
//         for(var i=0;i<(mx-mn+1);i++){
//             newarr.push(min + i)
//         }
//         var val = newarr.reduce(( acc, cur ) => acc + cur,0)
//         return val
//     }

//     sumValue = sumNum(max,min)
//     return sumValue
// }

// sumAll([1,4])

//No.2 比较两个数组返回一个新数组 
//第一种做法，也是最先想到的做法
// function diff(arr1, arr2) {
//     var newArr = [];
//     for (var i = 0; i < arr1.length; i++) {
//         var isHave = arr2.indexOf(arr1[i]);
//         if (isHave < 0) {
//             newArr.push(arr1[i]);
//         }
//     }

//     for (var j = 0; j < arr2.length; j++) {
//         var isHave2 = arr1.indexOf(arr2[j]);
//         if (isHave2 < 0) {
//             newArr.push(arr2[j]);
//         }
//     }
//     return newArr;
// }

//第二种 把两个数组合并，删除所有相同项 也可以实现
// 先实现 数组两个数组中不同元素
// function diff(arr1, arr2) {
//     var temp = arr1.concat(arr2)
//     var o = {}
//     var c = []
//     for(var i = 0;i<temp.length;i++){
//         if(o[temp[i]] in o){
//             o[temp[i]]++
//         }else{
//             o[temp[i]] = 1
//         }
//     } 
//     for(x in o){
//         if(o[x] == 1){
//             c.push(x)
//         }
//     }
//     if(arr1 == arr2){
//         return arr1
//     }
//     return c
//   }

// diff([1, 2, 3, 5], [1, 2, 3, 4, 5]);


//第三种 分别判断两个数组各自对应的值是否存在于另一个 最后concat
// function diff(arr1, arr2) {
//     var a1=arr1.filter(function(val){
//          return arr2.indexOf(val)< 0;
//     });
//     var a2=arr2.filter(function(val){
//         return arr1.indexOf(val)< 0;
//     });
//     return a1.concat(a2);
//  }
 
//  diff([1, 2, 3, 5], [1, 2, 3, 4, 5]);

//No.3 给定数字转换成罗马数字 这个办法真的太牛皮了 想到了就无敌
// function Convert(num){
//     var nums = [1000,900,500,400,100,90,50,40,10,9,5,4,1]
//     var romans = ["m","cm","d","cd","c","xc","l","xl","x","ix","v","iv","i"]

//     var str = ''
//     nums.forEach(function(item,index,array){
//         while(num>=item){
//             str += romans[index]
//             num-=item
//         }
//     })

//     return str.toUpperCase()
// }
// Convert(36)

//No.4 遍历对象数组返回一个相匹配的属性-值对的所有对象的数组
// function where(collection, source) {
//     var keys =  Object.keys(source);
//     return collection.filter(function(obj){
//         return keys.every(function(item){
//             return obj.hasOwnProperty(item) && obj[item] === source[item];
//         });
//     });
//   }
//   //法二
//   function where(collection, source) {
//     var keys =  Object.keys(source);
//     return collection.filter(function(obj){
//         return keys.every(function(item){
//             return obj.hasOwnProperty(item) && obj[item] === source[item];
//         });
//     });
//   }
  
//   where([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" });


// No.5 替换字符串中指定字符
//方法1
// function myReplace(str, before, after) {
//     if(before[0] === before[0].toUpperCase()){
//         after = after[0].toUpperCase() + after.slice(1);
//     }
//     str = str.replace(before,after);
//     return str;
// }
// 方法2
// function myReplace(str, before, after) {
//     var re = /^[A-Z]/;
//     if(re.test(before.charAt(0))){
//       after = after.charAt(0).toUpperCase() + after.slice(1);
//     }
//     str = str.replace(before,after);
//     return str;
// }
//方法3
// function myReplace(str, before, after) {
//     var arr = str.split(' ');
//     var num = arr.indexOf(before);
//     arr.splice(arr.indexOf(before),1);
//     arr.splice(num,0,after);
//     return arr.join(' ');
//   }
  
// myReplace("Let us go to the store", "store", "mall");

//No.6 把一个英文单词的第一个辅音或辅音丛（consonant cluster）移到词尾，然后加上后缀 "ay"。

// function translate(str) {
//     var mystr = '';
//     var regex = /[aeiou]/gi;
    
//     if(str[0].match(regex)){
//       myStr = str+'way';
//     }else{
//       console.log(str.match(regex));
//       var index = str.indexOf(str.match(regex)[0]);
//       myStr = str.substr(index) + str.substring(0,index) + 'ay';
//     }
    
//     return myStr;
//   }
  
//   translate("consonant");