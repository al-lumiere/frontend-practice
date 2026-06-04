console.log("FINAL INTERVIEW PRACTICE");
console.log("---------------- #1");

/*
#1 removeDuplicates

Дан отсортированный массив чисел.
Нужно вернуть новый массив без дублей.

Важно:
- массив уже отсортирован
- порядок сохранить
- можно решить через Set, но попробуй через two pointers / один проход

Сложность ожидаемая: O(n)
*/

function removeDuplicates(nums) {
  let fin = [];
  let left = 0;

  for (let right = 0; right <= nums.length; right++) {
    if (nums[left] !== nums[right]) {
      fin.push(nums[left]);
      left = right;
    }
  }

  return fin;
}

// O(n) и O(n)

console.log(removeDuplicates([1, 1, 2])); // [1, 2]
console.log(removeDuplicates([1, 1, 2, 2, 3, 4, 4])); // [1, 2, 3, 4]
console.log(removeDuplicates([])); // []
console.log(removeDuplicates([5])); // [5]

console.log("---------------- #2");

/*
#2 isAnagram

Даны две строки.
Нужно вернуть true, если одна строка является анаграммой другой.

Примеры:
"listen" и "silent" -> true
"hello" и "world" -> false

Сложность ожидаемая: O(n)
*/

function isAnagram(a, b) {
  if (a.length !== b.length) return false;

  let obj = {};

  for (let i = 0; i <= a.length - 1; i++) {
    obj[a[i]] = (obj[a[i]] || 0) + 1;
    obj[b[i]] = (obj[b[i]] || 0) - 1;
  }

  for (let el of Object.keys(obj)) {
    if (obj[el] !== 0) return false;
  }

  return true;
}

// O(n) – где n это количество символов в строках а и б суммарно.
// O(k) — количество уникальных символов

console.log(isAnagram("listen", "silent")); // true
console.log(isAnagram("hello", "world")); // false
console.log(isAnagram("aabb", "bbaa")); // true
console.log(isAnagram("aabb", "ab")); // false

console.log("---------------- #3");

/*
#3 backspaceCompare

Даны две строки.
Символ "#" означает backspace, то есть удаление предыдущего символа.

Нужно вернуть true, если после применения backspace строки равны.

Можно решить через стек.

Сложность ожидаемая: O(n + m)
*/

function backspaceCompare(s, t) {
  let stackS = [];
  let stackT = [];

  for (let el of s) {
    if (el === "#") {
      stackS.pop();
    } else {
      stackS.push(el);
    }
  }

  for (let el of t) {
    if (el === "#") {
      stackT.pop();
    } else {
      stackT.push(el);
    }
  }

  if (stackS.length !== stackT.length) return false;

  for (let i = 0; i <= stackS.length - 1; i++) {
    if (stackS[i] !== stackT[i]) return false;
  }

  return true;
}

// O(n) где n это количество символов в строках а и б суммарно. Память такая же

console.log(backspaceCompare("ab#c", "ad#c")); // true, обе -> "ac"
console.log(backspaceCompare("ab##", "c#d#")); // true, обе -> ""
console.log(backspaceCompare("a#c", "b")); // false
console.log(backspaceCompare("abc#d", "abzz##d")); // true

console.log("---------------- #4");

/*
#4 maxSumSubarray

Дан массив чисел nums и число k.
Нужно вернуть максимальную сумму подмассива длины k.

Это fixed sliding window.

Сложность ожидаемая: O(n)
*/

function maxSumSubarray(nums, k) {
  let sum = 0;
  let left = 0;

  for (let i = 0; i <= k - 1; i++) {
    sum += nums[i];
  }

  let max = sum;

  for (let right = k; right <= nums.length - 1; right++) {
    sum -= nums[left];
    left++;

    sum += nums[right];
    max = Math.max(max, sum);
  }

  return max;
}

// O(n), O(1)

console.log(maxSumSubarray([1, 2, 3, 4, 5], 2)); // 9, [4,5]
console.log(maxSumSubarray([5, 1, 3, 2, 6], 3)); // 11, [3,2,6]
console.log(maxSumSubarray([-1, -2, -3, -4], 2)); // -3, [-1,-2]
console.log(maxSumSubarray([10], 1)); // 10

