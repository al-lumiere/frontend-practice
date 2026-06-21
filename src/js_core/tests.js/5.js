// ------------------------------------------------------
// 1. var / let / const / hoisting
// ------------------------------------------------------

console.log(a); // undefined
console.log(b); // error

var a = 10;
let b = 20;

// ---

function testHoisting() {
  console.log(value); // undefined

  if (true) {
    var value = 42;
  }

  console.log(value); // 42
}

testHoisting(); 


// ------------------------------------------------------
// 2. Типы и сравнения
// ------------------------------------------------------

/*
Вопрос 3.
Что выведется?
*/

console.log(typeof null);
console.log(typeof []);
console.log(typeof NaN);
console.log(Number.isNaN(NaN));
console.log(isNaN("hello"));

// Ответ:

/*
Вопрос 4.
Объясни результат каждого сравнения.
*/

console.log(0 == false);
console.log(0 === false);
console.log(null == undefined);
console.log(null === undefined);
console.log([] == false);
console.log([] === false);

// Ответ:


// ------------------------------------------------------
// 3. Область видимости и замыкания
// ------------------------------------------------------

/*
Вопрос 5.
Что выведется и почему?
*/

function createCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log(counter1());
console.log(counter1());
console.log(counter2());
console.log(counter1());

// Ответ:

/*
Задача 6.
Реализуй функцию once(fn), которая вызывает fn только один раз.
Все последующие вызовы должны возвращать результат первого вызова.
*/

function once(fn) {
  // TODO
}

const init = once(function (name) {
  console.log("init called");
  return `Hello, ${name}`;
});

// console.log(init("Alex")); // init called, Hello, Alex
// console.log(init("Kate")); // Hello, Alex


// ------------------------------------------------------
// 4. Функции и this
// ------------------------------------------------------

/*
Вопрос 7.
Что выведется?
*/

const user = {
  name: "Alex",
  sayHi() {
    console.log(this.name);
  },
};

user.sayHi();

const say = user.sayHi;
say();

// Ответ:

/*
Вопрос 8.
Что выведется и почему?
*/

const person = {
  name: "Mira",
  regular: function () {
    console.log(this.name);
  },
  arrow: () => {
    console.log(this.name);
  },
};

person.regular();
person.arrow();

// Ответ:

/*
Задача 9.
Исправь код так, чтобы метод showName корректно выводил имя через setTimeout.
*/

const student = {
  name: "Nika",

  showName() {
    setTimeout(function () {
      console.log(this.name);
    }, 100);
  },
};

// student.showName();

// Исправление:


// ------------------------------------------------------
// 5. Массивы и объекты
// ------------------------------------------------------

/*
Вопрос 10.
Что выведется?
*/

const arr = [1, 2, 3];

const mapped = arr.map((num) => {
  num * 2;
});

console.log(mapped);

// Ответ:

/*
Задача 11.
Реализуй функцию groupBy(arr, key), которая группирует объекты по указанному ключу.
*/

function groupBy(arr, key) {
  // TODO
}

const users = [
  { name: "Alex", role: "admin" },
  { name: "Kate", role: "user" },
  { name: "Max", role: "admin" },
];

// console.log(groupBy(users, "role"));
// {
//   admin: [
//     { name: "Alex", role: "admin" },
//     { name: "Max", role: "admin" }
//   ],
//   user: [
//     { name: "Kate", role: "user" }
//   ]
// }

/*
Вопрос 12.
Что выведется?
*/

const obj1 = { a: 1 };
const obj2 = obj1;
const obj3 = { a: 1 };

console.log(obj1 === obj2);
console.log(obj1 === obj3);

// Ответ:


// ------------------------------------------------------
// 6. Destructuring / spread / rest
// ------------------------------------------------------

/*
Вопрос 13.
Что выведется?
*/

const data = {
  id: 1,
  profile: {
    name: "Alex",
    age: 25,
  },
};

const {
  profile: { name },
} = data;

console.log(name);
// console.log(profile);

// Ответ:

/*
Задача 14.
Напиши функцию sumAll, которая принимает любое количество чисел и возвращает сумму.
*/

function sumAll(...numbers) {
  // TODO
}

// console.log(sumAll(1, 2, 3)); // 6
// console.log(sumAll(10, -2, 5)); // 13


// ------------------------------------------------------
// 7. Промисы и async/await
// ------------------------------------------------------

/*
Вопрос 15.
В каком порядке выведутся логи?
*/

console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

Promise.resolve().then(() => {
  console.log("C");
});

console.log("D");

// Ответ:

/*
Вопрос 16.
Что выведется?
*/

async function asyncTest() {
  console.log("1");

  await Promise.resolve();

  console.log("2");
}

console.log("3");
asyncTest();
console.log("4");

// Ответ:

/*
Задача 17.
Реализуй getText(url):
1. делает fetch(url)
2. если response.ok === false — кидает ошибку
3. возвращает response.text()
*/

async function getText(url) {
  // TODO
}


// ------------------------------------------------------
// 8. Ошибки
// ------------------------------------------------------

/*
Вопрос 18.
Поймается ли ошибка в catch? Почему?
*/

try {
  setTimeout(() => {
    throw new Error("Boom");
  }, 0);
} catch (error) {
  console.log("Caught:", error.message);
}

// Ответ:

/*
Задача 19.
Перепиши код так, чтобы ошибка из setTimeout была обработана через Promise.
*/

function delayError() {
  // TODO
}

// delayError().catch((error) => console.log(error.message));


// ------------------------------------------------------
// 9. Прототипы и классы
// ------------------------------------------------------

/*
Вопрос 20.
Что выведется?
*/

const animal = {
  eats: true,
};

const dog = Object.create(animal);
dog.barks = true;

console.log(dog.barks);
console.log(dog.eats);
console.log(dog.hasOwnProperty("eats"));

// Ответ:

/*
Задача 21.
Создай класс User:
- constructor принимает name
- метод sayHi возвращает строку "Hi, я NAME"
*/

class User {
  // TODO
}

// const alex = new User("Alex");
// console.log(alex.sayHi()); // "Hi, я Alex"


// ------------------------------------------------------
// 10. Мини-задачи как на собеседовании
// ------------------------------------------------------

/*
Задача 22.
Реализуй debounce(fn, delay).
Функция должна вызываться только после того,
как прошло delay мс с последнего вызова.
*/

function debounce(fn, delay) {
  // TODO
}

/*
Задача 23.
Реализуй throttle(fn, delay).
Функция должна вызываться не чаще одного раза в delay мс.
*/

function throttle(fn, delay) {
  // TODO
}

/*
Задача 24.
Реализуй deepClone для простых объектов:
- object
- array
- number/string/boolean/null
Без Date, Map, Set и циклических ссылок.
*/

function deepClone(value) {
  // TODO
}

/*
Задача 25.
Реализуй isEmpty(value), которая возвращает true, если:
- null или undefined
- пустая строка
- пустой массив
- пустой объект
Во всех остальных случаях false.
*/

function isEmpty(value) {
  // TODO
}