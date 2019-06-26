
function debounce (func, wait, immediate) {
  // result 返回值，当回调函数需要返回值时，在立即执行后返回，异步执行的过程不会返回结果
  var timeout, result;
  
  var debounced = function () {
    var context = this;
    // 获取事件对象，event
    var args = arguments;

    if (timeout) clearTimeout(timeout);
    // immediate 判断是否是立即执行
    // 需求：不希望等到事件停止后触发执行， 希望立刻执行函数，然后再事件触发n秒后，才重新触发执行
    if (immediate) {
      // 如果已经在执行，不在执行  
      var callNow = !timeout;

      timeout = setTimeout(function () {
        timeout = null;
      }, wait);

      if (callNow) result = func.apply(context, args);
    } else {
      timeout = setTimeout(() => {
        func.apply(func, args)
      }, wait);
    }
    
    return result;
  };

  // 取消防抖 
  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  }
  return debounced;
}

// 使用

var count = 1
var container = document.getElementById('container')

function getUserAction (e) {
  container.innerHTML = count++
}

var setUserAction = debounce(getUserAction, 10000, true)

container.onmousemove = setUserAction

document.getElementById('button').addEventListener('click', function () {
  setUserAction().cancel()
})