console.log("---------------- #5");

/*
#5 hasPath

Дан граф в виде объекта.
Нужно вернуть true, если существует путь от start до target.

Граф направленный.

Можно BFS или DFS.
Не забудь visited, чтобы не зациклиться.

Сложность ожидаемая: O(V + E)
*/

function hasPath(graph, start, target) {
  let visited = new Set([start]);
  let queue = [start];
  let index = 0;

  while (index < queue.length) {
    let cur = queue[index];
    index++;

    if (cur === target) {
      return true;
    }

    if (!graph[cur]) {
      continue;
    }

    for (let nei of graph[cur]) {
      if (visited.has(nei)) {
        continue;
      }

      visited.add(nei);
      queue.push(nei);
    }
  }

  return false;
}

// O(v + e), O(v)

const graph1 = {
  a: ["b", "c"],
  b: ["d"],
  c: ["e"],
  d: [],
  e: ["b"],
};

console.log(hasPath(graph1, "a", "d")); // true
console.log(hasPath(graph1, "c", "d")); // true
console.log(hasPath(graph1, "d", "a")); // false
console.log(hasPath(graph1, "a", "a")); // true

console.log("---------------- #6");

/*
#6 maxDepth

Дано бинарное дерево.
Нужно вернуть максимальную глубину.

Пустое дерево -> 0.
Одна нода -> 1.

Можно DFS рекурсией или стеком.
*/

function maxDepth(root) {
  let max = 0;
  let stack = [
    {
      node: root,
      count: 1,
    },
  ];

  while (stack.length) {
    let cur = stack.pop();

    if (!cur.node) {
      continue;
    }

    if (cur.node.left === null && cur.node.right === null) {
      max = Math.max(max, cur.count);
    }

    if (cur.node.left !== null) {
      stack.push({
        node: cur.node.left,
        count: cur.count + 1,
      });
    }

    if (cur.node.right !== null) {
      stack.push({
        node: cur.node.right,
        count: cur.count + 1,
      });
    }
  }

  return max;
}

const tree = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4,
      left: null,
      right: null,
    },
    right: null,
  },
  right: {
    val: 3,
    left: null,
    right: null,
  },
};

console.log(maxDepth(tree)); // 3
console.log(maxDepth(null)); // 0
console.log(maxDepth({ val: 1, left: null, right: null })); // 1

/*
#7 countComponents

Дан НЕориентированный граф в виде adjacency list.
Нужно вернуть количество связных компонент.

Пример:
{
  a: ["b"],
  b: ["a"],
  c: ["d"],
  d: ["c"],
  e: []
}

Тут 3 компоненты:
a-b
c-d
e

Ожидаемая сложность:
time: O(V + E)
memory: O(V)
*/

function countComponents(graph) {
  let visited = new Set();
  let components = 0;

  function dfs(node) {
    for (let nei of graph[node]) {
      if (visited.has(nei)) {
        continue;
      }

      visited.add(nei);
      dfs(nei);
    }
  }

  for (let v of Object.keys(graph)) {
    if (visited.has(v)) {
      continue;
    }

    visited.add(v);
    components++;
    dfs(v);
  }

  return components;
}

console.log("---------------- #7");

const graph = {
  a: ["b"],
  b: ["a"],
  c: ["d"],
  d: ["c"],
  e: [],
};

console.log(countComponents(graph)); // 3

const graph2 = {
  a: ["b", "c"],
  b: ["a"],
  c: ["a"],
  d: ["e"],
  e: ["d"],
};

console.log(countComponents(graph2)); // 2

const graph3 = {
  a: [],
  b: [],
  c: [],
};

console.log(countComponents(graph3)); // 3

const graph4 = {};

console.log(countComponents(graph4)); // 0

/*
#2 largestComponent

Дан НЕориентированный граф.
Нужно вернуть размер самой большой связной компоненты.

Пример:
{
  a: ["b"],
  b: ["a"],
  c: ["d"],
  d: ["c"],
  e: []
}

Компоненты:
a-b -> размер 2
c-d -> размер 2
e -> размер 1

Ответ: 2

Ожидаемая сложность:
time: O(V + E)
memory: O(V)
*/

