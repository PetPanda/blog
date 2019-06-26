# bind模拟实现

`bind` 方法会创建一个新的函数。当这个函数被调用时，bind()第一个参数将它作为运行时的`this`，之后的一系列参数会在传递的实参前传入作为它的参数。

bind特点:
1. 返回一个函数
2. 可以传入参数

## 返回函数的模拟实现

````javascript
Funciton.prototype.bind2 = function (context) {
  var self = this
  return funciton () {
    return self.apply(context)
  }
}
````

## 传入参数的模拟实现

````javascript
Funciton.prototype.bind2 = function (context) {
  var self = this
  // 获取bind2函数从第二个参数到最后一个参数
  var args = Array.prototype.slice(arguments, 1)
  return function () {
    // 这个时候arguments是指bind返回函数传递的参数
    var bindArgs = Array.prototype.slice(arguments)
    return self.apply(context, args.concat(bindArgs))
  }
}
````

## 构造函数的模拟实现

bind的一个特点:
> 一个绑定函数也能使用new操作创建对象，：这种行为就像是把原函数当成构造器。提供的this值被忽略，同事调用的参数被提供给模拟函数。

也就是说当bind返回的函数作为构造函数时，bind时指定的this 值会失效，但传入的参数依然会生效。
栗子：

````javascript
var value = 2;
var foo = {
  value: 1
}
function bar(name, age) {
  this.habit = 'shopping'
  console.log(this.value)
  console.log(name)
  console.log(age)
}

bar.prototype.friend = 'Kevin'

var bindFoo = bar.bind(foo, 'daisy')

var obj = new bindFoo('18')
// undefined 
// daisy
// 18
console.log(obj.habit)
console.log(obj.friend)
// shopping
// kevin
````
注意：尽管在全局和 foo 中都声明了 value 值，最后依然返回了 undefind，说明绑定的 this 失效了，如果大家了解 new 的模拟实现，就会知道这个时候的 this 已经指向了 obj。

所以我们通过修改返回函数的原型来实现

````javascript
Fucntion.prototype.bind2 = function (context) {
  var self = this
  var args = Array.prototype.slice(arguments, 1)

  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments)
    // 当作为构造函数时，this 指向实例，此时结果为true 将绑定函数的this 指向该实例，可以让实例获得来自绑定函数的值
    // 以上面的demo为例，如果改成`this instanceof fBound ? null : context` 实例只是一个空对象，如果将Null改成 this 实例会具有Habit属性
    // 当作为普通函数时， this 指向window 此时结果为false 将绑定函数的this指向context
    return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs))
  }
  // 修改返回函数的Prototype属性， 为绑定函数的prototype 实例就可以继承绑定函数的原型中的值
  fBound.prototype = this.prototype
  return fBound;
}
````

## 构造函数效果优化实现

在上面写法中，我们直接将fBound.prototype = this.prototype ，我们直接修改fBound.prototype 的时候，也会直接修改绑定函数的prototype 。这时 我们可以通过一个空的函数来中转

````javascript
Function.prototype.bind2 = function (context) {
  // 判断是否是函数，否则报错
  if (typeof this !== 'function') {
    throw new Error('Function prototype bind , what is trying to be bound is not callable')
  }

  var self = this
  var args = Array.prototype.slice.call(arguments, 1)

  var fNon = function () {}

  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments)
    return self.bind(this instanceof fBound ? this : context, args.concat(bindArgs))
  }
  fNon.prototype = this.prototype
  fBound.prototype = new fNon()
  return fBound;
}
````

## 最后的小问题

````javascript
//1. 调用bind 的不是函数咋办
if (typeof this !== 'function') {
  throw new Error('Function prototype bind , what is trying to be bound is not callable')
}
````