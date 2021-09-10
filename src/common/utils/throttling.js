export function throttling(fn, wait) {
  let timer;
  let context, args;

  let run = () => {
    timer = setTimeout(() => {
      fn.apply(context, args);
      clearTimeout(timer);
      timer = null;
    }, wait);
  }

  return function () {
    context = this;
    args = arguments;
    if (!timer) {
      console.log("throttle, set");
      run();
    } else {
      console.log("throttle, ignore");
    }
  }

}