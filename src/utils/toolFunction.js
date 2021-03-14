/**
 * @description 防抖函数
 * @param {function} fn 需要进行防抖处理的函数
 * @param {number} wait 防抖间隔
 */
function debounce(fn, wait) {
  let timeout = null;
  return () => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(fn, wait);
  };
}

/**
 * @description 节流函数
 * @param {function} func 需要进行节流处理的函数
 * @param {number} delay 节流间隔
 */
function throttle(func, delay) {
  let prev = Date.now();
  return () => {
    const context = this;
    const args = arguments;
    const now = Date.now();
    if (now - prev >= delay) {
      func.apply(context, args);
      prev = Date.now();
    }
  };
}

export { debounce, throttle };
