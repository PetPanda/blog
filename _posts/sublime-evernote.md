---
title: 利用Sublime编辑Evernote 
date: 2017-01-16 10:22:05
tags: Sublime
comments: true
category: Tools
thumbnail: http://oksgjpnw8.bkt.clouddn.com/002.jpg?imageslim
---


   使用Evernote(印象笔记)有一段时间了，用它记录工作学习中的知识还是十分方便的。但对于一个程序猿来说，更喜欢使用markdown来写作，然而比较遗憾的是Evernote不支持直接编辑markdown。所以今天就来教大家使用Sublime Text来编辑保存markdown文件到Evernote（印象笔记）上。
   
 <!-- more -->

 ### 必备sublime插件
 * sublime-evernote 实现同步本地文件到你的evernote
 * Sublime Tmpl 创建md模板
 * markdown Editing 实现在sublime编辑markdown文本
 * markdown Preview 实现本地编辑的markdown文本的预览
**关于插件的安装，这里就不再赘述，大家可自行百度。下面只是讲一下如何使用这些插件进行markdown书写**

### Markdown Editing
 markdown editing 的安装和使用比较简单，在安装完成之后，新建一个后缀名为` .md `的文件。就可以愉快的在本地进行markdown书写了。![](/images/link/note03.jpg)

### Markdown Preview
在编辑md时，我们可以使用markdown preview进行预效果预览：![](/images/link/note04.jpg)
### Evernote插件的使用
1. 获取Evernote应用授权
   [点击我获取授权](https://app.yinxiang.com/api/DeveloperToken.action)
   ![如图所示](/images/link/evenote.jpg)
2. 将获取的你的Developer Token和NoteStore URL写入配置文件`Preferences` >> `Package Settings` >> `Evernote` >> `Settings User`中 ![](/images/link/noteurl.jpg)
3. 现在，`ctrl` + `shift` + `p`打开命令面板，输入evernote就会看与该插件相关的命令了。![](/images/link/note01.jpg)  执行：List recent notes 出现最近编辑过的笔记列表  ![](/images/link/note02.jpg)

**此时，我们实现了sublime与evernote的关联，获取相关操作权限，但到这里并没完....**

### Sublime Tmpl  
1. 配置markdown模板：
 * 在`Preferences`>>`Browser Packages`中打开`SublimeTmpl`文件夹中的`templates`文件夹添加一个`md.tmpl`模板文件。用ST3打开！
代码引用:
````
---
title:
tags:
notebook:
---
````
**注意：Evernote插件目前只能识别`title`、`tags`、`notebook`这三个关键字，依次是文章标题，标签，所属笔记本。**
 * 然后用sublime text3打开SublimeTmpl文件夹中的`Main.sublime-menu`文件，加入如下内容：
 ````
 {
    "caption": "md",
    "command": "sublime_tmpl",
    "args": {
        "type": "md"
    }
}
 ````
 * 现在，你就可以打开命令面板，输入`Evernote`选择`New empty note`创建一个空笔记了。你需要添加文章的标题，标签，以及所属笔记本。![](/images/link/note05.jpg)

> ### 附：Evernote命令及其含义
> * `Evernote: Send to Evernote` 将当前编辑文件发送到evernote上
> * `Evernote: Open Evernote Note` 直接在sublime text浏览并打开Evernote各个笔记本下的笔记，所有内容会自动以Markdown格式打开，其他文本格式，图片等附件均会被消除。
> * `Evernote: Open Evernote Note` 直接在sublime text浏览并打开Evernote各个笔记本下的笔记，所有内容会自动以Markdown格式打开，其他文本格式，图片等附件均会被消除。
> * `Evernote: Update Evernote Note` 笔记编辑
> * `Evernote: Attach current file to a note` 可将当前打开的文件嵌入正在编辑的笔记中
> * `Evernote: View note in WebApp` 将当前笔记转入Evernote网页版打开


好了，至此，我们使用sublime编辑evernote文件的需求就实现啦！
But...，还是有一些小的问题的，比如：无法插入本地文件到Evernote同步。这个问题目前还没有好的方案解决，希望有经验的小伙伴能给点建议，感激!