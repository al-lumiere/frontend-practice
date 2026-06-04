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

/*
=====================================================
Graphs for practice
=====================================================
*/

const graph1 = {
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

const disconnectedGraph = {
  A: ["B"],
  B: [],
  X: ["Y"],
  Y: [],
  Z: [],
};

const undirectedGraph = {
  A: ["B", "C"],
  B: ["A", "D"],
  C: ["A"],
  D: ["B"],
  X: ["Y"],
  Y: ["X"],
  Z: [],
};

const undirectedWithCycle = {
  A: ["B", "C"],
  B: ["A", "C"],
  C: ["A", "B"],
};

const undirectedWithoutCycle = {
  A: ["B"],
  B: ["A", "C"],
  C: ["B"],
};

const islandGrid1 = [
  ["1", "1", "0", "0"],
  ["1", "0", "0", "1"],
  ["0", "0", "1", "1"],
  ["0", "0", "0", "0"],
];

const islandGrid2 = [
  ["1", "0", "1"],
  ["0", "1", "0"],
  ["1", "0", "1"],
];

/*
=====================================================
1. hasPathRecursive
=====================================================

Нужно проверить, есть ли путь из from в to.

Граф directed.
В графе могут быть циклы.
Нужно использовать visited.

Примеры:
hasPathRecursive(graph1, "A", "S") -> true
hasPathRecursive(graph1, "B", "S") -> false
*/

function hasPathRecursive(graph, from, to) {
  const visited = new Set();

  function dfs(current) {
    if (current === to) {
      return true;
    }

    if (!graph[current]) {
      return false;
    }

    if (visited.has(current)) {
      return false;
    }

    visited.add(current);

    for (const neighbor of graph[current]) {
      if (dfs(neighbor)) {
        return true;
      }
    }

    return false;
  }

  return dfs(from);
}

test("hasPathRecursive: A -> S", hasPathRecursive(graph1, "A", "S"), true);
test("hasPathRecursive: A -> C", hasPathRecursive(graph1, "A", "C"), true);
test(
  "hasPathRecursive: B -> S false",
  hasPathRecursive(graph1, "B", "S"),
  false,
);
test("hasPathRecursive: D -> S", hasPathRecursive(graph1, "D", "S"), true);
test("hasPathRecursive: same vertex", hasPathRecursive(graph1, "A", "A"), true);
test(
  "hasPathRecursive: unknown from",
  hasPathRecursive(graph1, "X", "S"),
  false,
);
test(
  "hasPathRecursive: cycle A -> D",
  hasPathRecursive(graphWithCycle, "A", "D"),
  true,
);
test(
  "hasPathRecursive: cycle D -> A false",
  hasPathRecursive(graphWithCycle, "D", "A"),
  false,
);

/*
=====================================================
2. countReachable
=====================================================

Нужно посчитать, сколько уникальных вершин достижимо из start,
включая start.

Если start нет в графе -> 0.

Подсказка:
visited + DFS + count
*/

function countReachable(graph, start) {
  const visited = new Set();

  function dfs(current) {
    if (!graph[current]) {
      return;
    }

    if (visited.has(current)) {
      return;
    }

    visited.add(current);

    for (const neighbor of graph[current]) {
      dfs(neighbor);
    }
  }

  dfs(start);

  return visited.size;
}

test("countReachable: graph1 A", countReachable(graph1, "A"), 7);
test("countReachable: graph1 D", countReachable(graph1, "D"), 4);
test("countReachable: graph1 C", countReachable(graph1, "C"), 1);
test("countReachable: graph1 unknown", countReachable(graph1, "X"), 0);
test(
  "countReachable: disconnected A",
  countReachable(disconnectedGraph, "A"),
  2,
);
test(
  "countReachable: disconnected X",
  countReachable(disconnectedGraph, "X"),
  2,
);
test(
  "countReachable: disconnected Z",
  countReachable(disconnectedGraph, "Z"),
  1,
);
test("countReachable: cycle A", countReachable(graphWithCycle, "A"), 4);

/*
=====================================================
3. getReachableVertices
=====================================================

Нужно вернуть массив всех достижимых вершин из start
в порядке DFS-обхода.

Если start нет в графе -> [].

Пример:
getReachableVertices(graph1, "A")
-> ["A", "B", "C", "D", "E", "F", "S"]
*/

function getReachableVertices(graph, start) {
  const visited = new Set();

  function dfs(current) {
    if (!graph[current]) {
      return;
    }

    if (visited.has(current)) {
      return;
    }

    visited.add(current);

    for (const neighbor of graph[current]) {
      dfs(neighbor);
    }
  }

  dfs(start);

  return [...visited];
}

test("getReachableVertices: graph1 A", getReachableVertices(graph1, "A"), [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "S",
]);

test("getReachableVertices: graph1 D", getReachableVertices(graph1, "D"), [
  "D",
  "E",
  "F",
  "S",
]);

test(
  "getReachableVertices: cycle A",
  getReachableVertices(graphWithCycle, "A"),
  ["A", "B", "C", "D"],
);

test("getReachableVertices: unknown", getReachableVertices(graph1, "X"), []);

/*
=====================================================
4. findAnyPath
=====================================================

Нужно вернуть любой путь из from в to.

Если путь есть:
["A", "D", "F", "S"]

Если пути нет:
null

Важно:
- путь должен начинаться с from;
- путь должен заканчиваться to;
- нельзя зациклиться.

Подсказка:
path.push(current) при входе в вершину;
path.pop() при откате назад.
*/

function findAnyPath(graph, from, to) {
  const visited = new Set();
  const path = [];

  function dfs(current) {
    if (!graph[current]) {
      return false;
    }

    if (visited.has(current)) {
      return false;
    }

    visited.add(current);
    path.push(current);

    if (current === to) {
      return true;
    }

    for (const neighbor of graph[current]) {
      if (dfs(neighbor)) {
        return true;
      }
    }

    path.pop();
    return false;
  }

  return dfs(from) ? path : null;
}

test("findAnyPath: A -> S", findAnyPath(graph1, "A", "S"), [
  "A",
  "D",
  "F",
  "S",
]);

test("findAnyPath: A -> C", findAnyPath(graph1, "A", "C"), ["A", "B", "C"]);

test("findAnyPath: D -> S", findAnyPath(graph1, "D", "S"), ["D", "F", "S"]);

test("findAnyPath: B -> S false", findAnyPath(graph1, "B", "S"), null);
test("findAnyPath: same vertex", findAnyPath(graph1, "A", "A"), ["A"]);

test("findAnyPath: cycle A -> D", findAnyPath(graphWithCycle, "A", "D"), [
  "A",
  "B",
  "C",
  "D",
]);

/*
=====================================================
5. hasPathIterative
=====================================================

Та же задача, что hasPathRecursive,
но решить через stack, без рекурсии.

Подсказка:
const stack = [from];

while (stack.length) {
  const current = stack.pop();
}
*/

function hasPathIterative(graph, from, to) {
  const stack = [from];
  const visited = new Set();

  while (stack.length) {
    const current = stack.pop();

    if (current === to) {
      return true;
    }

    if (!graph[current]) {
      continue;
    }

    if (visited.has(current)) {
      continue;
    }

    visited.add(current);

    for (const neighbor of graph[current]) {
      stack.push(neighbor);
    }
  }

  return false;
}

test("hasPathIterative: A -> S", hasPathIterative(graph1, "A", "S"), true);
test("hasPathIterative: A -> C", hasPathIterative(graph1, "A", "C"), true);
test(
  "hasPathIterative: B -> S false",
  hasPathIterative(graph1, "B", "S"),
  false,
);
test("hasPathIterative: same vertex", hasPathIterative(graph1, "A", "A"), true);
test("hasPathIterative: unknown", hasPathIterative(graph1, "X", "S"), false);
test(
  "hasPathIterative: cycle A -> D",
  hasPathIterative(graphWithCycle, "A", "D"),
  true,
);

/*
=====================================================
6. countComponents
=====================================================

Дан undirected graph.
Нужно посчитать количество connected components.

Connected component — это группа вершин, связанных между собой.

Пример:
undirectedGraph имеет компоненты:
A-B-C-D
X-Y
Z

Ответ: 3

Подсказка:
- внешний цикл по всем вершинам;
- если вершина еще не visited, запускаем DFS;
- каждый новый запуск DFS = новая компонента.
*/

function countComponents(graph) {
  let components = 0;
  const visited = new Set();

  function dfs(current) {
    if (!graph[current]) {
      return;
    }

    if (visited.has(current)) {
      return;
    }

    visited.add(current);

    for (const neighbor of graph[current]) {
      dfs(neighbor);
    }
  }

  for (const vertex of Object.keys(graph)) {
    if (!visited.has(vertex)) {
      components++;
      dfs(vertex);
    }
  }

  return components;
}

test("countComponents: undirectedGraph", countComponents(undirectedGraph), 3);
test("countComponents: empty", countComponents({}), 0);

test(
  "countComponents: one component",
  countComponents({
    A: ["B"],
    B: ["A", "C"],
    C: ["B"],
  }),
  1,
);

test(
  "countComponents: all isolated",
  countComponents({
    A: [],
    B: [],
    C: [],
  }),
  3,
);

/*
=====================================================
7. largestComponentSize
=====================================================

Дан undirected graph.
Нужно вернуть размер самой большой connected component.

Для undirectedGraph:
A-B-C-D -> 4
X-Y -> 2
Z -> 1

Ответ: 4

Подсказка:
очень похоже на countComponents,
только DFS должен считать размер компоненты.
*/

function largestComponentSize(graph) {
  let largestComp = 0;
  const visited = new Set();

  function dfs(current) {
    if (!graph[current]) {
      return 0;
    }

    if (visited.has(current)) {
      return 0;
    }

    visited.add(current);

    let size = 1;

    for (const neighbor of graph[current]) {
      size += dfs(neighbor);
    }

    return size;
  }

  for (const vertex of Object.keys(graph)) {
    if (!visited.has(vertex)) {
      const currentSize = dfs(vertex);
      largestComp = Math.max(largestComp, currentSize);
    }
  }

  return largestComp;
}

test(
  "largestComponentSize: undirectedGraph",
  largestComponentSize(undirectedGraph),
  4,
);
test("largestComponentSize: empty", largestComponentSize({}), 0);

test(
  "largestComponentSize: isolated",
  largestComponentSize({
    A: [],
    B: [],
    C: [],
  }),
  1,
);

test(
  "largestComponentSize: one component",
  largestComponentSize({
    A: ["B"],
    B: ["A", "C"],
    C: ["B"],
  }),
  3,
);

/*
=====================================================
8. hasCycleUndirected
=====================================================

Дан undirected graph.
Нужно определить, есть ли цикл.

Пример с циклом:
A -- B
B -- C
C -- A

Важно:
В undirected graph сосед-parent не считается циклом.
Нужно передавать parent в DFS.

Подсказка:
dfs(current, parent)
*/

function hasCycleUndirected(graph) {
  const visited = new Set();

  function dfs(current, parent) {
    visited.add(current);

    for (const neighbor of graph[current]) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor, current)) {
          return true;
        }
      } else if (neighbor !== parent) {
        return true;
      }
    }

    return false;
  }

  for (const vertex of Object.keys(graph)) {
    if (!visited.has(vertex)) {
      if (dfs(vertex, null)) {
        return true;
      }
    }
  }

  return false;
}

