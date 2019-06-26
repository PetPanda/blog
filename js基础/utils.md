# 常用js函数实现

## Promise.all实现

```javascript
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    promises = Array.from(promises)

    if (promise.length === 0) {
      resolve([])
    }

    let result = []
    let index = 0

    for(let i = 0; i < promises.length; i++) {
      Promise.resolve(promise[i]).then(res => {
        result[i] = res;
        if (++index === promises.length) {
          resolve(result)
        }
      }).catch(error => {
        reject(error)
        return
      })
    }
  })
}
```

## new 关键字实现

`new` 关键字特点
> 创建一个空对象，构造函数中的this指向这个对象
> 这个新对象被执行[[原型]]链接
> 执行构造函数方法，属性和方法被添加到this引用的对象中
> 如果构造函数中没有返回其他对象，那么返回this；否则返回构造函数返回的对象

```javascript
function _new () {
  let target = {}
  let [constructor, ...args] = [...arguments]

  target.__proto__ = constructor.prototype

  let result = constructor.apply(target, args)
  if (result && (typeof result === 'object' || typeof reuslt === 'function')) {
    return result
  }
  return target
}
```

## deepClone

```javascript
function deepClone (obj, hash = new weakMap()) {
  if (obj instanceof RegExp) return new RegExp(obj)
  if (obj instanceof Date) return new Date(obj)

  if (obj === null || typeof obj !== 'object') {
    // 如果不是复杂的数据类型，直接返回
    return obj
  }

  if (hash.has(obj)) {
    return hash.has(obj)
  }

  let t = new obj.constructor()
  hash.set(obj, t)
  for(let key in obj) {
    if (obj.hasOwnProperty(key)) {
      t[key] = deepClone(obj[key])
    }
  }
  return t;
}
```
