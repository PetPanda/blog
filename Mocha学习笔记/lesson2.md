# Mocha的基本用法

mocha 命令后面紧跟测试脚本的路径和文件名，可以指定多个测试脚本

````bash
mocha file1 file2 
````

mocha 默认运行test子目录里的测试脚本
````bash
# 直接执行mocha, 自动运行test目录中的测试脚本
mocha
# 子目录中的测试脚本
mocha --recursive
````

## 通配符

命令执行脚本时，可以根据通配符，同时指定多个文件
````bash
mocha spec/{my, awesome}.js
mocha test/unit/*.js
# 除了使用shell通配符 还可以使用Node通配符
mocha 'test/**/*.@(js|jsx)'
````

## 命令参数

