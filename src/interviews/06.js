// 1. Вывод

Promise.resolve(1)
  .then((x) => {
    console.log(x); // 1
    return x + 1; // 2
  })
  .then((x) => {
    throw x; // error
  })
  .catch((x) => {
    console.log(x); // 2
  })
  .then((x) => {
    console.log(x); // undefined
  });


// Вывод: 1, 2, undefined

// 2. Вывод

setTimeout(() => console.log(1));

Promise.resolve()
  .then(() => console.log(2));

queueMicrotask(() => {
  console.log(3);
});

console.log(4);

// Вывод: 4, 2, 3, 1

// 3. Разница между shallow copy и deep copy.

// Shallow copy (не глубокая копия) копирует только верхний уровень элемента, а deep copy (глубокая копия) копирует объект на всех уровнях.
// Это особенно важно для изменении элементов, потому что изменения на глубоких уровнях shallow copy-элемента приводят к изменению этих же данных во всех ссылках.

// 4. Почему это НЕ работает?

const arr = [];

arr.prototype.groupBy = function () {};

// должно быть Array.prototype, потому this внутри groupBy будет равен arr.

// 5. Что выведется?

const obj = {
  name: "Anna",

  sayHi() {
    console.log(this.name);
  }
};

setTimeout(obj.sayHi, 0); // undefined, нужно добавить bind

// 6. Разница:

// map — проходит по всем элементам и отдает новый массив
// forEach — проходит по всем элементам, но ничего не отдает, просто как цикл
// reduce — проходит по всем элементам и отдает аккамулятор

// 7. Что выведется?

console.log(typeof null); // object
console.log(typeof []); // object
console.log(typeof function () {}); // function

// 8. Что выведется?
console.log([] == false); // true 
console.log("" == false); // true
console.log(null == undefined); // true
console.log(null === undefined); // false

// 9. Что выведется?
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i));
}

// 3, 3, 3
// Нужно использовать let вместо var или добавить доп переменную

// 10. Что выведется?
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i));
}
// 0, 1, 2
// Потому что let пересоздается на каждом ходу цикла

// 11. Разница

// function declaration – хостинг наверх и доступ до инициализации
// function expression — нет досутпа до инициализации
// arrow function — нет собственного this и arguments

// 12. Что выведется?
const user = {
  name: "Anna",

  regular() {
    console.log(this.name);
  },

  arrow: () => {
    console.log(this.name);
  }
};

user.regular(); // "Anna"
user.arrow(); // undefined

// 13. Что выведется?
Promise.resolve()
  .then(() => {
    console.log(1);

    return Promise.resolve(2);
  })
  .then((x) => {
    console.log(x);
  });

console.log(3);

// 3, 1, 2

// 14. Что выведется?
Promise.resolve()
  .then(() => {
    throw new Error("oops");
  })
  .catch((err) => {
    console.log(err.message);

    return 5;
  })
  .then(console.log);

// "oops", 5
