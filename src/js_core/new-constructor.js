"use strict";

/**
 * JavaScript Practice: new / Constructor Functions
 *
 * Topics:
 * - new operator
 * - this behavior
 * - return in constructor
 * - shared objects
 * - simple constructors (Calculator, Accumulator)
 */

console.log("=== NEW / CONSTRUCTOR PRACTICE ===");

/* =====================================================
   1. return same object from different constructors
===================================================== */

let obj = {};

function A() {
  return obj;
}

function B() {
  return obj;
}

let a = new A();
let b = new B();

console.log("same object:", a == b); // true

/* =====================================================
   2. Calculator constructor
===================================================== */

function Calculator() {
  this.read = function () {
    this.x = prompt("Введите x", 1);
    this.y = prompt("Введите y", 1);
  };

  this.sum = function () {
    return Number(this.x) + Number(this.y);
  };

  this.mul = function () {
    return this.x * this.y;
  };
}

let calculator = new Calculator();

// calculator.read();
// alert("Sum=" + calculator.sum());
// alert("Mul=" + calculator.mul());

console.log("calculator created:", typeof calculator);

/* =====================================================
   3. Accumulator constructor
===================================================== */

function Accumulator(startingValue) {
  this.value = startingValue;

  this.read = function () {
    let x = prompt("Введите x", 0);
    this.value += Number(x);
  };
}

let accumulator = new Accumulator(1);

// accumulator.read();
// accumulator.read();

// alert(accumulator.value);

console.log("accumulator start:", accumulator.value);

/* =====================================================
   4. return object replaces this
===================================================== */

function A2() {
  this.x = 1;
  return { x: 2 };
}

const a2 = new A2();
console.log("return object:", a2.x); // 2

/* =====================================================
   5. return primitive ignored
===================================================== */

function A3() {
  this.x = 1;
  return 5;
}

const a3 = new A3();
console.log("return primitive:", a3.x); // 1

/* =====================================================
   6. arrow keeps this
===================================================== */

function A4() {
  this.x = 1;

  const inner = () => {
    this.x = 2;
  };

  inner();
}

const a4 = new A4();
console.log("arrow this:", a4.x); // 2

/* =====================================================
   7. inner function loses this
===================================================== */

function A5() {
  this.x = 1;

  function inner() {
    this.x = 2;
  }

  inner();
}

const a5 = new A5();
console.log("inner a5.x:", a5.x); // 1
console.log("inner global:", globalThis.x); // 2 (non-strict)

/* =====================================================
   8. losing context
===================================================== */

function A6() {
  this.x = 1;

  this.getX = function () {
    return this.x;
  };
}

const a6 = new A6();
const f6 = a6.getX;

console.log("lost this:", f6()); // undefined

console.log("=== END ===");