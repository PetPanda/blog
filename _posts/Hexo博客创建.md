---
title: Github Pages搭建免费个人技术博客
date: 2017-02-04 14:48:01
tags: 博客 Hexo
comments: true
category: 博客创建
thumbnail: http://oksgjpnw8.bkt.clouddn.com/004.jpg?imageslim
---

    
 摘要：手把手教你如何使用Github Page和Hexo搭建免费个人技术博客。
<!-- more --> 
### Hexo介绍
Hexo 是一个轻量的静态博客框架。通过Hexo可以快速生成一个静态博客框架,仅需要几条命令就可以完成,相当方便。
而架设Hexo的环境更简单了 不需要 lnmp/lamp/XAMPP 这些繁琐复杂的环境 仅仅需要一个简单的http服务器即可使用 或者使用互联网上免费的页面托管服务。
### 准备工作
在开始之前，首先要准备好创建博客所需的工具。
#### Git安装
[Git](https://git-scm.com/downloads) (下载比较慢，耐心等待！)是版本控制工具，可以使用git安装Hexo所需的一些插件或者是主题。
安装成功之后，在桌面右键出现 `Git GUI here` 、`Git Bash here`则安装成功
![安装成功](http://ol18c36vs.bkt.clouddn.com/0301.jpg?imageslim)
#### 安装Nodejs环境
Hexo是基于Node.js的第三方模块，所以使用hexo必须要安装[Node.js](https://nodejs.org/en/download/)。
（具体的安装操作请参考[菜鸟教程-Node.js 安装配置](http://www.runoob.com/nodejs/nodejs-install-setup.html)）
#### Github配置
1. 注册[Github](https://github.com)账号
2. git安装好之后，执行以下操作。[参考教程-阮一峰的网络日志](http://www.ruanyifeng.com/blog/2014/06/git_remote.html)
   1. 从程序目录打开 "Git Bash"。
   2. 键入命令：ssh-keygen -t rsa -C "email@email.com"
"email@email.com"是github注册账号邮箱地址
   3. 提醒你输入key的名称，你可以不用输入，直接3个回车，就OK了；
   4. 在C:\Documents and Settings\Administrator\下产生两个文件：id_rsa和id_rsa.pub。
   5. 用记事本打开id_rsa.pub文件，复制内容，在github的网站上找到ssh密钥管理页面，添加新公钥 。
   6. 在git bash中输入ssh -T git@github.com命令，出现Hi sylujia! You've successfully authenticated表示成功。 
3. 设置用户信息
在成功与github连接之后，还需要完善一些用户信息。
Git会根据用户的名字和邮箱进行提交。Github也会用这些信息来做权限的处理。在本地git bash环境执行以下操作。
````
$ git config --global user.name "aierui"//用户名
$ git config --global user.email "imland@outlook.com"//填写自己的邮箱
````
#### Hexo安装
hexo的安装十分简单，在git bsah中执行命令`npm install -g hexo-cli`，然后耐心等待安装完成。
### 开始搭建
准备工作完成之后，我们就可以进行博客的搭建了。
#### 创建远程仓库
在你的Github账户中创建一个新的仓库，命名必须使用username.github.io的命名规则，因为User Page将通过`https://username.github.io`访问你的主页。
![操作](http://ol18c36vs.bkt.clouddn.com/0302.jpg?imageslim)
#### 使用Hexo建站
在你喜欢的文件夹中（例如：D:/），点击右键选择git bash,执行以下命令：
`git clone git@github.com:username/username.github.io.git`

![图片](http://ol18c36vs.bkt.clouddn.com/0303.jpg?imageslim)
该命令会将你的博客仓库同步下来，然后cd到你的仓库的文件夹下面，一次执行以下命令：
创建一个新的网站，
`hexo init` 
下载所需的插件
`npm install`
创建之后的文件目录：![图片](http://ol18c36vs.bkt.clouddn.com/0304.jpg?imageslim)
这样我们就搭建完成本地的Hexo博客了，执行：
`hexo generate`
`hexo server`
然后在浏览器输入localhost:4000,就可以访问我们在本地创建的博客了。之后还要部署在github上，才可以让别人访问。
参考： [Hexo官方文档](https://hexo.io/zh-cn/docs/)
### 部署到Github上
网站部署其实很简单，只需要修改一下配置文件即可。
#### 配置站点文件
在博客文件夹的根目录下找到_config.yml（这是配置文件），用编辑器打开进行编辑：
修改前：
````
# Deployment 
## Docs: http://hexo.io/docs/deployment.html 
deploy:   
  type:
````
修改后：（也就是填入自己的ssh地址，注意前面的空格，否则会报错）
````
deploy:
  type: git
  repository: git@github.com:sylujia/sylujia.github.io.git
  branch: master
````
#### 发布
发布之前，我们需要安装一个小插件，在项目目录执行以下命令：
`npm install hexo-deployer-git --save`
然后执行下面的指令就可以完成部署：（每次发布都要执行三条指令）
````
$ hexo clean #清空public文件夹下生成的静态文件和db.json文件
$ hexo generate #重新生成静态文件和db.json
$ hexo deploy #按照站点配置文件部署到github上
````
OK，部署完成！
在你的浏览器上输入 username.github.io进行浏览。