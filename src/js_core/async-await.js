"use strict";

/**
 * JavaScript Practice: async / await
 *
 * Topics:
 * - async functions
 * - await
 * - try / catch
 * - return await vs return Promise
 * - sequential vs parallel await
 * - async / await with fetch
 *
 * Run with: node async-await-practice.js
 */

console.log("=== Async / Await Practice ===");

/* =====================================================
   1. async function always returns Promise
===================================================== */
async function asyncReturnValue() {
  return 5;
}

console.log("\n1:");
console.log(asyncReturnValue()); // Promise { 5 }
asyncReturnValue().then(console.log); // 5

/* =====================================================
   2. await resolved Promise
===================================================== */
async function awaitResolvedPromise() {
  const value = await Promise.resolve(10);
  return value;
}

console.log("\n2:");
awaitResolvedPromise().then(console.log); // 10

/* =====================================================
   3. await rejected Promise with catch
===================================================== */
async function awaitRejectedPromise() {
  await Promise.reject("fail");
}

console.log("\n3:");
awaitRejectedPromise().catch(console.log); // fail

/* =====================================================
   4. try/catch with await
===================================================== */
async function catchRejectedPromise() {
  try {
    await Promise.reject("fail");
  } catch (error) {
    return "caught";
  }
}

console.log("\n4:");
catchRejectedPromise().then(console.log); // caught

/* =====================================================
   5. async function runs synchronously until first await
===================================================== */
console.log("\n5:");

async function syncUntilAwait() {
  console.log(2);
  await Promise.resolve();
  console.log(3);
}

console.log(1);
syncUntilAwait();
console.log(4);
// 1, 2, 4, 3

/* =====================================================
   6. await with non-Promise value
===================================================== */
console.log("\n6:");

async function awaitPlainValue() {
  const value = await 10;
  console.log(value);
}

awaitPlainValue();
console.log("after");
// after, 10

/* =====================================================
   7. return Promise from async function
===================================================== */
async function returnPromise() {
  return Promise.resolve(5);
}

console.log("\n7:");
returnPromise().then(console.log); // 5

/* =====================================================
   8. return await Promise from async function
===================================================== */
async function returnAwaitPromise() {
  return await Promise.resolve(5);
}

console.log("\n8:");
returnAwaitPromise().then(console.log); // 5

/* =====================================================
   9. return await catches rejection inside try/catch
===================================================== */
async function returnAwaitReject() {
  try {
    return await Promise.reject("fail1");
  } catch (error) {
    throw "fail2";
  }
}

console.log("\n9:");
returnAwaitReject().catch(console.log); // fail2

/* =====================================================
   10. return Promise.reject is not caught inside try/catch
===================================================== */
async function returnRejectWithoutAwait() {
  try {
    return Promise.reject("fail1");
  } catch (error) {
    throw "fail2";
  }
}

console.log("\n10:");
returnRejectWithoutAwait().catch(console.log); // fail1

/* =====================================================
   11. finally before resolved value
===================================================== */
async function finallyBeforeReturn() {
  try {
    return await Promise.resolve(1);
  } finally {
    console.log("finally");
  }
}

console.log("\n11:");
finallyBeforeReturn().then(console.log);
// finally, 1

/* =====================================================
   12. sequential awaits
===================================================== */
function delay(ms, value = ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}

async function sequentialAwait() {
  const a = await delay(1000, 1);
  const b = await delay(1000, 2);

  return a + b;
}

// sequentialAwait().then(console.log); // 3 after ~2 seconds

/* =====================================================
   13. parallel awaits
===================================================== */
async function parallelAwait() {
  const p1 = delay(1000, 1);
  const p2 = delay(1000, 2);

  const a = await p1;
  const b = await p2;

  return a + b;
}

// parallelAwait().then(console.log); // 3 after ~1 second

/* =====================================================
   14. parallel awaits with Promise.all
===================================================== */
async function parallelAwaitWithPromiseAll() {
  const [a, b] = await Promise.all([
    delay(1000, 1),
    delay(1000, 2),
  ]);

  return a + b;
}

// parallelAwaitWithPromiseAll().then(console.log); // 3 after ~1 second

/* =====================================================
   15. nested async functions
===================================================== */
console.log("\n15:");

async function nestedF() {
  console.log(1);
  await Promise.resolve();
  console.log(2);
}

async function nestedG() {
  console.log(3);
  await nestedF();
  console.log(4);
}

nestedG();
console.log(5);
// 3, 1, 5, 2, 4

/* =====================================================
   16. splitWordsBySeparator
===================================================== */
var splitWordsBySeparator = function (words, separator) {
  let fin = [];

  for (const word of words) {
    let value = word.split(separator);

    value.forEach((el) => {
      if (el.length !== 0) {
        fin.push(el);
      }
    });
  }

  return fin;
};

console.log("\n16:");
console.log(splitWordsBySeparator(["abc"], ".")); // ["abc"]
console.log(splitWordsBySeparator(["abc", ""], ".")); // ["abc"]
console.log(splitWordsBySeparator(["abc", "a.b"], ".")); // ["abc", "a", "b"]
console.log(splitWordsBySeparator(["a.b", "c.d"], ".")); // ["a", "b", "c", "d"]

/* =====================================================
   17. loadJson with async/await
===================================================== */
async function loadJsonBasic(url) {
  let response = await fetch(url);

  if (response.status === 200) {
    let user = await response.json();
    return user;
  }

  throw new Error(response.status);
}

// loadJsonBasic("no-such-user.json").catch(console.log); // Error: 404

/* =====================================================
   18. wait returns value after delay
===================================================== */
async function wait() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  wait().then((value) => console.log(value));
}

// f(); // 10 after 1 second

/* =====================================================
   19. Custom HttpError
===================================================== */
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = "HttpError";
    this.response = response;
  }
}

/* =====================================================
   20. loadJson with custom HttpError
===================================================== */
async function loadJson(url) {
  let response = await fetch(url);

  if (response.status === 200) {
    let json = await response.json();
    return json;
  }

  throw new HttpError(response);
}

/* =====================================================
   21. demoGithubUser with async/await and loop
===================================================== */
// Ask for login until GitHub returns an existing user.
async function demoGithubUser() {
  while (true) {
    let name = prompt("Введите логин?", "iliakan");

    try {
      let user = await loadJson(`https://api.github.com/users/${name}`);
      alert(`Полное имя: ${user.name}.`);
      return user;
    } catch (err) {
      if (err instanceof HttpError && err.response.status === 404) {
        alert("Такого пользователя не существует, пожалуйста, повторите ввод.");
      } else {
        throw err;
      }
    }
  }
}

// demoGithubUser();

console.log("\n=== End of sync code ===");