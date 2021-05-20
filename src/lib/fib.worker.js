function fib(n) {
  if (n <= 0) {
    return 0;
  } else if (n === 1) {
    return 1;
  } else {
    return fib(n - 1) + fib(n - 2);
  }
}

function handleMessage(e) {
  globalThis.postMessage(fib(e.data));
}

if (globalThis.addEventListener) {
  globalThis.addEventListener("message", handleMessage);
}
