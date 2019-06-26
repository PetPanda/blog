# 深入之 new 关键字实现

## new

> new运算符创建一个用户定义的对象类型实例或具有构造函数的内置对象类型之一

## 初步实现

因为new关键字的结果是一个对象，

````javascript
function objectFactory() {
  var obj = new Object()

  Constructor = [].shift.call(arguments)

  obj._proto_ = Constructor.prototype

  Constructor.apply(obj, arguments)
  
  return obj
}
````