test(
  "hasCycleUndirected: with cycle",
  hasCycleUndirected(undirectedWithCycle),
  true,
);
test(
  "hasCycleUndirected: without cycle",
  hasCycleUndirected(undirectedWithoutCycle),
  false,
);
test(
  "hasCycleUndirected: isolated",
  hasCycleUndirected({ A: [], B: [] }),
  false,
);
test("hasCycleUndirected: empty", hasCycleUndirected({}), false);

/*
=====================================================
9. numIslands
=====================================================

Дана матрица из "1" и "0".
"1" = земля
"0" = вода

Остров — группа соседних клеток с "1",
соединенных вверх/вниз/влево/вправо.

Нужно посчитать количество островов.

Пример islandGrid1:
[
  ["1", "1", "0", "0"],
  ["1", "0", "0", "1"],
  ["0", "0", "1", "1"],
  ["0", "0", "0", "0"],
]

Тут 2 острова:
1) левый верхний
2) правый блок

Подсказка:
это тоже граф, просто соседи считаются по координатам.
*/

function numIslands(grid) {
  if (grid.length === 0) {
    return 0;
  }

  const visited = new Set();

  const rows = grid.length;
  const cols = grid[0].length;

  let islands = 0;

  function dfs(row, col) {
    if (row < 0 || row >= rows || col < 0 || col >= cols) {
      return;
    }

    if (grid[row][col] === "0") {
      return;
    }

    const key = `${row},${col}`;

    if (visited.has(key)) {
      return;
    }

    visited.add(key);

    dfs(row + 1, col);
    dfs(row - 1, col);
    dfs(row, col + 1);
    dfs(row, col - 1);
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const key = `${row},${col}`;

      if (grid[row][col] === "1" && !visited.has(key)) {
        islands++;
        dfs(row, col);
      }
    }
  }

  return islands;
}

