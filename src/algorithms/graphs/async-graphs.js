"use strict";

/*
=====================================================
Test helpers
=====================================================
*/

function isEqual(actual, expected) {
  return JSON.stringify(actual) === JSON.stringify(expected);
}

async function testAsync(name, actualPromise, expected) {
  const actual = await actualPromise;

  if (isEqual(actual, expected)) {
    console.log(`✅ ${name}`);
  } else {
    console.log(`❌ ${name}`);
    console.log("   expected:", expected);
    console.log("   actual:  ", actual);
  }
}

/*
=====================================================
1. hasRouteAsync
=====================================================

Нужно вернуть true, если путь from -> to существует.
Иначе вернуть false.

fetchFlights асинхронная.
В графе могут быть циклы.
*/

const FLIGHTS_1 = {
  A: ["B", "D"],
  B: ["C"],
  C: ["A", "S"],
  D: ["E"],
  E: [],
  S: [],
};

const fetchFlights1 = async (city) => {
  return FLIGHTS_1[city] || [];
};

async function hasRouteAsync(from, to, fetchFlights) {
  const visited = new Set();
  const stack = [from];

  while (stack.length) {
    const current = stack.pop();

    if (current === to) {
      return true;
    }

    if (visited.has(current)) {
      continue;
    }

    visited.add(current);

    const flights = await fetchFlights(current);

    for (const nei of flights) {
      stack.push(nei);
    }
  }

  return false;
}

/*
=====================================================
2. findRouteAsync
=====================================================

Нужно вернуть любой путь from -> to.

Если путь есть:
["A", "B", "C", "S"]

Если пути нет:
[]

fetchFlights асинхронная.
В графе могут быть циклы.
*/

const FLIGHTS_2 = {
  A: ["B", "D"],
  B: ["C", "X"],
  C: ["A", "S"], // цикл C -> A
  D: ["E"],
  E: [],
  X: [],
  S: [],
};

const fetchFlights2 = async (city) => {
  return FLIGHTS_2[city] || [];
};

async function findRouteAsync(from, to, fetchFlights) {
  const visited = new Set();

  const stack = [
    {
      start: from,
      path: [from],
    },
  ];

  while (stack.length) {
    const current = stack.pop();

    if (current.start === to) {
      return current.path;
    }

    if (visited.has(current.start)) {
      continue;
    }

    visited.add(current.start);

    const flights = await fetchFlights(current.start);

    for (const nei of flights) {
      stack.push({
        start: nei,
        path: [...current.path, nei],
      });
    }
  }

  return [];
}

/*
=====================================================
3. shortestRouteAsync
=====================================================

Нужно вернуть КРАТЧАЙШИЙ путь from -> to.

Если путь есть:
["A", "D", "S"]

Если пути нет:
[]

fetchFlights асинхронная.
В графе могут быть циклы.

Важно:
- нужен именно кратчайший путь;
- значит используем BFS;
- queue.shift(), не stack.pop().
*/

const FLIGHTS_3 = {
  A: ["B", "D"],
  B: ["C"],
  C: ["A", "S"], // цикл C -> A
  D: ["S"],
  S: [],
  X: ["Y"],
  Y: [],
};

const fetchFlights3 = async (city) => {
  return FLIGHTS_3[city] || [];
};

