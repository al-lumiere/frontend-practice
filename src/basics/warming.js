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
  let j = str.length-1;

  while (i <= j) {
    if (str[i] !== str[j]) {
      return false
    }

    i++
    j--
  }

  return true
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
  })

  return fin
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

  return fin
}

console.log(groupBy(
  [
    { age: 20 },
    { age: 20 },
    { age: 30 }
  ],
  "age"
));