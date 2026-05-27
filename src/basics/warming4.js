"use strict";

/*
=====================================================
Test helpers
=====================================================
*/

function isEqual(actual, expected) {
  return JSON.stringify(actual) === JSON.stringify(expected);
}

function test(name, actual, expected) {
  const ok = isEqual(actual, expected);

  if (ok) {
    console.log(`✅ ${name}`);
  } else {
    console.log(`❌ ${name}`);
    console.log("   expected:", expected);
    console.log("   actual:  ", actual);
  }
}

async function testAsync(name, promise, expected) {
  const actual = await promise;
  test(name, actual, expected);
}

/*
=====================================================
1. validAlmostPalindrome — two pointers
=====================================================

Дана строка.
Нужно вернуть true, если строка уже палиндром
или может стать палиндромом после удаления максимум одного символа.

Примеры:
"aba" -> true
"abca" -> true // можно удалить c
"abc" -> false
*/

function validAlmostPalindrome(str) {
  let deleted = false;
  let start = 0;
  let end = str.length - 1;

  while (start < end) {
    if (str[start] !== str[end] && deleted === false) {
      if (str[start + 1] === str[end]) {
        deleted = true;
        start++;
      } else if (str[start] === str[end - 1]) {
        deleted = true;
        end--;
      } else {
        return false;
      }
    } else if (str[start] !== str[end] && deleted === true) {
      return false;
    }

    start++;
    end--;
  }

  return true;
}

test("validAlmostPalindrome: aba", validAlmostPalindrome("aba"), true);
test("validAlmostPalindrome: abca", validAlmostPalindrome("abca"), true);
test("validAlmostPalindrome: abc", validAlmostPalindrome("abc"), false);
test("validAlmostPalindrome: deeee", validAlmostPalindrome("deeee"), true);
test(
  "validAlmostPalindrome: raceacar",
  validAlmostPalindrome("raceacar"),
  true,
);

/*
=====================================================
2. firstUniqueChar — Map / object
=====================================================

Дана строка.
Нужно вернуть индекс первого уникального символа.

Если уникального символа нет — вернуть -1.

Примеры:
"leetcode" -> 0
"loveleetcode" -> 2
"aabb" -> -1
*/

function firstUniqueChar(str) {
  let obj = {};

  for (let el of str) {
    if (obj[el]) {
      obj[el] += 1;
    } else {
      obj[el] = 1;
    }
  }

  for (let i = 0; i <= str.length - 1; i++) {
    if (obj[str[i]] === 1) {
      return i;
    }
  }

  return -1;
}

test("firstUniqueChar: leetcode", firstUniqueChar("leetcode"), 0);
test("firstUniqueChar: loveleetcode", firstUniqueChar("loveleetcode"), 2);
test("firstUniqueChar: aabb", firstUniqueChar("aabb"), -1);
test("firstUniqueChar: eemtcode", firstUniqueChar("eemtcode"), 2);

/*
=====================================================
3. removeDuplicates — Set
=====================================================

Дан массив.
Нужно вернуть новый массив без дублей, сохранив порядок первого появления.

Примеры:
[3, 1, 3, 2, 1] -> [3, 1, 2]
*/

function removeDuplicates(arr) {
  return [...new Set(arr)];
}

test("removeDuplicates: numbers", removeDuplicates([3, 1, 3, 2, 1]), [3, 1, 2]);
test("removeDuplicates: strings", removeDuplicates(["a", "b", "a", "c"]), [
  "a",
  "b",
  "c",
]);
test("removeDuplicates: empty", removeDuplicates([]), []);

/*
=====================================================
4. isValidBrackets — stack
=====================================================

Дана строка из скобок: (), {}, [].
Нужно вернуть true, если скобки закрываются корректно.

Примеры:
"()[]{}" -> true
"([{}])" -> true
"(]" -> false
"([)]" -> false
*/

function isValidBrackets(str) {
  let stack = [];

  for (let el of str) {
    if (el === "(" || el === "[" || el === "{") {
      stack.push(el);
    } else {
      if (stack.length) {
        let top = stack[stack.length - 1];
        if (
          (el === ")" && top === "(") ||
          (el === "]" && top === "[") ||
          (el === "}" && top === "{")
        ) {
          stack.pop();
        }
      } else {
        return false;
      }
    }
  }

  return stack.length ? false : true;
}

