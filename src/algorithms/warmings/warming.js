function compact(arr) {
  return arr.filter((el) => Boolean(el) === true);
}

console.log(compact([0, 1, false, 2, "", 3]));

function reverse(str) {
  return str.split("").reverse().join("");
}

console.log(reverse("hello"));

function countVowels(str) {
  let vowels = "aeiou";

  return str.split("").filter((el) => vowels.includes(el)).length;
}

console.log(countVowels("hello"));

function isPalindrome(str) {
  let i = 0;
  let j = str.length - 1;

  while (i <= j) {
    if (str[i] !== str[j]) {
      return false;
    }

    i++;
    j--;
  }

  return true;
}

console.log(isPalindrome("madam"));
console.log(isPalindrome("hello"));

function flatten(arr) {
  let fin = [];

  arr.forEach((el) => {
    if (!Array.isArray(el)) {
      fin.push(el);
    } else {
      fin.push(...flatten(el));
    }
  });

  return fin;
}

console.log(flatten([1, [2, 3], 4]));

function groupBy(arr, field) {
  let fin = {};

  for (let el of arr) {
    if (fin[el[field]]) {
      fin[el[field]].push(el);
    } else {
      fin[el[field]] = [el];
    }
  }

  return fin;
}

console.log(groupBy([{ age: 20 }, { age: 20 }, { age: 30 }], "age"));

function twoSum(arr, target) {
  // Solving #1
  // let fin = [];

  // for(let i = 0; i <= arr.length-1; i++) {
  //   for (let j = i; j<= arr.length-1; j++) {
  //     if (arr[i] + arr[j] === target) {
  //       fin.push(i, j);
  //     }
  //   }
  // }

  // return fin

  // Solving #2
  let map = new Map();

  for (let i = 0; i <= arr.length - 1; i++) {
    const needed = target - arr[i];

    if (map.has(needed)) {
      return [map.get(needed), i];
    }

    map.set(arr[i], i);
  }
}

console.log(twoSum([2, 7, 11, 15], 9));

function removeDuplicates(arr) {
  // Solution #1
  return [...new Set(arr)];
}

console.log(removeDuplicates([1, 1, 2, 3, 3]));

function countLetters(str) {
  let obj = {};

  for (let i = 0; i <= str.length - 1; i++) {
    if (obj[str[i]]) {
      obj[str[i]] += 1;
    } else {
      obj[str[i]] = 1;
    }
  }

  return obj;
}

console.log(countLetters("hello"));

function longestWord(str) {
  let arr = str.split(" ");
  let s = arr.sort((a, b) => b.length - a.length);
  return s[0];
}

console.log(longestWord("I love JavaScript"));

function chunk(arr, a) {
  let fin = [];
  let x = [];

  for (let i = 0; i <= arr.length - 1; i++) {
    for (let j = i; j < a + i; j++) {
      if (!arr[j]) {
        break;
      }

      x.push(arr[j]);
    }

    fin.push(x);
    x = [];
    i += a - 1;
  }

  return fin;
}

console.log(chunk([1, 2, 3, 4, 5], 3));
