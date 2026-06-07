// ======================================================
// Part 1. Predict the output
// ======================================================

/*
1. What will be logged and why?

console.log(a);

var a = 10;

console.log(a);

Answer: undefined, 10
*/

/*
2. What will be logged and why?

console.log(a);

let a = 10;

Answer: Error, a in TDZ
*/

/*
3. What will be logged and why?

function test() {
  console.log(x);

  if (true) {
    var x = 5;
  }

  console.log(x);
}

test();

Answer: undefined, 5
*/

/*
4. What will be logged and why?

function test() {
  let x = 1;

  if (true) {
    let x = 2;
    console.log(x);
  }

  console.log(x);
}

test();

Answer: 2, 1
*/

/*
5. What will be logged and why?

const user = {
  name: "Alice",
  sayName: function () {
    console.log(this.name);
  },
};

const fn = user.sayName;

user.sayName();
fn();

Answer: Alice, undefined
*/

/*
6. What will be logged and why?

const user = {
  name: "Alice",
  sayName: () => {
    console.log(this.name);
  },
};

user.sayName();

Answer: undefined
*/

/*
7. What will be logged and why?

console.log(1);

setTimeout(() => {
  console.log(2);
}, 0);

Promise.resolve().then(() => {
  console.log(3);
});

console.log(4);

Answer: 1, 4, 3, 2
*/

/*
8. What will be logged and why?

async function test() {
  console.log(1);

  await Promise.resolve();

  console.log(2);
}

console.log(3);
test();
console.log(4);

Answer: 3, 1, 4, 2
*/

/*
9. What will be logged and why?

let a = { value: 1 };
let b = a;

b.value = 2;

console.log(a.value);

Answer: 2
*/

/*
10. What will be logged and why?

let a = { value: 1 };
let b = { value: 1 };

console.log(a === b);
console.log(a.value === b.value);

Answer: false, true
*/

/*
11. What will be logged and why?

console.log([] == false);
console.log([] === false);

Answer: true, false
*/

/*
12. What will be logged and why?

console.log(null == undefined);
console.log(null === undefined);
console.log(null > 0);
console.log(null >= 0);

Answer: true, false, false, true
*/

/*
13. What will be logged and why?

const arr = [1, 2, 3];

const result = arr.map((num) => {
  if (num > 1) {
    return num * 2;
  }
});

console.log(result);

Answer: [undefined, 4, 6]
*/

/*
14. What will be logged and why?

const arr = [1, 2, 3, 4];

const result = arr.filter((num) => {
  return num % 2;
});

console.log(result);

Answer: [1, 3]
*/

/*
15. What will be logged and why?

const arr = [1, 2, 3];

arr.forEach((num) => {
  return num * 2;
});

console.log(arr);

Answer: [1, 2, 3]
*/

// ======================================================
// Part 2. Implementation tasks
// ======================================================

function assertEqual(actual, expected, testName) {
  if (actual !== expected) {
    console.error(`❌ ${testName}`);
    console.error("Expected:", expected);
    console.error("Actual:  ", actual);
    return;
  }

  console.log(`✅ ${testName}`);
}

function assertDeepEqual(actual, expected, testName) {
  const actualJson = JSON.stringify(actual);
  const expectedJson = JSON.stringify(expected);

  if (actualJson !== expectedJson) {
    console.error(`❌ ${testName}`);
    console.error("Expected:", expected);
    console.error("Actual:  ", actual);
    return;
  }

  console.log(`✅ ${testName}`);
}

// ------------------------------------------------------
// 21. once
// ------------------------------------------------------

/*
Implement once(fn).

It should call fn only once.
The first call should return the result of fn.
All next calls should return undefined.
It should preserve this and arguments.
*/

function once(fn) {
  let called = false;

  return function wrapper(...args) {
    if (called) {
      return undefined;
    } else {
      called = true;
      return fn.apply(this, args);
    }
  };
}

const sayHi = once(() => "hi");
assertEqual(sayHi(), "hi", "once returns result on first call");
assertEqual(sayHi(), undefined, "once returns undefined on second call");
assertEqual(sayHi(), undefined, "once returns undefined on third call");

const counterObj = {
  value: 1,
  inc: once(function (step) {
    this.value += step;
    return this.value;
  }),
};

assertEqual(counterObj.inc(2), 3, "once preserves this and arguments");
assertEqual(counterObj.inc(2), undefined, "once does not call function again");

// ------------------------------------------------------
// 22. myMap
// ------------------------------------------------------

/*
Implement myMap(arr, callback).

It should:
- return a new array
- not mutate the original array
- pass value, index and array to callback
*/

function myMap(arr, callback) {
  let result = [];

  for (let i = 0; i <= arr.length - 1; i++) {
    result[i] = callback(arr[i], i, arr);
  }

  return result;
}

const numbers = [1, 2, 3];