test("isValidBrackets: simple valid", isValidBrackets("()[]{}"), true);
test("isValidBrackets: nested valid", isValidBrackets("([{}])"), true);
test("isValidBrackets: wrong pair", isValidBrackets("]("), false);
test("isValidBrackets: wrong order", isValidBrackets("([)]"), false);
test("isValidBrackets: only open", isValidBrackets("((("), false);

/*
=====================================================
Graphs for next tasks
=====================================================
*/

const graph = {
  A: ["B", "D"],
  B: ["C"],
  C: [],
  D: ["E", "F"],
  E: [],
  F: ["S"],
  S: [],
};

const graphWithCycle = {
  A: ["B"],
  B: ["C"],
  C: ["A", "D"],
  D: [],
};

const graphForBFS = {
  A: ["B", "D"],
  B: ["C"],
  C: ["S"],
  D: ["S"],
  S: [],
};

/*
=====================================================
5. hasPath — DFS + visited
=====================================================

Дан directed graph.
Нужно проверить, есть ли путь из from в to.

В графе могут быть циклы.
*/

function hasPath(graph, from, to) {
  let visited = new Set();

  function findPath(newFrom) {
    if (newFrom === to) {
      return true;
    }

    if (!graph[newFrom]) {
      return false;
    }

    if (visited.has(newFrom)) {
      return false;
    }

    visited.add(newFrom);

    for (let nei of graph[newFrom]) {
      if (findPath(nei)) {
        return true;
      }
    }
    return false;
  }

  return findPath(from);
}

test("hasPath: A -> S", hasPath(graph, "A", "S"), true);
test("hasPath: B -> S false", hasPath(graph, "B", "S"), false);
test("hasPath: same vertex", hasPath(graph, "A", "A"), true);
test("hasPath: unknown", hasPath(graph, "X", "S"), false);
test("hasPath: cycle A -> D", hasPath(graphWithCycle, "A", "D"), true);
test("hasPath: cycle D -> A false", hasPath(graphWithCycle, "D", "A"), false);

/*
=====================================================
6. findAnyPath — DFS + backtracking
=====================================================

Нужно вернуть путь из from в to.

Если путь есть — вернуть массив вершин.
Если пути нет — вернуть null.

Пример:
findAnyPath(graph, "A", "S") -> ["A", "D", "F", "S"]
*/

function findAnyPath(graph, from, to) {
  let visited = new Set();
  let path = [];

  function findPath(newFrom) {
    if (!graph[newFrom]) {
      return false;
    }

    if (newFrom === to) {
      path.push(newFrom);
      return true;
    }

    if (visited.has(newFrom)) {
      return false;
    }

    visited.add(newFrom);
    path.push(newFrom);

    for (let nei of graph[newFrom]) {
      if (findPath(nei)) {
        return true;
      }
    }

    path.pop();
    return false;
  }

  return findPath(from) ? path : null;
}

test("findAnyPath: A -> S", findAnyPath(graph, "A", "S"), ["A", "D", "F", "S"]);
test("findAnyPath: A -> C", findAnyPath(graph, "A", "C"), ["A", "B", "C"]);
test("findAnyPath: B -> S false", findAnyPath(graph, "B", "S"), null);
test("findAnyPath: same vertex", findAnyPath(graph, "A", "A"), ["A"]);

/*
=====================================================
7. hasPathBFS — BFS + queue
=====================================================

Дан directed graph.
Нужно проверить, есть ли путь из from в to.

Решить через queue, не через рекурсию.

Подсказка:
DFS использует stack.
BFS использует queue.

queue:
- берем элемент из начала
- добавляем соседей в конец
*/

function hasPathBFS(graph, from, to) {
  let visited = new Set();
  let stack = [from];

  while (stack.length) {
    let cur = stack.pop();

    if (cur === to) {
      return true;
    }

    if (!graph[cur]) {
      continue;
    }

    if (visited.has(cur)) {
      continue;
    }

    visited.add(cur);

    for (let nei of graph[cur]) {
      stack.push(nei);
    }
  }

  return false;
}

