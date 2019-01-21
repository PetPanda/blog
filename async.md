# async 与 promise

## 对于async的理解

带有`async`关键字的函数，它使得你的函数的返回值必定是Promise对象

````javascript
async funciton fn1() {
  return 123
}
function fn2 () {
  return 123
}
console.log(fn1) // Promise {<resolved>: 123}
console.log(fn2) // 123
````

`await` 等的是右侧的表达式结果 ，如果右侧是函数，那么函数return的值就是表达式结果； 如果右侧是一个Hello或者什么值，那表达式结果就是Hello

## async起什么作用

async函数返回的是一个Promise对象，如果async函数有返回值，async会把这个直接量通过`Promise.resolve()`链来处理这个Promise对象；
如果async函数没有返回值，他会直接返回`Promise.resolve(undefined)` 它会立即执行，并不会阻塞下面的代码


## await在等啥 

await等待的是右侧的表达式的结果

一般来说，await是在等待一个async函数完成，不过按语法说明，await等待的是一个表达式，这个表达式的计算结果是promise 对象或者其他值

因为async函数返回一个promise对象， 所以await可以用于等待一个async函数的返回值，这也可以说await在等async函数，但要清楚，他实际是一个返回值

## await等到了要等的结果， 然后呢

await 是个运算符，用于组成表达式

如果它等到的不是一个Promise对象，那await表达式的运算结果就是它等到的东西

如果它等到的是一个Promise对象，await就忙起来了，他会阻塞后面的代码，等着Promise对象resolve，然后得到resolve的值，作为await表达式的结果

## async/await干了些啥

### 作简单比较

### async/await的优势在于处理then链



