# Generator语法糖

执行一个 Generator 函数会返回一个迭代器对象，可以依次遍历Generator 函数内部的每一个状态

## Generator 基本语法
. 函数名前加一个*
. 函数内部用yield关键字返回值

```javascript
function * count() {
  yield 1
  yield 2
  return 3
}
var c = count()
console.log(c.next()) // { value: 1, done: false }
console.log(c.next()) // { value: 2, done: false }
console.log(c.next()) // { value: 3, done: true }
console.log(c.next()) // { value: undefined, done: true }
```
由于Generator 也存在 Symbol.iterator接口，所以它也可以被for循环利用

```javascript
function * count () {
  yield 1
  yield 2
  return 3
}
var c = count()
for(i of c) console.log(i) // 1, 2
```
这里要注意一点，调用next的时候能得到 3 ，但是用for则会忽略最后的 return 语句。也就是说 for循环会忽略  Generator中的 return 语句



## Generator 与 iterator 

任意一个对象的Symbol.iterator 方法，等于该对象的遍历器生成函数，调用该函数会返回该对象的一个遍历对象，由于 Generator函数就是遍历器生成函数， 因此可以把 Generator 赋值给对象的Symbol.iterator属性，从而使该对象具有iterator接口
```javascript
var myIterator = {}
myIterator[Symbol.iterator] = function * () {
  yield 1
  yield 2
  yield 3
}
[...myIterator] // [1, 2, 3]
```