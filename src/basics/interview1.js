"use strict";

/*
=====================================================
Test helpers
=====================================================
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
    console.log("   error:", error.message);
  }
}

/*
=====================================================
1. firstUniqueChar
=====================================================

Дана строка.
Нужно вернуть индекс первого уникального символа.

Если уникального символа нет — вернуть -1.

Ожидаемая сложность:
Time: O(n)
Memory: O(k), где k — количество разных символов.
*/

function firstUniqueChar(str) {
  let obj = {};

  for (let i = 0; i <= str.length - 1; i++) {
    if (obj[str[i]]) {
      obj[str[i]] += 1;
    } else {
      obj[str[i]] = 1;
    }
  }

  for (let i = 0; i <= str.length - 1; i++) {
    if (obj[str[i]] === 1) {
      return i;
    }
  }

  return -1;
}

/*
=====================================================
2. validAlmostPalindrome
=====================================================

Дана строка.
Нужно вернуть true, если строка уже палиндром
или может стать палиндромом после удаления максимум одного символа.

Ожидаемая сложность:
Time: O(n)
Memory: O(1)
*/

function validAlmostPalindrome(str) {
  let left = 0;
  let right = str.length - 1;

  function check(l, r) {
    while (l < r) {
      if (str[l] !== str[r]) {
        return false;
      }
      l++;
      r--;
    }
    return true;
  }

  while (left < right) {
    if (str[left] !== str[right]) {
      return check(left + 1, right) || check(left, right - 1);
    }

    left++;
    right--;
  }

  return true;
}

/*
=====================================================
3. maxTeamGrade
=====================================================

Есть массив staff, где staff[i] — грейд сотрудника.
Грейды от 0 до 25.

Нужно выбрать K сотрудников с максимальными грейдами
и вернуть сумму их грейдов.

Нельзя использовать sort.

Пример:
staff = [10, 1, 23, 0, 1], K = 2
Ответ: 33, потому что 23 + 10.

Ожидаемая сложность:
Time: O(n + 26)
Memory: O(26)
*/

function maxTeamGrade(staff, k) {
  let arr = new Array(26).fill(0);

  for (let el of staff) {
    arr[el]++;
  }

  let sum = 0;

  for (let grade = 25; grade >= 0; grade--) {
    while (arr[grade] !== 0 && k > 0) {
      sum += grade;
      arr[grade] -= 1;
      k--;
    }

    if (k === 0) {
      return sum;
    }
  }

  return sum;
}

/*
=====================================================
4. maxSumSubarray
=====================================================

Дан массив чисел arr и число k.

Нужно вернуть максимальную сумму подряд идущих k элементов.

Если k больше длины массива — вернуть null.

Ожидаемая сложность:
Time: O(n)
Memory: O(1)
*/

function maxSumSubarray(arr, k) {
  if (k > arr.length) {
    return null;
  }

  let left = 0;
  let sum = 0;

  for (let i = 0; i <= k - 1; i++) {
    sum += arr[i];
  }

  let max = sum;

  for (let right = k; right <= arr.length - 1; right++) {
    sum -= arr[left];
    sum += arr[right];

    max = Math.max(sum, max);
    left++;
  }

  return max;
}

/*
=====================================================
5. minSubarrayLen
=====================================================

Дан массив положительных чисел arr и число target.

Нужно вернуть минимальную длину подряд идущего подмассива,
сумма которого >= target.

Если такого подмассива нет — вернуть 0.

Ожидаемая сложность:
Time: O(n)
Memory: O(1)
*/

function minSubarrayLen(arr, target) {
  let left = 0;
  let sum = 0;
  let min = Infinity;

  for (let right = 0; right <= arr.length - 1; right++) {
    sum += arr[right];

    while (sum >= target) {
      min = Math.min(min, right - left + 1);

      sum -= arr[left];
      left++;
    }
  }

  return min === Infinity ? 0 : min;
}

/*
=====================================================
6. longestSubstringWithKDistinct
=====================================================

Дана строка str и число k.

Нужно вернуть длину самой длинной подстроки,
в которой не больше k разных символов.

Пример:
"eceba", k = 2 -> 3
Потому что "ece".

Ожидаемая сложность:
Time: O(n)
Memory: O(k)
*/

