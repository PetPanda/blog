# 手动实现Promise

Promise特点：
参数： resolve reject
state: pending fulfilled rejected
then方法
链式调用
catch 
promise.all

1. 实现resolve reject 以及then方法

````javascript
function Promise(executor) {
  let _this = this
  _this.status = 'pending'
  _this.value = undefined
  _this.reason = undefined
  function resolve (value) { // 内置一个resolve方法，接收成功状态
    if (_this.status === 'pending') {
      _this.status = resolved
      _this.value = value
    }
  }

  function reject (reason) {
    if (_this.status === 'pending') {
      _this.status = 'rejected'
      _this.value = reason
    }
  }
  executor(resolve, reject)
}

// then方法接收两个参数，分别是成功或者失败的回调，这里命名为onFulfilled和onRejedcted
Promise.prototye.then = function (onFulfilled, onRejected) {
  let _this = this
  if (_this.status === 'resolved') {
    onFulfilled(_this.value)
  }
  if (_this.status === 'rejected') {
    onRejected(_this.reason)
  }
}

module.exports = Promise
````

以上代码实现了`then` 和 `reject`，但是没有实现异步。原因是我们在then函数中支队成功状态和失败状态进行了判断，而实例被New时，执行器中的代码会立即执行。

2. 实现异步
````javascript
// 在实例上挂上两个参数
_this.onResolvedCallbacks = []
_this.onRejectedCallbacks = []

// then 防范加一个pending判断
if (_this.status === 'pending') {
  // 每一次then 时都是一个等待状态，就把回调函数Push到数组中，什么时候改变状态什么时候再执行
  _this.onResolvedCallbacks.push(function () {
    onFulfilled(_this.value)
  })
  _this.onRejectedCallbacks.push(function () {
    onRejected(_this.reason)
  })
}

// 下一步分别在resolve 和 reject函数中加入执行数组中存放的函数方法
function resolve (value) {
  if (_this.status === 'pending') {
    _this.status = 'resolved'
    _this.value = value
    _this.onResolvedCallbacks.forEach(function (fn) {
      fn()
    })
  }
}

function reject (reason) {
  if (_this.statu === 'pending') {
    _this.status = 'rejected'
    _this.reason = reason
    _this.onRejectedCallbacks.forEach(function (fn) {
      fn ()
    })
  }
}
````

上面的代码，虽然能用，但是在处理错误时并没有在promise中抛出错误，应该走reject

3. 处理错误

实现思路，在执行器中执行try catch
````javascript
try {
  executor(resolve, reject)
} catch(e) {
  reject(e)
}
````

4. 实现then的链式调用

实现原理`返回一个新的Promise`

在then方法中定义一个promise2，然后再三种状态下分别用Promise2包装一下，在调用onFulfilled时用一个变量x接收返回值，trycatch 一下代码

改动then
````javascript
let promise2;
if (_this.status === 'resolved') {
  promise2 = new Promise((resolve, reject) => {
    try {
      let x = onFulfilled(_this.value)
      resolve(x)
    } catch(e) {
      reject(e)
    }
  })
}
if (_this.status === 'rejected') {
  promise2 = new Promise((resolve, reject) => {
    try {
      let x = onRejected(_this.reason)
      resolve(x)
    } catch(e) {
      reject(e)
    }
  })
}
if (_this.status === 'pending') {
  promise2 = new Promise((resolve, reject) => {
    _this.onResolvedCallbacks.push(function () {
      // 可以凑合用 但是有很多问题
      try {
        let x = onResoleved(_this.value)
        resolve(x)
      } catch(e) {
        reject(e)
      }
    })
    _this.onFulfilledCallbacks.push(function () {
      // 可以凑合用 但是有很多问题
      try {
        let x = onFulfilled(_this.reason)
        resolve(x)
      } catch(e) {
        reject(e)
      }
    })
  })
}
return promise2
````
x 的作用：用来接收上一次then的返回值
问题：
  1. 前一次then 返回一个普通的值，字符串数组对象这些东西，都没问题，只需传给下一个then ，刚才的方法够用
  2. 前一次then返回的是一个promise是正常的操作，也是Promise提供的语法糖，我们只判断返回的啥
  3. 前一次then返回的是一个Promise，其中有异步操作，也是理所当然的，那我们就要等待他的状态改变，再进行下面的处理
  4. 前一次then返回的是自己本身这个Promise 
  ````javascript
  var p1 = p.then(funciton () {
    return p1
  })
  ````
  5. 前一次then返回的是一个别人自己随便写的Promise，这个Promise可能是个有then的普通对象，比如{then:'哈哈哈'}，也有可能在then里故意抛错（这种蛋疼的操作我们也要考虑进去）。比如他这样写
  6. 调resolve的时候再传一个Promise下去，我们还得处理这个Promise。
  7. 可能既调resolve又调reject，得忽略后一个
  8. 光then，里面啥也不写。

````javascript
Promise.prototype.then = function (onFulfilled, onRejected) {
  // 成功或失败，默认不传给一个函数，解决了问题8
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (value) {
    return value
  }
  onRejected = typeof onRejected === 'function' ? onRejected : function (reason) {
    return reason
  }
  let _this =  this
  let promise2
  if (_this.status === 'resolved') {
    promise2 = new Promise((resolve, reject) => {
      setTimeout(function () {
        try {
          let x = onFulfilled(_this.value)
          resolvePromise(promise2, x, resolve, reject)
        } catch(e) {
          reject(e)
        }
      })
    }) 
  }
  if (_this.status === 'rejected') {
    promise2 = new Promise((resolve, reject) => {
      setTimeout(function () {
        try {
          let x = onRjected(_this.reason)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    })
  }
  if (_this.status === 'pending') {
    promise2 = new Promise((resolve, reject) => {
      _this.onResolvedCallbacks.push(function () {
        setTimeout(function () {
          try {
            let x = onFulfilled(_this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch(e) {
            reject(e)
          }
        })
      })
      _this.onRejectedCallbacks.push(function () {
        setTimeout(function () {
          try {
            let x = onRjected(_this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch(e) {
            reject(e)
          }
        })
      })
    })
  }
  return promise2
}

// resolvePromise 
function resolvePromise(promise2, x, resolve, reject) {
  // 接收四个参数，新Promise，返回值，成功和失败的回调
  // 有可能这里返回的是别人的Promise
  // 尽可能允许其他乱写
  if (promise2 === x) {
    return reject(mew TypeError('循环引用了')) // 这里解决问题4
  }
  // 看x是不是一个promise promise 应该是一个对象
  let called // 表示是否吊用过成功或者失败，用来解决问题7
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    // 可能是promise{} 看这个对象中是否有then方法，如果有 then 我就认为他是promise了
    try {
      let then = x.then // 保存一下x的then方法
      if (typeof then === 'function') {
        // 这里y也是官方规范， 如果还是promise 可以当下一次x使用
        // 用call方法修改指针为x 否则this指向window
        then.call(x, function (y) {
          if (called) return // 如果调用过就return
          called = true
          // Y可能是一个promise 再去解析知道返回一个普通值
          resolvePromise(promise2, y, resolve,reject) // 递归调用，解决问题6
        }, function (err) {
          if (called) return 
          called = true
          reject(err)
        })
      } else {
        resolve(x)
      }
    } catch(e) {
      if (called) return
      called = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}
````
