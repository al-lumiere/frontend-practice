// function isValid(str) {
//   let arr = str.split("");
//   let stack = [];

//   for(let el of arr) {
//     let top = stack[stack.length-1];

//     if (el === "(" || el === "[" || el === "{" ) {
//       stack.push(el);
//     } else if ((el === ")" && top === "(") || (el === "]" && top === "[") || (el === "}" && top === "{")) {
//       stack.pop();
//     } else {
//       return false
//     }
//   }

//   if (stack.length === 0) {
//     return true
//   } else {
//     return false
//   }
// }

// console.log(isValid("()"));
// console.log(isValid("()[]{}"));
// console.log(isValid("(]"));
// console.log(isValid("([{}])"));
// console.log(isValid("())("));

// function moveZeroes(arr) {
//   let filtered = arr.filter((el) => el !== 0);
//   return filtered.concat(new Array(arr.length - filtered.length).fill(0))
// }

// console.log(moveZeroes([0, 1, 0, 3, 12]));
// console.log(moveZeroes([0]));
// console.log(moveZeroes([]));

// function firstUnique(str) {
//   let arr = str.split("");
//   let obj = {};

//   for (let el of arr) {
//     if (obj[el]) {
//       obj[el] += 1;
//     } else {
//       obj[el] = 1;
//     }
//   }

//   for (let key in obj) {
//     if (obj[key] === 1) {
//       return arr.indexOf(key)
//     }
//   }

//   return -1
// }

// console.log(firstUnique("eemtcode"));
// console.log(firstUnique("aabb"));

function isPalindrome(str) {
  let start = 0;
  let end = str.length - 1;

  const isLetter = (ch) => ch !== undefined && /[a-z]/.test(ch.toLowerCase());

  while (start < end) {
    while (start < end && !isLetter(str[start])) {
      start++;
    }

    while (start < end && !isLetter(str[end])) {
      end--;
    }

    if (str[start].toLowerCase() !== str[end].toLowerCase()) {
      return false;
    }

    start++;
    end--;
  }

  return true;
}

// console.log(isPalindrome("baraban"));
// console.log(isPalindrome("Madam, I'm Adam"));

function validPalindromeAlmost(s) {
  let start = 0;
  let end = s.length - 1;
  let deleted = false;

  while (start <= end) {
    if (s[start] !== s[end]) {
      if (start < end && s[start + 1] === s[end] && deleted === false) {
        start++;
        deleted = true;
      } else if (start < end && s[start] === s[end - 1] && deleted === false) {
        end--;
        deleted = true;
      } else {
        return false;
      }
    }
    start++;
    end--;
  }

  return true
}

console.log(validPalindromeAlmost("aba"));
console.log(validPalindromeAlmost("abca"));
console.log(validPalindromeAlmost("abc"));
