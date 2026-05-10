/* =====================================================
1. typeof
===================================================== */

console.log(typeof null); // object
console.log(typeof []); // object
console.log(typeof function () {}); // function

/* =====================================================
2. Arrow Function + this
===================================================== */

const obj = {
  name: "Ann",

  say() {
    return () => {
      console.log(this.name);
    };
  },
};

const fn = obj.say();
// obj.say() вызван как метод объекта,
// поэтому внутри say this === obj.
//
// Возвращённая стрелочная функция не имеет своего this,
// она берёт this из внешней функции say.

fn(); // Ann

/* =====================================================
3. Event Loop: queueMicrotask / Promise / setTimeout
===================================================== */

console.log(1);

queueMicrotask(() => {
  console.log(2);
});

Promise.resolve().then(() => {
  console.log(3);
});

setTimeout(() => {
  console.log(4);
}, 0);

console.log(5);

// Вывод:
// 1
// 5
// 2
// 3
// 4

/* =====================================================
4. Promise Chain + finally
===================================================== */

Promise.resolve(5)
  .finally(() => {
    console.log("A"); // A
    return 100;
  })
  .then((x) => {
    console.log("B", x); // B 5
    throw "err";
  })
  .catch((e) => {
    console.log("C", e); // C err
  });

// Вывод:
// A
// B 5
// C err

// .finally() обычно не меняет значение цепочки.
// return 100 внутри finally игнорируется.
// Но throw внутри finally сломал бы цепочку.

/* =====================================================
5. Async / Await + try/finally
===================================================== */

async function test() {
  try {
    return await Promise.resolve(10);
  } finally {
    console.log("finally");
  }
}

test().then(console.log);

// Вывод:
// finally
// 10

// Да, try/finally может быть без catch.
// finally выполнится перед фактическим возвратом результата.

/* =====================================================
6. bind vs call
===================================================== */

const user = {
  name: "Kate",

  greet() {
    console.log(this.name);
  },
};

const greet = user.greet.bind(user);

greet.call({ name: "Ann" });

// Вывод:
// Kate

// bind создаёт новую функцию с уже привязанным this.
// call/apply не могут перебить bind.

/* =====================================================
7. DOM / Event Bubbling
===================================================== */

/*
<div id="parent">
  <button id="child">Click</button>
</div>
*/

parent.addEventListener("click", () => {
  console.log("parent");
});

child.addEventListener("click", () => {
  console.log("child");
});

// При клике на кнопку событие сначала сработает на child,
// потом всплывёт на parent.

// Вывод:
// child
// parent

/* =====================================================
8. Async Architecture
===================================================== */

/**
 * login()
 * getUser(token)
 * getOrders(userId)
 * getRecommendations(userId)
 *
 * user — critical
 * orders / recommendations — optional
 *
 * Если login или getUser упали:
 *   вернуть null
 *
 * Если getOrders или getRecommendations упали:
 *   вернуть undefined вместо конкретных данных
 *
 * orders / recommendations должны идти параллельно.
 */

async function fn() {
  let token;
  let user;

  try {
    token = await login();
    user = await getUser(token);
  } catch {
    return null;
  }

  const [orders, recommendations] = await Promise.all([
    getOrders(user.id).catch(() => undefined),
    getRecommendations(user.id).catch(() => undefined),
  ]);

  return {
    user,
    orders,
    recommendations,
  };
}