"use strict";

/*
=====================================================
Graph / Tree Mock Interview Tasks
=====================================================

Решай функции с TODO. После каждой задачи проговаривай:
- почему выбрала структуру данных;
- Time;
- Memory;
- edge cases.
*/

function isEqual(actual, expected) {
  return JSON.stringify(actual) === JSON.stringify(expected);
}

async function test(name, actualFn, expected) {
  try {
    const actual = await actualFn();

    if (isEqual(actual, expected)) {
      console.log(`✅ ${name}`);
    } else {
      console.log(`❌ ${name}`);
      console.log("   expected:", expected);
      console.log("   actual:  ", actual);
    }
  } catch (error) {
    console.log(`💥 ${name}`);
    console.log("   unexpected error:", error.message);
  }
}

async function testThrows(name, actualFn, expectedMessage) {
  try {
    await actualFn();
    console.log(`❌ ${name}`);
    console.log("   expected error:", expectedMessage);
    console.log("   actual: no error");
  } catch (error) {
    if (error.message === expectedMessage) {
      console.log(`✅ ${name}`);
    } else {
      console.log(`❌ ${name}`);
      console.log("   expected error:", expectedMessage);
      console.log("   actual error:  ", error.message);
    }
  }
}

/*
=====================================================
Tree fixtures
=====================================================
*/

const tree = {
  value: 5,
  left: {
    value: 3,
    left: { value: 2, left: null, right: null },
    right: { value: 4, left: null, right: null },
  },
  right: {
    value: 8,
    left: { value: 7, left: null, right: null },
    right: { value: 9, left: null, right: null },
  },
};

const tree2 = {
  value: 5,
  left: {
    value: 3,
    left: { value: 2, left: null, right: null },
    right: { value: 4, left: null, right: null },
  },
  right: {
    value: 8,
    left: { value: 7, left: null, right: null },
    right: { value: 9, left: null, right: null },
  },
};

const differentTree = {
  value: 5,
  left: {
    value: 3,
    left: null,
    right: { value: 4, left: null, right: null },
  },
  right: {
    value: 8,
    left: { value: 7, left: null, right: null },
    right: { value: 10, left: null, right: null },
  },
};

const invalidBST = {
  value: 5,
  left: {
    value: 3,
    left: { value: 2, left: null, right: null },
    right: { value: 6, left: null, right: null },
  },
  right: {
    value: 8,
    left: { value: 7, left: null, right: null },
    right: { value: 9, left: null, right: null },
  },
};

const unbalancedTree = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 3,
      left: {
        value: 4,
        left: null,
        right: null,
      },
      right: null,
    },
    right: null,
  },
  right: null,
};

/*
=====================================================
Task 01. preorderTraversal
=====================================================

Дано бинарное дерево.
Вернуть массив значений в preorder: root -> left -> right.

Time: O(n)
Memory: O(h) recursion / O(n) stack worst case
*/

function preorderTraversal(root) {
  let path = [];

  function way(node) {
    if (!node) {
      return [];
    }

    return [node.value, ...way(node.left), ...way(node.right)];
  }

  path.push(...way(root));
  return path;
}

/*
=====================================================
Task 02. inorderTraversal
=====================================================

Дано бинарное дерево.
Вернуть массив значений в inorder: left -> root -> right.

Time: O(n)
Memory: O(h) recursion / O(n) stack worst case
*/

function inorderTraversal(root) {
  let path = [];

  function way(node) {
    if (!node) {
      return [];
    }

    return [...way(node.left), node.value, ...way(node.right)];
  }

  path.push(...way(root));
  return path;
}

/*
=====================================================
Task 03. maxDepth
=====================================================

Дано бинарное дерево.
Вернуть максимальную глубину дерева.
Пустое дерево: 0. Один узел: 1.

Time: O(n)
Memory: O(h)
*/

function maxDepth(root) {
  function way(node) {
    if (!node) {
      return 0;
    }

    return 1 + Math.max(way(node.right), way(node.left));
  }

  return way(root);
}

