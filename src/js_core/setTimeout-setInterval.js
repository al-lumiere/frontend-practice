"use strict";

/**
 * JavaScript Practice: setTimeout, setInterval, Event Loop
 *
 * Topics:
 * - setTimeout
 * - setInterval
 * - event loop basics
 * - async vs sync
 * - closures in timers
 *
 * Run with: node event-loop-practice.js
 */

console.log("=== Event Loop Practice ===");

/* =====================================================
   1. setTimeout vs sync code
===================================================== */
console.log("\n1:");
console.log(1);

setTimeout(() => console.log(2), 0);

console.log(3);
// 1, 3, 2

/* =====================================================
   2. Closure with setTimeout
===================================================== */
console.log("\n2:");

let i2 = 1;

setTimeout(() => console.log(i2), 1000);

i2 = 10;
// 10

/* =====================================================
   3. var in loop with setTimeout
===================================================== */
console.log("\n3:");

for (var i3 = 0; i3 < 3; i3++) {
  setTimeout(() => console.log(i3), 0);
}
// 3, 3, 3

/* =====================================================
   4. let in loop with setTimeout
===================================================== */
console.log("\n4:");

for (let i4 = 0; i4 < 3; i4++) {
  setTimeout(() => console.log(i4), 0);
}
// 0, 1, 2

/* =====================================================
   5. setTimeout order (queue)
===================================================== */
console.log("\n5:");

setTimeout(() => console.log("A"), 0);
setTimeout(() => console.log("B"), 0);

console.log("C");
// C, A, B

/* =====================================================
   6. Different delays
===================================================== */
console.log("\n6:");

setTimeout(() => console.log(1), 1000);
setTimeout(() => console.log(2), 500);
setTimeout(() => console.log(3), 0);
// 3, 2, 1

/* =====================================================
   7. setInterval basic
===================================================== */
console.log("\n7:");

let i7 = 0;

const interval7 = setInterval(() => {
  console.log(++i7);

  if (i7 === 3) {
    clearInterval(interval7);
  }
}, 1000);
// 1, 2, 3

/* =====================================================
   8. setInterval + mutation
===================================================== */
console.log("\n8:");

let i8 = 0;

setInterval(() => {
  console.log(i8++);
}, 1000);

setTimeout(() => {
  i8 = 100;
}, 2500);
// 0, 1, 100, 101...

/* =====================================================
   9. Blocking the event loop
===================================================== */
console.log("\n9:");

setTimeout(() => console.log("A"), 1000);

const start9 = Date.now();
while (Date.now() - start9 < 2000) {}

console.log("B");
// B, A

/* =====================================================
   10. Nested setTimeout (better than setInterval)
===================================================== */
console.log("\n10:");

function tick10() {
  console.log("tick");
  setTimeout(tick10, 1000);
}

setTimeout(tick10, 1000);

/* =====================================================
   11. printNumbers with setInterval
===================================================== */
console.log("\n11:");

function printNumbersInt(from, to) {
  let interval = setInterval(function inc() {
    if (from <= to) {
      console.log(from);
      from++;
    } else {
      clearInterval(interval);
    }
  }, 1000);
}

printNumbersInt(1, 5);

/* =====================================================
   12. printNumbers with setTimeout
===================================================== */
console.log("\n12:");

function printNumbersTim(from, to) {
  function inc() {
    if (from <= to) {
      console.log(from);
      from++;
      setTimeout(inc, 1000);
    }
  }

  inc();
}

printNumbersTim(1, 5);

/* =====================================================
   13. delayLog
===================================================== */
console.log("\n13:");

function delayLog(value, delay) {
  setTimeout(() => console.log(value), delay);
}

delayLog("hello", 2000);

/* =====================================================
   14. repeat using setTimeout
===================================================== */
console.log("\n14:");

function repeat(fn, interval, times) {
  function call() {
    if (times !== 0) {
      fn();
      times--;
      setTimeout(call, interval);
    }
  }

  call();
}

repeat(() => console.log("hi"), 1000, 3);

/* =====================================================
   15. Multiple setTimeout order
===================================================== */
console.log("\n15:");

console.log("A");

setTimeout(() => console.log("B"), 0);

console.log("C");

setTimeout(() => console.log("D"), 0);
// A, C, B, D

console.log("\n=== End ===");