function longestSubstringWithKDistinct(str, k) {
  let obj = {};
  let left = 0;
  let max = 0;
  let length = 0;

  for (let right = 0; right <= str.length - 1; right++) {
    if (obj[str[right]]) {
      obj[str[right]] += 1;
    } else {
      obj[str[right]] = 1;
      length++;
    }

    while (length > k) {
      obj[str[left]] -= 1;

      if (obj[str[left]] === 0) {
        delete obj[str[left]];
        length--;
      }

      left++;
    }

    max = Math.max(max, right - left + 1);
  }

  return max;
}

/*
=====================================================
7. isValidBrackets
=====================================================

Дана строка из скобок: (), {}, [].

Нужно вернуть true, если скобки закрываются корректно.

Ожидаемая сложность:
Time: O(n)
Memory: O(n)
*/

function isValidBrackets(str) {
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

/*
=====================================================
8. numIslands
=====================================================

Дана матрица из "1" и "0".

"1" = земля
"0" = вода

Остров — группа соседних "1",
соединённых вверх/вниз/влево/вправо.

Диагональ не считается.

Нужно вернуть количество островов.

Ожидаемая сложность:
Time: O(rows * cols)
Memory: O(rows * cols)
*/

function numIslands(grid) {
  if (!grid.length) {
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

    let key = `${row}, ${col}`;

    if (grid[row][col] === "0") {
      return;
    }

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
      if (grid[row][col] === "0") {
        continue;
      }

      let key = `${row}, ${col}`;

      if (visited.has(key)) {
        continue;
      }

      islands++;
      findIsland(row, col);
    }
  }

  return islands;
}

/*
=====================================================
Graphs
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

const graphForShortest = {
  A: ["B", "D"],
  B: ["C"],
  C: ["S"],
  D: ["S"],
  S: [],
};

/*
=====================================================
9. hasPathIterative
=====================================================

Дан directed graph.

Нужно проверить, есть ли путь from -> to.

В графе могут быть циклы.

Ожидаемая сложность:
Time: O(V + E)
Memory: O(V)
*/

function hasPathIterative(graph, from, to) {
  // #1
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

  // #2
  // let visited = new Set();

  // function checkWay(newFrom) {
  //   if (newFrom === to) {
  //     return true;
  //   }

  //   if (!graph[newFrom]) {
  //     return false;
  //   }

  //   if (visited.has(newFrom)) {
  //     return false;
  //   }

  //   visited.add(newFrom);

  //   for (let nei of graph[newFrom]) {
  //     if (checkWay(nei)) {
  //       return true;
  //     }
  //   }

  //   return false;
  // }

  // return checkWay(from);
}

/*
=====================================================
10. shortestPathBFS
=====================================================

Дан directed graph без весов.

Нужно вернуть кратчайший путь from -> to.

Если пути нет — вернуть null.

Важно:
- использовать BFS;
- не использовать queue.shift();
- не копировать path в каждом объекте очереди;
- использовать parent map и восстановить путь в конце.

Ожидаемая сложность:
Time: O(V + E)
Memory: O(V)
*/

function shortestPathBFS(graph, from, to) {
  let visited = new Set([from]);
  let parent = new Map();

  let queue = [from];
  let index = 0;

  while (index < queue.length) {
    let cur = queue[index];
    index++;

    if (cur === to) {
      const path = [];
      let node = to;

      while (node !== undefined) {
        path.push(node);

        if (node === from) {
          break;
        }

        node = parent.get(node);
      }

      return path.reverse();
    }

    for (let nei of graph[cur] || []) {
      if (visited.has(nei)) {
        continue;
      }

      visited.add(nei);
      parent.set(nei, cur);
      queue.push(nei);
    }
  }

  return null;
}
/*
=====================================================
Async graphs
=====================================================
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

const FLIGHTS_2 = {
  A: ["B", "D"],
  B: ["C"],
  C: ["A", "S"],
  D: ["S"],
  S: [],
  X: ["Y"],
  Y: [],
};

const fetchFlights2 = async (city) => {
  return FLIGHTS_2[city] || [];
};

/*
=====================================================
11. hasRouteAsync
=====================================================

fetchFlights(city) асинхронно возвращает список городов,
куда можно улететь напрямую.

Нужно вернуть true, если путь from -> to существует.
Иначе вернуть false.

В графе могут быть циклы.

Ожидаемая сложность:
Time: O(V + E), если каждый город запрашивается один раз
Memory: O(V)
*/

