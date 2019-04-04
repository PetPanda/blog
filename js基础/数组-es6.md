# Es6 数组

## 扩展运算符

作用： 代替apply方法，展开数组作为参数

````javascript
function func(x, y, z) {}

const arr = [1, 2, 3];

func.apply(null, arr)
// 扩展运算符的写法
func(...arr)
````

应用：
1. 复制数组
   数组是复合的数据类型，**直接复制的话，只是复制了指向底层数据结构的指针**，并不是克隆一个全新的数组
````javascript
  //  es5 复制数组
  const a = [1, 3]
  const a2 = a.concat()
  // es6写法
  const a1 = [1, 3, 4]
  const a2 =  [...a1]
  const [...a2] = a1
````
2. 合并数组： 注意：arr1.concat(arr2) 和 [...arr1, ...arr2] 都是浅拷贝
3. 与解构赋值结合 用于生成数组
````javascript
const [first, ...second] = [1, 2, 3, 4, 5]
first // [1]
second // [2, 3, 4, 5]
````
注意： 解构赋值只能放在参数的最后一位，否则会报错
4. 字符串 可以将字符串转换为真正的数组
````javascript
[...'hello']
// ['h', 'e', 'l', 'l', '0']
````
5. 实现了Interator接口对象
任何定义了遍历器接口的对象，都可以使用扩展运算符转换成真正的数组
````javascript
let doms = document.querySelectorAll('div')
let array = [...doms]
````


## 方法

### Array.from() 将两类对象转为真正的数组： 
1. 类似数组对象
2. 可遍历的对象

````javascript
let arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
}
// es5 的写法
var arr1 = [].slice.call(arrayLike)
// es6
let arr2 = Array.from(arrayLike)
````

### Array.of 将一组数值，转换为数组

````javascript
Array.of(1, 2, 3) // [1, 2, 3]
````

### 数组实例的copyWithin()
在当前数组内部，将指定位置的成员赋值到其他位置，然后返回当前数组，也就是说，会修改当前数组
````javascript
Array.prototype.copyWithin(target, start = 0, end = this.length)
````
target: 从该位置开始转换数组，如果为负数，表示倒数。
start: 从该位置开始读取数据，默认为0，如果为负值，表示倒数。
end: 到该位置停止前读取数据，默认等于数组长度，如果为负数，表示倒数。
