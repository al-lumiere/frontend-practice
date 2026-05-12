/**
 * JavaScript Core Practice
 *
 * Topics:
 * - arrays
 * - recursion
 * - async/await
 * - Promise utilities
 * - debounce/throttle
 * - memoization
 * - grouping
 * - retry logic
 * - recursion
 * - prototypes
 * - once
 *
 * Notes:
 * - Solutions are intentionally written in plain JavaScript.
 * - Focus is on understanding language mechanics and reasoning.
 */

// =====================================================
// 1. compact(arr)
// Removes all falsy values
// =====================================================

export function compact(arr) {
  const result = [];

  for (const item of arr) {
    if (Boolean(item)) {
      result.push(item);
    }
  }

  return result;
}

// console.log(compact([0, 1, false, 2, "", 3]));


// =====================================================
// 2. flatten(arr)
// Recursively flattens nested arrays
// =====================================================

export function flatten(arr) {
  const result = [];

  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...flatten(item));
    } else {
      result.push(item);
    }
  }

  return result;
}

// console.log(flatten([1, [2, [3, 4]], 5]));


// =====================================================
// 3. fetchWithAutoRetry(fetcher, retries)
// Retries async operation several times
// =====================================================

export async function fetchWithAutoRetry(fetcher, retries) {
  let lastError;

  for (let i = 0; i < retries; i++) {
    try {
      return await fetcher();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}


// =====================================================
// 4. splitWordsBySeparator(words, separator)
// Splits words by separator and removes empty items
// =====================================================

export function splitWordsBySeparator(words, separator) {
  const result = [];

  for (const word of words) {
    const parts = word.split(separator);

    for (const part of parts) {
      if (part.length > 0) {
        result.push(part);
      }
    }
  }

  return result;
}

// console.log(splitWordsBySeparator(["one.two.three", "four.five"], "."));


// =====================================================
// 5. addTwoPromises(promise1, promise2)
// Adds resolved values of two promises
// =====================================================

export async function addTwoPromises(promise1, promise2) {
  const [a, b] = await Promise.all([promise1, promise2]);

  return a + b;
}

// console.log(addTwoPromises(Promise.resolve(2), Promise.resolve(2)));


// =====================================================
// 6. memoize(fn)
// Caches function results
// =====================================================

export function memoize(fn) {
  const cache = new Map();

  return function wrapper(...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);

    cache.set(key, result);

    return result;
  };
}

// Example:

export function sum(a, b) {
  return a + b;
}

// const memoizedSum = memoize(sum);

// console.log(memoizedSum(1, 2));
// console.log(memoizedSum(1, 2));


// =====================================================
// 7. maximumValue(words)
// Returns maximum numeric/string value
// =====================================================

export function maximumValue(words) {
  let max = 0;

  for (const word of words) {
    if (/[a-zA-Z]/.test(word)) {
      max = Math.max(max, word.length);
    } else {
      max = Math.max(max, Number(word));
    }
  }

  return max;
}

// console.log(maximumValue(["alic3", "bob", "3", "4", "00000"]));


// =====================================================
// 8. findPath(from, to, fetchFlights)
// Recursive DFS path search
// =====================================================

export async function findPath(from, to, fetchFlights) {
  if (from === to) {
    return [from];
  }

  const flights = await fetchFlights(from);

  for (const next of flights || []) {
    const path = await findPath(next, to, fetchFlights);

    if (path.length > 0) {
      return [from, ...path];
    }
  }

  return [];
}


// =====================================================
// 9. groupBy(arr, key)
// Groups array items by object key
// =====================================================

export function groupBy(arr, key) {
  const result = {};

  for (const item of arr) {
    const value = item[key];

    if (!result[value]) {
      result[value] = [];
    }

    result[value].push(item);
  }

  return result;
}

// Example:

const users = [
  { name: "Ann", age: 20 },
  { name: "Kate", age: 20 },
  { name: "John", age: 30 },
];

// console.log(groupBy(users, "age"));


// =====================================================
// 10. myMap(arr, callback)
// Simplified implementation of Array.prototype.map
// =====================================================

export function myMap(arr, callback) {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i], i, arr));
  }

  return result;
}

// console.log(myMap([1, 2, 3], (x, i) => x + i));


// =====================================================
// 11. debounce(fn, ms)
// Executes function only after delay
// =====================================================

export function debounce(fn, ms) {
  let timer;

  return function wrapper(...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, ms);
  };
}

// Example:

// const debounced = debounce(console.log, 300);

// debounced(1);
// debounced(2);
// debounced(3);


// =====================================================
// 12. throttle(fn, ms)
// Limits function calls frequency
// =====================================================

export function throttle(fn, ms) {
  let isThrottled = false;
  let lastArgs;

  return function wrapper(...args) {
    if (isThrottled) {
      lastArgs = args;
      return;
    }

    fn.apply(this, args);

    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;

      if (lastArgs !== undefined) {
        const argsToRun = lastArgs;

        lastArgs = undefined;

        wrapper.apply(this, argsToRun);
      }
    }, ms);
  };
}

// Example:

// const throttled = throttle(console.log, 300);

// throttled(1);
// throttled(2);
// throttled(3);


// =====================================================
// 13. once(fn)
// Allows function to execute only once
// =====================================================

export function once(fn) {
  let called = false;
  let result;

  return function wrapper(...args) {
    if (called) {
      return result;
    }

    called = true;

    result = fn.apply(this, args);

    return result;
  };
}

// Example:

// const sayHi = once(() => console.log("hello"));

// sayHi();
// sayHi();
// sayHi();


// =====================================================
// 14. Example async flow
// Complex async orchestration example
// =====================================================

export async function loadUserDashboard() {
  let token;
  let user;

  try {
    token = await login();
    user = await getUser(token);
  } catch {
    return null;
  }

  const [settings, feed, friends] = await Promise.all([
    getSettings(user.id).catch(() => undefined),
    getFeed(user.id).catch(() => undefined),
    getFriends(user.id).catch(() => undefined),
  ]);

  const friendId = friends?.[0]?.id;

  const photos = friendId
    ? await getPhotos(friendId).catch(() => undefined)
    : [];

  return {
    user,
    settings,
    feed,
    friends,
    photos,
  };
}