async function hasRouteAsync(from, to, fetchFlights) {
  let visited = new Set();

  async function checkWay(newFrom) {
    if (newFrom === to) {
      return true;
    }

    if (visited.has(newFrom)) {
      return false;
    }

    visited.add(newFrom);

    let flights = (await fetchFlights(newFrom)) || [];

    for (let nei of flights) {
      if (await checkWay(nei)) {
        return true;
      }
    }

    return false;
  }

  return await checkWay(from);
}

/*
=====================================================
12. shortestRouteAsync
=====================================================

fetchFlights(city) асинхронно возвращает список городов,
куда можно улететь напрямую.

Нужно вернуть кратчайший путь from -> to.

Если пути нет — вернуть [].

Важно:
- использовать BFS;
- не использовать queue.shift();
- не копировать path в каждом объекте очереди;
- использовать parent map и восстановить путь в конце.

Ожидаемая сложность:
Time: O(V + E), если каждый город запрашивается один раз
Memory: O(V)
*/

async function shortestRouteAsync(from, to, fetchFlights) {
  let visited = new Set([from]);
  let parent = new Map();

  let queue = [from];
  let index = 0;

  while (index < queue.length) {
    let cur = queue[index];
    index++;

    if (cur === to) {
      let path = [];
      let node = to;

      while (node !== undefined) {
        path.push(node);

        if (node === from) {
          break;
        }

        node = parent.get(node);
      }
      return path.reverse();
    }

    let flights = (await fetchFlights(cur)) || [];

    for (let nei of flights) {
      if (visited.has(nei)) {
        continue;
      }

      visited.add(nei);
      queue.push(nei);
      parent.set(nei, cur);
    }
  }

  return [];
}

/*
=====================================================
Run tests
=====================================================
*/

