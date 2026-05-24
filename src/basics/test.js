function once(fn) {
  let called = false;
  let res;

  return function wrapper() {
    if (called) {
      return res;
    }

    res = fn();
    called = true;
    return res;
  };
}

const init = once(() => {
  console.log("init");
  return 42;
});

console.log(init()); // 42
console.log(init()); // 42, но "init" больше не печатается
console.log(init()); // 42

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

delay(1000).then(() => console.log("done"));

async function asyncMapSequential(items, asyncFn) {
  const result = [];

  for (let el of items) {
    let value = await asyncFn(el);
    result.push(value);
  }

  return result;
}

const result = await asyncMapSequential([1, 2, 3], async (x) => x * 2);
console.log(result);

async function asyncMapParallel(items, asyncFn) {
  let arr = items.map((item) => asyncFn(item));
  return Promise.all(arr);
}

const result2 = await asyncMapParallel([1, 2, 3], async (x) => x * 2);
console.log(result2);

async function retry(fn, n) {
  let lastError;

  for (let i = 0; i < n; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}

const result3 = await retry(fetchData, 3);
console.log(result3);

function groupBy(arr, keyFn) {
  let res = {};

  for (let el of arr) {
    let key = keyFn(el);
    if (res[key]) {
      res[key].push(el);
    } else {
      res[key] = [el];
    }
  }

  return res;
}

console.log(
  groupBy(
    [
      { type: "fruit", name: "apple" },
      { type: "fruit", name: "banana" },
      { type: "vegetable", name: "carrot" },
    ],
    (item) => item.type,
  ),
);

function deepClone(value) {
  let res;

  if (typeof value !== "object" || value === null) {
    res = value;
  } else if (Array.isArray(value)) {
    res = [];

    for (let el of value) {
      if (typeof el !== "object" || el === null) {
        res.push(el);
      } else {
        res.push(deepClone(el));
      }
    }
  } else if (!Array.isArray(value)) {
    res = {};
    for (let key of Object.keys(value)) {
      if (typeof value[key] !== "object" || value[key] === null) {
        res[key] = value[key];
      } else {
        res[key] = deepClone(value[key]);
      }
    }
  }

  return res;
}

console.log(deepClone([2, 4, [1, 2, 3]]));
console.log(deepClone([]));
console.log(deepClone({ 1: 2, 2: 3, 3: 4 }));
console.log(deepClone(3));
console.log(deepClone({ 1: { 1: 1, 2: 1 }, 2: 3, 3: 4 }));

class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, handler) {
    if (this.events[eventName]) {
      this.events[eventName].push(handler);
    } else {
      this.events[eventName] = [handler];
    }
  }
  off(eventName, handler) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        (el) => el !== handler,
      );
    }
  }
  emit(eventName, payload) {
    if (!this.events[eventName]) {
      return;
    }

    this.events[eventName].forEach((el) => {
      el(payload);
    });
  }
}

const emitter = new EventEmitter();

function handler(data) {
  console.log("handler:", data);
}

emitter.on("message", handler);

emitter.emit("message", "hello");

emitter.off("message", handler);

emitter.emit("message", "bye");
