/* =====================================================
1. Types & Coercion
===================================================== */

// 1. Чем отличаются == и ===?
// Двойное равно — это оператор нестрогого равенства, а тройное — оператор строгого.
// Нестрогий оператор сравнивает только значения (при этом приводя типы),
// а строгий сравнивает и типы, и значения.

// Поэтому:
// null == undefined -> true
// null === undefined -> false

// 2. Какие значения в JS являются falsy?
// 0, -0, null, undefined, false, "", NaN

// 3. Что вернёт Boolean(" "), Boolean([]), Boolean({})?

// 4. Почему [] == false может быть true?
// [] -> "" -> 0
// false -> 0
// 0 == 0 -> true

// 5. Что происходит при сравнении объекта с примитивом?
// Объект пытается преобразоваться в примитив.

console.log(Boolean("0")); // true
console.log(Boolean("")); // false
console.log(Boolean(" ")); // true
console.log(Boolean([])); // true

console.log([] == false); // true

console.log(null == undefined); // true
console.log(null === undefined); // false

/* =====================================================
2. Objects / References / Copies
===================================================== */

// 1. Что значит “объекты передаются по ссылке”?
// Объекты — непримитивный тип данных,
// поэтому они хранятся по ссылке.

// 2. Чем отличается изменение свойства объекта
// от переприсваивания параметра?

// 3. Что такое shallow copy?
// Неглубокая копия объекта.

// 4. Какие способы копирования объекта ты знаешь?
// shallow:
// - spread
// - Object.assign()

// deep:
// - structuredClone()
// - JSON.parse(JSON.stringify())

console.log(user); // user = { name: "joe", isLoggedIn: true }
console.log(user); // user = { name: "joe", isLoggedIn: false }

console.log(a.x.y); // 10
console.log(b.x.y); // 10

/* =====================================================
3. Scope / Hoisting / TDZ
===================================================== */

// 1. Чем отличаются var, let, const?

// var:
// - function scoped
// - всплывает как undefined
// - может стать свойством global object

// let/const:
// - block scoped
// - находятся в TDZ до инициализации

// 2. Что такое hoisting?
// Всплытие переменных/функций наверх
// в своей зоне видимости.

// 3. Что такое TDZ?
// Временная мёртвая зона для let/const.

// 4. Почему function declaration можно вызвать до объявления?
// Потому что function declaration полностью создаётся
// на этапе creation phase.

// 5. Чем function declaration отличается
// от function expression?

console.log(a); // undefined
console.log(b); // ReferenceError

foo(); // "Hello"
bar(); // error

console.log(x); // undefined

/* =====================================================
4. Functions / this / bind / call / apply
===================================================== */

// 1. Как определяется this в обычной функции?
// this зависит от способа вызова.

// 2. Как определяется this в стрелочной функции?
// Стрелка не имеет своего this
// и берёт его из внешнего лексического окружения.

// 3. Чем отличаются call, apply, bind?

// call/apply:
// вызывают функцию сразу

// bind:
// создаёт новую функцию с привязанным this

// 4. Можно ли перебиндить bind?
// call/apply — нет
// new — да

// 5. Что будет при new + bind?
// new сильнее bind.

console.log(fn());
console.log(fn.call({ x: 20 })); // 10
console.log(obj.getX());

/* =====================================================
5. Closures
===================================================== */

// 1. Что такое замыкание?
// Возможность функции помнить переменные
// из внешнего лексического окружения.

// 2. Где используются замыкания?
// debounce
// throttle
// private variables
// memoization

// 3. Почему замыкания могут приводить к утечке памяти?
// Пока есть ссылки на внутреннюю функцию,
// переменные не удаляются GC.

function createCounter(init) {
  let value = init;

  return {
    increment() {
      return ++value;
    },

    decrement() {
      return --value;
    },

    reset() {
      value = init;
      return value;
    },
  };
}

const counter = createCounter(5);

console.log(counter.increment()); // 6
console.log(counter.reset()); // 5
console.log(counter.decrement()); // 4

/* =====================================================
6. Event Loop
===================================================== */

// 1. Что такое call stack?
// Стек выполнения задач.

// 2. Что такое macrotask queue?
// setTimeout
// setInterval
// DOM events

// 3. Что такое microtask queue?
// Promise.then
// queueMicrotask
// await continuation

// 4. Что выполняется раньше:
// setTimeout или Promise.then?
// Promise.then

// 5. Что делает await?
// Отправляет продолжение функции
// в очередь микрозадач.

// 1 4 3 2
// 1 4 2 3
// 1 1 3 3

/* =====================================================
7. Promise
===================================================== */

