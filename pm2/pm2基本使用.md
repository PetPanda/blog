# pm2基本应用

## 初始化

````ssh
pm2 init 
````
生成ecosystem.config.js文件

````ssh
#  启动
pm2 start
# 只启动指定的app  --only <app-name>
pm2 start --only app
# 配置环境变量
pm2 start ecosystem.config.js -env production
# 更新环境
pm2 start ecosystem.config.js --update-env
# 改变环境变量
pm2 restart ecosystem.config.js --env production --update-env
````


## 进程管理

1. 查看进程列表

````shell
pm2 ls
# 停止并删除应用
pm2 delete app
````

2. 启动，停止，重启应用
````ssh
pm2 start app 
pm2 stop app
pm2 restart app
````

## 应用进程监控

````ssh
pm2 monit
````

