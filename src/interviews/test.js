// Реализовать throttle(fn, ms).
// Возвращенная функция вызывает fn не чаще одного раза в ms миллисекунд
// и старается выполнять вызовы как можно чаще. Если во время ожидания
// приходят новые вызовы, нужно запомнить последний набор аргументов
// и выполнить его в ближайший допустимый момент.

const throttled = throttle(console.log, 400);

// throttled(1); // сразу
// setTimeout(() => throttled(2), 100); // будет заменен
// setTimeout(() => throttled(3), 200); // выполнится примерно на 400 мс

function throttle(fn, ms) {
  let lastArgs = undefined;
  let isThrottled = false;

  return function wrapper(...args) {
    if (isThrottled) {
      lastArgs = args;
      return;
    }

    fn(...args);
    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;

      if (lastArgs !== undefined) {
        const argsToRun = lastArgs;
        lastArgs = undefined;
        wrapper(...argsToRun);
      }
    }, ms);
  };
}

// deep copy
let arr = [1, [2, [3]], [4, 5]];
let obj = {
  a: { x: 1 },
  b: 2,
  c: [2, 3],
};

function deepCopy(a) {
  if (Array.isArray(a)) {
    let copy = [];
    for (let el of a) {
      if (typeof el !== "object" || el === null) {
        copy.push(el);
      } else {
        copy.push(deepCopy(el));
      }
    }

    return copy;
  } else {
    let copy = {};

    for (let key of Object.keys(a)) {
      if (typeof a[key] !== "object" || a[key] === null) {
        copy[key] = a[key];
      } else {
        copy[key] = deepCopy(a[key]);
      }
    }

    return copy;
  }
}

// console.log(deepCopy(arr));
// console.log(deepCopy(obj));

// рандомный индекс генератор
function randomIndexGenerator(arr) {
  if (arr.length === 0) {
    throw new Error("Error");
  }

  let allParts = arr.reduce((a, b) => a + b);
  let onePart = 100 / allParts;

  let limits = [];

  for (let i = 0; i <= arr.length - 1; i++) {
    let limitFloor = limits[i - 1]?.[1] ?? 0;
    let limitTop = onePart * arr[i] + limitFloor;
    limits.push([limitFloor, limitTop]);
  }

  function wrapper() {
    let random = Math.random() * 100;

    // for (let i = 0; i <= limits.length - 1; i++) {
    //   if (limits[i][0] < random && random <= limits[i][1]) {
    //     return i;
    //   }
    // }

    let left = 0
    let rigth = limits.length;

    while (rigth - left > 1) {
      let middle = Math.floor((rigth + left) / 2);
      let floor = limits[middle][0];

      console.log(middle)

      if (random >= floor) {
        left = middle;
      } else {
        rigth = middle - 1;
      }
    }

    return left
  }

  return wrapper;
}

// const getIndex1 = randomIndexGenerator([2, 5, 3]);
// console.log(getIndex1()); // 0, 1 или 2; индекс 1 должен выпадать чаще

const getIndex2 = randomIndexGenerator([7.5, 3.75]);
console.log(getIndex2()); // индекс 0 примерно в 2 раза вероятнее индекса 1
