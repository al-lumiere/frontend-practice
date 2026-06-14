// ### 1.

// Какие примитивные типы есть в JavaScript? Чем примитивы отличаются от объектов?
// Всего 8 типов данных есть в JS, семь из которых — примитивы. К ним относятся:
// number, big int, symbol, string, boolean, null, undefined. Примитивы хранятся по значению,
// а не по ссылке.

// ### 2.
console.log(typeof null); // object
console.log(typeof []); // object
console.log(typeof NaN); // number
console.log(typeof function() {}); // function / object

// ### 3.

// Объясни разницу между `let`, `const` и `var` по трём пунктам:

// - область видимости
// - hoisting
// - возможность повторного объявления

// У let & const блочная область видимости, а у var нет, у нее глобальная.
// Переменные var всплывают (но значение undefined), а let & const попадают в TDZ.
// Var можно повторно объявлять, а let & const нет.

// ### 4.

console.log(a); // undefined
var a = 10;

console.log(b); // error
let b = 20;

// ### 5.

console.log(0 == false); // true
console.log(0 === false); // false
console.log(null == undefined); // true
console.log(null === undefined); // false
console.log([] == false); // true

// ### 6.

// Перечисли falsy-значения в JavaScript.
// 0, -0, null, undefined, "", false

// ## Часть 2.

// ### 7.
foo(); // можно вызвать, все ок

function foo() {
  console.log('foo');
}

bar(); // error

const bar = function() {
  console.log('bar');
};


// ### 8.

