// function shortestPathWithOneWallBreak(grid) {
//   let visited = new Set(["0,0,false"]);
//   let rows = grid.length;
//   let cols = grid[0].length;

//   let queue = [[0, 0, false, 0, []]];
//   let index = 0;
//   let coord = [
//     [1, 0, "down"],
//     [-1, 0, "up"],
//     [0, 1, "right"],
//     [0, -1, "left"],
//   ];

//   while (index < queue.length) {
//     let [row, col, broke, count, path] = queue[index];
//     index++;

//     if (row === rows - 1 && col === cols - 1) {
//       return `${count}:  ${path}`;
//     }

//     for (let [r, c, direction] of coord) {
//       let newRow = row + r;
//       let newCol = col + c;

//       if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols) {
//         continue;
//       }

//       let newBroke = broke;

//       if (grid[newRow][newCol] === "1") {
//         if (broke) {
//           continue;
//         }
//         newBroke = true;
//       }

//       let key = `${newRow},${newCol},${newBroke}`;

//       if (visited.has(key)) {
//         continue;
//       }

//       visited.add(key);

//       queue.push([newRow, newCol, newBroke, count + 1, [...path, direction]]);
//     }
//   }

//   return "-1: No way!";
// }

// console.log(shortestPathWithOneWallBreak(["000", "110", "000"])); // 4
// console.log(shortestPathWithOneWallBreak(["010", "010", "000"])); // 4
// console.log(shortestPathWithOneWallBreak(["011", "111", "110"])); // -1
// console.log(shortestPathWithOneWallBreak(["01", "10"])); // 2
// console.log(shortestPathWithOneWallBreak(["0"])); // 0
// console.log(
//   shortestPathWithOneWallBreak(["01110", "00010", "11000", "01111", "00000"]),
// ); // 8
// console.log(shortestPathWithOneWallBreak(["011"])); // -1

// /// Ключи-двери-bfs

// function shortestPathToCollectAllKeys(grid) {
//   let rows = grid.length;
//   let cols = grid[0].length;

//   let startRow = 0;
//   let startCol = 0;
//   let allKeys = new Set();

//   let coord = [
//     [1, 0],
//     [-1, 0],
//     [0, 1],
//     [0, -1],
//   ];

//   for (let i = 0; i <= rows - 1; i++) {
//     for (let j = 0; j <= cols - 1; j++) {
//       if (grid[i][j] === "@") {
//         startRow = i;
//         startCol = j;
//       }

//       if (/[a-z]/.test(grid[i][j])) {
//         allKeys.add(grid[i][j]);
//       }
//     }
//   }

//   let visited = new Set([`${startRow},${startCol},`]);
//   let queue = [[startRow, startCol, new Set(), 0]];
//   let index = 0;

//   while (index < queue.length) {
//     let [row, col, keys, steps] = queue[index];
//     index++;

//     if (keys.size === allKeys.size) {
//       return steps;
//     }

//     for (let [r, c] of coord) {
//       let newRow = row + r;
//       let newCol = col + c;

//       if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols) {
//         continue;
//       }

//       let newKeys = new Set([...keys]);

//       let el = grid[newRow][newCol];

//       if (/[a-z]/.test(el)) {
//         newKeys.add(el);
//       } else if (/[A-Z]/.test(el)) {
//         if (!newKeys.has(el.toLowerCase())) {
//           continue;
//         }
//       }

//       if (el === "#") {
//         continue;
//       }

//       let keysState = [...newKeys].sort().join("");

//       let key = `${newRow}, ${newCol}, ${keysState}`;

//       if (visited.has(key)) {
//         continue;
//       }

//       visited.add(key);

//       queue.push([newRow, newCol, newKeys, steps + 1]);
//     }
//   }

//   return -1;
// }

// console.log(shortestPathToCollectAllKeys(["@.a..", "###.#", "b.A.B"]));
// // 8

// console.log(shortestPathToCollectAllKeys(["@"]));
// // 0

// console.log(shortestPathToCollectAllKeys(["@Aa"]));
// // -1

// console.log(shortestPathToCollectAllKeys(["@.a", "###", "b.A"]));
// // -1

console.log("New interview");
console.log("---------------#1");

function firstUnique(str) {
  let obj = {};

  for (let el of str) {
    obj[el] = (obj[el] || 0) + 1;
  }

  for (let i = 0; i <= str.length - 1; i++) {
    if (obj[str[i]] === 1) {
      return i;
    }
  }

  return -1;
}

console.log(firstUnique("leetcode")); // 0
console.log(firstUnique("loveleetcode")); // 2
console.log(firstUnique("aabb")); // -1

console.log("---------------#2");

function isValid(str) {
  let stack = [];

  for (let el of str) {
    if (el === "(" || el === "[" || el === "{") {
      stack.push(el);
    } else if (
      (el === ")" && stack[stack.length - 1] === "(") ||
      (el === "]" && stack[stack.length - 1] === "[") ||
      (el === "}" && stack[stack.length - 1] === "{")
    ) {
      stack.pop();
    } else {
      return false;
    }
  }

  return stack.length ? false : true;
}

