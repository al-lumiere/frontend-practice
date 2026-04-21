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
  }
};

user.show = stats(user.show);
console.log(user.show(10)); // preserves `this`
console.log("user.show count:", user.show.count); // 1
console.log("user.show lastResult:", user.show.lastResult); // "Result: 10"

console.log("----------------------------------------");

// =====================================================
// 6. track(func)
// Logs every call and counts how many times the function ran
// =====================================================

const greeterUser = {
  name: "Ali",
  greet(word) {
    return word + ", " + this.name;
  }
};

function track(func) {
  function wrapper(...args) {
    console.log("called");
    wrapper.count++;
    return func.apply(this, args);
  }

  wrapper.count = 0;
  return wrapper;
}

greeterUser.greet = track(greeterUser.greet);
console.log("track:", greeterUser.greet("Hi")); // called, then "Hi, Ali"
console.log("track count:", greeterUser.greet.count); // 1

const boundGreet = greeterUser.greet.bind(greeterUser, "Hello");
console.log("track bound:", boundGreet()); // called, then "Hello, Ali"
console.log("track count after bind call:", greeterUser.greet.count); // 2

console.log("----------------------------------------");

// =====================================================
// 7. spy(func) with object method
// Saves every call: arguments + result, preserves `this`
// =====================================================

const speakingUser = {
  name: "Ali",
  say(word, sign) {
    return word + ", " + this.name + sign;
  }
};

speakingUser.say = spy(speakingUser.say);
console.log("method spy:", speakingUser.say("Hi", "!")); // "Hi, Ali!"
console.log("method spy:", speakingUser.say("Hello", ".")); // "Hello, Ali."
console.log("method spy calls:", speakingUser.say.calls);
// [
//   { args: ["Hi", "!"], result: "Hi, Ali!" },
//   { args: ["Hello", "."], result: "Hello, Ali." }
// ]

const boundSay = speakingUser.say.bind(speakingUser);
console.log("method spy bound:", boundSay("Bye", "!")); // "Bye, Ali!"
console.log("method spy calls after bound call:", speakingUser.say.calls);

console.log("----------------------------------------");

// =====================================================
// 8. limit(func, n)
// Allows the function to run only n times
// Then returns the last saved result
// =====================================================

const limitedUser = {
  x: 10,
  calc(a) {
    return this.x + a;
  }
};

function limit(func, n) {
  function wrapper(...args) {
    if (wrapper.calls >= n) {
      return wrapper.lastResult;
    }

    const result = func.apply(this, args);
    wrapper.calls++;
    wrapper.lastResult = result;
    return result;
  }

  wrapper.calls = 0;
  wrapper.lastResult = undefined;
  return wrapper;
}

limitedUser.calc = limit(limitedUser.calc, 2);
console.log("limit:", limitedUser.calc.call(limitedUser, 5)); // 15
console.log("limit:", limitedUser.calc.call(limitedUser, 7)); // 17
console.log("limit:", limitedUser.calc.call(limitedUser, 3)); // 17
console.log("limit calls:", limitedUser.calc.calls); // 2
console.log("limit lastResult:", limitedUser.calc.lastResult); // 17

const boundCalc = limitedUser.calc.bind(limitedUser);
console.log("limit bound:", boundCalc(100)); // still 17 because limit reached

console.log("----------------------------------------");

// =====================================================
// 9. log(func)
// Simple logging decorator for object methods
// =====================================================

function log(func) {
  return function (...args) {
    console.log("call");
    return func.apply(this, args);
  };
}

const obj = {
  x: 10,
  fn() {
    return this.x;
  }
};

obj.fn = log(obj.fn);
console.log("log:", obj.fn()); // call, then 10