function createCounter() {
  let count = 0;

  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

// ### 9.

for (var i = 0; i < 3; i++) { // 3, 3, 3
  setTimeout(() => {
    console.log(i);
  }, 0);
}

// Как исправить двумя способами?
// Изменить var на let или добавить еще одну переменную внутрь, которая будет фиксировать значение i,
// на каждой итерации цикла и передавать в консоль.

// ### 10.

// Напиши функцию `once(fn)`, которая вызывает `fn` только один раз, а при следующих вызовах возвращает первый результат.

function onceAdd(args) {
  let called = false;
  let result = 0;
  return function wrapper (...args) {
    if (called) {
      return result;
    }

    result = fn.apply(this, args);
    called = true;
    return result
  }
}

const add = (a, b) => a + b;
const onceAdd = once(add);

console.log(onceAdd(2, 3)); // 5
console.log(onceAdd(10, 20)); // 5

// ## Часть 3

// ### 11.
const user = {
  name: 'Anna',
  sayName() {
    console.log(this.name);
  },
};

user.sayName(); // "Anna"

// ### 12.

const user = {
  name: 'Anna',
  sayName() {
    console.log(this.name);
  },
};

const fn = user.sayName;
fn(); // undefined / error в зависимости от strick mode


// ### 13.

const user = {
  name: 'Anna',
  sayName: () => {
    console.log(this.name);
  },
};

user.sayName(); // undefined / error в зависимости от strick mode.
// У arrow функции нет свего this, они берут его из внешнего лексического окружения


// ### 14.

// Объясни разницу между `call`, `apply` и `bind`.
// call, apply вызывают функцию с переданным контекстом, а bind просто привязывает навсегда, но не вызывает.
// bind сильнее, чем call и apply

// ## Часть 4.

// ### 15.

const a = { value: 1 };
const b = a;

b.value = 2;

console.log(a.value); // 2

// ### 16.
const obj = {
  name: 'A',
  meta: {
    age: 20,
  },
};

const copy = { ...obj };
copy.meta.age = 30;

console.log(obj.meta.age); // 30

// ### 17.

// Что такое prototype chain? Что произойдёт при обращении к свойству, которого нет в самом объекте?
// Сначала мы ищем свойство в самого объекте и если его нет, то в объектах, чьим прототипом он является.

// ### 18.

// Что такое `class` в JavaScript: отдельная сущность или синтаксический сахар над прототипами?
// Да, классы это синтаксический сахар над прототипами, созданный как шаблон для того, чтобы создавать множество одинаковых объектов.

// ## Часть 5.

// ### 19.

// - `map` — мутирует, применяет коллбэк к каждому элементу
// - `filter` — мутирует, фильтруя элементы в зависимости от коллбэка
// - `reduce` — считает сумму элементов
// - `forEach` — проходится по каждому элементу
// - `some` — ищет первый подходящий элемент
// - `every` — ищет каждый подходящий элемент
// - `find` – ищет сам элемент

// ### 20. `map` vs `forEach`

// Почему этот код возвращает массив `undefined`?

// ```js
// const result = [1, 2, 3].map((num) => {
//   num * 2;
// });

// console.log(result);
// ```

// ---

// ### 21. `reduce`

// Что выведет код?

// ```js
// const sum = [1, 2, 3, 4].reduce((acc, num) => acc + num, 0);
// console.log(sum);
// ```

// ---

// ### 22. `Map` vs Object

// Когда лучше использовать `Map`, а когда обычный объект?

// ---

// ### 23. `Set`

// Как с помощью `Set` удалить дубликаты из массива?

// ---

// ## Часть 6. Event loop, async, promises

// ### 24. Event loop

// Что выведет код?

// ```js
// console.log('A');

// setTimeout(() => {
//   console.log('B');
// }, 0);

// Promise.resolve().then(() => {
//   console.log('C');
// });

// console.log('D');
// ```

// ---

// ### 25. Microtasks vs macrotasks

// Что такое microtask и macrotask? Куда относятся:

// - `Promise.then`
// - `queueMicrotask`
// - `setTimeout`

// ---

// ### 26. Promise states

// Какие состояния есть у Promise?

// ---

// ### 27. Promise chaining

// Что выведет код?

// ```js
// Promise.resolve(1)
//   .then((x) => x + 1)
//   .then((x) => {
//     throw new Error('fail');
//   })
//   .catch(() => 10)
//   .then((x) => console.log(x));
// ```

// ---

// ### 28. `async/await`

// Что выведет код?

// ```js
// async function test() {
//   console.log('A');
//   await Promise.resolve();
//   console.log('B');
// }

// console.log('C');
// test();
// console.log('D');
// ```

// ---

// ### 29. Обработка ошибок в async

// Как правильно обработать ошибку в `async`-функции? Покажи через `try/catch`.

// ---

// ### 30. Parallel vs sequential

// В чём разница между этими двумя вариантами?

// ```js
// const a = await fetchA();
// const b = await fetchB();
// ```

// ```js
// const [a, b] = await Promise.all([fetchA(), fetchB()]);
// ```

// ---

// ## Часть 7. DOM, browser, network

// ### 31. Bubbling и capturing

// Что такое всплытие и погружение событий?

// ---

// ### 32. Event delegation

// Что такое делегирование событий? Почему оно полезно для списков?

// ---

// ### 33. `preventDefault` vs `stopPropagation`

// Чем отличаются `event.preventDefault()` и `event.stopPropagation()`?

// ---

// ### 34. Debounce

// Что такое debounce? Где его используют?

// Напиши простую реализацию:

// ```js
// function debounce(fn, delay) {
//   // code
// }
// ```

// ---

// ### 35. Throttle

// Что такое throttle? Чем отличается от debounce?

// ---

// ### 36. Fetch

// Что важно помнить про `fetch`, HTTP-ошибки и `response.ok`?

// ---

// ## Часть 8. Мини-задачи

// ### 37. First unique character

// Напиши функцию, которая возвращает первый неповторяющийся символ в строке.

// ```js
// firstUnique('leetcode'); // 'l'
// firstUnique('aabbc'); // 'c'
// firstUnique('aabb'); // null
// ```

// ---

// ### 38. Group by

// Напиши функцию `groupBy(arr, key)`, которая группирует объекты по ключу.

// ```js
// const users = [
//   { name: 'Anna', role: 'admin' },
//   { name: 'Bob', role: 'user' },
//   { name: 'Kate', role: 'admin' },
// ];

// groupBy(users, 'role');
// ```

// ---

// ### 39. Flatten one level

// Напиши функцию, которая раскрывает массив на один уровень вложенности.

// ```js
// flattenOneLevel([1, [2, 3], [4], 5]); // [1, 2, 3, 4, 5]
// ```

// ---

// ### 40. isAnagram

// Напиши функцию, которая проверяет, являются ли строки анаграммами.

// ```js
// isAnagram('listen', 'silent'); // true
// isAnagram('hello', 'world'); // false
// ```

// ---

// # Ответы и подсказки

// ## 1

// Примитивные типы:

// ```js
// string
// number
// bigint
// boolean
// undefined
// symbol
// null
// ```

// Примитивы хранятся и сравниваются по значению. Объекты хранятся и сравниваются по ссылке.

// ---

// ## 2

// ```js
// console.log(typeof null); // 'object'
// console.log(typeof []); // 'object'
// console.log(typeof NaN); // 'number'
// console.log(typeof function() {}); // 'function'
// ```

// `typeof null === 'object'` — историческая особенность JavaScript.

// ---

// ## 3

// `var` имеет function scope.

// `let` и `const` имеют block scope.

// Все объявления hoist-ятся, но `let` и `const` до строки объявления находятся в TDZ — temporal dead zone.

// `var` можно переобъявлять в одной области видимости:

// ```js
// var a = 1;
// var a = 2;
// ```

// `let` и `const` так переобъявлять нельзя:

// ```js
// let a = 1;
// let a = 2; // SyntaxError
// ```

// `const` запрещает переназначение переменной, но не делает объект полностью неизменяемым:

// ```js
// const user = { name: 'Anna' };
// user.name = 'Kate'; // можно
// user = {}; // нельзя
// ```

// ---

// ## 4

// ```js
// console.log(a); // undefined
// var a = 10;

// console.log(b); // ReferenceError
// let b = 20;
// ```

// `var a` поднимается и инициализируется значением `undefined`.

// `let b` тоже поднимается, но до объявления находится в TDZ, поэтому обращение вызывает `ReferenceError`.

// ---

// ## 5

// ```js
// console.log(0 == false); // true
// console.log(0 === false); // false
// console.log(null == undefined); // true
// console.log(null === undefined); // false
// console.log([] == false); // true
// ```

// `==` делает приведение типов.

// `===` сравнивает без приведения типов.

// ---

// ## 6

// Falsy-значения:

// ```js
// false
// 0
// -0
// 0n
// ''
// null
// undefined
// NaN
// ```

// Все остальные значения truthy, включая:

// ```js
// []
// {}
// '0'
// 'false'
// ```

// ---

// ## 7

// Function declaration можно вызвать до объявления:

// ```js
// foo();

// function foo() {
//   console.log('foo');
// }
// ```

// Function expression, записанная в `const`, недоступна до строки инициализации:

// ```js
// bar(); // ReferenceError

// const bar = function() {
//   console.log('bar');
// };
// ```

// ---

// ## 8

// Замыкание — это функция вместе с доступом к лексическому окружению, в котором она была создана.

// Вывод:

// ```js
// 1
// 2
// 3
// ```

// Функция внутри `createCounter` продолжает иметь доступ к переменной `count`, даже после завершения `createCounter`.

// ---

// ## 9

// Код:

// ```js
// for (var i = 0; i < 3; i++) {
//   setTimeout(() => {
//     console.log(i);
//   }, 0);
// }
// ```

// Выведет:

// ```js
// 3
// 3
// 3
// ```

// Потому что `var` имеет function scope, и все колбэки ссылаются на одну и ту же переменную `i`.

// Исправление 1 — `let`:

// ```js
// for (let i = 0; i < 3; i++) {
//   setTimeout(() => {
//     console.log(i);
//   }, 0);
// }
// ```

// Исправление 2 — IIFE:

// ```js
// for (var i = 0; i < 3; i++) {
//   (function(value) {
//     setTimeout(() => {
//       console.log(value);
//     }, 0);
//   })(i);
// }
// ```

// ---

// ## 10

// ```js
// function once(fn) {
//   let called = false;
//   let result;

//   return function(...args) {
//     if (!called) {
//       called = true;
//       result = fn.apply(this, args);
//     }

//     return result;
//   };
// }
// ```

// Пример:

// ```js
// const add = (a, b) => a + b;
// const onceAdd = once(add);

// console.log(onceAdd(2, 3)); // 5
// console.log(onceAdd(10, 20)); // 5
// ```

// ---

// ## 11

// ```js
// Anna
// ```

// При вызове через точку:

// ```js
// user.sayName();
// ```

// `this` внутри метода будет ссылаться на `user`.

// ---

// ## 12

// ```js
// const fn = user.sayName;
// fn();
// ```

// Контекст теряется, потому что функция вызывается уже не как метод объекта.

// В strict mode `this` будет `undefined`.

// Исправить можно через `bind`:

// ```js
// const fn = user.sayName.bind(user);
// fn(); // Anna
// ```

// Или вызвать через `call`:

// ```js
// fn.call(user); // Anna
// ```

// ---

// ## 13

// Arrow function не имеет собственного `this`.

// ```js
// const user = {
//   name: 'Anna',
//   sayName: () => {
//     console.log(this.name);
//   },
// };

// user.sayName();
// ```

// `this` здесь берётся из внешней области, а не из `user`.

// Поэтому обычно такой код не выведет `Anna`.

// ---

// ## 14

// `call` вызывает функцию сразу и передаёт аргументы через запятую:

// ```js
// fn.call(context, arg1, arg2);
// ```

// `apply` вызывает функцию сразу и передаёт аргументы массивом:

// ```js
// fn.apply(context, [arg1, arg2]);
// ```

// `bind` не вызывает функцию сразу, а возвращает новую функцию с привязанным `this`:

// ```js
// const boundFn = fn.bind(context);
// boundFn();
// ```

// ---

// ## 15

// ```js
// 2
// ```

// `a` и `b` ссылаются на один и тот же объект.

// ```js
// const a = { value: 1 };
// const b = a;

// b.value = 2;

// console.log(a.value); // 2
// ```

// ---

// ## 16

// Поверхностное копирование копирует только верхний уровень.

// Глубокое копирование копирует ещё и вложенные объекты.

// В этом коде:

// ```js
// const obj = {
//   name: 'A',
//   meta: {
//     age: 20,
//   },
// };

// const copy = { ...obj };
// copy.meta.age = 30;

// console.log(obj.meta.age);
// ```

// выведется:

// ```js
// 30
// ```

// Потому что `meta` остался общей ссылкой.

// ---

// ## 17

// Prototype chain — это цепочка прототипов, по которой JavaScript ищет свойства.

// Если свойства нет в самом объекте, JS ищет его в прототипе. Если там нет — идёт выше по цепочке. Если нигде нет — возвращает `undefined`.

// Пример:

// ```js
// const obj = {};

// console.log(obj.toString);
// ```

// `toString` нет в самом `obj`, но он находится выше в prototype chain.

// ---

// ## 18

// `class` в JavaScript — это синтаксический сахар над прототипным наследованием.

// ```js
// class User {
//   sayHi() {
//     console.log('hi');
//   }
// }
// ```

// Методы класса попадают в prototype:

// ```js
// User.prototype.sayHi;
// ```

// ---

// ## 19

// `map` создаёт новый массив такой же длины, трансформируя каждый элемент.

// ```js
// [1, 2, 3].map((x) => x * 2); // [2, 4, 6]
// ```

// `filter` создаёт новый массив только из элементов, которые прошли проверку.

// ```js
// [1, 2, 3].filter((x) => x > 1); // [2, 3]
// ```

// `reduce` сворачивает массив в одно значение.

// ```js
// [1, 2, 3].reduce((acc, x) => acc + x, 0); // 6
// ```

// `forEach` просто проходит по массиву и ничего не возвращает полезного.

// ```js
// [1, 2, 3].forEach((x) => console.log(x));
// ```

// `some` возвращает `true`, если хотя бы один элемент подходит.

// ```js
// [1, 2, 3].some((x) => x > 2); // true
// ```

// `every` возвращает `true`, если все элементы подходят.

// ```js
// [1, 2, 3].every((x) => x > 0); // true
// ```

// `find` возвращает первый подходящий элемент.

// ```js
// [1, 2, 3].find((x) => x > 1); // 2
// ```

// ---

// ## 20

// Код возвращает массив `undefined`, потому что в callback с фигурными скобками нет `return`.

// ```js
// const result = [1, 2, 3].map((num) => {
//   num * 2;
// });

// console.log(result); // [undefined, undefined, undefined]
// ```

// Правильно:

// ```js
// const result = [1, 2, 3].map((num) => num * 2);
// ```

// или:

// ```js
// const result = [1, 2, 3].map((num) => {
//   return num * 2;
// });
// ```

// ---

// ## 21

// ```js
// 10
// ```

// Потому что:

// ```js
// 0 + 1 + 2 + 3 + 4 = 10
// ```

// ---

// ## 22

// `Map` лучше использовать, когда:

// - ключи могут быть не только строками
// - важен порядок добавления
// - нужно часто добавлять и удалять значения
// - структура используется именно как словарь

// Пример:

// ```js
// const map = new Map();

// map.set('name', 'Anna');
// map.set(1, 'number key');
// map.set({}, 'object key');
// ```

// Обычный объект удобен для простых структур данных:

// ```js
// const user = {
//   name: 'Anna',
//   age: 20,
// };
// ```

// ---

// ## 23

// ```js
// const arr = [1, 1, 2, 3, 3];
// const unique = [...new Set(arr)];

// console.log(unique); // [1, 2, 3]
// ```

// ---

// ## 24

// Вывод:

// ```js
// A
// D
// C
// B
// ```

// Почему:

// Сначала выполняется синхронный код:

// ```js
// A
// D
// ```

// Потом microtasks:

// ```js
// C
// ```

// Потом macrotasks:

// ```js
// B
// ```

// ---

// ## 25

// Microtask — задача, которая выполняется после текущего синхронного кода, но до macrotask.

// К microtasks относятся:

// ```js
// Promise.then
// queueMicrotask
// MutationObserver
// ```

// К macrotasks относятся:

// ```js
// setTimeout
// setInterval
// setImmediate // Node.js
// I/O
// ```

// ---

// ## 26

// У Promise есть три состояния:

// ```js
// pending
// fulfilled
// rejected
// ```

// Promise может перейти из `pending` в `fulfilled` или `rejected`.

// После этого состояние уже не меняется.

// ---

// ## 27

// Код:

// ```js
// Promise.resolve(1)
//   .then((x) => x + 1)
//   .then((x) => {
//     throw new Error('fail');
//   })
//   .catch(() => 10)
//   .then((x) => console.log(x));
// ```

// Выведет:

// ```js
// 10
// ```

// Потому что ошибка из второго `then` попадёт в `catch`, а `catch` вернёт `10`.

// ---

// ## 28

// Код:

// ```js
// async function test() {
//   console.log('A');
//   await Promise.resolve();
//   console.log('B');
// }

// console.log('C');
// test();
// console.log('D');
// ```

// Вывод:

// ```js
// C
// A
// D
// B
// ```

// `await` ставит продолжение функции в microtask.

// ---

// ## 29

// Пример обработки ошибок:

// ```js
// async function loadData() {
//   try {
//     const response = await fetch('/api/data');

//     if (!response.ok) {
//       throw new Error('HTTP error');
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }
// ```

