// Задача 1 — debounce

function debounce(fn, ms) {
  let timer;

  return function wrapper(...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, ms);
  };
}

// Задача 2 — throttle

function throttle(fn, ms) {
  let isThrottled = false;
  let lastArgs = undefined;

  return function wrapper(...args) {
    if (isThrottled) {
      lastArgs = args;
      return;
    }

    fn(...args);
    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;

      if (lastArgs !== undefined) {
        let newArgs = lastArgs;
        lastArgs = undefined;
        wrapper.apply(this, newArgs);
      }
    }, ms);
  };
}

// Задача 3 — Promise.all

async function PromiseAll(arr) {
  let final = [];

  for (let el of arr) {
    try {
      final.push(await el);
    } catch (error) {
      return Promise.reject("err");
    }
  }

  return final;
}

// Задача 4 — once

function once(fn) {
  let called = false;
  return function wrapper(...args) {
    if (called) {
      return;
    }

    fn(...args);
    called = true;
  };
}

// Задача 5 — memoize

function memoize(fn) {
  function wrapper(...args) {
    let key = args.join(",");

    if (wrapper.cache.has(key)) {
      return wrapper.cache.get(key);
    }

    let res = fn(...args);
    wrapper.cache.set(key, res);
    return res;
  }

  wrapper.cache = new Map();
  return wrapper;
}

// Задача 6 — groupBy

function groupBy(arr, name) {
  let final = {};

  arr.forEach((el) => {
    let x = el[name];

    if (final.hasOwnProperty(x)) {
      final[x].push(el);
    } else {
      final[x] = [el];
    }
  });

  return final;
}

// Задача 7 — flatten

function flatten(arr) {
  let final = [];

  for (let el of arr) {
    if (!Array.isArray(el)) {
      final.push(el);
    } else {
      final.push(...flatten(el));
    }
  }

  return final;
}

// Задача 8 — Event Delegation

<ul id="list">
  <li>
    JS <button>X</button>
  </li>
  <li>
    React <button>X</button>
  </li>
</ul>;

let list = document.getElementById("list");

list.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const li = e.target.closest("li");

    li.remove();
  }
});

// Задача 9 — deep clone

function deepClone(a) {
  let final;

  if (Array.isArray(a)) {
    final = [];

    for (let el of a) {
      if (!Array.isArray(el)) {
        final.push(el);
      } else {
        final.push(deepClone(el));
      }
    }
  } else {
    let keys = Object.keys(a);
    final = {};

    for (let i = 0; i <= keys.length - 1; i++) {
      let value = a[keys[i]];

      if (typeof value !== "object" || value === null) {
        final[keys[i]] = value;
      } else {
        final[keys[i]] = deepClone(value);
      }
    }
  }

  return final;
}

// Задача 10 — compose

function compose(...fns) {
  return function (value) {
    return fns.reduceRight((acc, fn) => fn(acc), value);
  };
}

// Задача 11 — sleep // тут одна строчка, что нужно сделать то

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Задача 12 — retry

async function retry(fn, count) {
  let lastError;

  for (let i = 0; i < count; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}


function PrAll(arr) {
  return new Promise((resolve, reject) => {
    let final = [];
    let count = 0;

    if (arr.length === 0) {
      resolve([])
      return
    }

    arr.forEach((promise, index) => {
      Promise.resolve(promise).then((value) => {
        final[index] = value;
        count++

        if (count === arr.length) {
          resolve(final)
        }
      })
      .catch(reject)
    })
  })
}