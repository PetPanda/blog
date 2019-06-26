# call 和 apply模拟实现

## call

call: call()方法在使用一个指定的this值和若干个指定的参数值的前提下调用某个函数方法

注意：
1. 改变this指向
2. 函数执行

```javascript
Function.prototype.call2 = functon(context) {
  var context = context || window
  context.fn = this

  // 传入的参数不确定的情况下
  var args = [];
  for (var i = 1, len = arguments.length; i < len ; i++) {
    args.push('arguments[' + i + ']')
  }
  
  // eval 计算某个字符串，并执行其中的JavaScript代码 执行函数
  var result = eval('context.fn(' + args + ')')
  delete context.fn
  return result
}
```

## apply 实现

```javascript
Function.prototype.apply2 = function(context, arr) {
  var context = Object(context) || window
  context.fn = this

  var result
  if (!arr) {
    result = context.fn
  } else {
    var args = []
    for (var i = 0, len = arr.length; i < len; i++) {
     args.push('arr[' + i + ']') 
    }
    result = eval('context.fn(' + args + ')')
  }
  delete context.fn
  return result
}
```