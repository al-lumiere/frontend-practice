"use strict";

/**
 * JavaScript Practice: Promises
 *
 * Topics:
 * - Promise.resolve / Promise.reject
 * - then / catch / finally
 * - return vs no return
 * - Promise + setTimeout
 * - Promise.all / Promise.allSettled
 * - custom Promise helpers
 *
 * Run with: node promises-practice.js
 */

console.log("=== Promises Practice ===");

/* =====================================================
   1. Promise.resolve creates fulfilled Promise
===================================================== */
Promise.resolve(1).then((value) => {
  console.log("\n1:");
  console.log(value); // 1
});

/* =====================================================
   2. Promise.reject creates rejected Promise
===================================================== */
Promise.reject("fail").catch((error) => {
  console.log("\n2:");
  console.log(error); // fail
});

/* =====================================================
   3. Basic then chain
===================================================== */
Promise.resolve(1)
  .then((x) => x + 1)
  .then((x) => x + 1)
  .then((value) => {
    console.log("\n3:");
    console.log(value); // 3
  });

/* =====================================================
   4. No return inside then gives undefined
===================================================== */
Promise.resolve(1)
  .then((x) => {
    x + 1;
  })
  .then((value) => {
    console.log("\n4:");
    console.log(value); // undefined
  });

/* =====================================================
   5. Return Promise from then
===================================================== */
Promise.resolve(1)
  .then((x) => {
    return Promise.resolve(x + 1);
  })
  .then((value) => {
    console.log("\n5:");
    console.log(value); // 2
  });

/* =====================================================
   6. Throw inside then goes to catch
===================================================== */
Promise.resolve(1)
  .then((x) => {
    throw x + 1;
  })
  .catch((error) => {
    console.log("\n6:");
    console.log(error); // 2
  });

/* =====================================================
   7. Catch can recover chain
===================================================== */
Promise.resolve()
  .then(() => {
    throw "error";
  })
  .catch(() => {
    return "recovered";
  })
  .then((value) => {
    console.log("\n7:");
    console.log(value); // recovered
  });

/* =====================================================
   8. Catch can throw new error
===================================================== */
Promise.resolve()
  .then(() => {
    throw "err1";
  })
  .catch((error) => {
    console.log("\n8:");
    console.log(error); // err1
    throw "err2";
  })
  .catch((error) => {
    console.log(error); // err2
  });

/* =====================================================
   9. finally does not change resolved value
===================================================== */
Promise.resolve(1)
  .finally(() => {
    return 100;
  })
  .then((value) => {
    console.log("\n9:");
    console.log(value); // 1
  });

/* =====================================================
   10. finally runs before catch
===================================================== */
Promise.reject("fail")
  .finally(() => {
    console.log("\n10:");
    console.log("finally"); // finally
  })
  .catch((error) => {
    console.log(error); // fail
  });

/* =====================================================
   11. Promise microtask vs setTimeout macrotask
===================================================== */
console.log("\n11:");
console.log(1);

setTimeout(() => console.log(2), 0);

Promise.resolve().then(() => console.log(3));

console.log(4);
// 1, 4, 3, 2

/* =====================================================
   12. Multiple microtasks before macrotasks
===================================================== */
console.log("\n12:");
console.log("A");

Promise.resolve().then(() => console.log("B"));

setTimeout(() => console.log("C"), 0);

Promise.resolve().then(() => console.log("D"));

console.log("E");
// A, E, B, D, C

/* =====================================================
   13. setTimeout inside then
===================================================== */
Promise.resolve(1)
  .then((x) => {
    setTimeout(() => console.log("timeout", x), 0);
    return x + 1;
  })
  .then((value) => {
    console.log("\n13:");
    console.log("then", value); // then 2
  });
// timeout 1

/* =====================================================
   14. Promise.all success
===================================================== */
Promise.all([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]).then(
  (values) => {
    console.log("\n14:");
    console.log(values); // [1, 2, 3]
  },
);

/* =====================================================
   15. Promise.all rejects on first error
===================================================== */
Promise.all([
  Promise.resolve(1),
  Promise.reject("fail"),
  Promise.resolve(3),
])
  .then((values) => {
    console.log(values);
  })
  .catch((error) => {
    console.log("\n15:");
    console.log(error); // fail
  });

/* =====================================================
   16. Promise.all keeps result order
===================================================== */
function delayForAll(value, ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}

Promise.all([
  delayForAll(1, 2000),
  delayForAll(2, 1000),
  delayForAll(3, 1500),
]).then((values) => {
  console.log("\n16:");
  console.log(values); // [1, 2, 3]
});

/* =====================================================
   17. Promise.allSettled
===================================================== */
Promise.allSettled([Promise.resolve(1), Promise.reject("fail")]).then(
  (results) => {
    console.log("\n17:");
    console.log(results);
    // [
    //   { status: "fulfilled", value: 1 },
    //   { status: "rejected", reason: "fail" }
    // ]
  },
);

/* =====================================================
   18. rejectAfter
===================================================== */
function rejectAfter(message, ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      reject(message);
    }, ms);
  });
}

// rejectAfter("fail", 1000).catch((err) => console.log(err));

/* =====================================================
   19. delayValue
===================================================== */
function delayValue(value, ms) {
  return new Promise(function (resolve) {
    setTimeout(() => {
      resolve(value);
    }, ms);
  });
}

// delayValue("Hi!", 1000).then((value) => console.log(value));

/* =====================================================
   20. delayChain
===================================================== */
function delayChain(value, ms) {
  return new Promise(function (resolve) {
    setTimeout(() => {
      resolve(value);
    }, ms);
  }).then((value) => value + 1);
}

// delayChain(1, 1000).then(console.log); // 2

/* =====================================================
   21. delayWithError
===================================================== */
function delayWithError(value, ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      value > 0 ? resolve(value) : reject("Invalid value");
    }, ms);
  });
}

// delayWithError(5, 1000).then(console.log).catch(console.log);
// delayWithError(0, 1000).then(console.log).catch(console.log);
// delayWithError(2, 1000)
//   .then((x) => x * 2)
//   .then(console.log)
//   .catch(console.log);

/* =====================================================
   22. retry
===================================================== */
let count = 0;

function test() {
  return new Promise((resolve, reject) => {
    count++;

    if (count < 3) {
      reject("fail");
    } else {
      resolve("success");
    }
  });
}

function retry(fn, retries, delay) {
  return fn().catch((err) => {
    if (retries === 0) {
      throw err;
    }

    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    }).then(() => retry(fn, retries - 1, delay));
  });
}

// retry(test, 5, 1000).then(console.log); // success

/* =====================================================
   23. allCustom
===================================================== */
function allCustom(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;

    if (promises.length === 0) {
      resolve([]);
      return;
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value;
          completed++;

          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}

allCustom([Promise.resolve(1), Promise.resolve(2)]).then((values) => {
  console.log("\n23:");
  console.log(values); // [1, 2]
});

allCustom([Promise.resolve(1), Promise.reject("fail"), Promise.resolve(3)])
  .then(console.log)
  .catch((error) => {
    console.log(error); // fail
  });

console.log("\n=== End of sync code ===");