/*
=====================================================
Task 04. isSameTree
=====================================================

Даны два бинарных дерева.
Вернуть true, если структура и значения полностью совпадают.

Time: O(n)
Memory: O(h)
*/

function isSameTree(a, b) {
  function check(nodeA, nodeB) {
    if ((!nodeA && nodeB) || (nodeA && !nodeB)) {
      return false;
    } else if (!nodeA && !nodeB) {
      return true;
    }

    if (nodeA.value !== nodeB.value) {
      return false;
    }

    return check(nodeA.left, nodeB.left) && check(nodeA.right, nodeB.right);
  }

  return check(a, b);
}

/*
=====================================================
Task 05. hasRootToLeafPathSum
=====================================================

Дано бинарное дерево и targetSum.
Вернуть true, если есть путь от корня до листа с такой суммой.
Лист — узел без left и right.

Time: O(n)
Memory: O(h)
*/

function hasRootToLeafPathSum(root, targetSum) {
  function findWay(node, targetSum) {
    if (!node) return false

    if (!node.left && !node.right) {
      return node.value === targetSum
    }

    let rest = targetSum - node.value

    return findWay(node.left, rest) || findWay(node.right, rest)
  }
  return findWay(root, targetSum)
}

/*
=====================================================
Task 06. levelOrder
=====================================================

Дано бинарное дерево.
Вернуть значения по уровням:
[[5], [3, 8], [2, 4, 7, 9]]

Ожидается BFS:
- не использовать queue.shift();
- использовать index.

Time: O(n)
Memory: O(n)
*/

function levelOrder(root) {
  // TODO
}

/*
=====================================================
Task 07. isValidBST
=====================================================

Дано бинарное дерево.
Вернуть true, если это корректное BST.
Для каждого узла: слева строго меньше, справа строго больше.

Time: O(n)
Memory: O(h)
*/

function isValidBST(root) {
  // TODO
}

/*
=====================================================
Task 08. lowestCommonAncestorBST
=====================================================

Дано BST и два значения p и q.
Вернуть значение lowest common ancestor.
Можно использовать свойство BST.

Time: O(h)
Memory: O(1), если итеративно.
*/

function lowestCommonAncestorBST(root, p, q) {
  // TODO
}

/*
=====================================================
Graph fixtures
=====================================================
*/

const directedGraph = {
  A: ["B", "D"],
  B: ["C"],
  C: [],
  D: ["E", "F"],
  E: [],
  F: ["S"],
  S: [],
};

const directedGraphWithCycle = {
  A: ["B"],
  B: ["C"],
  C: ["A", "D"],
  D: [],
};

const shortestGraph = {
  A: ["B", "D"],
  B: ["C"],
  C: ["S"],
  D: ["S"],
  S: [],
};

const undirectedGraph = {
  0: [1, 2],
  1: [0],
  2: [0],
  3: [4],
  4: [3],
  5: [],
};

const undirectedGraphWithCycle = {
  A: ["B", "C"],
  B: ["A", "C"],
  C: ["A", "B"],
  D: [],
};

const undirectedGraphNoCycle = {
  A: ["B"],
  B: ["A", "C"],
  C: ["B"],
  D: [],
};

/*
=====================================================
Task 09. hasPath
=====================================================

Дан directed graph.
Вернуть true, если есть путь from -> to.
В графе могут быть циклы.

Time: O(V + E)
Memory: O(V)
*/

function hasPath(graph, from, to) {
  // TODO
}

/*
=====================================================
Task 10. countReachable
=====================================================

Дан directed graph и start.
Вернуть количество вершин, достижимых из start, включая start.
В графе могут быть циклы.

Time: O(V + E)
Memory: O(V)
*/

function countReachable(graph, start) {
  // TODO
}

/*
=====================================================
Task 11. shortestPath
=====================================================

Дан directed graph без весов.
Вернуть кратчайший путь from -> to.
Если пути нет — вернуть null.

Важно:
- BFS;
- не использовать queue.shift();
- не копировать path в каждом объекте очереди;
- использовать parent map и восстановить путь в конце.

Time: O(V + E)
Memory: O(V)
*/

function shortestPath(graph, from, to) {
  // TODO
}