console.log(isValid("()")); // true
console.log(isValid("({[]})")); // true
console.log(isValid("(]")); // false
console.log(isValid("([)]")); // false

console.log("---------------#3");

function compress(str) {
  let arr = [];
  let left = 0;

  for (let right = 1; right <= str.length; right++) {
    if (str[right] !== str[left] && right - left === 1) {
      arr.push(str[left]);
      left++;
    } else if (str[right] !== str[left] && right - left > 1) {
      let count = right - left;
      arr.push(str[left], count);
      left = right;
    }
  }

  return arr.join("");
}

console.log(compress("aaabbc")); // "a3b2c"
console.log(compress("abcd")); // "abcd"
console.log(compress("a")); // "a"
console.log(compress("")); // ""

console.log("---------------#4");

function intersection(a, b) {
  let setA = new Set([...a]);
  let fin = new Set();

  for (let el of b) {
    if (setA.has(el)) {
      fin.add(el);
    }
  }

  return [...fin];
}

console.log(intersection([1, 2, 2, 3], [2, 2, 4])); // [2]
console.log(intersection(["a", "b"], ["b", "c"])); // ["b"]
console.log(intersection([], [1, 2])); // []

console.log("---------------#5");

function lengthOfLongestSubstring(str) {
  let left = 0;
  let max = 0;
  let set = new Set();

  for (let right = 0; right <= str.length - 1; right++) {
    while (set.has(str[right])) {
      set.delete(str[left]);
      left++;
    }

    set.add(str[right]);
    max = Math.max(max, right - left + 1);
  }

  return max;
}

console.log(lengthOfLongestSubstring("abcabcbb")); // 3
console.log(lengthOfLongestSubstring("bbbbb")); // 1
console.log(lengthOfLongestSubstring("pwwkew")); // 3
console.log(lengthOfLongestSubstring("")); // 0

console.log("---------------#6");

function bfs(root) {
  if (root === null) return [];

  let result = [];
  let queue = [root];
  let index = 0;

  while (index < queue.length) {
    let cur = queue[index];
    index++;

    result.push(cur.val);

    if (cur.left !== null) {
      queue.push(cur.left);
    }

    if (cur.right !== null) {
      queue.push(cur.right);
    }
  }

  return result;
}

const tree = {
  val: 1,
  left: {
    val: 2,
    left: null,
    right: null,
  },
  right: {
    val: 3,
    left: {
      val: 4,
      left: null,
      right: null,
    },
    right: null,
  },
};

console.log(bfs(tree)); // [1, 2, 3, 4]
console.log(bfs(null)); // []

console.log("---------------#7");

function sumNumbers(root) {
  if (root === null) return 0;
  let sum = 0;
  let stack = [
    {
      start: root,
      count: 0,
    },
  ];

  while (stack.length) {
    let cur = stack.pop();

    let node = cur.start;
    let x = cur.count;

    let currentValue = x * 10 + node.val;

    if (node.left === null && node.right === null) {
      sum += currentValue;
      continue;
    }

    if (node.left !== null) {
      stack.push({
        start: node.left,
        count: currentValue,
      });
    }

    if (node.right !== null) {
      stack.push({
        start: node.right,
        count: currentValue,
      });
    }
  }

  return sum;
}

const tree2 = {
  val: 1,
  left: {
    val: 2,
    left: null,
    right: null,
  },
  right: {
    val: 3,
    left: null,
    right: null,
  },
};

console.log(sumNumbers(tree2)); // 25, потому что 12 + 13

console.log("---------------#8");

function debounce(fn, ms) {
  let timer;

  function wrapper(...args) {
    clearTimeout(timer);

    timer = setTimeout(() => fn.apply(this, args), ms);
  }

  return wrapper;
}

const log = debounce(console.log, 30);

log(1);
log(2);
log(3);

console.log("---------------#9");

function once(fn) {
  let called = false;
  let res;

  function wrapper(...args) {
    if (!called) {
      res = fn.apply(this, args);
      called = true
    }

    return res;
  }

  return wrapper;
}

const add = once((a, b) => a + b);

console.log(add(1, 2)); // 3
console.log(add(5, 10)); // 3
console.log(add(100, 200)); // 3

console.log("---------------#10");

function groupBy(arr, key) {
  let fin = {};

  for (let el of arr) {
    if (fin[el[key]]) {
      fin[el[key]].push(el);
    } else {
      fin[el[key]] = [el]
    }
  }

  return fin
}

const users = [
  { name: "Ann", city: "Minsk" },
  { name: "Bob", city: "Tel Aviv" },
  { name: "Kate", city: "Minsk" },
];

console.log(groupBy(users, "city"));
// {
//   Minsk: [
//     { name: "Ann", city: "Minsk" },
//     { name: "Kate", city: "Minsk" }
//   ],
//   "Tel Aviv": [
//     { name: "Bob", city: "Tel Aviv" }
//   ]
// }