// ---

// ## 30

// Первый вариант последовательный:

// ```js
// const a = await fetchA();
// const b = await fetchB();
// ```

// `fetchB` начнётся только после завершения `fetchA`.

// Второй вариант параллельный:

// ```js
// const [a, b] = await Promise.all([fetchA(), fetchB()]);
// ```

// Оба запроса стартуют сразу.

// ---

// ## 31

// Capturing — фаза, когда событие идёт сверху вниз:

// ```js
// window -> document -> html -> body -> target
// ```

// Bubbling — фаза, когда событие идёт снизу вверх:

// ```js
// target -> body -> html -> document -> window
// ```

// По умолчанию большинство обработчиков срабатывают на фазе bubbling.

// ---

// ## 32

// Event delegation — это подход, когда мы вешаем один обработчик на родителя, а события от детей ловим через bubbling.

// Пример:

// ```js
// list.addEventListener('click', (event) => {
//   if (event.target.tagName === 'LI') {
//     console.log(event.target.textContent);
//   }
// });
// ```

// Полезно для списков, потому что не нужно вешать обработчик на каждый элемент отдельно. Также работает для элементов, добавленных позже.

// ---

// ## 33

// `event.preventDefault()` отменяет стандартное действие браузера.

// Пример:

// ```js
// form.addEventListener('submit', (event) => {
//   event.preventDefault();
// });
// ```