function largestComponent(graph) {
  let visited = new Set();
  let max = 0;

  function dfs(node) {
    let sum = 1;

    for (let nei of graph[node]) {
      if (visited.has(nei)) {
        continue;
      }

      visited.add(nei);
      sum += dfs(nei);
    }

    return sum;
  }

  for (let v of Object.keys(graph)) {
    if (visited.has(v)) {
      continue;
    }

    visited.add(v);
    max = Math.max(max, dfs(v));
  }

  return max;
}

console.log("---------------- #8");

console.log(largestComponent(graph)); // 2
console.log(largestComponent(graph2)); // 3
console.log(largestComponent(graph3)); // 1
console.log(largestComponent(graph4)); // 0

/*
#3 countIslands

Дана матрица из "1" и "0".
"1" — земля.
"0" — вода.

Остров — это группа соседних "1", соединённых по вертикали/горизонтали.
Диагонали НЕ считаются.

Нужно вернуть количество островов.

Ожидаемая сложность:
time: O(rows * cols)
memory: O(rows * cols)
*/

function countIslands(grid) {
  if (!grid.length) return 0;

  let visited = new Set();
  let islands = 0;
  let rows = grid.length;
  let cols = grid[0].length;

  function dfs(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols) {
      return;
    }

    if (grid[r][c] === "0") {
      return;
    }

    let key = `${r}, ${c}`;

    if (visited.has(key)) {
      return;
    }

    visited.add(key);

    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let row = 0; row <= rows - 1; row++) {
    for (let col = 0; col <= cols - 1; col++) {
      if (grid[row][col] === "0") {
        continue;
      }

      let key = `${row}, ${col}`;

      if (visited.has(key)) {
        continue;
      }

      islands++;
      dfs(row, col);
    }
  }

  return islands;
}

console.log("---------------- #9");

const grid1 = [
  ["1", "1", "0", "0"],
  ["1", "0", "0", "1"],
  ["0", "0", "1", "1"],
  ["0", "0", "0", "0"],
];

console.log(countIslands(grid1)); // 2

const grid2 = [
  ["1", "1", "0"],
  ["0", "1", "0"],
  ["1", "0", "1"],
];

console.log(countIslands(grid2)); // 3

const grid3 = [
  ["0", "0"],
  ["0", "0"],
];

console.log(countIslands(grid3)); // 0

const grid4 = [];

console.log(countIslands(grid4)); // 0

/*
#4 largestIsland

Дана матрица из "1" и "0".
Нужно вернуть размер самого большого острова.

Размер острова = количество клеток "1" в нём.

Ожидаемая сложность:
time: O(rows * cols)
memory: O(rows * cols)
*/

function largestIsland(grid) {
  if (!grid.length) return 0;

  let visited = new Set();
  let largest = 0;

  let rows = grid.length;
  let cols = grid[0].length;

  function dfs(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols) {
      return 0;
    }

    if (grid[r][c] === "0") {
      return 0;
    }

    let key = `${r},${c}`;

    if (visited.has(key)) {
      return 0;
    }

    visited.add(key);
    let size = 1;

    size += dfs(r + 1, c);
    size += dfs(r - 1, c);
    size += dfs(r, c + 1);
    size += dfs(r, c - 1);

    return size;
  }

  for (let row = 0; row <= rows - 1; row++) {
    for (let col = 0; col <= cols - 1; col++) {
      if (grid[row][col] === "0") {
        continue;
      }

      let key = `${row},${col}`;

      if (visited.has(key)) {
        continue;
      }

      let size = dfs(row, col);
      largest = Math.max(largest, size);
    }
  }

  return largest;
}

console.log("---------------- #10");

console.log(largestIsland(grid1)); // 3
console.log(largestIsland(grid2)); // 3
console.log(largestIsland(grid3)); // 0
console.log(largestIsland(grid4)); // 0

console.log("BINARY SEARCH PRACTICE");
/*
#1 binarySearch

Дан отсортированный массив nums и число target.
Верни индекс target.
Если target нет — верни -1.

Ожидаемая сложность:
time: O(log n)
memory: O(1)
*/

function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let middle = Math.floor((right - left) / 2 + left);

    if (nums[middle] === target) {
      return middle;
    }

    if (nums[middle] < target) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return -1;
}

