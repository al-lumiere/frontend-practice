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
Graph
=====================================================
*/

const graph = {
  A: ["B", "D"],
  B: ["C", "E"],
  C: ["S"],
  D: ["S"],
  E: ["F"],
  F: ["S"],
  S: [],
};

const graphWithCycle = {
  A: ["B", "C"],
  B: ["D"],
  C: ["A"],
  D: ["S"],
  S: [],
};

/*
=====================================================
1. minFlightsBFS
=====================================================

Нужно вернуть минимальное количество перелётов из from в to.

То есть не сам путь, а количество ребер.

Примеры:
A -> D -> S = 2 перелёта
A -> B -> C -> S = 3 перелёта

minFlightsBFS(graph, "A", "S") -> 2
minFlightsBFS(graph, "A", "A") -> 0
если пути нет -> -1

Подсказка:
в queue можно хранить объект:

{
  node: "A",
  distance: 0
}
*/

function minFlightsBFS(graph, from, to) {
  let visited = new Set();
  let queue = [
    {
      start: from,
      count: 0,
    },
  ];

  while (queue.length) {
    let current = queue.shift();

    if (current.start === to) {
      return current.count;
    }

    if (!graph[current.start]) {
      continue;
    }

    for (let nei of graph[current.start]) {
      if (visited.has(nei)) {
        continue;
      }

      visited.add(nei);

      queue.push({
        start: nei,
        count: current.count + 1,
      });
    }
  }

  return -1;
}

test("minFlightsBFS: A -> S", minFlightsBFS(graph, "A", "S"), 2);
test("minFlightsBFS: A -> C", minFlightsBFS(graph, "A", "C"), 2);
test("minFlightsBFS: A -> A", minFlightsBFS(graph, "A", "A"), 0);
test("minFlightsBFS: B -> D false", minFlightsBFS(graph, "B", "D"), -1);
test("minFlightsBFS: unknown", minFlightsBFS(graph, "X", "S"), -1);
test("minFlightsBFS: cycle A -> S", minFlightsBFS(graphWithCycle, "A", "S"), 3);

/*
=====================================================
2. reachableByBFS
=====================================================

Нужно вернуть массив вершин в порядке BFS-обхода.

То есть:
- сначала from
- потом его соседи
- потом соседи соседей

Для graph из A порядок должен быть:
["A", "B", "D", "C", "E", "S", "F"]

Важно:
- использовать queue
- использовать visited
- не зациклиться
*/

function reachableByBFS(graph, from) {
  let visited = new Set();
  let queue = [from];
  let path = [];

  while (queue.length) {
    let current = queue.shift();

    if (!graph[current]) {
      continue;
    }

    if (visited.has(current)) {
      continue;
    }

    visited.add(current);
    path.push(current);

    for (let nei of graph[current]) {
      queue.push(nei);
    }
  }

  return path;
}

test("reachableByBFS: graph A", reachableByBFS(graph, "A"), [
  "A",
  "B",
  "D",
  "C",
  "E",
  "S",
  "F",
]);

test("reachableByBFS: graph B", reachableByBFS(graph, "B"), [
  "B",
  "C",
  "E",
  "S",
  "F",
]);

test("reachableByBFS: unknown", reachableByBFS(graph, "X"), []);

test("reachableByBFS: cycle A", reachableByBFS(graphWithCycle, "A"), [
  "A",
  "B",
  "C",
  "D",
  "S",
]);

/*
=====================================================
3. findAnyPathDFS
=====================================================

Нужно вернуть любой путь из from в to через DFS.

Если пути нет — вернуть null.

Важно:
- использовать recursion
- использовать visited
- использовать path
- делать path.pop() при откате

На graph из A в S DFS должен вернуть:
["A", "B", "C", "S"]

Потому что DFS сначала пойдёт в B, потом C.
*/

function findAnyPathDFS(graph, from, to) {
  let visited = new Set();
  let path = [];

  function findWay(newFrom) {
    if (newFrom === to) {
      path.push(newFrom);
      return true;
    }

    if (!graph[newFrom]) {
      return false;
    }

    if (visited.has(newFrom)) {
      return false;
    }

    visited.add(newFrom);
    path.push(newFrom);

    for (let nei of graph[newFrom]) {
      if (findWay(nei)) {
        return true;
      }
    }

    path.pop();
    return false;
  }

  return findWay(from) ? path : null;
}

test("findAnyPathDFS: A -> S", findAnyPathDFS(graph, "A", "S"), [
  "A",
  "B",
  "C",
  "S",
]);

test("findAnyPathDFS: A -> F", findAnyPathDFS(graph, "A", "F"), [
  "A",
  "B",
  "E",
  "F",
]);

test("findAnyPathDFS: B -> D false", findAnyPathDFS(graph, "B", "D"), null);

test("findAnyPathDFS: same vertex", findAnyPathDFS(graph, "A", "A"), ["A"]);

test("findAnyPathDFS: cycle A -> S", findAnyPathDFS(graphWithCycle, "A", "S"), [
  "A",
  "B",
  "D",
  "S",
]);

/*
=====================================================
4. shortestPathBFS
=====================================================

Теперь снова вернуть именно кратчайший путь.

Если пути нет — вернуть null.

На graph из A в S кратчайший путь:
["A", "D", "S"]

А DFS из прошлой задачи вернул:
["A", "B", "C", "S"]

Это нормально: DFS нашёл любой путь, BFS нашёл кратчайший.
*/

function shortestPathBFS(graph, from, to) {
  let visited = new Set();
  let queue = [
    {
      start: from,
      path: [from],
    },
  ];

  while (queue.length) {
    let cur = queue.shift();

    if (cur.start === to) {
      return cur.path;
    }

    if (!graph[cur.start]) {
      continue;
    }

    if (visited.has(cur.start)) {
      continue;
    }

    visited.add(cur.start);

    for (let nei of graph[cur.start]) {
      queue.push({
        start: nei,
        path: [...cur.path, nei],
      });
    }
  }

  return null;
}

test("shortestPathBFS: A -> S", shortestPathBFS(graph, "A", "S"), [
  "A",
  "D",
  "S",
]);

test("shortestPathBFS: A -> F", shortestPathBFS(graph, "A", "F"), [
  "A",
  "B",
  "E",
  "F",
]);

test("shortestPathBFS: B -> D false", shortestPathBFS(graph, "B", "D"), null);

test("shortestPathBFS: same vertex", shortestPathBFS(graph, "A", "A"), ["A"]);

test(
  "shortestPathBFS: cycle A -> S",
  shortestPathBFS(graphWithCycle, "A", "S"),
  ["A", "B", "D", "S"],
);
