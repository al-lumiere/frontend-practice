"use strict";

/**
 * JavaScript Practice: Closures
 * Run with: node closures-practice.js
 */

console.log("=== Closures Practice ===");

/* =====================================================
   1. Basic counter with closure
===================================================== */
function createCounter1() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter1 = createCounter1();

console.log("\n1:");
console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter1()); // 3

/* =====================================================
   2. Post-increment inside closure
===================================================== */
function createCounter2() {
  let count = 0;

  return function () {
    return count++;
  };
}

const counter2 = createCounter2();

console.log("\n2:");
console.log(counter2()); // 0
console.log(counter2()); // 1
console.log(counter2()); // 2

/* =====================================================
   3. Closure keeps access to outer variable
===================================================== */
function fn3() {
  let a = 1;

  return function () {
    return a;
  };
}

const f3 = fn3();

console.log("\n3:");
console.log(f3()); // 1

/* =====================================================
   4. Closure variable is not global
===================================================== */
function fn4() {
  let a = 1;

  return function () {
    a++;
  };
}

const f4 = fn4();

f4();
f4();

console.log("\n4:");
try {
  console.log(a);
} catch (error) {
  console.log("ReferenceError"); // ReferenceError
}

/* =====================================================
   5. Separate closures from separate function calls
===================================================== */
function fn5() {
  let a = 1;

  return function () {
    return ++a;
  };
}

const f5_1 = fn5();
const f5_2 = fn5();

console.log("\n5:");
console.log(f5_1()); // 2
console.log(f5_1()); // 3
console.log(f5_2()); // 2

/* =====================================================
   6. Same function reference, same closure
===================================================== */
function fn6() {
  let a = 1;

  return function () {
    return a;
  };
}

const f6 = fn6();
const g6 = f6;

console.log("\n6:");
console.log(g6()); // 1

/* =====================================================
   7. var in loop with setTimeout
===================================================== */
console.log("\n7:");

for (var i7 = 0; i7 < 3; i7++) {
  setTimeout(() => console.log(i7), 0); // 3, 3, 3
}

/* =====================================================
   8. let in loop with setTimeout
===================================================== */
console.log("\n8:");

for (let i8 = 0; i8 < 3; i8++) {
  setTimeout(() => console.log(i8), 0); // 0, 1, 2
}

/* =====================================================
   9. var with regular function in setTimeout
===================================================== */
console.log("\n9:");

for (var i9 = 0; i9 < 3; i9++) {
  setTimeout(function () {
    console.log(i9);
  }, 0); // 3, 3, 3
}

/* =====================================================
   10. Fix var loop with IIFE
===================================================== */
console.log("\n10:");

for (var i10 = 0; i10 < 3; i10++) {
  (function (current) {
    setTimeout(() => console.log(current), 0);
  })(i10);
}
// 0, 1, 2

/* =====================================================
   11. Nested closures
===================================================== */
function fn11() {
  let a = 1;

  return function inner() {
    return function nested() {
      return a;
    };
  };
}

const inner11 = fn11();
const nested11 = inner11();

console.log("\n11:");
console.log(nested11()); // 1

/* =====================================================
   12. Closure as private state
===================================================== */
function createState12() {
  let a = 1;

  return {
    get() {
      return a;
    },
    set(value) {
      a = value;
    },
  };
}

const state12 = createState12();

state12.set(10);

console.log("\n12:");
console.log(state12.get()); // 10

/* =====================================================
   13. Post-increment returned from closure
===================================================== */
function fn13() {
  let a = 1;

  return function () {
    return a++;
  };
}

const f13 = fn13();

console.log("\n13:");
console.log(f13()); // 1
console.log(f13()); // 2
console.log(f13()); // 3

/* =====================================================
   14. Pre-increment returned from closure
===================================================== */
function fn14() {
  let a = 1;

  return function () {
    return ++a;
  };
}

const f14 = fn14();

console.log("\n14:");
console.log(f14()); // 2
console.log(f14()); // 3
console.log(f14()); // 4

/* =====================================================
   15. Functions created in var loop
===================================================== */
function createFunctions15() {
  const result = [];

  for (var i = 0; i < 3; i++) {
    result.push(function () {
      return i;
    });
  }

  return result;
}

const arr15 = createFunctions15();

console.log("\n15:");
console.log(arr15[0]()); // 3
console.log(arr15[1]()); // 3
console.log(arr15[2]()); // 3

/* =====================================================
   16. Functions created in var loop fixed with IIFE
===================================================== */
function createFunctions16() {
  const result = [];

  for (var i = 0; i < 3; i++) {
    (function (current) {
      result.push(function () {
        return current;
      });
    })(i);
  }

  return result;
}

