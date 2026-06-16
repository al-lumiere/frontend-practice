// ### 1.

// Какие примитивные типы есть в JavaScript? Чем примитивы отличаются от объектов?
// Всего 8 типов данных есть в JS, семь из которых — примитивы. К ним относятся:
// number, bigint, symbol, string, boolean, null, undefined. Примитивы хранятся по значению,
// а не по ссылке.

// ### 2.
console.log(typeof null); // object
console.log(typeof []); // object
console.log(typeof NaN); // number
console.log(typeof function() {}); // function

// ### 3.

// Объясни разницу между `let`, `const` и `var` по трём пунктам:

// - область видимости
// - hoisting
// - возможность повторного объявления

// У let & const блочная область видимости, а у var нет, у нее глобальная/ функциональная.
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
// 0, -0, null, undefined, "", false, NaN, 0n

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

function once(fn) {
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
// Сначала мы ищем свойство в самого объекте и если его нет JS идёт в прототип этого объекта, потом в прототип прототипа, и так дальше до null.

// ### 18.

// Что такое `class` в JavaScript: отдельная сущность или синтаксический сахар над прототипами?
// Да, классы это синтаксический сахар над прототипами, созданный как шаблон для того, чтобы создавать множество одинаковых объектов.

// ## Часть 5.

// ### 19.

// - `map` — не мутирует, применяет коллбэк к каждому элементу
// - `filter` — не мутирует, фильтруя элементы в зависимости от коллбэка
// - `reduce` — считает сумму элементов
// - `forEach` — проходится по каждому элементу
// - `some` — возвращает true/false: есть ли хотя бы один подходящий элемент
// - `every` — тоже возвращает true/false: все ли элементы подходят.
// - `find` – ищет первый подходящий элемент

// ### 20.

// Почему этот код возвращает массив `undefined`?

const result = [1, 2, 3].map((num) => {
  num * 2;
});

console.log(result); // нет return, поэтому undefined


// ### 21.

const sum = [1, 2, 3, 4].reduce((acc, num) => acc + num, 0);
console.log(sum); // 10


// ### 22.

// Когда лучше использовать `Map`, а когда обычный объект?
// У объектов ключами являются только строки, а у мапа любой тип данных, поэтому в зависимости от ключа можно выбирать.
// Все основные операции у них занимают O(1), а в основе лежать хэш-таблицы и хэш-функции.
// У мапа можно узнать размер через мап.сайз, а в объектах нужно сначала выгрузить все ключи в массив и посчитать уже его длинну.

// ### 23. `

// Как с помощью `Set` удалить дубликаты из массива?
// new Set(arr);

// ## Часть 6.

// ### 24.

console.log('A');

setTimeout(() => {
  console.log('B');
}, 0);

Promise.resolve().then(() => {
  console.log('C');
});

console.log('D');

// A, D, C, B

// ### 25.

// Что такое microtask и macrotask? Куда относятся:

// - `Promise.then` // microtasks
// - `queueMicrotask` // microtasks
// - `setTimeout` // macrotasks

// Сначала выполяется синхронный код, потом все микрозадачи, потом одна макрозадача и все снова повторяется.
// Рендер страницы выполняется перед макрозадачами.

// ### 26.

// Какие состояния есть у Promise?
// Всего 3 состояния – pending (старт), fullfilled (завершен), rejected (отклонен). Из pending можно перейти только в fullfilled или rejected.
// Но потом уже нельзя менять состояние. Отклоненный промис не может стать завершенным успешно и наоборот.

// ### 27.

Promise.resolve(1)
  .then((x) => x + 1) // 2
  .then((x) => {
    throw new Error('fail'); // fail
  })
  .catch(() => 10) // 10
  .then((x) => console.log(x)); // 10

// вернется 10

// ### 28.

async function test() {
  console.log('A');
  await Promise.resolve();
  console.log('B');
}

console.log('C');
test();
console.log('D');

// C, A, D, B

// ### 29.

// Как правильно обработать ошибку в `async`-функции? Покажи через `try/catch`.
// Ошибки внутри async/await ловятся через try/catch, если ты делаешь await внутри try.
// Если внутри catch ты снова делаешь throw error, то ошибка улетит наружу, и её сможет поймать внешний .catch().

// ### 30.

const a = await fetchA();
const b = await fetchB(); // последовательно запускает

const [a, b] = await Promise.all([fetchA(), fetchB()]); // Промис алл запускает все параллельно и всех либо всех успешные, либо первый провал

// ## Часть 7.

// ### 31.

// Что такое всплытие и погружение событий?
// Ивенты могут всплывает по цепочке вверх и погружаться обратно. Каждый раз когда мы добавляем обработчик событий это влиет на детей и родителей элемента.
// Всплытие связано с родители и происходит из глубины на поверхность, а погружение работает наоборот с детьми и с поверхности в глубину.

// ### 32.

// Что такое делегирование событий? Почему оно полезно для списков?
// Если у нас есть список дел, к прмиеру, то вместо того, чтобы вешать обработчик на <li> списка, лучше поверить обработчик на сам список,
// а внутр искать нужный элемент через e.target и closest/tagName

// ### 33. `preventDefault` vs `stopPropagation`

// Чем отличаются `event.preventDefault()` и `event.stopPropagation()`?
// event.stopPropagation() останавливает всплытие, а event.preventDefault() останавливает стандартное поведение браузера

// ### 34. Debounce

// Что такое debounce? Где его используют?
// Ограничение числа запросов. Мы ставим минимальный таймер после каждого триггера вызова и если понимаем, что он завершился упешно, то отправляет запрос.
// Это очень полезно в поисковой строке, к примеру. Не делать запрос пока человек не закончил печатать


function debounce(fn, delay) {
  let timer

  return function wrapper (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  }
}

// ### 35. Throttle

// Что такое throttle? Чем отличается от debounce?
// Примерно то же самое, но мы делаем первый запрос, а потом включаем таймер и пока он не закончится все новые запросы не будут выполнятся.
// Однако мы можем сохранять последние аргументы этих запросов, чтобы после таймера сделать новый запрос с самыми свежимы аргументами.

// ### 36. Fetch

// Что важно помнить про `fetch`, HTTP-ошибки и `response.ok`?
// Фетч запросы происходят в 2 этапа. Точннее даже ответ приходит в 2 этапа – на первом мы получаем статус, заголовки и response.ok, а на втором уже тело ответа и прочее.
// Так вот, глобально существует 2 типа ошибков — HTTP-ошибки (404, 403, 405) и ошибки связанные с доступом и прочим. HTTP-ошибки мы можем словить уже на первом этапе с помощью response.ok.
// В catch сами попадают сетевые ошибки, CORS-проблемы, отмена запроса, или ошибки, которые ты сама бросила через throw.

try {
  const response = await fetch('/api/data');

  if (!response.ok) {
    throw new Error('HTTP error');
  }

  const data = await response.json();
} catch (error) {
  console.error(error);
}

// ## Часть 8. Мини-задачи

// ### 37.

// Напиши функцию, которая возвращает первый неповторяющийся символ в строке.

function firstUnique(str) {
  let obj = {};

  for (let el of str) {
    obj[el] = (obj[el] || 0) + 1;
  }

  for (let el of str) {
    if (obj[el] === 1) return el
  }

  return null
}

firstUnique('leetcode'); // 'l'
firstUnique('aabbc'); // 'c'
firstUnique('aabb'); // null


// ### 38.

// Напиши функцию `groupBy(arr, key)`, которая группирует объекты по ключу.

function groupBy(arr, key) {
  let fin = {};

  for (let el of arr) {
    if (fin[el[key]]) {
      fin[el[key]].push(el);
    } else {
      fin[el[key]] = [el];
    }
  }

  return fin
}


const users = [
  { name: 'Anna', role: 'admin' },
  { name: 'Bob', role: 'user' },
  { name: 'Kate', role: 'admin' },
];

groupBy(users, 'role');

// ### 39.

// Напиши функцию, которая раскрывает массив на один уровень вложенности.

function flattenOneLevel (arr) {
  let fin = [];

  for (let el of arr) {
    if (Array.isArray(el)) {
      fin.push(...el);
    } else {
      fin.push(el);
    }
  }

  return fin
}

flattenOneLevel([1, [2, 3], [4], 5]); // [1, 2, 3, 4, 5]

// ### 40.

// Напиши функцию, которая проверяет, являются ли строки анаграммами.

function isAnagram (str1, str2) {
  if (str1.length !== str2.length) return false

  let obj = {};

  for (let i = 0; i <= str1.length - 1; i++) {
    obj[str1[i]] = (obj[str1[i]] || 0) + 1;
    obj[str2[i]] = (obj[str2[i]] || 0) - 1;
  }

  for (let key of Object.keys(obj)) {
    if (obj[key] !== 0) return false
  }

  return true
}

isAnagram('listen', 'silent'); // true
isAnagram('hello', 'world'); // false
