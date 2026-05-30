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

function testInPlace(name, nums, fn, expectedReturn, expectedPrefix) {
  const result = fn(nums);
  const prefix = nums.slice(0, expectedReturn);

  const ok =
    result === expectedReturn &&
    JSON.stringify(prefix) === JSON.stringify(expectedPrefix);

  if (ok) {
    console.log(`✅ ${name}`);
  } else {
    console.log(`❌ ${name}`);
    console.log("   expected return:", expectedReturn);
    console.log("   actual return:  ", result);
    console.log("   expected prefix:", expectedPrefix);
    console.log("   actual prefix:  ", prefix);
    console.log("   full nums:      ", nums);
  }
}

/*
=====================================================
Task 01. firstUniqueChar
=====================================================

Дана строка.
Нужно вернуть индекс первого уникального символа.

Если уникального символа нет — вернуть -1.

Ожидаемая сложность:
Time: O(n)
Memory: O(k)
*/

function firstUniqueChar(str) {
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

/*
=====================================================
Task 02. isAnagram
=====================================================

Даны две строки s и t.

Нужно вернуть true, если t является анаграммой s.

Ожидаемая сложность:
Time: O(n)
Memory: O(k)
*/

function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  let obj = {};

  for (let i = 0; i <= s.length - 1; i++) {
    obj[s[i]] = (obj[s[i]] || 0) + 1;
    obj[t[i]] = (obj[t[i]] || 0) - 1;
  }

  for (let ind in obj) {
    if (obj[ind] !== 0) return false;
  }

  return true;
}

/*
=====================================================
Task 03. canBePalindrome
=====================================================

Дана строка из маленьких английских букв.

Нужно вернуть true, если строка уже палиндром
или может стать палиндромом после удаления максимум одного символа.

Ожидаемая сложность:
Time: O(n)
Memory: O(1)
*/

function canBePalindrome(s) {
  let left = 0;
  let right = s.length - 1;

  function check(l, r) {
    while (l < r) {
      if (s[l] !== s[r]) return false;
      l++;
      r--;
    }

    return true;
  }

  while (left < right) {
    if (s[left] !== s[right]) {
      return check(left + 1, right) || check(left, right - 1);
    }

    left++;
    right--;
  }

  return true;
}

/*
=====================================================
Task 04. isPhrasePalindrome
=====================================================

Дана строка.

Нужно вернуть true, если она является палиндромом,
игнорируя:
- пробелы;
- знаки препинания;
- регистр.

Строка может содержать английские и русские буквы.

Примеры:
"Казак" -> true
"А роза упала на лапу Азора" -> true
"Madam, I'm Adam" -> true
"Baraban" -> false

Желательно:
Time: O(n)
Memory: O(1)
*/

