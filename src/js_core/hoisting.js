"use strict";

/**
 * Hoisting, TDZ, IIFE Practice File
 *
 * This file contains solved examples with explanations.
 * Good for revision before interviews.
 */

/* =====================================================
   1. Function Declaration vs Hoisting
===================================================== */

function foo1() {
  return 2;
}

console.log("1:", foo1);   // function
console.log("1:", foo1()); // 2


/* =====================================================
   2. Function vs var
===================================================== */

console.log("2:", foo2); // function

function foo2() {}

var foo2 = 1;

console.log("2:", foo2); // 1


/* =====================================================
   3. var hoisting inside function
===================================================== */

var a = 1;

function test3() {
  console.log("3:", a); // undefined (local var a hoisted)
  var a = 2;
}

test3();


/* =====================================================
   4. let and TDZ
===================================================== */

let b = 1;

function test4() {
  // console.log(b); // ❌ ReferenceError (TDZ)
  let b = 2;
}

test4();


/* =====================================================
   5. TDZ in block
===================================================== */

let x = 10;

{
  // console.log(x); // ❌ ReferenceError
  let x = 20;
}


/* =====================================================
   6. function vs var inside function
===================================================== */

function test6() {
  console.log("6:", foo); // function

  function foo() {}
  var foo = 1;

  console.log("6:", foo); // 1
}

test6();


/* =====================================================
   7. Multiple function declarations
===================================================== */

function foo7() {
  console.log("A");
}

function foo7() {
  console.log("B");
}

foo7(); // "B"


/* =====================================================
   8. function + reassignment
===================================================== */

function foo8() {
  console.log("A");
}

foo8(); // "A"

foo8 = function () {
  console.log("B");
};

foo8(); // "B"


/* =====================================================
   9. IIFE (Immediately Invoked Function Expression)
===================================================== */

(function () {
  console.log("9: IIFE works");
})();


/* =====================================================
   10. IIFE + hoisting
===================================================== */

(function () {
  console.log("10:", foo); // function

  function foo() {}
  var foo = 2;

  console.log("10:", foo); // 2
})();


/* =====================================================
   11. foo vs foo()
===================================================== */

function foo11() {
  return 42;
}

console.log("11:", foo11);   // function
console.log("11:", foo11()); // 42


/* =====================================================
   12. function returning function
===================================================== */

function foo12() {
  return function () {
    return 10;
  };
}

console.log("12:", foo12);     // function
console.log("12:", foo12());   // function
console.log("12:", foo12()()); // 10


/* =====================================================
   13. console.log inside function
===================================================== */

function foo13() {
  console.log("A");
}

console.log("13:", foo13);     // function
console.log("13:", foo13());   // "A", then undefined


/* =====================================================
   14. var inside block
===================================================== */

var z = 1;

{
  var z = 2;
}

console.log("14:", z); // 2


/* =====================================================
   15. let inside block
===================================================== */

let y = 1;

{
  let y = 2;
}

console.log("15:", y); // 1


/* =====================================================
   16. var in if block (function scope)
===================================================== */

var k = 1;

function test16() {
  console.log("16:", k); // undefined

  if (true) {
    var k = 2;
  }

  console.log("16:", k); // 2
}

test16();


/* =====================================================
   17. TDZ inside function
===================================================== */

let m = 1;

function test17() {
  // console.log(m); // ❌ TDZ
  let m = 2;
}

test17();


/* =====================================================
   CHEATSHEET
===================================================== */

/**
 * 1. Function Declaration hoisted fully
 * 2. var hoisted as undefined
 * 3. let/const → TDZ
 * 4. function > var at creation phase
 * 5. BUT final value = last assignment in execution
 * 6. foo !== foo()
 * 7. var is function-scoped
 * 8. let is block-scoped
 */