/*
=====================================================
Task 12. connectedComponentsCount
=====================================================

Дан undirected graph.
Вернуть количество связных компонент.

Time: O(V + E)
Memory: O(V)
*/

function connectedComponentsCount(graph) {
  // TODO
}

/*
=====================================================
Task 13. largestComponentSize
=====================================================

Дан undirected graph.
Вернуть размер самой большой связной компоненты.

Time: O(V + E)
Memory: O(V)
*/

function largestComponentSize(graph) {
  // TODO
}

/*
=====================================================
Task 14. hasCycleUndirected
=====================================================

Дан undirected graph.
Вернуть true, если в графе есть цикл.

Важно: ребро назад к parent не считается циклом.

Time: O(V + E)
Memory: O(V)
*/

function hasCycleUndirected(graph) {
  // TODO
}

/*
=====================================================
Task 15. canFinishCourses
=====================================================

Дано количество курсов numCourses и prerequisites.
prerequisites[i] = [course, prerequisite]

Чтобы пройти course, сначала нужен prerequisite.
Вернуть true, если можно пройти все курсы.
Иначе false.

То есть нужно понять, есть ли цикл в directed graph.

Time: O(V + E)
Memory: O(V + E)
*/

function canFinishCourses(numCourses, prerequisites) {
  // TODO
}

/*
=====================================================
Task 16. numIslands
=====================================================

Дана матрица из "1" и "0".
"1" = земля, "0" = вода.
Остров — группа соседних "1" вверх/вниз/влево/вправо.
Диагональ не считается.

Time: O(rows * cols)
Memory: O(rows * cols)
*/

function numIslands(grid) {
  // TODO
}

/*
=====================================================
Task 17. shortestPathInGrid
=====================================================

Дана матрица grid из 0 и 1.
0 — свободная клетка.
1 — стена.
Можно ходить вверх/вниз/влево/вправо.

Вернуть минимальное количество шагов от start до finish.
start и finish — массивы [row, col].
Если пути нет — вернуть -1.

Ожидается BFS:
- не использовать queue.shift();
- можно хранить { row, col, distance }.

Time: O(rows * cols)
Memory: O(rows * cols)
*/

function shortestPathInGrid(grid, start, finish) {
  // TODO
}

/*
=====================================================
Task 18. orangesRotting
=====================================================

Дана матрица:
0 — пусто;
1 — свежий апельсин;
2 — гнилой апельсин.

За одну минуту гнилой апельсин портит соседние свежие вверх/вниз/влево/вправо.
Вернуть минимальное количество минут, после которого не останется свежих.
Если невозможно — вернуть -1.

Ожидается multi-source BFS.

Time: O(rows * cols)
Memory: O(rows * cols)
*/

function orangesRotting(grid) {
  // TODO
}

/*
=====================================================
Async graph fixtures
=====================================================
*/

const FLIGHTS_ANY = {
  A: ["B", "D"],
  B: ["C", "N", "Z"],
  C: [],
  N: [],
  Z: [],
  D: ["E", "F"],
  E: [],
  F: ["S"],
  S: [],
  X: ["Y"],
  Y: [],
};

const fetchFlightsAny = async (city) => {
  return FLIGHTS_ANY[city] || [];
};

const FLIGHTS_SHORTEST = {
  A: ["B", "D"],
  B: ["C"],
  C: ["S"],
  D: ["S"],
  S: [],
  X: ["Y"],
  Y: [],
};

const fetchFlightsShortest = async (city) => {
  return FLIGHTS_SHORTEST[city] || [];
};

/*
=====================================================
Task 19. findFlightPath
=====================================================

Асинхронный граф.
fetchFlights(city) возвращает Promise со списком городов.

Вернуть любой путь from -> to.
Если пути нет — throw Error("No way").

Важно:
- не использовать async-рекурсию;
- не копировать path в каждом объекте;
- использовать parent map и восстановить путь в конце;
- fetchFlights для каждого города максимум один раз.

Time: O(V + E)
Memory: O(V)
*/

async function findFlightPath(from, to, fetchFlights) {
  // TODO
}