function isPhrasePalindrome(str) {
  let left = 0;
  let right = str.length - 1;

  function CharCode(letter) {
    let code = letter.charCodeAt(0);

    return (
      (code >= 65 && code <= 90) ||
      (code >= 97 && code <= 122) ||
      (code >= 1040 && code <= 1103) ||
      code === 1025 ||
      code === 1105
    );
  }

  while (left < right) {
    while (left < right && !CharCode(str[left])) {
      left++;
    }

    while (left < right && !CharCode(str[right])) {
      right--;
    }

    if (str[left].toLowerCase() !== str[right].toLowerCase()) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}

/*
=====================================================
Task 05. twoSum
=====================================================

Дан массив чисел nums и число target.

Нужно вернуть индексы двух элементов,
сумма которых равна target.

Гарантируется, что решение есть ровно одно.
Один и тот же элемент нельзя использовать дважды.

Ожидаемая сложность:
Time: O(n)
Memory: O(n)
*/

function twoSum(nums, target) {
  let m = new Map();

  for (let i = 0; i <= nums.length - 1; i++) {
    let needed = target - nums[i];

    if (m.has(needed)) {
      return [m.get(needed), i];
    } else {
      m.set(nums[i], i);
    }
  }
}

/*
=====================================================
Task 06. maxTeamGrade
=====================================================

Есть массив staff, где staff[i] — грейд сотрудника.
Грейды от 0 до 25.

Нужно выбрать K сотрудников с максимальными грейдами
и вернуть сумму их грейдов.

Нельзя использовать sort.

Ожидаемая сложность:
Time: O(n + 26)
Memory: O(26)
*/

function maxTeamGrade(staff, k) {
  let arr = new Array(26).fill(0);
  let sum = 0;

  for (let el of staff) {
    arr[el] += 1;
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    let needed = Math.min(arr[i], k);

    sum += needed * i;
    k -= needed;

    if (k === 0) {
      break;
    }
  }

  return sum;
}

/*
=====================================================
Task 07. maxSumSubarray
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
  let right = k - 1;
  let sum = 0;

  for (let i = 0; i <= k - 1; i++) {
    sum += arr[i];
  }

  let max = sum;

  while (right < arr.length - 1) {
    sum += arr[right + 1];
    sum -= arr[left];

    max = Math.max(max, sum);
    right++;
    left++;
  }

  return max;
}

/*
=====================================================
Task 08. minSubarrayLen
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
Task 09. longestUniqueSubstring
=====================================================

Дана строка.

Нужно вернуть длину самой длинной подстроки,
в которой все символы уникальные.

Ожидаемая сложность:
Time: O(n)
Memory: O(k)
*/

function longestUniqueSubstring(str) {
  let visited = new Set();
  let left = 0;
  let max = 0;

  for (let right = 0; right <= str.length - 1; right++) {
    while (visited.has(str[right])) {
      visited.delete(str[left]);
      left++;
    }

    visited.add(str[right]);
    max = Math.max(max, right - left + 1);
  }

  return max;
}

/*
=====================================================
Task 10. longestSubstringWithKDistinct
=====================================================

Дана строка str и число k.

Нужно вернуть длину самой длинной подстроки,
в которой не больше k разных символов.

Ожидаемая сложность:
Time: O(n)
Memory: O(k)
*/

function longestSubstringWithKDistinct(str, k) {
  let obj = {};
  let length = 0;

  let left = 0;
  let max = 0;

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
Task 11. backspaceCompare
=====================================================

Даны две строки s и t.

Символ # означает backspace: удалить предыдущий символ, если он есть.

Нужно вернуть true, если после применения всех backspace строки равны.

Базовое решение:
Time: O(n + m)
Memory: O(n + m)

Оптимальное решение:
Time: O(n + m)
Memory: O(1)
*/

function backspaceCompare(s, t) {
  let stackS = [];
  let stackT = [];

  for (let i = 0; i <= s.length - 1; i++) {
    if (s[i] === "#") {
      stackS.pop();
    } else {
      stackS.push(s[i]);
    }
  }

  for (let i = 0; i <= t.length - 1; i++) {
    if (t[i] === "#") {
      stackT.pop();
    } else {
      stackT.push(t[i]);
    }
  }

  if (stackS.length !== stackT.length) return false;

  for (let i = 0; i <= stackS.length - 1; i++) {
    if (stackS[i] !== stackT[i]) {
      return false;
    }
  }

  return true;
}

/*
=====================================================
Task 12. moveZeroes
=====================================================

Дан массив nums.

Нужно переместить все нули в конец массива,
сохранив порядок ненулевых элементов.

Важно:
- менять массив на месте;
- не создавать новый массив;
- вернуть изменённый nums.

Ожидаемая сложность:
Time: O(n)
Memory: O(1)
*/

function moveZeroes(nums) {
  let ind = 0;

  for (let i = 0; i <= nums.length - 1; i++) {
    if (nums[i] !== 0) {
      nums[ind] = nums[i];
      ind++;
    }
  }

  while (ind < nums.length) {
    nums[ind] = 0;
    ind++;
  }

  return nums;
}

/*
=====================================================
Task 13. removeDuplicates
=====================================================

Дан отсортированный массив nums.

Нужно удалить дубли на месте так,
чтобы каждый элемент встречался только один раз.

Вернуть количество уникальных элементов k.

Первые k элементов массива должны содержать уникальные значения.
То, что находится после k, неважно.

Ожидаемая сложность:
Time: O(n)
Memory: O(1)
*/

function removeDuplicates(nums) {}

/*
=====================================================
Task 14. countOccurrences
=====================================================

Дан отсортированный массив arr и число target.

Нужно вернуть, сколько раз target встречается в массиве.

Нельзя проходить массив линейно.

Ожидаемая сложность:
Time: O(log n)
Memory: O(1)
*/

function countOccurrences(arr, target) {
  // TODO
}

/*
=====================================================
Task 15. searchInsert
=====================================================

Дан отсортированный массив arr без дублей и число target.

Нужно вернуть индекс target, если он есть.

Если его нет — вернуть индекс, куда его надо вставить,
чтобы массив остался отсортированным.

Ожидаемая сложность:
Time: O(log n)
Memory: O(1)
*/

function searchInsert(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let ind = arr.length;

  while (left <= right) {
    let middle = Math.floor((right - left) / 2 + left);

    if (arr[middle] < target) {
      left = middle + 1;
    }

    if (arr[middle] >= target) {
      ind = middle;
      right = middle - 1;
    }
  }

  return ind;
}

/*
=====================================================
Task 16. isValidBrackets
=====================================================

Дана строка из скобок: (), {}, [].

Нужно вернуть true, если скобки закрываются корректно.

Ожидаемая сложность:
Time: O(n)
Memory: O(n)
*/

function isValidBrackets(str) {
  let stack = [];

  for (let i = 0; i <= str.length - 1; i++) {
    let el = str[i];

    if (el === "(" || el === "[" || el === "{") {
      stack.push(el);
    } else if (
      (el === ")" && stack[stack.length - 1] === "(") ||
      (el === "]" && stack[stack.length - 1] === "[") ||
      (el === "}" && stack[stack.length - 1] === "{")
    ) {
      stack.pop();
    } else {
      return false 
    }
  }

  return stack.length ? false : true;
}

/*
=====================================================
Task 17. numIslands
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
  if (!grid.length) return 0;

  let visited = new Set();
  let island = 0;

  let rows = grid.length;
  let cols = grid[0].length;

  function check(row, col) {
    if (row >= rows || col >= cols || col < 0 || row < 0) {
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

    check(row + 1, col);
    check(row - 1, col);
    check(row, col + 1);
    check(row, col - 1);
  }

  for (let row = 0; row <= rows - 1; row++) {
    for (let col = 0; col <= cols - 1; col++) {
      let key = `${row}, ${col}`;

      if (grid[row][col] === "0") {
        continue;
      }

      if (!visited.has(key)) {
        island++;
        check(row, col);
      }
    }
  }

  return island;
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
Task 18. hasPath
=====================================================

Дан directed graph.

Нужно проверить, есть ли путь from -> to.

В графе могут быть циклы.

Ожидаемая сложность:
Time: O(V + E)
Memory: O(V)
*/

function hasPath(graph, from, to) {
  let visited = new Set();
  let stack = [from];

  while (stack.length) {
    let cur = stack.pop();

    if (cur === to) return true;

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

/*
=====================================================
Task 19. shortestPath
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

function shortestPath(graph, from, to) {
  let visited = new Set();
  let map = new Map();

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

        node = map.get(node);
      }

      return path.reverse();
    }

    if (!graph[cur]) {
      continue;
    }

    for (let nei of graph[cur]) {
      if (visited.has(nei)) {
        continue;
      }

      visited.add(nei);
      map.set(nei, cur);
      queue.push(nei);
    }
  }

  return null;
}

/*
=====================================================
Async graph
=====================================================
*/

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
  X: ["Y"],
  Y: [],
};

const fetchFlights = async (city) => {
  return FLIGHTS[city] || [];
};

/*
=====================================================
Task 20. findFlightPath
=====================================================

Необходимо написать функцию поиска составного авиабилета.

Функция принимает:
- пункт вылета from;
- пункт назначения to;
- функцию поиска билетов fetchFlights.

fetchFlights(city) возвращает Promise со списком городов,
куда можно долететь напрямую из city.

Нужно вернуть Promise, который resolve-ится массивом городов маршрута.

Если пути нет — нужно reject/throw Error("No way").

Важно:
- fetchFlights асинхронная;
- в графе могут быть циклы;
- не копировать path в каждом объекте стека/очереди;
- использовать parent map и восстановить путь в конце.

Ожидаемая сложность:
Time: O(V + E), если каждый город запрашивается один раз
Memory: O(V)
*/

async function findFlightPath(from, to, fetchFlights) {
  let visited = new Set();
  let parent = new Map();

  let stack = [from];

  while (stack.length) {
    let cur = stack.pop();

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
      stack.push(nei);
      parent.set(nei, cur);
    }
  }

  throw Error("No way");
}

/*
=====================================================
Run tests
=====================================================
*/

async function runTests() {
  await test(
    "01 firstUniqueChar: leetcode",
    () => firstUniqueChar("leetcode"),
    0,
  );
  await test(
    "01 firstUniqueChar: loveleetcode",
    () => firstUniqueChar("loveleetcode"),
    2,
  );
  await test("01 firstUniqueChar: aabb", () => firstUniqueChar("aabb"), -1);

  await test(
    "02 isAnagram: valid",
    () => isAnagram("anagram", "nagaram"),
    true,
  );
  await test("02 isAnagram: invalid", () => isAnagram("rat", "car"), false);
  await test(
    "02 isAnagram: counts differ",
    () => isAnagram("aacc", "ccac"),
    false,
  );
  await test("02 isAnagram: empty", () => isAnagram("", ""), true);

  await test("03 canBePalindrome: already", () => canBePalindrome("aba"), true);
  await test(
    "03 canBePalindrome: remove one",
    () => canBePalindrome("abca"),
    true,
  );
  await test("03 canBePalindrome: cannot", () => canBePalindrome("abc"), false);
  await test(
    "03 canBePalindrome: remove first",
    () => canBePalindrome("deeee"),
    true,
  );
  await test(
    "03 canBePalindrome: two chars",
    () => canBePalindrome("ab"),
    true,
  );

  await test(
    "04 isPhrasePalindrome: Kazak",
    () => isPhrasePalindrome("Казак"),
    true,
  );
  await test(
    "04 isPhrasePalindrome: russian phrase",
    () => isPhrasePalindrome("А роза упала на лапу Азора"),
    true,
  );
  await test(
    "04 isPhrasePalindrome: english phrase",
    () => isPhrasePalindrome("Madam, I'm Adam"),
    true,
  );
  await test(
    "04 isPhrasePalindrome: false",
    () => isPhrasePalindrome("Baraban"),
    false,
  );

  await test("05 twoSum: example", () => twoSum([2, 7, 11, 15], 9), [0, 1]);
  await test("05 twoSum: middle", () => twoSum([3, 2, 4], 6), [1, 2]);
  await test("05 twoSum: duplicates", () => twoSum([3, 3], 6), [0, 1]);
  await test(
    "05 twoSum: negative",
    () => twoSum([-1, -2, -3, -4, -5], -8),
    [2, 4],
  );

  await test(
    "06 maxTeamGrade: example",
    () => maxTeamGrade([10, 1, 23, 0, 1], 2),
    33,
  );
  await test("06 maxTeamGrade: all same", () => maxTeamGrade([5, 5, 5], 2), 10);
  await test("06 maxTeamGrade: take all", () => maxTeamGrade([1, 2, 3], 3), 6);
  await test("06 maxTeamGrade: zeros", () => maxTeamGrade([0, 0, 0], 2), 0);

  await test(
    "07 maxSumSubarray: example",
    () => maxSumSubarray([2, 1, 5, 1, 3, 2], 3),
    9,
  );
  await test(
    "07 maxSumSubarray: all negative",
    () => maxSumSubarray([-2, -3, -1, -5], 2),
    -4,
  );
  await test(
    "07 maxSumSubarray: k too large",
    () => maxSumSubarray([1, 2], 3),
    null,
  );

  await test(
    "08 minSubarrayLen: example",
    () => minSubarrayLen([2, 3, 1, 2, 4, 3], 7),
    2,
  );
  await test(
    "08 minSubarrayLen: no answer",
    () => minSubarrayLen([1, 1, 1, 1], 5),
    0,
  );
  await test(
    "08 minSubarrayLen: one element",
    () => minSubarrayLen([5, 1, 3], 5),
    1,
  );

  await test(
    "09 longestUniqueSubstring: abcabcbb",
    () => longestUniqueSubstring("abcabcbb"),
    3,
  );
  await test(
    "09 longestUniqueSubstring: bbbbb",
    () => longestUniqueSubstring("bbbbb"),
    1,
  );
  await test(
    "09 longestUniqueSubstring: dvdf",
    () => longestUniqueSubstring("dvdf"),
    3,
  );
  await test(
    "09 longestUniqueSubstring: tmmzuxt",
    () => longestUniqueSubstring("tmmzuxt"),
    5,
  );

  await test(
    "10 longestSubstringWithKDistinct: eceba k=2",
    () => longestSubstringWithKDistinct("eceba", 2),
    3,
  );
  await test(
    "10 longestSubstringWithKDistinct: aabbcc k=2",
    () => longestSubstringWithKDistinct("aabbcc", 2),
    4,
  );
  await test(
    "10 longestSubstringWithKDistinct: k=0",
    () => longestSubstringWithKDistinct("abc", 0),
    0,
  );

  await test(
    "11 backspaceCompare: example",
    () => backspaceCompare("ab#c", "ad#c"),
    true,
  );
  await test(
    "11 backspaceCompare: empty result",
    () => backspaceCompare("ab##", "c#d#"),
    true,
  );
  await test(
    "11 backspaceCompare: false",
    () => backspaceCompare("a#c", "b"),
    false,
  );
  await test(
    "11 backspaceCompare: tricky",
    () => backspaceCompare("bxj##tw", "bxo#j##tw"),
    true,
  );

  await test(
    "12 moveZeroes: example",
    () => moveZeroes([0, 1, 0, 3, 12]),
    [1, 3, 12, 0, 0],
  );
  await test(
    "12 moveZeroes: all zeros",
    () => moveZeroes([0, 0, 0]),
    [0, 0, 0],
  );
  await test("12 moveZeroes: no zeros", () => moveZeroes([1, 2, 3]), [1, 2, 3]);

  testInPlace(
    "13 removeDuplicates: example",
    [1, 1, 2],
    removeDuplicates,
    2,
    [1, 2],
  );
  testInPlace(
    "13 removeDuplicates: longer",
    [0, 0, 1, 1, 1, 2, 2, 3, 3, 4],
    removeDuplicates,
    5,
    [0, 1, 2, 3, 4],
  );
  testInPlace("13 removeDuplicates: empty", [], removeDuplicates, 0, []);

  await test(
    "14 countOccurrences: duplicates",
    () => countOccurrences([1, 2, 2, 2, 3, 4], 2),
    3,
  );
  await test(
    "14 countOccurrences: one",
    () => countOccurrences([1, 2, 3, 4], 3),
    1,
  );
  await test(
    "14 countOccurrences: not found",
    () => countOccurrences([1, 2, 4, 5], 3),
    0,
  );
  await test(
    "14 countOccurrences: all same",
    () => countOccurrences([2, 2, 2], 2),
    3,
  );

  await test("15 searchInsert: found", () => searchInsert([1, 3, 5, 6], 5), 2);
  await test("15 searchInsert: middle", () => searchInsert([1, 3, 5, 6], 2), 1);
  await test("15 searchInsert: end", () => searchInsert([1, 3, 5, 6], 7), 4);
  await test("15 searchInsert: start", () => searchInsert([1, 3, 5, 6], 0), 0);

  await test(
    "16 isValidBrackets: valid",
    () => isValidBrackets("()[]{}"),
    true,
  );
  await test(
    "16 isValidBrackets: nested",
    () => isValidBrackets("([{}])"),
    true,
  );
  await test("16 isValidBrackets: false", () => isValidBrackets("([)]"), false);

  await test(
    "17 numIslands: grid",
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
    "17 numIslands: diagonals",
    () =>
      numIslands([
        ["1", "0", "1"],
        ["0", "1", "0"],
        ["1", "0", "1"],
      ]),
    5,
  );
  await test("17 numIslands: empty", () => numIslands([]), 0);

  await test("18 hasPath: A -> S", () => hasPath(graph, "A", "S"), true);
  await test("18 hasPath: B -> S false", () => hasPath(graph, "B", "S"), false);
  await test(
    "18 hasPath: cycle A -> D",
    () => hasPath(graphWithCycle, "A", "D"),
    true,
  );

  await test(
    "19 shortestPath: A -> S",
    () => shortestPath(graphForShortest, "A", "S"),
    ["A", "D", "S"],
  );
  await test(
    "19 shortestPath: A -> C",
    () => shortestPath(graphForShortest, "A", "C"),
    ["A", "B", "C"],
  );
  await test(
    "19 shortestPath: no path",
    () => shortestPath(graphForShortest, "B", "D"),
    null,
  );

  await test(
    "20 findFlightPath: A -> N",
    () => findFlightPath("A", "N", fetchFlights),
    ["A", "B", "N"],
  );
  await test(
    "20 findFlightPath: A -> S",
    () => findFlightPath("A", "S", fetchFlights),
    ["A", "D", "F", "S"],
  );
  await testThrows(
    "20 findFlightPath: B -> S no way",
    () => findFlightPath("B", "S", fetchFlights),
    "No way",
  );
}

runTests();
