function sumExcept(a, i, n) {
  if (i <= 0 || i % 1 !== 0) {
    i = 0;
  }

  if (n <= 0 || n % 1 !== 0) {
    n = 0;
  }

  let sum = 0;

  for (let index = 0; index <= a.length - 1; index++) {
    if (index === i) {
      while (n !== 0) {
        index++;
        n--;
      }
    }

    let el = a[index];

    if (el % 1 !== 0) {
      el = 0;
    }

    sum += el;
  }

  return sum;
}

console.log(sumExcept([1, 9, 8, 4], 4, 2));

function findPair(nums, k) {
  let m = new Map();

  for (let el of nums) {
    let take = k - el;

    if (m.has(take)) {
      return true;
    } else {
      m.set(el);
    }
  }

  return false;
}

console.log(findPair([10, 15, 3, 7], 17));
