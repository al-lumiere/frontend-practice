"use strict";

/**
 * JavaScript Practice: Spread / Rest / Arguments
 * Run with: node file.js
 */

console.log("=== Spread / Rest / Arguments Practice ===");

/* =====================================================
   1. Spread vs direct array passing
===================================================== */
function sum(a, b, c) {
  return a + b + c;
}

const arr1 = [1, 2, 3];

console.log("\n1:");
console.log(sum(arr1));    // "1,2,3undefinedundefined"
console.log(sum(...arr1)); // 6

/* =====================================================
   2. Spread creates a new array
===================================================== */
const arr2 = [1, 2, 3];
const newArr = [...arr2, 4, 5];

arr2[0] = 100;

console.log("\n2:");
console.log(newArr); // [1,2,3,4,5]

/* =====================================================
   3. Object spread (shallow copy)
===================================================== */
const obj1 = { a: 1 };
const copy1 = { ...obj1 };

obj1.a = 2;

console.log("\n3:");
console.log(copy1.a); // 1

/* =====================================================
   4. Rest parameters collect arguments
===================================================== */
function fn4(...args) {
  console.log(args);
}

console.log("\n4:");
fn4(1, 2, 3); // [1,2,3]

/* =====================================================
   5. Rest with named parameter
===================================================== */
function fn5(a, ...rest) {
  console.log(a);
  console.log(rest);
}

console.log("\n5:");
fn5(1, 2, 3, 4);

/* =====================================================
   6. Rest vs arguments (not linked)
===================================================== */
function fn6(...args) {
  args[0] = 100;
  console.log(arguments[0]);
}

console.log("\n6:");
fn6(1, 2, 3); // 1

/* =====================================================
   7. arguments.length
===================================================== */
function fn7(a, b) {
  console.log(arguments.length);
}

console.log("\n7:");
fn7(1); // 1

/* =====================================================
   8. arguments linked (non-strict + simple params)
===================================================== */
function fn8(a) {
  a = 5;
  console.log(arguments[0]);
}

console.log("\n8:");
fn8(1); // 5

/* =====================================================
   9. strict mode breaks arguments link
===================================================== */
function fn9(a) {
  a = 5;
  console.log(arguments[0]);
}

console.log("\n9:");
fn9(1); // 1

/* =====================================================
   10. arguments is not an array
===================================================== */
function fn10() {
  console.log(Array.isArray(arguments));
}

console.log("\n10:");
fn10(1, 2, 3); // false

/* =====================================================
   11. Convert arguments to array with spread
===================================================== */
function fn11() {
  const arr = [...arguments];
  console.log(arr);
}

console.log("\n11:");
fn11(1, 2, 3);

/* =====================================================
   12. Rest is a real array
===================================================== */
function fn12(...args) {
  console.log(Array.isArray(args));
}

console.log("\n12:");
fn12(1, 2, 3);

/* =====================================================
   13. Missing arguments become undefined
===================================================== */
const arr3 = [1, 2];

function fn13(a, b, c) {
  console.log(a, b, c);
}

console.log("\n13:");
fn13(...arr3);

/* =====================================================
   14. Default parameters with spread
===================================================== */
function fn14(a = 10, b = 20, c = 30) {
  console.log(a, b, c);
}

console.log("\n14:");
fn14(...arr3);

/* =====================================================
   15. Sum via rest
===================================================== */
function fn15(...args) {
  return args.reduce((acc, cur) => acc + cur, 0);
}

console.log("\n15:");
console.log(fn15(...[1, 2, 3]));

/* =====================================================
   16. Arrow function has no arguments
===================================================== */
const fn16 = () => {
  try {
    console.log(arguments);
  } catch {
    console.log("ReferenceError");
  }
};

console.log("\n16:");
fn16(1, 2, 3);

/* =====================================================
   17. Rest length
===================================================== */
function fn17(a, ...rest) {
  console.log(rest.length);
}

console.log("\n17:");
fn17(1);

/* =====================================================
   18. arguments vs rest length
===================================================== */
function fn18(a, ...rest) {
  console.log(arguments.length);
  console.log(rest.length);
}

console.log("\n18:");
fn18(1);

/* =====================================================
   19. Default param chaining
===================================================== */
function fn19(a, b = a, c = b) {
  console.log(a, b, c);
}

console.log("\n19:");
fn19(1);

/* =====================================================
   20. Default breaks arguments link
===================================================== */
function fn20(a, b = a) {
  arguments[0] = 100;
  console.log(a, b);
}

console.log("\n20:");
fn20(1);

/* =====================================================
   21. Closure with default function
===================================================== */
function fn21(a, b = () => a) {
  a = 5;
  console.log(b());
}

console.log("\n21:");
fn21(1);

/* =====================================================
   22. Arrow uses outer arguments
===================================================== */
function outer22() {
  const fn = () => {
    console.log(arguments[0]);
  };
  fn();
}

console.log("\n22:");
outer22(1);

/* =====================================================
   23. Closure over arguments object
===================================================== */
function fn23(a, b = () => arguments[0]) {
  arguments[0] = 10;
  a = 20;
  return b();
}

console.log("\n23:");
console.log(fn23(1));

/* =====================================================
   24. Immediate evaluation in default
===================================================== */
function fn24(a, b = (() => a)()) {
  a = 10;
  return b;
}

console.log("\n24:");
console.log(fn24(1));

/* =====================================================
   25. Nested closure evaluation
===================================================== */
function fn25(a, b = () => (() => a)()) {
  a = 10;
  return b();
}

console.log("\n25:");
console.log(fn25(1));

/* =====================================================
   26. Variable vs arguments closure
===================================================== */
function fn26(a, b = () => a, c = () => arguments[0]) {
  a = 10;
  arguments[0] = 20;
  return [b(), c()];
}

console.log("\n26:");
console.log(fn26(1));

/* =====================================================
   27. Math.max spread vs array
===================================================== */
console.log("\n27:");
console.log(Math.max([1, 2]));     // NaN
console.log(Math.max(...[1, 2]));  // 2

console.log("\n=== End ===");