// 1. Какие состояния есть у Promise?
// pending
// fulfilled
// rejected

// 2. Что возвращает .then()?
// Новый Promise.

// 3. Чем отличается throw внутри .then()
// от return Promise.reject()?
// Почти одинаковы.
// Оба попадут в ближайший catch.

// 4. Что делает .catch()?
// Ловит ошибки.
// И может "починить" Promise.

// 5. Promise.all / race / allSettled / any

Promise.resolve(1)
  .then((x) => x + 1)
  .then((x) => Promise.resolve(x + 1))
  .then(console.log); // 3

Promise.resolve(1)
  .then(() => {
    throw new Error("boom");
  })
  .then(() => console.log("success"))
  .catch(() => console.log("error"))
  .then(() => console.log("after"));

// error
// after

/* =====================================================
8. Async / Await
===================================================== */

async function addTwoPromises(promise1, promise2) {
  const [a, b] = await Promise.all([promise1, promise2]);

  return a + b;
}

addTwoPromises(Promise.resolve(2), Promise.resolve(2)).then(console.log); // 4

let attempts = 0;

function fetcher() {
  attempts++;

  if (attempts < 3) {
    return Promise.reject("error");
  }

  return Promise.resolve("data");
}

async function fetchWithAutoRetry(fetcher, count) {
  let lastError;

  for (let i = 0; i < count; i++) {
    try {
      return await fetcher();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}

fetchWithAutoRetry(fetcher, 5).then(console.log); // data

/* =====================================================
9. Arrays & Strings
===================================================== */

// map
// filter
// reduce
// forEach

// split -> array
// join -> string

// mutating:
// push
// pop
// shift
// unshift
// splice
// sort
// reverse

// non-mutating:
// map
// filter
// reduce
// slice
// concat

function splitWordsBySeparator(words, separator) {
  const all = words.join(separator).split(separator);

  const final = [];

  for (let i = 0; i <= all.length - 1; i++) {
    if (all[i] !== "") {
      final.push(all[i]);
    }
  }

  return final;
}

console.log(splitWordsBySeparator(["one.two", "three.four"], "."));

// ["one", "two", "three", "four"]

function maximumValue(strs) {
  let max = 0;

  for (let i = 0; i <= strs.length - 1; i++) {
    const el = strs[i];

    if (/^\d+$/.test(el)) {
      max = Math.max(Number(el), max);
    } else {
      max = Math.max(el.length, max);
    }
  }

  return max;
}

/* =====================================================
10. Memoization
===================================================== */

// Что такое мемоизация?
// Кеширование результатов функции.

function memoize(fn) {
  function wrapper(...args) {
    const key = args.join(",");

    if (wrapper.cache.has(key)) {
      return wrapper.cache.get(key);
    }

    const result = fn.apply(this, args);

    wrapper.cache.set(key, result);

    return result;
  }

  wrapper.cache = new Map();

  return wrapper;
}

let callCount = 0;

const memoizedFn = memoize(function (a, b) {
  callCount += 1;

  return a + b;
});

console.log(memoizedFn(2, 3)); // 5
console.log(memoizedFn(2, 3)); // 5

console.log(callCount); // 1

/* =====================================================
11. UI / DOM
===================================================== */

// event bubbling
// event delegation
// target vs currentTarget
// closest()
// scroll lock

<>
  <input id="input" />
  <button id="add">Add</button>

  <ul id="list"></ul>
</>;

const btn = document.getElementById("add");
const list = document.getElementById("list");

btn.addEventListener("click", () => {
  const value = input.value.trim();

  if (!value) {
    return;
  }

  const li = document.createElement("li");

  li.innerHTML = `
    <p>${value}</p>
    <button>X</button>
  `;

  list.append(li);
});

list.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") {
    return;
  }

  const li = e.target.closest("li");

  li.remove();
});

/* =====================================================
12. Big Async / UI Task
===================================================== */

function logIn() {}
function getChats(token) {}
function getUsername(token) {}
function getAvatar(token) {}
function getMessages(token, chatId) {}

async function request() {
  let token;

  try {
    token = await logIn();
  } catch (error) {
    return error.message;
  }

  const [chats, username, avatar] = await Promise.all([
    getChats(token).catch(() => undefined),
    getUsername(token).catch(() => undefined),
    getAvatar(token).catch(() => undefined),
  ]);

  const firstChatId = chats?.[0]?.id;

  const messages = firstChatId
    ? await getMessages(token, firstChatId).catch(() => undefined)
    : undefined;

  return {
    username,
    avatar,
    chats,
    messages,
  };
}
