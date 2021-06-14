// 防抖函数
//传入函数和延迟时间
export function debounce(func, delay) {
  //设置timer变量
  let timer = null
  //返回一个函数
  return function (...args) {
    //延迟时间还未结束清除定时器，防止多次调用定时器
    if (timer) clearInterval(timer)
    //设置定时器
    timer = setTimeout(() => {
      // 传入的函数在延迟时间结束后使用
      func.apply(this, args)
    }, delay)
  }
}