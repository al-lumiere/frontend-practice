function isValid(str) {
  let arr = str.split("");
  let stack = [];

  for(let el of arr) {
    if (el === "(" || el === "[" || el === "{" ) {
      stack.push(el);
    } else {
      
    }
  }

}

console.log(isValid("()"));
console.log(isValid("()[]{}"));
console.log(isValid("(]"));
console.log(isValid("([{}])"));