/**
 * JavaScript "this" Practice
 *
 * Topics:
 * - strict mode
 * - function call context
 * - arrow functions vs regular functions
 * - context loss
 * - nested functions
 *
 * Instructions:
 * Try to predict the result before running.
 */

"use strict";

console.log("===== LEVEL 1: Basics =====");

// 1
const obj1 = {
  x: 10,
  fn() {
    return this;
  },
};
// Expected: obj1
console.log("1:", obj1.fn());

// 2
const obj2 = {
  x: 10,
  fn() {
    return this.x;
  },
};
// Expected: 10
console.log("2:", obj2.fn());

// 3
const obj3 = {
  fn() {
    return function () {
      return this;
    };
  },
};
// Expected: undefined
console.log("3:", obj3.fn()());

// 4
const obj4 = {
  fn() {
    return function () {
      return this.x;
    };
  },
};
// Expected: error
try {
  console.log("4:", obj4.fn()());
} catch (e) {
  console.log("4: error");
}

console.log("===== LEVEL 2: Arrow Functions =====");

// 5
const obj5 = {
  x: 10,
  fn() {
    return () => this;
  },
};
// Expected: obj5
console.log("5:", obj5.fn()());

// 6
const obj6 = {
  x: 10,
  fn() {
    return () => this.x;
  },
};
// Expected: 10
console.log("6:", obj6.fn()());

// 7
const obj7 = {
  x: 10,
  fn: () => this,
};
// Expected: undefined (in strict mode)
console.log("7:", obj7.fn());

// 8
const obj8 = {
  x: 10,
  fn: () => this, // this.x actually
};
// Expected: not 10
try {
  console.log("8:", obj8.fn());
} catch (e) {
  console.log("8: error");
}

console.log("===== LEVEL 3: Context Loss =====");

// 9
const obj9 = {
  x: 10,
  fn() {
    return this.x;
  },
};
const f9 = obj9.fn;
// Expected: error
try {
  console.log("9:", f9());
} catch (e) {
  console.log("9: error");
}

// 10
const obj10 = {
  x: 10,
  fn() {
    return this;
  },
};
const f10 = obj10.fn;
// Expected: undefined
console.log("10:", f10());

console.log("===== LEVEL 4: Nested =====");

// 11
const obj11 = {
  x: 10,
  fn() {
    const inner = () => this;
    return inner();
  },
};
// Expected: obj11
console.log("11:", obj11.fn());

// 12
const obj12 = {
  x: 10,
  fn() {
    const inner = () => this.x;
    return inner;
  },
};
const f12 = obj12.fn();
// Expected: 10
console.log("12:", f12());

// 13
const obj13 = {
  x: 10,
  fn() {
    const inner = () => {
      return function () {
        return this;
      };
    };
    return inner();
  },
};
// Expected: undefined
console.log("13:", obj13.fn()());

// 14
const obj14 = {
  x: 10,
  fn() {
    const inner = () => {
      return function () {
        return this.x;
      };
    };
    return inner();
  },
};
// Expected: error
try {
  console.log("14:", obj14.fn()());
} catch (e) {
  console.log("14: error");
}

console.log("===== LEVEL 5: Mixed =====");

// 15
const obj15 = {
  x: 10,
  fn() {
    return () => {
      return () => {
        return this.x;
      };
    };
  },
};
// Expected: 10
console.log("15:", obj15.fn()()());
