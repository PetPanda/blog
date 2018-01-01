---
title: Vue组件之间传值
date: 2017-06-25 09:04:00
tags: 框架 Vue
category: 前端开发
comments: true
thumbnail: http://oksgjpnw8.bkt.clouddn.com/vue.png?imageslim
---


# Vue组件之间的传值（父-子/子-父/非父子之间）
<br/>

<img src="http://oksgjpnw8.bkt.clouddn.com/vue.png?imageslim">

Vue构建项目，使用的是组件是开发，这就涉及到组件之间的通信问题。在vuejs中，组件之间的通信方式可以分为三类：父组件到子组件、子组件到父组件以及非父子组件之间的传值。

<!--more-->
## 父组件传值到子组件

父组件向子组件传值的主要方式是：props down ，利用props属性向子组件传值

实例：
````javascript
// parent component
<template>
    <child-node message="hello"></child-node>
</template>
<script>
    import childNode from './component/child.vue'
    export default {
        data () {
            return {
                hello: 'this is parent`s message!'
            }
        },
        created () {},
        mounted () {},
        computed () {},
        methods: {},
        components: {childNode}
    }
</script>

// 子组件
<template>
    // 在组件中使用
    <div>{{message}}</div>
</template>
<script>
    export default {
        data () { return {} },
        props:['message'] // 声明props
    }
</script>
````

## 子组件传值到父组件

在Vue2.x中，子组件可以通过$emit来向父组件派发事件，在父组件中可以使用$on来进行事件的监听

实例：

````javascript
// 子组件、
// 在该点击事件的函数中使用$emit来触发一个自定义事件，并传递一个参数
<template>
    <h2>我是子组件</h2>
    <p>{{message}}</p>
    <button @click="emitEvent">点击我</button>
</template>
<script>
    export default {
        data () { return { } },
        props: ['message'],
        methods: {
            emitEvent () {
                this.$emit('listenParentEvent', 'this is child's message!')
            }
        }
    }
</script>

// 父组件
// 在父组件中增加一个响应该事件的处理方法
<template>
    <h1>我是父组件</h1>
    <p>{{mes}}</p>
    <child-node :message="mes" @listenParentEvent="onEvent" ></child-node>
</template>
<script>
    export default {
        data () {return {
            mes: 'hi, boy'
        }},
        methods: {
            onEvent (data) {    
                this.mes = 'hello'
                console.log(data)
            }
        }
    }
</script>
````

在vue.js中，父子组件之间的关系可以总结为props down , events up 。父组件通过props向子组件传递数据，子组件通过events给父组件发送消息，其原理：

<img src="http://ol93u4bui.bkt.clouddn.com/comoponent.png?imageslim">

## 非父子组件之间的传值

Vuejs的非父子组件之间的传值有两种方式：

### 通过$emit向全局vuejs对象派发事件，在另一个非父子组件中使用$on监听事件

原理：
<img src="http://ol93u4bui.bkt.clouddn.com/not-parent.png">

实例：

````javascript
/// 组件一
<template>
    <button @click="eventEmit">点我</button>
</template>
<script>
    // 引入全局vue对象
    import app from './src/index.js'
    export default {
        data () {return {}},
        methods: {
            eventEmit () {
                app.$emit('sos', 'can you help me ?')
            }
        }
    }
</script>
// 组件二
<template>
    <p>{{message}}</p>
</template>
<script>
    // 引入全局vue对象
    import app from './src/index.js'
    export default {
        data () { return { message: ''}},
        created () { // 在created中进行监听
            const _this = this
            app.$on('sos', function (data) {
                _this.message = data
            })
        }
        methods: {
        }
    }
</script>
```` 

### 使用Vuex进行状态的管理

#### [什么是Vuex](https://vuex.vuejs.org/zh-cn/intro.html)

#### 什么时候使用vuex

尽管 Vuex 帮助我们处理共享状态管理，但是也带来了更多的思考和样板文件。这是一个短期效益和长期效益的权衡

如果你没有开发过大型的单页应用(SPA)就立刻上 Vuex，可能会觉得繁琐然后排斥，这是很正常的 —— 如果是个简单的应用，大多数情况下，不用 Vuex 还好，你要的可能就是个简单的 全局事件总线(global event bus)。不过，如果你构建的是一个中到大型单页应用，当你在考虑如何更好的在 Vue 组件外处理状态时，Vuex 自然就是你的下一步选择。


## 总结

* 父子组件通讯使用Props传递数据
* 非父子组件通讯有二个种方案
    * 大型应用推荐使用Vuex来管理全局state
    * 小型应用直接使用全局事件总线来实现通讯，没有必要使用Vuex写过多的样板代码和更多思考代码应该如何写