async function runTests() {
  const tests = [
    {
      name: "firstUniqueChar: leetcode",
      actual: () => firstUniqueChar("leetcode"),
      expected: 0,
    },
    {
      name: "firstUniqueChar: loveleetcode",
      actual: () => firstUniqueChar("loveleetcode"),
      expected: 2,
    },
    {
      name: "firstUniqueChar: aabb",
      actual: () => firstUniqueChar("aabb"),
      expected: -1,
    },
    {
      name: "firstUniqueChar: eemtcode",
      actual: () => firstUniqueChar("eemtcode"),
      expected: 2,
    },

    {
      name: "validAlmostPalindrome: aba",
      actual: () => validAlmostPalindrome("aba"),
      expected: true,
    },
    {
      name: "validAlmostPalindrome: abca",
      actual: () => validAlmostPalindrome("abca"),
      expected: true,
    },
    {
      name: "validAlmostPalindrome: abc",
      actual: () => validAlmostPalindrome("abc"),
      expected: false,
    },
    {
      name: "validAlmostPalindrome: deeee",
      actual: () => validAlmostPalindrome("deeee"),
      expected: true,
    },

    {
      name: "maxTeamGrade: example",
      actual: () => maxTeamGrade([10, 1, 23, 0, 1], 2),
      expected: 33,
    },
    {
      name: "maxTeamGrade: all same",
      actual: () => maxTeamGrade([5, 5, 5], 2),
      expected: 10,
    },
    {
      name: "maxTeamGrade: take all",
      actual: () => maxTeamGrade([1, 2, 3], 3),
      expected: 6,
    },
    {
      name: "maxTeamGrade: zeros",
      actual: () => maxTeamGrade([0, 0, 0], 2),
      expected: 0,
    },

    {
      name: "maxSumSubarray: example 1",
      actual: () => maxSumSubarray([2, 1, 5, 1, 3, 2], 3),
      expected: 9,
    },
    {
      name: "maxSumSubarray: example 2",
      actual: () => maxSumSubarray([2, 3, 4, 1, 5], 2),
      expected: 7,
    },
    {
      name: "maxSumSubarray: all negative",
      actual: () => maxSumSubarray([-2, -3, -1, -5], 2),
      expected: -4,
    },
    {
      name: "maxSumSubarray: k too large",
      actual: () => maxSumSubarray([1, 2], 3),
      expected: null,
    },

    {
      name: "minSubarrayLen: example",
      actual: () => minSubarrayLen([2, 3, 1, 2, 4, 3], 7),
      expected: 2,
    },
    {
      name: "minSubarrayLen: no answer",
      actual: () => minSubarrayLen([1, 1, 1, 1], 5),
      expected: 0,
    },
    {
      name: "minSubarrayLen: one element",
      actual: () => minSubarrayLen([5, 1, 3], 5),
      expected: 1,
    },
    {
      name: "minSubarrayLen: whole array",
      actual: () => minSubarrayLen([1, 2, 3], 6),
      expected: 3,
    },

    {
      name: "longestSubstringWithKDistinct: eceba k=2",
      actual: () => longestSubstringWithKDistinct("eceba", 2),
      expected: 3,
    },
    {
      name: "longestSubstringWithKDistinct: aa k=1",
      actual: () => longestSubstringWithKDistinct("aa", 1),
      expected: 2,
    },
    {
      name: "longestSubstringWithKDistinct: aabbcc k=2",
      actual: () => longestSubstringWithKDistinct("aabbcc", 2),
      expected: 4,
    },
    {
      name: "longestSubstringWithKDistinct: abc k=0",
      actual: () => longestSubstringWithKDistinct("abc", 0),
      expected: 0,
    },

    {
      name: "isValidBrackets: simple valid",
      actual: () => isValidBrackets("()[]{}"),
      expected: true,
    },
    {
      name: "isValidBrackets: nested valid",
      actual: () => isValidBrackets("([{}])"),
      expected: true,
    },
    {
      name: "isValidBrackets: wrong pair",
      actual: () => isValidBrackets("(]"),
      expected: false,
    },
    {
      name: "isValidBrackets: wrong order",
      actual: () => isValidBrackets("([)]"),
      expected: false,
    },

    {
      name: "numIslands: grid 1",
      actual: () =>
        numIslands([
          ["1", "1", "0", "0"],
          ["1", "0", "0", "1"],
          ["0", "0", "1", "1"],
          ["0", "0", "0", "0"],
        ]),
      expected: 2,
    },
    {
      name: "numIslands: diagonals do not count",
      actual: () =>
        numIslands([
          ["1", "0", "1"],
          ["0", "1", "0"],
          ["1", "0", "1"],
        ]),
      expected: 5,
    },
    {
      name: "numIslands: empty",
      actual: () => numIslands([]),
      expected: 0,
    },
    {
      name: "numIslands: only water",
      actual: () =>
        numIslands([
          ["0", "0"],
          ["0", "0"],
        ]),
      expected: 0,
    },

    {
      name: "hasPathIterative: A -> S",
      actual: () => hasPathIterative(graph, "A", "S"),
      expected: true,
    },
    {
      name: "hasPathIterative: B -> S false",
      actual: () => hasPathIterative(graph, "B", "S"),
      expected: false,
    },
    {
      name: "hasPathIterative: same vertex",
      actual: () => hasPathIterative(graph, "A", "A"),
      expected: true,
    },
    {
      name: "hasPathIterative: cycle A -> D",
      actual: () => hasPathIterative(graphWithCycle, "A", "D"),
      expected: true,
    },

    {
      name: "shortestPathBFS: A -> S",
      actual: () => shortestPathBFS(graphForShortest, "A", "S"),
      expected: ["A", "D", "S"],
    },
    {
      name: "shortestPathBFS: A -> C",
      actual: () => shortestPathBFS(graphForShortest, "A", "C"),
      expected: ["A", "B", "C"],
    },
    {
      name: "shortestPathBFS: B -> D false",
      actual: () => shortestPathBFS(graphForShortest, "B", "D"),
      expected: null,
    },
    {
      name: "shortestPathBFS: same vertex",
      actual: () => shortestPathBFS(graphForShortest, "A", "A"),
      expected: ["A"],
    },

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
      name: "hasRouteAsync: cycle still works",
      actual: () => hasRouteAsync("C", "S", fetchFlights1),
      expected: true,
    },

    {
      name: "shortestRouteAsync: A -> S",
      actual: () => shortestRouteAsync("A", "S", fetchFlights2),
      expected: ["A", "D", "S"],
    },
    {
      name: "shortestRouteAsync: A -> C",
      actual: () => shortestRouteAsync("A", "C", fetchFlights2),
      expected: ["A", "B", "C"],
    },
    {
      name: "shortestRouteAsync: no path",
      actual: () => shortestRouteAsync("X", "S", fetchFlights2),
      expected: [],
    },
    {
      name: "shortestRouteAsync: same city",
      actual: () => shortestRouteAsync("A", "A", fetchFlights2),
      expected: ["A"],
    },
  ];

  for (const testCase of tests) {
    await test(testCase.name, testCase.actual, testCase.expected);
  }
}

runTests();
