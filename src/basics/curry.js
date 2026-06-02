console.log("---------------- CURRY");

/*
# curry

Напиши функцию curry(fn), которая превращает обычную функцию
с несколькими аргументами в функцию, которую можно вызывать частями.

Пример:

function sum(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum);

curriedSum(1, 2, 3); // 6
curriedSum(1)(2)(3); // 6
curriedSum(1, 2)(3); // 6
curriedSum(1)(2, 3); // 6

Важно:
- количество нужных аргументов можно узнать через fn.length
- пока аргументов недостаточно — возвращаем новую функцию
- когда аргументов достаточно — вызываем fn
*/

function curry(fn) {
  function wrapper (...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }

    return function (...nextArgs) {
      return wrapper(...args, ...nextArgs);
    }
  }

  return wrapper
}

function sum(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum);

console.log(curriedSum(1, 2, 3)); // 6
console.log(curriedSum(1)(2)(3)); // 6
console.log(curriedSum(1, 2)(3)); // 6
console.log(curriedSum(1)(2, 3)); // 6


function multiply(a, b, c, d) {
  return a * b * c * d;
}

const curriedMultiply = curry(multiply);

console.log(curriedMultiply(2)(3)(4)(5)); // 120
console.log(curriedMultiply(2, 3)(4, 5)); // 120
console.log(curriedMultiply(2, 3, 4, 5)); // 120