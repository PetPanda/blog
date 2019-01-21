# 实现双向绑定Proxy比defineproperty优劣如何


## 基于数据劫持实现双向绑定的特点

1. 什么是数据劫持

我们通常使用`Object.defineProperty`劫持对象访问器，在属性值发生变化时我们可以获取变化。

````javascript
// 这是将要被劫持的对象
const data = {
  name: '',
};hei-24px

function say(name) {
  if (name === '古天乐') {
    console.log('给大家推荐一款超好玩的游戏');
  } else if (name === '渣渣辉') {
    console.log('戏我演过很多,可游戏我只玩贪玩懒月');
  } else {
    console.log('来做我的兄弟');
  }
}

// 遍历对象,对其属性值进行劫持
Object.keys(data).forEach(function(key) {
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      console.log('get');
    },
    set: function(newVal) {
      // 当属性值发生变化时我们可以进行额外操作
      console.log(`大家好,我系${newVal}`);
      say(newVal);
    },
  });
});

data.name = '渣渣辉';
//大家好,我系渣渣辉
//戏我演过很多,可游戏我只玩贪玩懒月

````

数据劫持的优势
1. 无需显式调用，直接触发
2. 可精确得知变化数据

### 基于数据劫持双向绑定的实现思路

我们实现一个双向绑定需要以下几个要点：
1. 利用`Proxy`或`Object.defgineProperty` 生成的Observer针对对象/对象属性进行劫持，在属性发生变化后通知订阅者
2. 解析器Compile解析模板中的`Directive` 搜集指令所依赖的方法和数据，等待数据变化，然后进行渲染
3. watcher 属于 Observe和Compile桥梁，它将接受到observer产生的数据变化，并根据compile提供的指令进行试图渲染，使得数据变化促使视图变化


### 基于Object.defineProperty双向数据绑定特点

极简版双向数据绑定：

````javascript
const obj = {}
Object.defineProperty(obj, 'text', {
  get: function () {
    console.log(' get val')
  },
  set: function (newVal) {
    console.log('new vale:' + newVal)
    document.getElementById('input').value = newVal;
    document.getElementById('span').innerHTML = newVal
  }
})

 const input = document.getElementById('input')
 input.addEventListener('keyup', function(e) {
   obj.text = e.target.value
 })
````

极简版的缺陷： 
1. 只监听了一个属性，一个对象不可能只有一个属性
2. 违反了开放封闭原则
3. 代码严重耦合，我们的数据方法和DOM都是耦合在一起的

升级改造
Vue的操作就是加入发布订阅模式，结合`Object.defineProperty`的劫持能力，实现了可用性很高的双向数据绑定

首先实现一个订阅发布中心 
````javascript
let uid = 0;
// 用于存储订阅者发布消息
class Dep {
  // 设置id，用于区分新的watcher和只改变属性值后新产生的watcher
  constructor () {
    this.id = uid++;
    // 存储订阅的数组
    this.subs = [];
  }
  // 触发target上的watcher中的addDep方法，参数为dep的实例本身
  depend () {
    Dep.target.addDep(this);
  }
  // 添加订阅者
  addSub(sub) {
    this.subs.push(sub)
  }
  notify () {
    // 通知所有的订阅者watcher 触发订阅者的相应逻辑处理s
    this.subs.forEach(sub => sub.update());
  }
}
// 为Dep类设置一个静态属性，默认为null 工作时指向当前的watcher
Dep.target = null;
````

实现监听者，用于监听属性值的变化

````javascript
// 监听者，监听对象属性的变化
class Observr {
  constructor (value) {
    this.value = value;
    this.walk(value);
  }
  walk (value) {
    // 遍历属性值并监听
    Object.keys(value).forEach(key => this.convrtr(key, value[key]))
  }
  // 执行监听的具体方法
  convert (key, val) {
    defineReactive(this.value, key, val)
  }
}

function defineReactive(obj, key, val) {
  const dep = new Dep();
  // 给当前属性的值添加监听
  let childOb = observer(val);
  Object.defineProperty(obj. key, {      
    enumerable: true,
    configurable: true,
    get: () => {
      // 如果Dep类存在target属性，将其添加到dep实例的subs数组中
      // target指向一个watcher实例，每个watcher是一个订阅者
      // watcher实例在实例化过程中，会读取data的某个属性，从而触发当前get方法
      if (Dep.target) {
        dep.depend()
      }
      return val;
    },
    set: newValue => {
      if (val === newValue) return
      val = newValue
      // 对新值进行监听
      childOb = observer(newValue)
      // 通知所有的订阅者，数值被改变了
      dep.notify()
    }
  })
}

function observer(value) {
  // 当值不存在是时，或者不是复杂的数据类型时，不再需要继续监听
  if(!value || typeof value !== 'object') {
    return
  }
  return new Observer(value)
}
````

实现订阅者

````javascript
class Watcher {
  constructor(vm, expOrFn, cb) {
    this.depIds  = {}; // hash存储订阅者的Id，避免重复订阅者
    this.vm = vm; // 被订阅的数据一定来自当前Vue实例
    this.cb = cb; // 当数据更新时想要做的事情
    this.expOrFn = expOrFn; // 被订阅的数据
    this.val = this.get(); // 维护更新之前的数据
  }
  // 对外暴露的接口，用于在订阅的数据被更新时，由订阅者管理员调用
  update () {
    this.run();
  }
   addDep (dep) {
    //  如果在depIds的hash中没有当前的id，可以判断是新的watcher 因此可以添加到dep的数组中存储，
    // 此判断是避免同id的watcher被多次存储
    if (!this.depIds,hasOwnProperty(dep.id)) {
      dep.addSub(this)
      this.depIds[dep.id] = dep;
    }
   }
   run () {
     const val = this.get();
     console.log(val)
     if (val !== this.val) {
       this.val = val;
       this.cb.call(this.vm, val)
     }
   }
   get () {
    //  当前订阅者读取被订阅数据的最新更新后的值时，通知订阅者管理员搜集当前的订阅者
     Dep.target = this;
     const val = this.vm._data[this.expOrFn];
    //  置空 用于下一个watcher使用
     Dep.target = null;
     return val;
   }
}
````