test("numIslands: grid1", numIslands(islandGrid1), 2);
test("numIslands: grid2 diagonals do not count", numIslands(islandGrid2), 5);
test("numIslands: empty", numIslands([]), 0);

test(
  "numIslands: only water",
  numIslands([
    ["0", "0"],
    ["0", "0"],
  ]),
  0,
);

test(
  "numIslands: only land",
  numIslands([
    ["1", "1"],
    ["1", "1"],
  ]),
  1,
);

/*
=====================================================
10. async findPath
=====================================================

Есть сеть аэропортов.
Для каждого аэропорта можно асинхронно получить список аэропортов,
куда из него есть прямые рейсы.

Нужно найти путь из аэропорта from в аэропорт to.

Функция fetchFlights(from) возвращает Promise со списком следующих аэропортов.

Если путь найден — вернуть массив аэропортов маршрута.
Например:
findPath("A", "S", fetchFlights) -> ["A", "D", "F", "S"]

Если пути нет — вернуть [].

Важно:
- fetchFlights асинхронная;
- нельзя менять fetchFlights;
- нужно вернуть именно путь, а не просто true/false;
- решение сделано через stack, чтобы не упереться в память на async-рекурсии.
*/

async function findPath(from, to, fetchFlights) {
  const path = [];

  const stack = [
    {
      node: from,
      flights: null,
      index: 0,
    },
  ];

  path.push(from);

  while (stack.length > 0) {
    const current = stack[stack.length - 1];

    if (current.node === to) {
      return path;
    }

    if (current.flights === null) {
      current.flights = (await fetchFlights(current.node)) || [];
    }

    if (current.index >= current.flights.length) {
      stack.pop();
      path.pop();
      continue;
    }

    const next = current.flights[current.index];
    current.index++;

    path.push(next);

    stack.push({
      node: next,
      flights: null,
      index: 0,
    });
  }

  return [];
}

// =====================
// Async findPath tests
// =====================

const FLIGHTS = {
  A: ["B", "D"],
  B: ["C", "N", "Z"],
  D: ["E", "F"],
  F: ["S"],
};

const fetchFlights = (from) => {
  return Promise.resolve(FLIGHTS[from] || []);
};

async function runAsyncTests() {
  const tests = [
    {
      name: "async findPath: путь A -> S",
      from: "A",
      to: "S",
      expected: ["A", "D", "F", "S"],
    },
    {
      name: "async findPath: путь A -> Z",
      from: "A",
      to: "Z",
      expected: ["A", "B", "Z"],
    },
    {
      name: "async findPath: путь A -> A",
      from: "A",
      to: "A",
      expected: ["A"],
    },
    {
      name: "async findPath: пути нет",
      from: "A",
      to: "X",
      expected: [],
    },
  ];

  for (const testCase of tests) {
    const result = await findPath(testCase.from, testCase.to, fetchFlights);
    test(testCase.name, result, testCase.expected);
  }
}

runAsyncTests();
