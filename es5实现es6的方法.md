# es5实现es6的语法

## 实现let 块级作用域

````javascript
function outputNum (count) {
  (function () {
    for(var i = 0; i < count ; i++) {
      console.log(i)
    }
  })()
  console.log(i)
}
outputNum(5)
````
## 实现const 

````javascript
function 
````

## defineProperty

````javascript
// 获取对象属性的值与描述
Object.getOwnPropertyDescriptor(obj, 'name')
var obj = {}
// Object.defineProperty() 的属性 
// writable： 可编辑
Object.defineProperty(obj, 'name', {
  value: "wangshouming",
  writable: false
})
obj.name = 'Johe' // cant  writeable 
// enumerable: 可遍历
Object.defineProperty(obj, 'name', {
  value: "wangshouming",
  enumerable: false
})
console.log(Object.keys(obj)) // []
// configurable：false  能不能删除， 在严格模式下会报错
Object.defineProperty(obj, 'name', {
  value: "wangshouming",
  configurable：false
})
delete obj.name // 
````

## const 实现

声明一个常量，该常量不可改

es5没有block的概念，所以不能百分之百实现const，只能挂在到某个对象下，要么是全局的window 要么是自定义一个object

````javascript
var _const = function _const (data, value) {
  window.data = value
  Object.defineProperty(window, data, {
    enumerable: false, // 属性是否可遍历
    configurable: false, // 配置是否可以删除，delete a
    get: function () {
      return value
    },
    set: function () {
      if (data !== value) {
        throw new Error('Asignment to constant variable')
      } else {
        return value
      }
    }
  })
}
_const('a', 10)
console.log(a) // 10
delete a
console.log(a) // 10  
for (let item in window) { // enumerable 属性值是false 不可枚举
  if (item === 'a') {
    console.log(window[item])
  }
}
a = 20 // 报错
````