/*
=====================================================
Task 20. findShortestFlightPath
=====================================================

Асинхронный граф.
fetchFlights(city) возвращает Promise со списком городов.

Вернуть кратчайший путь from -> to.
Если пути нет — throw Error("No way").

Важно:
- BFS;
- не использовать queue.shift();
- не копировать path в каждом объекте;
- использовать parent map и восстановить путь в конце;
- fetchFlights для каждого города максимум один раз.

Time: O(V + E)
Memory: O(V)
*/

async function findShortestFlightPath(from, to, fetchFlights) {
  // TODO
}

/*
=====================================================
Run tests
=====================================================
*/

async function runTests() {
  console.log("\n=== Trees ===");

  await test(
    "01 preorderTraversal: tree",
    () => preorderTraversal(tree),
    [5, 3, 2, 4, 8, 7, 9],
  );
  await test("01 preorderTraversal: empty", () => preorderTraversal(null), []);

  await test(
    "02 inorderTraversal: BST",
    () => inorderTraversal(tree),
    [2, 3, 4, 5, 7, 8, 9],
  );
  await test("02 inorderTraversal: empty", () => inorderTraversal(null), []);

  await test("03 maxDepth: tree", () => maxDepth(tree), 3);
  await test("03 maxDepth: unbalanced", () => maxDepth(unbalancedTree), 4);
  await test("03 maxDepth: empty", () => maxDepth(null), 0);

  await test("04 isSameTree: same", () => isSameTree(tree, tree2), true);
  await test(
    "04 isSameTree: different",
    () => isSameTree(tree, differentTree),
    false,
  );
  await test("04 isSameTree: both empty", () => isSameTree(null, null), true);

  await test(
    "05 hasRootToLeafPathSum: 10",
    () => hasRootToLeafPathSum(tree, 10),
    true,
  );
  await test(
    "05 hasRootToLeafPathSum: 20",
    () => hasRootToLeafPathSum(tree, 20),
    true,
  );
  await test(
    "05 hasRootToLeafPathSum: 12",
    () => hasRootToLeafPathSum(tree, 12),
    true,
  );

  await test("06 levelOrder: tree", () => levelOrder(tree), [
    [5],
    [3, 8],
    [2, 4, 7, 9],
  ]);
  await test("06 levelOrder: empty", () => levelOrder(null), []);

  await test("07 isValidBST: valid", () => isValidBST(tree), true);
  await test("07 isValidBST: invalid", () => isValidBST(invalidBST), false);

  await test(
    "08 lowestCommonAncestorBST: 2 and 4",
    () => lowestCommonAncestorBST(tree, 2, 4),
    3,
  );
  await test(
    "08 lowestCommonAncestorBST: 2 and 9",
    () => lowestCommonAncestorBST(tree, 2, 9),
    5,
  );
  await test(
    "08 lowestCommonAncestorBST: 7 and 9",
    () => lowestCommonAncestorBST(tree, 7, 9),
    8,
  );

  console.log("\n=== Graphs ===");

  await test(
    "09 hasPath: A -> S",
    () => hasPath(directedGraph, "A", "S"),
    true,
  );
  await test(
    "09 hasPath: B -> S false",
    () => hasPath(directedGraph, "B", "S"),
    false,
  );
  await test(
    "09 hasPath: cycle A -> D",
    () => hasPath(directedGraphWithCycle, "A", "D"),
    true,
  );

  await test(
    "10 countReachable: A",
    () => countReachable(directedGraph, "A"),
    7,
  );
  await test(
    "10 countReachable: B",
    () => countReachable(directedGraph, "B"),
    2,
  );
  await test(
    "10 countReachable: unknown",
    () => countReachable(directedGraph, "X"),
    1,
  );

  await test(
    "11 shortestPath: A -> S",
    () => shortestPath(shortestGraph, "A", "S"),
    ["A", "D", "S"],
  );
  await test(
    "11 shortestPath: A -> C",
    () => shortestPath(shortestGraph, "A", "C"),
    ["A", "B", "C"],
  );
  await test(
    "11 shortestPath: no path",
    () => shortestPath(shortestGraph, "B", "D"),
    null,
  );

  await test(
    "12 connectedComponentsCount",
    () => connectedComponentsCount(undirectedGraph),
    3,
  );
  await test(
    "13 largestComponentSize",
    () => largestComponentSize(undirectedGraph),
    3,
  );

  await test(
    "14 hasCycleUndirected: true",
    () => hasCycleUndirected(undirectedGraphWithCycle),
    true,
  );
  await test(
    "14 hasCycleUndirected: false",
    () => hasCycleUndirected(undirectedGraphNoCycle),
    false,
  );

  await test(
    "15 canFinishCourses: true",
    () =>
      canFinishCourses(4, [
        [1, 0],
        [2, 1],
        [3, 2],
      ]),
    true,
  );
  await test(
    "15 canFinishCourses: false",
    () =>
      canFinishCourses(2, [
        [1, 0],
        [0, 1],
      ]),
    false,
  );
  await test(
    "15 canFinishCourses: disconnected true",
    () =>
      canFinishCourses(5, [
        [1, 0],
        [3, 2],
      ]),
    true,
  );

  console.log("\n=== Matrix graphs ===");

  await test(
    "16 numIslands: grid",
    () =>
      numIslands([
        ["1", "1", "0", "0"],
        ["1", "0", "0", "1"],
        ["0", "0", "1", "1"],
        ["0", "0", "0", "0"],
      ]),
    2,
  );

  await test(
    "16 numIslands: diagonals",
    () =>
      numIslands([
        ["1", "0", "1"],
        ["0", "1", "0"],
        ["1", "0", "1"],
      ]),
    5,
  );

  await test("16 numIslands: empty", () => numIslands([]), 0);

  await test(
    "17 shortestPathInGrid: exists",
    () =>
      shortestPathInGrid(
        [
          [0, 0, 0],
          [1, 1, 0],
          [0, 0, 0],
        ],
        [0, 0],
        [2, 2],
      ),
    4,
  );

  await test(
    "17 shortestPathInGrid: no path",
    () =>
      shortestPathInGrid(
        [
          [0, 1, 0],
          [1, 1, 0],
          [0, 0, 0],
        ],
        [0, 0],
        [2, 2],
      ),
    -1,
  );

  await test(
    "17 shortestPathInGrid: same cell",
    () =>
      shortestPathInGrid(
        [
          [0, 1],
          [0, 0],
        ],
        [0, 0],
        [0, 0],
      ),
    0,
  );

  await test(
    "18 orangesRotting: example",
    () =>
      orangesRotting([
        [2, 1, 1],
        [1, 1, 0],
        [0, 1, 1],
      ]),
    4,
  );

  await test(
    "18 orangesRotting: impossible",
    () =>
      orangesRotting([
        [2, 1, 1],
        [0, 1, 1],
        [1, 0, 1],
      ]),
    -1,
  );

  await test(
    "18 orangesRotting: no fresh",
    () =>
      orangesRotting([
        [0, 2],
        [0, 0],
      ]),
    0,
  );

  console.log("\n=== Async graphs ===");

  await test(
    "19 findFlightPath: A -> N",
    () => findFlightPath("A", "N", fetchFlightsAny),
    ["A", "B", "N"],
  );
  await test(
    "19 findFlightPath: A -> S",
    () => findFlightPath("A", "S", fetchFlightsAny),
    ["A", "D", "F", "S"],
  );
  await testThrows(
    "19 findFlightPath: B -> S no way",
    () => findFlightPath("B", "S", fetchFlightsAny),
    "No way",
  );

  await test(
    "20 findShortestFlightPath: A -> S",
    () => findShortestFlightPath("A", "S", fetchFlightsShortest),
    ["A", "D", "S"],
  );
  await test(
    "20 findShortestFlightPath: A -> C",
    () => findShortestFlightPath("A", "C", fetchFlightsShortest),
    ["A", "B", "C"],
  );
  await testThrows(
    "20 findShortestFlightPath: X -> S no way",
    () => findShortestFlightPath("X", "S", fetchFlightsShortest),
    "No way",
  );
}

runTests();