test("hasPathBFS: A -> S", hasPathBFS(graphForBFS, "A", "S"), true);
test("hasPathBFS: A -> C", hasPathBFS(graphForBFS, "A", "C"), true);
test("hasPathBFS: B -> D false", hasPathBFS(graphForBFS, "B", "D"), false);
test("hasPathBFS: same vertex", hasPathBFS(graphForBFS, "A", "A"), true);
test("hasPathBFS: unknown", hasPathBFS(graphForBFS, "X", "S"), false);

/*
=====================================================
8. numIslands — DFS по матрице
=====================================================

Дана матрица из "1" и "0".

"1" = земля
"0" = вода

Остров — группа соседних "1" по вертикали/горизонтали.
Диагональ не считается.

Нужно вернуть количество островов.
*/

function numIslands(grid) {
  if (grid.length === 0) {
    return 0;
  }

  let visited = new Set();
  let islands = 0;

  let rows = grid.length;
  let cols = grid[0].length;

  function findIsland(row, col) {
    if (row < 0 || row >= rows || col < 0 || col >= cols) {
      return;
    }

    if (grid[row][col] === "0") {
      return;
    }

    let key = `${row}, ${col}`;

    if (visited.has(key)) {
      return;
    }

    visited.add(key);

    findIsland(row + 1, col);
    findIsland(row - 1, col);
    findIsland(row, col + 1);
    findIsland(row, col - 1);
  }

  for (let row = 0; row <= rows - 1; row++) {
    for (let col = 0; col <= cols - 1; col++) {
      let key = `${row}, ${col}`;

      if (grid[row][col] === "0") {
        continue;
      }

      if (!visited.has(key)) {
        islands++;
        findIsland(row, col);
      }
    }
  }

  return islands;
}

test(
  "numIslands: grid1",
  numIslands([
    ["1", "1", "0", "0"],
    ["1", "0", "0", "1"],
    ["0", "0", "1", "1"],
    ["0", "0", "0", "0"],
  ]),
  2,
);

test(
  "numIslands: diagonals do not count",
  numIslands([
    ["1", "0", "1"],
    ["0", "1", "0"],
    ["1", "0", "1"],
  ]),
  5,
);

test("numIslands: empty", numIslands([]), 0);

test(
  "numIslands: only water",
  numIslands([
    ["0", "0"],
    ["0", "0"],
  ]),
  0,
);

/*
=====================================================
9. async findPath — async DFS / stack
=====================================================

Есть сеть аэропортов.
fetchFlights(from) асинхронно возвращает список аэропортов,
куда можно улететь напрямую.

Нужно вернуть маршрут from -> to.

Если маршрута нет — вернуть [].

Лучше решить через stack, без async-рекурсии.
*/

async function findPath(from, to, fetchFlights) {
  let path = [];
  let stack = [
    {
      start: from,
      flights: null,
      index: 0,
    },
  ];

  path.push(from);

  while (stack.length) {
    let current = stack[stack.length - 1];

    if (current.start === to) {
      return path;
    }

    if (current.flights === null) {
      current.flights = (await fetchFlights(current.start)) || [];
    }

    if (current.index >= current.flights.length) {
      stack.pop();
      path.pop();
      continue;
    }

    let next = current.flights[current.index];
    current.index++;

    path.push(next);

    stack.push({
      start: next,
      flights: null,
      index: 0,
    });
  }

  return [];
}

const FLIGHTS = {
  A: ["B", "D"],
  B: ["C", "N", "Z"],
  C: [],
  N: [],
  Z: [],
  D: ["E", "F"],
  E: [],
  F: ["S"],
  S: [],
};

const fetchFlights = (from) => {
  return Promise.resolve(FLIGHTS[from] || []);
};

async function runAsyncTests() {
  await testAsync("findPath async: A -> S", findPath("A", "S", fetchFlights), [
    "A",
    "D",
    "F",
    "S",
  ]);

  await testAsync("findPath async: A -> Z", findPath("A", "Z", fetchFlights), [
    "A",
    "B",
    "Z",
  ]);

  await testAsync("findPath async: A -> A", findPath("A", "A", fetchFlights), [
    "A",
  ]);

  await testAsync(
    "findPath async: no path",
    findPath("A", "X", fetchFlights),
    [],
  );
}

runAsyncTests();