console.log("---------------- #11");

console.log(binarySearch([1, 3, 5, 7, 9], 5)); // 2
console.log(binarySearch([1, 3, 5, 7, 9], 1)); // 0
console.log(binarySearch([1, 3, 5, 7, 9], 9)); // 4
console.log(binarySearch([1, 3, 5, 7, 9], 4)); // -1
console.log(binarySearch([], 4)); // -1
/*
#2 searchInsert

Дан отсортированный массив nums и число target.
Если target есть — верни его индекс.
Если target нет — верни индекс, куда его нужно вставить, чтобы порядок сохранился.

Примеры:
[1,3,5,6], 5 -> 2
[1,3,5,6], 2 -> 1
[1,3,5,6], 7 -> 4
[1,3,5,6], 0 -> 0

Ожидаемая сложность:
time: O(log n)
memory: O(1)
*/

function searchInsert(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let middle = Math.floor((right - left) / 2 + left);

    if (nums[middle] === target) {
      return middle;
    }

    if (nums[middle] < target) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return left
}

console.log("---------------- #12");

console.log(searchInsert([1, 3, 5, 6], 5)); // 2
console.log(searchInsert([1, 3, 5, 6], 2)); // 1
console.log(searchInsert([1, 3, 5, 6], 7)); // 4
console.log(searchInsert([1, 3, 5, 6], 0)); // 0
/*
#3 firstOccurrence

Дан отсортированный массив nums, где могут быть дубли.
Нужно вернуть индекс ПЕРВОГО вхождения target.
Если target нет — вернуть -1.

Пример:
[1,2,2,2,3], 2 -> 1

Ожидаемая сложность:
time: O(log n)
memory: O(1)
*/

function firstOccurrence(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let answer = -1;

  while (left <= right) {
    let middle = Math.floor((right - left) / 2 + left);

    if (nums[middle] === target) {
      answer = middle;
      right = middle - 1;
    } else if (nums[middle] < target) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return answer
}

console.log("---------------- #13");

console.log(firstOccurrence([1, 2, 2, 2, 3], 2)); // 1
console.log(firstOccurrence([1, 1, 1, 1], 1)); // 0
console.log(firstOccurrence([1, 2, 3, 4], 5)); // -1
console.log(firstOccurrence([], 1)); // -1
/*
#4 lastOccurrence

Дан отсортированный массив nums, где могут быть дубли.
Нужно вернуть индекс ПОСЛЕДНЕГО вхождения target.
Если target нет — вернуть -1.

Пример:
[1,2,2,2,3], 2 -> 3

Ожидаемая сложность:
time: O(log n)
memory: O(1)
*/

function lastOccurrence(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let answer = -1;

  while (left <= right) {
    let middle = Math.floor((right - left) / 2 + left);

    if (nums[middle] === target) {
      answer = middle
      left = middle + 1;
    } else if (nums[middle] < target) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return answer
}

console.log("---------------- #14");

console.log(lastOccurrence([1, 2, 2, 2, 3], 2)); // 3
console.log(lastOccurrence([1, 1, 1, 1], 1)); // 3
console.log(lastOccurrence([1, 2, 3, 4], 5)); // -1
console.log(lastOccurrence([], 1)); // -1
/*
#5 findPeak

Дан массив nums.
Пик — это элемент, который больше соседей.
Нужно вернуть индекс любого пика.

Для краёв:
nums[-1] = -Infinity
nums[n] = -Infinity

Пример:
[1,2,3,1] -> 2
[1,2,1,3,5,6,4] -> можно 1 или 5

Ожидаемая сложность:
time: O(log n)
memory: O(1)
*/

function findPeak(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    let middle = Math.floor((right - left) / 2 + left);

    if (nums[middle] < nums[middle + 1]) {
      left = middle + 1;
    } else {
      right = middle;
    }
  }

  return left
}

console.log("---------------- #15");

console.log(findPeak([1, 2, 3, 1])); // 2
console.log(findPeak([1, 2, 1, 3, 5, 6, 4])); // 1 или 5
console.log(findPeak([1])); // 0
console.log(findPeak([1, 2])); // 1
