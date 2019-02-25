# Mocha基础

测试脚本中应该包含一个或者多个`describe`块，每个`describe`块应该包含一个或者多个it块、

describe成为测试套件，表示一组相关的测试，他是一个函数，第一个参数是测试套件的名称，第二个参数是一个实际执行的函数

it是一个测试用例，表示一个单独的测试，是测试的最小单位，它也是一个函数，第一个参数是测试用例的名称，第二个参数是实际执行的函数。


## 断言库的用法

````javascript
// 断言
expect(add(1, 2)).to.be.equal(2)
````

"断言"，判断源码的实际执行结果与预期结果是否一致，如果不一致就抛出一个错误

所有的测试用例都应该含有一个或者多个断言，他是编写测试用例的关键，断言功能由断言库来实现，目前是以`chai`断言库来说明测试用例的写法

````javascript
// 相等或者不相等
expect(3 + 2).to.be.equal(5);
expect(4 + 5).to.be.not.equal(10);
expect(foo).to.be.deep.equal({ bar: 'zoo' });

// 布尔值true
expect('everything').to.be.ok;
expect(false).to.be.ok

// typeof判断
expect('test').to.be.a('string');
expect({ bar: 'foo' }).to.be.an('object');
expect(foo).to.be.an.instanceof(Foo);

// include
expect([1,2,4]).to.include(1);
expect('foobar').to.containe('foo')
expect({ foo: 'bar', hello: 'universe'}).to.include.keys('foo');

// empty
expect([]).to.be.empty
expect('').to.be.empty
expect({}).to.be.empty

// match
expect('foobar').to.match(/^foo/)
````

节本上 expect断言的写法都是一样的，头部是expect方法，尾部是断言方法，不如：equal, a/an, ok, match。两者之间用to或者to.be链接
