# JavaScript构造函数的继承

在javascript中，构造函数的继承存在几种方式，下面总结了有5中函数继承的方法。

例如： 我们有两个函数`Animal` `Cat`，要让`Cat`继承`Animal`的方法：

````javascript
function Animal(){
    this.species = '动物'
}
function Cat(name,color){
    this.name = name;
    this.color = color;
}
````

## 构造函数的绑定

比较简单的继承方式就是使用`call`·`apply`方法实现继承，将父对象的构造函数绑定在子对象上；

````javascript
function Cat(name,color){
    Animal.apply(this,arguments);
    this.name = name;
    this.color = color;
}

var cat = new Cat('小花','red');
console.log(cat.species) //动物
````

## prototype实现继承

每个JavaScript函数都存在一个prototyp对象，如果一个函数的`prototype`属性指向另一个对象的实例，那么这个对象就继承了另一个对象的属性和方法。

````javascript
Cat.prototype =  new Animal();

Cat.prototype.constructor = Cat;

var cat = new Cat('jone','red')
````

第一行代码，Cat的`prototype`指向了`Animal`的实例对象，它相当于完全删除了prototype对象的原来的值，然后赋予一个想你的值。

第二行代码，任何一个prototype对象都有一个constructor属性，指向它的构造函数。如果没有`Cat.prototype = mew Animal()` 那么Cat.prototype.constructor是指向Cat的，但是添加这一行代码时，Cat.prototype.constructor是指向Animal的。

重要的是，每一个实例也有一个constructor属性，默认调用prototype对象的constructor属性。

在运行完`Cat.prototype = new Animal();` `cat.constructor`也是指向Animal的，所以要手动纠正，让constructor指向Cat


## 直接继承prototype

由于在Animal对象中，_不变的属性_都可以写入`Animal.prototype`中，所以我们可以直接继承`Animal.prototype`

首先，改变Animal方法

````javascript
function Animal(){};
Animal.prototype.species = 'animals';
````

然后将Cat的prototype对象指向Animal的prototype属性

````javascript
Cat.prototype = Animal.prototype;
Cat.prototype.constructor =  Cat;
var cat = new Cat('johe','red');
````

与上一种方法相比，这样做效率比较高，比较省内存；缺点是：Cat.prototype直接指向Animal.prototype对象，那么你**对Cat.prototype的修改，都会修改到Animal.prototype**

## 利用空对象作为中介

直接继承prototype会存在以上缺点，所以可以使用一个空对象作为中介

````javascript
function F(){};
F.prototype = Animal.prototype;

Cat.prototype = new F();

Cat.prototype.construtor = Cat;
````

F是空对象，所以几乎不会占用内存，这时修改`Cat.prototype`就不会影响到Animal了

可以将以上方式封装成一个函数

````javascript
function extends1(Child,Parent){
    var F = function(){};
    F.prototype = Parent.prototype;
    Chlid.prototype = new F();
    Child.prototype.constructor = Child;
    Child.uber = Parent.prototype;
}
````

使用时：

````javascript
extends1(Cat,Animal);
var cat = new Cat('jone','red');
````

其中`Child.uber = Parent.prototype`,意思是为子对象设置一个uber属性，这个属性指向父对象的prototype属性，这等于在子对象上面打开了一个通道，可以直接调用父对象的方法。

## 拷贝继承

原理，将父对象的所有属性和方法，拷贝进子对象。

首先，将Animal的所有不变属性，放在他的prototype对象上

````javascript
function Animal(){};
Animal.prototype.species = 'animals';
````

使用

````javascript
function extends2(Child,Parent){
    var p = Parent.prototype;
    var c = Child.prototype;
    for(var i in p){
        c[i] = p[i];
    }

    c.uber = p;
}
````
