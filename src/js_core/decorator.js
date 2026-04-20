"use strict";

/**
 * JavaScript Decorators Practice
 *
 * Topics:
 * - stats
 * - spy
 * - once
 * - delay
 * - memoize
 *
 * Notes:
 * - Decorators should return a wrapper function.
 * - Inside wrappers, use func.apply(this, args) to preserve:
 *   1) the original context (`this`)
 *   2) all passed arguments
 */

// =====================================================
// 1. stats(func)
// Counts calls and stores the last result
// =====================================================

function add(a, b) {
  return a + b;
}

function stats(func) {
  function wrapper(...args) {
    const result = func.apply(this, args);
    wrapper.count++;
    wrapper.lastResult = result;
    return result;
  }

  wrapper.count = 0;
  wrapper.lastResult = undefined;

  return wrapper;
}

const addWithStats = stats(add);
console.log("stats:", addWithStats(1, 2)); // 3
console.log("stats:", addWithStats(3, 4)); // 7
console.log("stats count:", addWithStats.count); // 2
console.log("stats lastResult:", addWithStats.lastResult); // 7

console.log("----------------------------------------");

// =====================================================
// 2. spy(func)
// Saves every call: arguments + result
// =====================================================

function multiply(a, b) {
  return a * b;
}

function spy(func) {
  function wrapper(...args) {
    const result = func.apply(this, args);
    wrapper.calls.push({ args, result });
    return result;
  }

  wrapper.calls = [];

  return wrapper;
}

const multiplyWithSpy = spy(multiply);
console.log("spy:", multiplyWithSpy(2, 3)); // 6
console.log("spy:", multiplyWithSpy(4, 5)); // 20
console.log("spy calls:", multiplyWithSpy.calls);
// [
//   { args: [2, 3], result: 6 },
//   { args: [4, 5], result: 20 }
// ]

console.log("----------------------------------------");

// =====================================================
// 3. once(func)
// Runs only once, then returns the saved result
// =====================================================

function init() {
  console.log("init");
  return 42;
}

function once(func) {
  function wrapper(...args) {
    if (wrapper.called) {
      return wrapper.result;
    }

    const result = func.apply(this, args);
    wrapper.called = true;
    wrapper.result = result;
    return result;
  }

  wrapper.called = false;
  wrapper.result = undefined;

  return wrapper;
}

const initOnce = once(init);
console.log("once:", initOnce()); // logs "init", returns 42
console.log("once:", initOnce()); // 42
console.log("once:", initOnce()); // 42

console.log("----------------------------------------");

// =====================================================
// 4. delay(func, ms)
// Delays execution, preserves this and arguments
// =====================================================

function sumDelayed(a, b) {
  return a + b;
}

function delay(func, ms) {
  return function wrapper(...args) {
    setTimeout(() => {
      const result = func.apply(this, args);
      console.log("delay result:", result);
    }, ms);
  };
}

const delayedSum = delay(sumDelayed, 500);
const delayedReturn = delayedSum(1, 2);
console.log("delay immediate return:", delayedReturn); // undefined

console.log("----------------------------------------");

// =====================================================
// 5. memoize(func)
// Caches result by arguments
// =====================================================

function slow(a, b) {
  console.log("calc");
  return a + b;
}

function memoize(func) {
  const cache = new Map();

  function wrapper(...args) {
    const key = args.join(",");

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = func.apply(this, args);
    cache.set(key, result);
    return result;
  }

  return wrapper;
}

const memoizedSlow = memoize(slow);
console.log("memoize:", memoizedSlow(1, 2)); // calc, then 3
console.log("memoize:", memoizedSlow(1, 2)); // 3 without "calc"
console.log("memoize:", memoizedSlow(2, 3)); // calc, then 5

console.log("----------------------------------------");

// =====================================================
// Extra: why apply is used in decorators
// =====================================================

const user = {
  prefix: "Result: ",
  show(value) {
    return this.prefix + value;
  },
};

user.show = stats(user.show);
console.log(user.show(10)); // preserves `this`
console.log("user.show count:", user.show.count); // 1
console.log("user.show lastResult:", user.show.lastResult); // "Result: 10"
