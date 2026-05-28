"use strict";

function test(name, actual, expected) {
  if (actual === expected) {
    console.log(`✅ ${name}`);
  } else {
    console.log(`❌ ${name}`);
    console.log("   expected:", expected);
    console.log("   actual:  ", actual);
  }
}

/*
=====================================================
1. hasPathBFS
=====================================================

Дан directed graph.

Нужно проверить, есть ли путь из from в to.

Решить через BFS:
- использовать queue
- брать элементы из начала очереди
- соседей добавлять в конец очереди
- использовать visited, чтобы не зациклиться

Вернуть true / false.
*/

const graph = {
  A: ["B", "D"],
  B: ["C"],
  C: ["S"],
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

function hasPathBFS(graph, from, to) {
  let visited = new Set();
  let queue = [from];

  while (queue.length) {
    let current = queue.shift();

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

    for (let nei of graph[current]) {
      queue.push(nei);
    }
  }

  return false;
}

test("hasPathBFS: A -> S", hasPathBFS(graph, "A", "S"), true);
test("hasPathBFS: A -> C", hasPathBFS(graph, "A", "C"), true);
test("hasPathBFS: B -> F false", hasPathBFS(graph, "B", "F"), false);
test("hasPathBFS: same vertex", hasPathBFS(graph, "A", "A"), true);
test("hasPathBFS: unknown from", hasPathBFS(graph, "X", "S"), false);
test("hasPathBFS: cycle A -> D", hasPathBFS(graphWithCycle, "A", "D"), true);
test(
  "hasPathBFS: cycle D -> A false",
  hasPathBFS(graphWithCycle, "D", "A"),
  false,
);

/*
=====================================================
2. shortestPathBFS
=====================================================

Дан directed graph.

Нужно вернуть самый короткий путь из from в to.

Если путь есть:
["A", "D", "S"]

Если пути нет:
null

Важно:
BFS ищет кратчайший путь в графе без весов.
*/

function isEqual(actual, expected) {
  return JSON.stringify(actual) === JSON.stringify(expected);
}

function testArray(name, actual, expected) {
  if (isEqual(actual, expected)) {
    console.log(`✅ ${name}`);
  } else {
    console.log(`❌ ${name}`);
    console.log("   expected:", expected);
    console.log("   actual:  ", actual);
  }
}

const graphForShortest = {
  A: ["B", "D"],
  B: ["C"],
  C: ["S"],
  D: ["S"],
  S: [],
};

function shortestPathBFS(graph, from, to) {
  let visited = new Set();

  let queue = [
    {
      start: from,
      path: [from],
    },
  ];

  while (queue.length) {
    let current = queue.shift();

    if (current.start === to) {
      return current.path;
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
        path: [...current.path, nei],
      });
    }
  }

  return null;
}

testArray(
  "shortestPathBFS: A -> S",
  shortestPathBFS(graphForShortest, "A", "S"),
  ["A", "D", "S"],
);

testArray(
  "shortestPathBFS: A -> C",
  shortestPathBFS(graphForShortest, "A", "C"),
  ["A", "B", "C"],
);

testArray(
  "shortestPathBFS: B -> D false",
  shortestPathBFS(graphForShortest, "B", "D"),
  null,
);

testArray(
  "shortestPathBFS: same vertex",
  shortestPathBFS(graphForShortest, "A", "A"),
  ["A"],
);

testArray(
  "shortestPathBFS: unknown",
  shortestPathBFS(graphForShortest, "X", "S"),
  null,
);
