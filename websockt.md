# websocket的使用

##  websocket 特点

服务端可以主动向客户端发送消息，客户端也可以主动向服务端发送消息

1. 建立在TCP协议之上，服务端实现比较容易
2. 与HTTP协议有良好的兼容性，默认端口也是80和443，并且握手阶段采用HTTP协议，因此握手时不容易屏蔽，能通过各种HTTP代理服务器
3. 数据格式化比较轻量，性能开销小，通信高效
4. 可以发送文本，也可以发送二进制数据
5. 没有同源限制，客户端可以与任意服务通信
6. 协议标示符是ws，如果加密是wss，服务器网址就是url


## 客户端API

1. Websocket 构造函数
用于创建websocket实例，创建构造函数之后，客户端就会与服务端进行连接
`var ws = new WebSocket('ws://localhost:8080')`

2. ws.readyState
readyState 属性返回实例对象当前的状态:

CONNCTING 值为0 表示正在连接
OPEN 值为1 表示连接成功，可以通信了
CLOSING 值为2 表示连接正在关闭
CLOSED 值为3 表示连接已经关闭，或者打开连接失败

3. ws.onopen 
实例对象的onopen属性，用于指定连接成功之后的回调函数

````javascript
ws.onopen = function () {
  ws.send('Hello Server')
}
// 如果要指定多个回调函数，可以使用addEventListener
ws.addEventListener('open', function () {
  ws.send('Hello World')
})
````

4. ws.onclose 
实例对象的onclose 属性，用于指定连接关闭后的回调函数

````javascript
ws.onclose = function (event) {
  var code = event.code;
  var reason = event.reason
  var wasClean = event.wasClean
}
````

5. ws.onmessage  用于指定收到服务器数据后的回调函数

````javascript
ws.onmessage = function (event) {
  var data = event.data
  // 处理数据
  // 服务器数据可能是文本 ，也可能是二进制数据
  if (typeof data === String) {
    console.log('Receive data string')
  } 
  if (data instanceof ArrayBuffer) {
    var buffer = data
    console.log('Receive ArrayBuffer')
  }
}
````

6. ws.send 向服务器发送数据

````javascript
// 发送文本
ws.send('hello server')
// 发送blob对象的例子
var file = document.querySelector('input[type="file"]').files[0]
ws.send(file)
// 发送arraybuffer
````

7. ws.onerror 指定报错时的回调函数

````javascript
ws.onerror = function () {
  // do something
}
````