// `event.stopPropagation()` останавливает распространение события дальше по DOM.

// Пример:

// ```js
// button.addEventListener('click', (event) => {
//   event.stopPropagation();
// });
// ```

// ---

// ## 34

// Debounce откладывает вызов функции до момента, когда события перестали происходить какое-то время.

// Частые примеры:

// - поиск при вводе текста
// - resize окна
// - autocomplete

// Реализация:

// ```js
// function debounce(fn, delay) {
//   let timerId;

//   return function(...args) {
//     clearTimeout(timerId);

//     timerId = setTimeout(() => {
//       fn.apply(this, args);
//     }, delay);
//   };
// }
// ```

// ---

// ## 35

// Throttle ограничивает вызов функции: не чаще одного раза за указанный интервал.

// Debounce ждёт паузу после последнего события.

// Throttle вызывает функцию регулярно, но с ограничением частоты.

// Пример throttle:

// ```js
// function throttle(fn, delay) {
//   let lastCall = 0;

//   return function(...args) {
//     const now = Date.now();

//     if (now - lastCall >= delay) {
//       lastCall = now;
//       fn.apply(this, args);
//     }
//   };
// }
// ```

// ---

// ## 36

// `fetch` не кидает ошибку на HTTP-статусы `400` и `500`.

// Например, при `404` промис всё равно будет fulfilled.

