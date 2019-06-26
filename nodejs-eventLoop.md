# Nodejs中的event loop

nodejs 的event 是基于libuv,而浏览器中的event loop在html5规范中明确定义
libuv已经对event loop 进行了实现，而html5规范中只是定义了浏览器中的event loop模型，具体的实现留给了浏览器厂商

## nodejs 中 event loop 的六个阶段

* timer ：执行setTimeout()和setInterval()中 到期的callback;
* I/O callbacks: 上一轮循环中少数的I/O callabcks会被延迟到这一轮来执行
* idle, prepare： 仅供内部使用
* poll: 最为重要的阶段，执行I/O callbacks ，在必要的情况下会阻塞在这个阶段
* check: 执行setImmediate的callback
* close callbacks: 执行close 事件的callback

event loop的每一次循环都要经历以上阶段，每个阶段都有自己的callback对列，每当进入每个阶段，都会从所属的对列中取出callback来执行，当对列为空或者被执行的callback数量达到系统最大数量的时候，进入下一阶段，6个阶段都执行完毕为一次循环。


process.nextTick在*每个阶段*的最后都会执行。