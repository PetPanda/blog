# JavaScript深入之参数按值传递

## 按值传递

````javascript
var value = 1
function foo(v) {
  v = 2
  console.log(v) // 2
}
foo(value)
console.log(value) // 1
````
解释： 当传递value到函数foo中，相当于拷贝了一份value,假设拷贝的值是_value ,并不会修改原来的值

## 引用传递

引用传递： 就是传递对象的引用，函数内部参数的任何改变都会影响该对象的值，因为两者引用的是同一对象

````javascript
var obj = {
  value: 1
}
function foo(o) {
  o.value = 2 
  console.log(o.value) // 2
}
foo(obj)
console.log(obj.value) // 2
````
疑问： 所有函数的参数都是按值传递的，这怎么能按“引用传递”成功呢？

## 按共享传递

````javascript
var obj = {
  value: 1
}
function foo(o) {
  o = 2
  console.log(o) // 2
}
foo(obj)
console.log(obj.value) // 1
````

共享传递： 在传递对象的时候，传递对象的引用副本

注意：按引用传递是传递对象的引用，而按共享传递是传递对象引用的副本


## 解析：
关键点： 
  运算符 `=` 就是创建或者是修改变量在内存中的指向
  初始化变量时为创建，重新赋值为修改（指向问题）

案例一与案例三相似

````javascript
var a = { b: 1} // a = {b:1} 
var c = a // c = {b:1}
a = 2 // 重新赋值a
console.log(c) // { b: 1}
````
然后一步步执行代码
1. 创建变量a指向`对象{b: 1}`
2. 创建变量c指向 `对象{b: 1}`
3. a 重新指向常量区的 2

所以c自始至终是指向对象`{b: 1}`

案例二分析

````javascript
var obj = {
  value: 1
}
// 创建变量obj 指向对象 {value: 1}
function foo(o) {
  // 创建对象 o 指向 {value: 1}
  o.value = 2 
  // 改变对象{value: 1 }的值
  console.log(o.value) //2
}
foo(obj)
// 对象obj指向的对象的值也改变了
console.log(obj.value) // 2
````