// Поэтому нужно проверять:

// ```js
// const response = await fetch('/api/data');

// if (!response.ok) {
//   throw new Error('HTTP error');
// }
// ```

// Ошибка сама появится при сетевой проблеме, отмене запроса или CORS-проблеме.

// ---

// ## 37

// ```js
// function firstUnique(str) {
//   const count = new Map();

//   for (const char of str) {
//     count.set(char, (count.get(char) || 0) + 1);
//   }

//   for (const char of str) {
//     if (count.get(char) === 1) {
//       return char;
//     }
//   }

//   return null;
// }
// ```

// ---

// ## 38

// ```js
// function groupBy(arr, key) {
//   return arr.reduce((acc, item) => {
//     const group = item[key];

//     if (!acc[group]) {
//       acc[group] = [];
//     }

//     acc[group].push(item);

//     return acc;
//   }, {});
// }
// ```

// Пример результата:

// ```js
// {
//   admin: [
//     { name: 'Anna', role: 'admin' },
//     { name: 'Kate', role: 'admin' }
//   ],
//   user: [
//     { name: 'Bob', role: 'user' }
//   ]
// }
// ```

// ---

// ## 39

// ```js
// function flattenOneLevel(arr) {
//   const result = [];

//   for (const item of arr) {
//     if (Array.isArray(item)) {
//       result.push(...item);
//     } else {
//       result.push(item);
//     }
//   }

//   return result;
// }
// ```

// Или короче:

// ```js
// function flattenOneLevel(arr) {
//   return arr.flat();
// }
// ```

// ---

// ## 40

// ```js
// function isAnagram(a, b) {
//   if (a.length !== b.length) {
//     return false;
//   }

//   const count = new Map();

//   for (const char of a) {
//     count.set(char, (count.get(char) || 0) + 1);
//   }

//   for (const char of b) {
//     if (!count.has(char)) {
//       return false;
//     }

//     count.set(char, count.get(char) - 1);

//     if (count.get(char) === 0) {
//       count.delete(char);
//     }
//   }

//   return count.size === 0;
// }
// ```

// ---