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
1. getNeighbors
=====================================================

Дан граф в виде adjacency list.
Нужно вернуть соседей вершины.

Если вершины нет в графе — вернуть [].

Пример:
graph = {
  A: ["B", "D"],
  B: ["C"],
  C: [],
}

getNeighbors(graph, "A") -> ["B", "D"]
getNeighbors(graph, "C") -> []
getNeighbors(graph, "X") -> []
*/

function getNeighbors(graph, vertex) {
  return graph[vertex] || [];
}

const graph1 = {
  A: ["B", "D"],
  B: ["C"],
  C: [],
  D: ["E", "F"],
  E: [],
  F: ["S"],
  S: [],
};

test("getNeighbors: A", getNeighbors(graph1, "A"), ["B", "D"]);
test("getNeighbors: B", getNeighbors(graph1, "B"), ["C"]);
test("getNeighbors: C no neighbors", getNeighbors(graph1, "C"), []);
test("getNeighbors: unknown vertex", getNeighbors(graph1, "X"), []);

/*
=====================================================
2. hasVertex
=====================================================

Проверить, есть ли вершина в графе.

hasVertex(graph, "A") -> true
hasVertex(graph, "X") -> false
*/

function hasVertex(graph, vertex) {
  return Object.hasOwn(graph, vertex);
}

test("hasVertex: A", hasVertex(graph1, "A"), true);
test("hasVertex: S", hasVertex(graph1, "S"), true);
test("hasVertex: X", hasVertex(graph1, "X"), false);

/*
=====================================================
3. addVertex
=====================================================

Добавить вершину в граф.

Если вершина уже есть — ничего не менять.

Важно:
функция может мутировать graph.

Пример:
const graph = {};
addVertex(graph, "A");
graph -> { A: [] }
*/

function addVertex(graph, vertex) {
  if (!Object.hasOwn(graph, vertex)) {
    graph[vertex] = [];
  }

  return graph;
}

const graph2 = {};

addVertex(graph2, "A");
test("addVertex: add A", graph2, { A: [] });

addVertex(graph2, "B");
test("addVertex: add B", graph2, { A: [], B: [] });

addVertex(graph2, "A");
test("addVertex: duplicate A", graph2, { A: [], B: [] });

/*
=====================================================
4. addDirectedEdge
=====================================================

Добавить directed edge: from -> to.

Если вершин еще нет в графе — создать их.

Пример:
const graph = {};
addDirectedEdge(graph, "A", "B");

graph -> {
  A: ["B"],
  B: []
}
*/

function addDirectedEdge(graph, from, to) {
  if (!Object.hasOwn(graph, from)) {
    graph[from] = [];
  }

  if (!Object.hasOwn(graph, to)) {
    graph[to] = [];
  }

  graph[from].push(to);

  return graph;
}

const graph3 = {};

addDirectedEdge(graph3, "A", "B");
test("addDirectedEdge: A -> B", graph3, {
  A: ["B"],
  B: [],
});

addDirectedEdge(graph3, "A", "C");
test("addDirectedEdge: A -> C", graph3, {
  A: ["B", "C"],
  B: [],
  C: [],
});

addDirectedEdge(graph3, "B", "D");
test("addDirectedEdge: B -> D", graph3, {
  A: ["B", "C"],
  B: ["D"],
  C: [],
  D: [],
});

/*
=====================================================
5. addUndirectedEdge
=====================================================

Добавить undirected edge: a -- b.

То есть добавить связь в обе стороны:
a -> b
b -> a

Если вершин еще нет — создать их.

Пример:
const graph = {};
addUndirectedEdge(graph, "A", "B");

graph -> {
  A: ["B"],
  B: ["A"]
}
*/

function addUndirectedEdge(graph, a, b) {
  if (!Object.hasOwn(graph, a)) {
    graph[a] = [b];
  } else {
    if (!graph[a].includes(b)) {
      graph[a].push(b);
    }
  }

  if (!Object.hasOwn(graph, b)) {
    graph[b] = [a];
  } else {
    if (!graph[b].includes(a)) {
      graph[b].push(a);
    }
  }

  return graph;
}

const graph4 = {};

addUndirectedEdge(graph4, "A", "B");
test("addUndirectedEdge: A -- B", graph4, {
  A: ["B"],
  B: ["A"],
});

addUndirectedEdge(graph4, "A", "C");
test("addUndirectedEdge: A -- C", graph4, {
  A: ["B", "C"],
  B: ["A"],
  C: ["A"],
});

/*
=====================================================
6. countVertices
=====================================================

Посчитать количество вершин в графе.

countVertices(graph1) -> 7
*/

function countVertices(graph) {
  return Object.keys(graph).length;
}

test("countVertices: graph1", countVertices(graph1), 7);
test("countVertices: empty", countVertices({}), 0);

/*
=====================================================
7. countDirectedEdges
=====================================================

Посчитать количество directed edges.

Пример:
{
  A: ["B", "D"],
  B: ["C"],
  C: []
}

Ребра:
A -> B
A -> D
B -> C

countDirectedEdges -> 3
*/

function countDirectedEdges(graph) {
  let res = 0;
  Object.keys(graph).forEach((el) => {
    res += graph[el].length;
  });

  return res;
}

test("countDirectedEdges: graph1", countDirectedEdges(graph1), 6);
test("countDirectedEdges: empty", countDirectedEdges({}), 0);

/*
=====================================================
8. createDirectedGraph
=====================================================

Дан массив ребер.
Нужно создать directed graph.

Пример:
edges = [
  ["A", "B"],
  ["A", "D"],
  ["B", "C"],
]

createDirectedGraph(edges) -> {
  A: ["B", "D"],
  B: ["C"],
  C: [],
  D: []
}
*/

function createDirectedGraph(edges) {
  let res = {};
  edges.forEach((way) => {
    let from = way[0];
    let to = way[1];
    if (res[from]) {
      res[from].push(to);
    } else {
      res[from] = [to];
    }

    if (!res[to]) {
      res[to] = [];
    }
  });
  return res;
}

test(
  "createDirectedGraph: simple",
  createDirectedGraph([
    ["A", "B"],
    ["A", "D"],
    ["B", "C"],
  ]),
  {
    A: ["B", "D"],
    B: ["C"],
    D: [],
    C: [],
  },
);

test("createDirectedGraph: empty", createDirectedGraph([]), {});

/*
=====================================================
9. createUndirectedGraph
=====================================================

Дан массив ребер.
Нужно создать undirected graph.

Пример:
edges = [
  ["A", "B"],
  ["A", "C"],
]

createUndirectedGraph(edges) -> {
  A: ["B", "C"],
  B: ["A"],
  C: ["A"]
}
*/

function createUndirectedGraph(edges) {
  let res = {};
  edges.forEach((way) => {
    let from = way[0];
    let to = way[1];
    if (res[from]) {
      res[from].push(to);
    } else {
      res[from] = [to];
    }

    if (res[to]) {
      res[to].push(from);
    } else {
      res[to] = [from];
    }
  });
  return res;
}

test(
  "createUndirectedGraph: simple",
  createUndirectedGraph([
    ["A", "B"],
    ["A", "C"],
  ]),
  {
    A: ["B", "C"],
    B: ["A"],
    C: ["A"],
  },
);