const arr16 = createFunctions16();

console.log("\n16:");
console.log(arr16[0]()); // 0
console.log(arr16[1]()); // 1
console.log(arr16[2]()); // 2

/* =====================================================
   17. Closure vs this: call does not affect closure
===================================================== */
function fn17() {
  let a = 1;

  return function () {
    return a;
  };
}

const f17 = fn17();

console.log("\n17:");
console.log(f17.call({ a: 100 })); // 1

/* =====================================================
   18. this depends on call site
===================================================== */
const obj18 = {
  a: 1,
  get() {
    return this.a;
  },
};

const f18 = obj18.get;

console.log("\n18:");
console.log(f18()); // undefined

/* =====================================================
   19. Closure + this together
===================================================== */
function fn19() {
  let a = 1;

  return function () {
    return a + this.a;
  };
}

const f19 = fn19();

console.log("\n19:");
console.log(f19.call({ a: 10 })); // 11

/* =====================================================
   20. Different counters have different closures
===================================================== */
function createCounter20() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const c20_1 = createCounter20();
const c20_2 = createCounter20();

console.log("\n20:");
console.log(c20_1()); // 1
console.log(c20_1()); // 2
console.log(c20_2()); // 1
console.log(c20_1()); // 3

/* =====================================================
   21. Detached methods still share closure
===================================================== */
function fn21() {
  let value = 1;

  return {
    get() {
      return value;
    },
    inc() {
      value++;
    },
  };
}

const obj21 = fn21();

const get21 = obj21.get;
const inc21 = obj21.inc;

inc21();
inc21();

console.log("\n21:");
console.log(get21()); // 3

/* =====================================================
   22. Nearest lexical scope wins
===================================================== */
function fn22() {
  let a = 1;

  return function inner() {
    let a = 10;

    return function nested() {
      return a;
    };
  };
}

const inner22 = fn22();
const nested22 = inner22();

console.log("\n22:");
console.log(nested22()); // 10

/* =====================================================
   23. Same returned function reference shares state
===================================================== */
function fn23() {
  let a = 1;
  return () => ++a;
}

const f23 = fn23();
const g23 = f23;

console.log("\n23:");
console.log(f23()); // 2
console.log(g23()); // 3

/* =====================================================
   24. Different function calls create different closures
===================================================== */
function fn24() {
  let a = 1;
  return () => a;
}

const f24 = fn24();
const g24 = fn24();

f24();
g24();

console.log("\n24:");
console.log(f24()); // 1

/* =====================================================
   25. Post-increment return value
===================================================== */
let a25 = 1;

function fn25() {
  return a25++;
}

console.log("\n25:");
console.log(fn25()); // 1
console.log(fn25()); // 2

/* =====================================================
   26. Pre-increment return value
===================================================== */
let a26 = 1;

function fn26() {
  return ++a26;
}

console.log("\n26:");
console.log(fn26()); // 2
console.log(fn26()); // 3

/* =====================================================
   27. Post-increment inside closure
===================================================== */
function fn27() {
  let a = 1;

  return function () {
    return a++;
  };
}

const f27 = fn27();

console.log("\n27:");
console.log(f27()); // 1
console.log(f27()); // 2

console.log("\n=== End ===");

/* =====================================================
   28. Closures with filter: inBetween / inArray
===================================================== */
function inBetween(a, b) {
  return function (x) {
    return x >= a && x <= b;
  };
}

function inArray(arr) {
  return function (x) {
    return arr.includes(x);
  };
}

let arr28 = [1, 2, 3, 4, 5, 6, 7];

console.log("\n28:");
console.log(arr28.filter(inBetween(3, 6)));   // [3, 4, 5, 6]
console.log(arr28.filter(inArray([1, 2, 10]))); // [1, 2]

/* =====================================================
   29. Closure for sorting: byField
===================================================== */
let users29 = [
  { name: "Ivan", age: 20, surname: "Ivanov" },
  { name: "Petr", age: 18, surname: "Petrov" },
  { name: "Anna", age: 19, surname: "Karenina" }
];

function byField(field) {
  return (a, b) => (a[field] > b[field] ? 1 : -1);
}

console.log("\n29:");
console.log(users29.sort(byField("name")));
console.log(users29.sort(byField("age")));

/* =====================================================
   30. makeArmy: fixing closure in loop
===================================================== */
function makeArmy() {
  let shooters = [];

  let i = 0;

  while (i < 10) {
    let j = i; // фиксируем значение для замыкания

    let shooter = function () {
      console.log(j);
    };

    shooters.push(shooter);
    i++;
  }

  return shooters;
}

let army = makeArmy();

console.log("\n30:");
army[0](); // 0
army[1](); // 1
army[2](); // 2