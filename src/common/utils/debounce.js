// 防抖函数
//传入函数和延迟时间
// export function debounce(func, delay) {
//   //设置timer变量
//   let timer = null
//   //返回一个函数
//   return function (...args) {
//     //延迟时间还未结束清除定时器，防止多次调用定时器
//     if (timer) clearInterval(timer)
//     //设置定时器
//     timer = setTimeout(() => {
//       // 传入的函数在延迟时间结束后使用
//       func.apply(this, args)
//     }, delay)
//   }
// }

/**
 *降频函数
 *这个 debounce 函数在给定的时间间隔内只允许你提供的回调函数执行一次，以此降低它的执行频率。
 *调用:	debounce(function() {}, 250) 
 * @param {*} func回调函数
 * @param {*} wait等待时间,推荐250
 * @param {*} immediate
 * @returns
 */
export function debounce(func, wait, immediate) {
  var timeout
  return function () {
    var context = this, args = arguments
    var later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}