async function shortestRouteAsync(from, to, fetchFlights) {
  const visited = new Set([from]);

  const queue = [
    {
      start: from,
      path: [from],
    },
  ];

  while (queue.length) {
    const current = queue.shift();

    if (current.start === to) {
      return current.path;
    }

    const flights = await fetchFlights(current.start);

    for (const nei of flights) {
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

  return [];
}

/*
=====================================================
4. minFlightsAsync
=====================================================

Нужно вернуть минимальное количество перелётов from -> to.

Если from === to -> 0.
Если пути нет -> -1.

fetchFlights асинхронная.
В графе могут быть циклы.

Подсказка:
это BFS, но вместо path храним count.
*/

const FLIGHTS_4 = {
  A: ["B", "D"],
  B: ["C"],
  C: ["A", "S"],
  D: ["S"],
  S: [],
  X: ["Y"],
  Y: [],
};

const fetchFlights4 = async (city) => {
  return FLIGHTS_4[city] || [];
};

async function minFlightsAsync(from, to, fetchFlights) {
  // # 1
  // let visited = new Set();
  // let queue = [
  //   {
  //     start: from,
  //     flights: null,
  //     count: 0,
  //   },
  // ];

  // while (queue.length) {
  //   let cur = queue.shift();

  //   if (cur.start === to) {
  //     return cur.count;
  //   }

  //   if (visited.has(cur.start)) {
  //     continue;
  //   }

  //   visited.add(cur.start);

  //   if (cur.flights === null) {
  //     cur.flights = await fetchFlights(cur.start);
  //   }

  //   for (let nei of cur.flights) {
  //     queue.push({
  //       start: nei,
  //       flights: null,
  //       count: cur.count + 1,
  //     });
  //   }
  // }

  // return -1;

  // #2

  let visited = new Set();
  let queue = [
    {
      start: from,
      flights: null,
      count: 0,
    },
  ];
  let index = 0;

  while (index < queue.length) {
    let cur = queue[index];
    index++;

    if (cur.start === to) {
      return cur.count;
    }

    if (visited.has(cur.start)) {
      continue;
    }

    visited.add(cur.start);

    if (cur.flights === null) {
      cur.flights = await fetchFlights(cur.start);
    }

    for (const nei of cur.flights) {
      queue.push({
        start: nei,
        flights: null,
        count: cur.count + 1,
      });
    }
  }

  return -1;
}

/*
=====================================================
5. reachableCitiesAsync
=====================================================

Нужно вернуть все города, достижимые из from,
в порядке BFS-обхода.

fetchFlights асинхронная.
В графе могут быть циклы.

Пример:
reachableCitiesAsync("A") -> ["A", "B", "D", "C", "E", "S"]
*/

const FLIGHTS_5 = {
  A: ["B", "D"],
  B: ["C"],
  C: ["A", "S"],
  D: ["E"],
  E: [],
  S: [],
  X: ["Y"],
  Y: [],
};

const fetchFlights5 = async (city) => {
  return FLIGHTS_5[city] || [];
};

async function reachableCitiesAsync(from, fetchFlights) {
  // #1
  // let visited = new Set();
  // let queue = [
  //   {
  //     start: from,
  //     flights: null,
  //   },
  // ];

  // let path = [];

  // while (queue.length) {
  //   let cur = queue.shift();

  //   if (visited.has(cur.start)) {
  //     continue;
  //   }

  //   visited.add(cur.start);
  //   path.push(cur.start);

  //   if (cur.flights === null) {
  //     cur.flights = await fetchFlights(cur.start);
  //   }

  //   for (let nei of cur.flights) {
  //     queue.push({
  //       start: nei,
  //       flights: null,
  //     });
  //   }
  // }

  // return path;

  // #2
  let visited = new Set();
  let queue = [
    {
      start: from,
      flights: null,
    },
  ];

  let index = 0;
  let path = [];

  while (index < queue.length) {
    let cur = queue[index];
    index++;

    if (visited.has(cur.start)) {
      continue;
    }

    visited.add(cur.start);
    path.push(cur.start);

    if (cur.flights === null) {
      cur.flights = await fetchFlights(cur.start);
    }

    for (const nei of cur.flights) {
      queue.push({
        start: nei,
        flights: null,
        count: cur.count + 1,
      });
    }
  }

  return path;
}

/*
=====================================================
6. compare DFS: path-in-stack vs index-in-stack
=====================================================

Нужно найти путь from -> to.

fetchFlights асинхронная.
В графе могут быть тупики.

Решить ДВУМЯ способами:

1. findRouteStackPath
   - stack хранит объекты:
     {
       start: "A",
       path: ["A"]
     }

2. findRouteStackIndex
   - stack хранит объекты:
     {
       start: "A",
       flights: null,
       index: 0
     }
   - path один общий
   - нужен path.pop() при откате

Важно:
оба решения должны вернуть путь:
["A", "D", "F", "S"]
*/

const FLIGHTS_6 = {
  A: ["B", "D"],
  B: ["C"],
  C: [], // тупик
  D: ["E", "F"],
  E: [], // тупик
  F: ["S"],
  S: [],
  X: ["Y"],
  Y: [],
};

const fetchFlights6 = async (city) => {
  return FLIGHTS_6[city] || [];
};

async function findRouteStackPath(from, to, fetchFlights) {
  let visited = new Set();
  let stack = [
    {
      start: from,
      flights: null,
      path: [from],
    },
  ];

  while (stack.length) {
    let cur = stack.pop();

    if (cur.start === to) {
      return cur.path;
    }

    if (visited.has(cur.start)) {
      continue;
    }

    visited.add(cur.start);

    if (cur.flights === null) {
      cur.flights = await fetchFlights(cur.start);
    }

    for (let nei of cur.flights) {
      stack.push({
        start: nei,
        flights: null,
        path: [...cur.path, nei],
      });
    }
  }

  return [];
}

async function findRouteStackIndex(from, to, fetchFlights) {
  let visited = new Set([from]);
  let stack = [
    {
      start: from,
      flights: null,
      index: 0,
    },
  ];

  let path = [from];

  while (stack.length) {
    let cur = stack[stack.length - 1];

    if (cur.start === to) {
      return path;
    }

    if (cur.flights === null) {
      cur.flights = await fetchFlights(cur.start);
    }

    if (cur.index >= cur.flights.length) {
      path.pop();
      stack.pop();
      continue;
    }

    let next = cur.flights[cur.index];
    cur.index++;

    if (visited.has(next)) {
      continue;
    }

    visited.add(next);

    path.push(next);

    stack.push({
      start: next,
      flights: null,
      index: 0,
    });
  }

  return path;
}

/*
=====================================================
Run tests
=====================================================
*/

async function runTests() {
  const tests = [
    {
      name: "hasRouteAsync: A -> S",
      actual: () => hasRouteAsync("A", "S", fetchFlights1),
      expected: true,
    },
    {
      name: "hasRouteAsync: A -> E",
      actual: () => hasRouteAsync("A", "E", fetchFlights1),
      expected: true,
    },
    {
      name: "hasRouteAsync: D -> S false",
      actual: () => hasRouteAsync("D", "S", fetchFlights1),
      expected: false,
    },
    {
      name: "hasRouteAsync: same city",
      actual: () => hasRouteAsync("A", "A", fetchFlights1),
      expected: true,
    },
    {
      name: "hasRouteAsync: unknown city",
      actual: () => hasRouteAsync("X", "S", fetchFlights1),
      expected: false,
    },
    {
      name: "hasRouteAsync: cycle still works",
      actual: () => hasRouteAsync("C", "S", fetchFlights1),
      expected: true,
    },

    {
      name: "findRouteAsync: A -> S",
      actual: () => findRouteAsync("A", "S", fetchFlights2),
      expected: ["A", "B", "C", "S"],
    },
    {
      name: "findRouteAsync: A -> E",
      actual: () => findRouteAsync("A", "E", fetchFlights2),
      expected: ["A", "D", "E"],
    },
    {
      name: "findRouteAsync: B -> S",
      actual: () => findRouteAsync("B", "S", fetchFlights2),
      expected: ["B", "C", "S"],
    },
    {
      name: "findRouteAsync: A -> X",
      actual: () => findRouteAsync("A", "X", fetchFlights2),
      expected: ["A", "B", "X"],
    },
    {
      name: "findRouteAsync: D -> S no path",
      actual: () => findRouteAsync("D", "S", fetchFlights2),
      expected: [],
    },
    {
      name: "findRouteAsync: same city",
      actual: () => findRouteAsync("A", "A", fetchFlights2),
      expected: ["A"],
    },
    {
      name: "findRouteAsync: unknown city",
      actual: () => findRouteAsync("Z", "S", fetchFlights2),
      expected: [],
    },
    {
      name: "findRouteAsync: cycle still works",
      actual: () => findRouteAsync("C", "S", fetchFlights2),
      expected: ["C", "S"],
    },

    {
      name: "shortestRouteAsync: A -> S shortest",
      actual: () => shortestRouteAsync("A", "S", fetchFlights3),
      expected: ["A", "D", "S"],
    },
    {
      name: "shortestRouteAsync: A -> C",
      actual: () => shortestRouteAsync("A", "C", fetchFlights3),
      expected: ["A", "B", "C"],
    },
    {
      name: "shortestRouteAsync: B -> S",
      actual: () => shortestRouteAsync("B", "S", fetchFlights3),
      expected: ["B", "C", "S"],
    },
    {
      name: "shortestRouteAsync: same city",
      actual: () => shortestRouteAsync("A", "A", fetchFlights3),
      expected: ["A"],
    },
    {
      name: "shortestRouteAsync: no path",
      actual: () => shortestRouteAsync("X", "S", fetchFlights3),
      expected: [],
    },
    {
      name: "shortestRouteAsync: unknown city",
      actual: () => shortestRouteAsync("Z", "S", fetchFlights3),
      expected: [],
    },
    {
      name: "shortestRouteAsync: cycle still works",
      actual: () => shortestRouteAsync("C", "S", fetchFlights3),
      expected: ["C", "S"],
    },
    {
      name: "minFlightsAsync: A -> S",
      actual: () => minFlightsAsync("A", "S", fetchFlights4),
      expected: 2,
    },
    {
      name: "minFlightsAsync: A -> C",
      actual: () => minFlightsAsync("A", "C", fetchFlights4),
      expected: 2,
    },
    {
      name: "minFlightsAsync: B -> S",
      actual: () => minFlightsAsync("B", "S", fetchFlights4),
      expected: 2,
    },
    {
      name: "minFlightsAsync: same city",
      actual: () => minFlightsAsync("A", "A", fetchFlights4),
      expected: 0,
    },
    {
      name: "minFlightsAsync: no path",
      actual: () => minFlightsAsync("X", "S", fetchFlights4),
      expected: -1,
    },
    {
      name: "minFlightsAsync: unknown city",
      actual: () => minFlightsAsync("Z", "S", fetchFlights4),
      expected: -1,
    },
    {
      name: "reachableCitiesAsync: from A",
      actual: () => reachableCitiesAsync("A", fetchFlights5),
      expected: ["A", "B", "D", "C", "E", "S"],
    },
    {
      name: "reachableCitiesAsync: from C",
      actual: () => reachableCitiesAsync("C", fetchFlights5),
      expected: ["C", "A", "S", "B", "D", "E"],
    },
    {
      name: "reachableCitiesAsync: from X",
      actual: () => reachableCitiesAsync("X", fetchFlights5),
      expected: ["X", "Y"],
    },
    {
      name: "reachableCitiesAsync: from S",
      actual: () => reachableCitiesAsync("S", fetchFlights5),
      expected: ["S"],
    },
    {
      name: "findRouteStackPath: A -> S",
      actual: () => findRouteStackPath("A", "S", fetchFlights6),
      expected: ["A", "D", "F", "S"],
    },
    {
      name: "findRouteStackPath: A -> C",
      actual: () => findRouteStackPath("A", "C", fetchFlights6),
      expected: ["A", "B", "C"],
    },
    {
      name: "findRouteStackPath: D -> S",
      actual: () => findRouteStackPath("D", "S", fetchFlights6),
      expected: ["D", "F", "S"],
    },
    {
      name: "findRouteStackPath: X -> S no path",
      actual: () => findRouteStackPath("X", "S", fetchFlights6),
      expected: [],
    },
    {
      name: "findRouteStackPath: same city",
      actual: () => findRouteStackPath("A", "A", fetchFlights6),
      expected: ["A"],
    },

    {
      name: "findRouteStackIndex: A -> S",
      actual: () => findRouteStackIndex("A", "S", fetchFlights6),
      expected: ["A", "D", "F", "S"],
    },
    {
      name: "findRouteStackIndex: A -> C",
      actual: () => findRouteStackIndex("A", "C", fetchFlights6),
      expected: ["A", "B", "C"],
    },
    {
      name: "findRouteStackIndex: D -> S",
      actual: () => findRouteStackIndex("D", "S", fetchFlights6),
      expected: ["D", "F", "S"],
    },
    {
      name: "findRouteStackIndex: X -> S no path",
      actual: () => findRouteStackIndex("X", "S", fetchFlights6),
      expected: [],
    },
    {
      name: "findRouteStackIndex: same city",
      actual: () => findRouteStackIndex("A", "A", fetchFlights6),
      expected: ["A"],
    },
  ];

  for (const testCase of tests) {
    await testAsync(testCase.name, testCase.actual(), testCase.expected);
  }
}

runTests();
