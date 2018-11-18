# call 和 apply模拟实现

## call

````javascript
Function.prototype.call2 = functon(context) {
  var context = context || window
  context.fn = this

  // 传入的参数不确定的情况下
  var args = [];
  for (var i = 1, len = arguments.length; i < len ; i++) {
    args.push('arguments[' + i + ']')
  }
  
  // eval 计算某个字符串，并执行其中的JavaScript代码
  var result = eval('context.fn(' + args + ')')
  delete context.fn
  return result
}
````

## apply 实现

````javascript
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
````

http://img.kaolafm.net/mz/images/201409/a8ce7e00-28ca-4594-b024-f012df60b2ad/default.jpg
http://img.kaolafm.net/mz/images/201409/a8ce7e00-28ca-4594-b024-f012df60b2ad/default.jpg