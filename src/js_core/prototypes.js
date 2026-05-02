"use strict";

/**
 * =====================================================
 * PROTOTYPES PRACTICE (Interview Level)
 * =====================================================
 *
 * Topics:
 * - __proto__
 * - Object.create
 * - prototype chain
 * - shadowing
 * - delete
 * - setPrototypeOf
 * - new + prototype
 * - bind + new
 */

/* =====================================================
   1. Prototype chain (__proto__)
===================================================== */

let head = {
  glasses: 1
};

let table = {
  __proto__: head,
  pen: 3
};

let bed = {
  __proto__: table,
  sheet: 1,
  pillow: 2
};

let pockets = {
  __proto__: bed,
  money: 2000
};

console.log(pockets.pen);      // 3
console.log(bed.glasses);      // 1
console.log(pockets.glasses);  // 1

/* =====================================================
   2. Shared prototype state problem
===================================================== */

let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

speedy.eat("apple");

console.log(speedy.stomach); // ["apple"]
console.log(lazy.stomach);   // ["apple"] ❗ shared state

/* =====================================================
   3. Fix: own state per object
===================================================== */

let hamster2 = {
  eat(food) {
    this.stomach.push(food);
  }
};

let speedy2 = {
  stomach: [],
  __proto__: hamster2
};

let lazy2 = {
  stomach: [],
  __proto__: hamster2
};

speedy2.eat("apple");

console.log(speedy2.stomach); // ["apple"]
console.log(lazy2.stomach);   // []

/* =====================================================
   4. Function.prototype.defer
===================================================== */

function f(a, b) {
  console.log(a + b);
}

Function.prototype.defer = function (ms) {
  const f = this;

  return function (...args) {
    setTimeout(() => f.apply(this, args), ms);
  };
};

f.defer(1000)(1, 2); // 3 через 1 сек

/* =====================================================
   5. Object.create basics
===================================================== */

const parent = { x: 1 };
const obj = Object.create(parent);

console.log(obj.x); // 1

/* =====================================================
   6. Shadowing
===================================================== */

obj.x = 2;
console.log(obj.x);      // 2
console.log(parent.x);   // 1

/* =====================================================
   7. delete reveals prototype
===================================================== */

delete obj.x;
console.log(obj.x); // 1

/* =====================================================
   8. Multi-level chain
===================================================== */

const child = Object.create(parent);
const obj2 = Object.create(child);

console.log(obj2.x); // 1

/* =====================================================
   9. Shadowing in middle
===================================================== */

child.x = 2;
console.log(obj2.x); // 2

/* =====================================================
   10. delete in middle
===================================================== */

delete child.x;
console.log(obj2.x); // 1

/* =====================================================
   11. Prototype mutation
===================================================== */

const proto = { x: 1 };
const obj3 = Object.create(proto);

proto.x = 2;
console.log(obj3.x); // 2

/* =====================================================
   12. Prototype reassignment
===================================================== */

let proto2 = { x: 1 };
const obj4 = Object.create(proto2);

proto2 = { x: 2 };
console.log(obj4.x); // 1

/* =====================================================
   13. setPrototypeOf
===================================================== */

Object.setPrototypeOf(obj4, { x: 3 });
console.log(obj4.x); // 3

/* =====================================================
   14. Own property priority
===================================================== */

obj4.x = 10;
console.log(obj4.x); // 10

/* =====================================================
   15. Constructor prototype
===================================================== */

function A() {}
A.prototype.x = 1;

const a = new A();
console.log(a.x); // 1

/* =====================================================
   16. Instance overrides prototype
===================================================== */

a.x = 2;
console.log(a.x);             // 2
console.log(A.prototype.x);   // 1

/* =====================================================
   17. Prototype mutation affects instances
===================================================== */

A.prototype.x = 5;
console.log(a.x); // 2 (own property)
delete a.x;
console.log(a.x); // 5

/* =====================================================
   18. Replacing prototype
===================================================== */

function B() {}
B.prototype.x = 1;

const b = new B();

B.prototype = { x: 2 };

console.log(b.x); // 1

/* =====================================================
   19. Old vs new instances
===================================================== */

const b2 = new B();

console.log(b.x, b2.x); // 1 2

/* =====================================================
   20. bind + new
===================================================== */

function C() {
  this.x = 1;
}

const objBind = { x: 2 };

const Bound = C.bind(objBind);

const c = new Bound();

console.log(c.x);       // 1
console.log(objBind.x); // 2

/* =====================================================
   21. bind without new
===================================================== */

Bound();
console.log(objBind.x); // 1

/**
 * =====================================================
 * SUMMARY
 * =====================================================
 *
 * obj.x →
 *   1. ищем в obj
 *   2. если нет → в __proto__
 *   3. пока не null
 *
 * Object.create(proto) →
 *   создаёт объект с этим прототипом
 *
 * delete →
 *   удаляет только свои свойства
 *
 * new →
 *   создаёт объект с prototype функции
 *
 * bind →
 *   фиксирует this (кроме new)
 */