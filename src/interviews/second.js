/* =====================================================
1. Type Coercion
===================================================== */

console.log([] + []); // ""
console.log([] + {}); // "[object Object]"

// В браузерной консоли как отдельная statement часто будет 0,
// потому что {} парсится как пустой блок, а +[] -> 0.
console.log({} + []); // 0

// Но если явно сделать выражение:
console.log(({} + [])); // "[object Object]"

console.log(Boolean([])); // true

/* =====================================================
2. this / Lost Context
===================================================== */

const obj = {
  x: 10,

  getX() {
    return this.x;
  },
};

const fn = obj.getX;

console.log(fn()); // undefined: потеряли контекст
console.log(obj.getX()); // 10: вызов как метод объекта

/* =====================================================
3. Event Loop
===================================================== */

console.log(1);

setTimeout(() => {
  console.log(2);
}, 0);

Promise.resolve()
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(4);
  });

console.log(5);

// Вывод:
// 1
// 5
// 3
// 4
// 2

/* =====================================================
4. Promise Chain
===================================================== */

Promise.resolve(1)
  .then((x) => {
    console.log("A", x); // A 1
    return x + 1; // 2
  })
  .then((x) => {
    throw "boom";
  })
  .catch((e) => {
    console.log("B", e); // B boom
    return 100;
  })
  .then((x) => {
    console.log("C", x); // C 100
  });

// Вывод:
// A 1
// B boom
// C 100

/* =====================================================
5. Async / Await
===================================================== */

async function test() {
  try {
    console.log("A");

    await Promise.reject("err");
    // есть await, поэтому rejected Promise ведёт себя как throw

    console.log("B"); // не выполнится
  } catch (e) {
    console.log("C", e); // C err
  }

  console.log("D");
}

test();

// Вывод:
// A
// C err
// D

/* =====================================================
6. var / let / Closure in Loops
===================================================== */

for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}

// Вывод:
// 3
// 3
// 3

// Исправление 1: let
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}

// Вывод:
// 0
// 1
// 2

// Исправление 2: дополнительная переменная
for (var i = 0; i < 3; i++) {
  let j = i;

  setTimeout(() => {
    console.log(j);
  }, 0);
}

// Вывод:
// 0
// 1
// 2

// Исправление 3: IIFE
for (var i = 0; i < 3; i++) {
  (function (j) {
    setTimeout(() => {
      console.log(j);
    }, 0);
  })(i);
}

// Вывод:
// 0
// 1
// 2

/* =====================================================
7. setTimeout + Lost Context
===================================================== */

const user = {
  name: "Ann",

  say() {
    console.log(this.name);
  },
};

setTimeout(user.say, 0);

// Мы не вызываем user.say как метод.
// Мы передаём функцию как ссылку.
// Поэтому контекст теряется.

// Вывод:
// undefined

/* =====================================================
8. Async Architecture
===================================================== */

/**
 * getToken()
 * getProfile(token)
 * getFeed(token)
 * getNotifications(token)
 *
 * profile — critical
 * feed / notifications — optional
 *
 * Если getToken или getProfile упали:
 *   вернуть null
 *
 * Если getFeed или getNotifications упали:
 *   вернуть undefined вместо конкретных данных
 *
 * feed / notifications должны идти параллельно.
 */

async function fn() {
  let token;
  let profile;

  try {
    token = await getToken();
    profile = await getProfile(token);
  } catch {
    return null;
  }

  const [feed, notifications] = await Promise.all([
    getFeed(token).catch(() => undefined),
    getNotifications(token).catch(() => undefined),
  ]);

  return {
    profile,
    feed,
    notifications,
  };
}