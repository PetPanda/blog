# 具体的测试

## ES6测试

测试es6 需要先安装babel
````bash
npm install babel-core babel-preset-es2015 --save-dev
````

然后在当前目录新建`.babelrc`配置

````json
{
  "preset": ["es2015"]
}
````

使用 --compilers 指定测试脚本转码器

执行  ../node_modules/mocha/bin/mocha --compilers js:babel-core/register

由于这里转码器是安装在项目内的， 所以要使用项目内安装的Mocha命令，如果转码器安装在全局，就可以使用全局Mocha

*注意*，Babel默认不会对Iterator、Generator、Promise、Map、Set等全局对象，以及一些全局对象的方法（比如Object.assign）转码。如果你想要对这些对象转码，就要安装babel-polyfill。

然后在脚本的头部加上一句话
````javascript
import 'babel-polyfill'
````


## 异步测试

1. Mocha默认每个测试用例最多执行2000毫秒，如果到时间没有得到结果，就报错；对于异步操作，需要使用-t 或者 --timeout参数来指定门槛
````javascript
it('测试应该5000毫秒后结束', function (done) {
  var x = true;
  var f = function () {
    x = false
    expect(x).to.be.not.ok;
    done(); // 通知Mocha测试结束
  }
  setTimeout(f, 4000)
})
````
执行
mocha -t 5000 timeout.test.js

2. mocha会高亮显示超过75毫秒的测试用例，可以用-s或者--slow调整这个参数

mocha -t 5000 -s 1000 timeout.test.js

3. mocha内置对Promise的支持，允许直接返回Promise，等到它状态改变，再执行断言，而不用显式调用done方法，
````bash
it('异步请求返回一个对象', function () {
  return fetch('http://api.github.com').then(function (res) {
    return res.json()
  }).then(function (json) {
    expect(json).to.be.an('object')
  })
})
````