assertDeepEqual(
  myMap(numbers, (num) => num * 2),
  [2, 4, 6],
  "myMap maps values",
);

assertDeepEqual(numbers, [1, 2, 3], "myMap does not mutate original array");

assertDeepEqual(
  myMap([10, 20, 30], (num, index) => num + index),
  [10, 21, 32],
  "myMap passes index",
);

// ------------------------------------------------------
// 23. myFilter
// ------------------------------------------------------

/*
Implement myFilter(arr, callback).

It should:
- return a new array
- include only elements for which callback returns truthy value
- pass value, index and array to callback
*/

function myFilter(arr, callback) {
  let result = [];

  for (let i = 0; i <= arr.length - 1; i++) {
    if (Boolean(callback(arr[i], i, arr))) {
      result.push(arr[i]);
    }
  }

  return result;
}

assertDeepEqual(
  myFilter([1, 2, 3, 4], (num) => num % 2 === 0),
  [2, 4],
  "myFilter filters even numbers",
);

assertDeepEqual(
  myFilter(["a", "", "b"], (str) => str),
  ["a", "b"],
  "myFilter uses truthy/falsy result",
);

assertDeepEqual(
  myFilter([10, 20, 30], (num, index) => index > 0),
  [20, 30],
  "myFilter passes index",
);

// ------------------------------------------------------
// 24. groupBy
// ------------------------------------------------------

/*
Implement groupBy(arr, key).

Example:
groupBy(users, "role")

Should return:
{
  admin: [...],
  user: [...]
}
*/

function groupBy(arr, key) {
  let result = {};

  for (let el of arr) {
    if (result[el[key]]) {
      result[el[key]].push(el);
    } else {
      result[el[key]] = [el];
    }
  }

  return result;
}

const users = [
  { name: "Ann", role: "admin" },
  { name: "Bob", role: "user" },
  { name: "Kate", role: "admin" },
];

assertDeepEqual(
  groupBy(users, "role"),
  {
    admin: [
      { name: "Ann", role: "admin" },
      { name: "Kate", role: "admin" },
    ],
    user: [{ name: "Bob", role: "user" }],
  },
  "groupBy groups objects by key",
);

// ------------------------------------------------------
// 25. deepClone
// ------------------------------------------------------

/*
Implement deepClone(value).

Support:
- primitives
- null
- plain objects
- arrays

Do not support:
- Date
- Map
- Set
- functions
- cyclic references
*/

function deepClone(value) {
  if (typeof value !== "object" || value === null) {
    return value;
  }

  let fin = Array.isArray(value) ? [] : {};

  for (let key of Object.keys(value)) {
    fin[key] = deepClone(value[key]);
  }

  return fin;
}

const originalObj = {
  name: "Alice",
  address: {
    city: "Haifa",
  },
  tags: ["frontend", "react"],
};

const clonedObj = deepClone(originalObj);
clonedObj.address.city = "Tel Aviv";
clonedObj.tags.push("typescript");

assertEqual(
  originalObj.address.city,
  "Haifa",
  "deepClone does not share nested object references",
);

assertDeepEqual(
  originalObj.tags,
  ["frontend", "react"],
  "deepClone does not share nested array references",
);

assertEqual(deepClone(null), null, "deepClone handles null");
assertEqual(deepClone(42), 42, "deepClone handles numbers");
assertEqual(deepClone("hello"), "hello", "deepClone handles strings");

// ------------------------------------------------------
// 26. debounce
// ------------------------------------------------------

/*
Implement debounce(fn, delay).

It should:
- return a wrapper function
- clear previous timer on every call
- call fn only after delay ms passed since the last call
- preserve this and arguments

Manual check:
Uncomment the code below after implementing debounce.
*/

function debounce(fn, delay) {
  let timer;

  return function wrapper(...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

const debouncedLog = debounce((value) => {
  console.log("Debounced value:", value);
}, 500);

debouncedLog("a");
debouncedLog("ab");
debouncedLog("abc");

// Expected after 500ms:
// Debounced value: abc

// ======================================================
// Part 4. Bonus tasks
// ======================================================

/*
27. Implement myReduce(arr, callback, initialValue).

Do not use Array.prototype.reduce.
Think about the case when initialValue is not provided.
*/

function myReduce(arr, callback, initialValue) {
  // TODO
}

/*
28. Implement compose.

Example:
const add1 = (x) => x + 1;
const double = (x) => x * 2;

const fn = compose(double, add1);

fn(3); // double(add1(3)) => 8
*/

function compose(...fns) {
  // TODO
}

/*
29. Implement curry.

Example:
function sum(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum);

curriedSum(1)(2)(3); // 6
curriedSum(1, 2)(3); // 6
curriedSum(1)(2, 3); // 6
*/

function curry(fn) {
  // TODO
}

// ======================================================
// End
// ======================================================

console.log("\nDone. Some tests will fail until you implement TODO functions.");
