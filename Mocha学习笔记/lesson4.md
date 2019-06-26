# 测试用例的钩子

Mocha 会在describe块之中，提供测试用例的四个钩子： before(),after(),beforeEach(), afterEach(), 他们会在指定时间内执行
````javascript
describe('hooks', function () {
  before(function () {
    // 在本区块的所有测试用例之前执行
  })

  after(function () {
    // 在本区块所有测试用例之后执行
  })

  beforeEach(function () {
    // 在本区块每个测试用例之前执行
  });

  afterEach(function () {
    // 在本区块每个测试用例之后执行
  })

  // test case
})
````

执行异步的例子
````javascript
// beforeEach-async.test.js
describe('异步 beforeEach 示例', function() {
  var foo = false;

  beforeEach(function(done) {
    setTimeout(function() {
      foo = true;
      done();
    }, 50);
  });

  it('全局变量异步修改应该成功', function() {
    expect(foo).to.be.equal(true);
  });
});
````

## 测试用例管理

大型项目有很多测试用例，如果我们只希望执行其中的几个，这时可以用Only方法，describe 和it块都允许调用only方法，表示只运行几个测试用例或者测试套件
````javascript
it.only('1加1等于2', function () {
  expect(add(1, 1)).to.be.equal(2)
})
````

此外还有`skip`方法，表示 跳过指定的测试套件或者测试用例

````javascript
it.skip('任何数加0都等于自身', function () {
  expect(add(1, 0)).to.be.equal(1)
})
````


