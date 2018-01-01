---
title: 利用js控制css微元素内容
date: 2017-01-10 10:58:52
tags: css
category: 前端
comments: true
thumbnail: http://oksgjpnw8.bkt.clouddn.com/001.jpg?imageslim
---

 最近在项目中使用css伪元素来进行开发时，要用js动态修改伪元素的内容。通过查找资料，总结了一下两种方法，足以满足项目开发时的应用。
 <!-- more --> 
 ##### 方法一
 用css类名来重写样式
 ````CSS
 p:after {
    conntent: '我是内容';
 }
 p.change:after {
    content: '我是修改后的内容';
 }
 ````
 然后利用js为元素添加类名进行样式的重写。但是这种办法局限性比较大，当我们需要动态修改伪元素内容时，需要写大量样式。所以这种办法只适用于简单的切换。
 ##### 方法二
 在css中，伪元素的content是能读取到data属性的。也就是说我们可以这样书写css
 ````CSS
 p:after {
    conntent: attr(data-content);
 }
 ````
 hmtl可以这样写
````HTML
    <p data-content="当前内容" id="changeContent"></p>
````
现在，我们就可以利用Js任意修改为元素的内容啦！
````javascript
$('#changeContent').attr('data-content',conntent);
````
