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
1. Palindrome
=====================================================

Написать функцию, которая определяет, является ли строка палиндромом.

Условия:
- игнорируем регистр;
- игнорируем пробелы и пунктуацию;
- считаем, что работаем с латинскими буквами и цифрами.

Примеры:
"Kazak" -> true
"A roza upala na lapu Azora" -> true
"Do geese see God?" -> true
"Madam, I'm Adam" -> true
"Baraban" -> false

Подсказка:
two pointers
*/

function isPalindrome(str) {
  function isNeeded(el) {
    return el !== undefined && /[a-z0-9]/i.test(el);
  }

  let start = 0;
  let end = str.length - 1;

  while (start < end) {
    while (start < end && !isNeeded(str[start])) {
      start++;
    }

    while (start < end && !isNeeded(str[end])) {
      end--;
    }

    if (str[start].toLowerCase() !== str[end].toLowerCase()) {
      return false;
    }

    start++;
    end--;
  }

  return true;
}

test("palindrome: Kazak", isPalindrome("Kazak"), true);
test("palindrome: phrase", isPalindrome("A roza upala na lapu Azora"), true);
test("palindrome: punctuation", isPalindrome("Madam, I'm Adam"), true);
test("palindrome: question", isPalindrome("Do geese see God?"), true);
test("palindrome: false", isPalindrome("Baraban"), false);
test("palindrome: empty", isPalindrome(""), true);
test("palindrome: only punctuation", isPalindrome("!!!"), true);
test("palindrome: numbers", isPalindrome("12-21"), true);

/*
=====================================================
2. Almost Palindrome
=====================================================

Дана строка s.
Нужно определить, можно ли сделать ее палиндромом,
удалив максимум один символ.

Примеры:
"aba" -> true
"abca" -> true
"abc" -> false
"deeee" -> true
"abbab" -> true

Подсказка:
two pointers + helper для проверки диапазона
*/

function validPalindromeAlmost(s) {
  function isPal(left, right) {
    while (left < right) {
      if (s[left] !== s[right]) {
        return false;
      }

      left++;
      right--;
    }

    return true;
  }

  let start = 0;
  let end = s.length - 1;

  while (start < end) {
    if (s[start] !== s[end]) {
      return isPal(start + 1, end) || isPal(start, end - 1);
    }

    start++;
    end--;
  }

  return true;
}

test("almost palindrome: aba", validPalindromeAlmost("aba"), true);
test("almost palindrome: abca", validPalindromeAlmost("abca"), true);
test("almost palindrome: abc", validPalindromeAlmost("abc"), false);
test("almost palindrome: deeee", validPalindromeAlmost("deeee"), true);
test("almost palindrome: abbab", validPalindromeAlmost("abbab"), true);
test("almost palindrome: raceacar", validPalindromeAlmost("raceacar"), true);
test("almost palindrome: abccdba", validPalindromeAlmost("abccdba"), true);
test("almost palindrome: abcda", validPalindromeAlmost("abcda"), false);

/*
=====================================================
3. Has Duplicate
=====================================================

Дан массив nums.
Вернуть true, если в массиве есть хотя бы один дубликат.
Иначе false.

Примеры:
[1, 2, 3, 1] -> true
[1, 2, 3, 4] -> false

Подсказка:
Set
*/

function hasDuplicate(nums) {
  let s = new Set(nums);
  return s.size !== nums.length;
}

test("duplicate: has duplicate", hasDuplicate([1, 2, 3, 1]), true);
test("duplicate: no duplicate", hasDuplicate([1, 2, 3, 4]), false);
test("duplicate: empty", hasDuplicate([]), false);
test("duplicate: one element", hasDuplicate([1]), false);
test("duplicate: two same", hasDuplicate([1, 1]), true);
test("duplicate: negative nums", hasDuplicate([-1, -2, -1]), true);

/*
=====================================================
4. First Unique Character
=====================================================

Дана строка.
Нужно вернуть индекс первого символа, который встречается ровно один раз.

Примеры:
"leetcode" -> 0
"loveleetcode" -> 2
"aabb" -> -1
"eemtcode" -> 2

Подсказка:
frequency map + второй проход по исходной строке
*/

function firstUniqueChar(str) {
  let obj = {};

  for (let i = 0; i <= str.length - 1; i++) {
    if (obj[str[i]]) {
      obj[str[i]]++;
    } else {
      obj[str[i]] = 1;
    }
  }

  for (let i = 0; i < str.length; i++) {
    if (obj[str[i]] === 1) {
      return i;
    }
  }

  return -1;
}

test("first unique: leetcode", firstUniqueChar("leetcode"), 0);
test("first unique: loveleetcode", firstUniqueChar("loveleetcode"), 2);
test("first unique: aabb", firstUniqueChar("aabb"), -1);
test("first unique: eemtcode", firstUniqueChar("eemtcode"), 2);
test("first unique: empty", firstUniqueChar(""), -1);
test("first unique: z", firstUniqueChar("z"), 0);
test("first unique: aabbc", firstUniqueChar("aabbc"), 4);

/*
=====================================================
5. Anagram
=====================================================

Даны две строки.
Нужно проверить, являются ли они анаграммами.

Анаграмма — это когда строки состоят из одних и тех же символов
в одинаковом количестве, но порядок может отличаться.

Примеры:
"listen", "silent" -> true
"hello", "ollhe" -> true
"rat", "car" -> false
"aacc", "ccac" -> false

Подсказка:
frequency map
*/

function isAnagram(a, b) {
  if (a.length !== b.length) {
    return false;
  }

  let obj = {};

  for (let i = 0; i <= a.length - 1; i++) {
    if (obj[a[i]]) {
      obj[a[i]]++;
    } else {
      obj[a[i]] = 1;
    }

    if (obj[b[i]]) {
      obj[b[i]]--;
    } else {
      obj[b[i]] = -1;
    }
  }

  for (let el of Object.values(obj)) {
    if (el !== 0) {
      return false;
    }
  }

  return true;
}

test("anagram: listen/silent", isAnagram("listen", "silent"), true);
test("anagram: hello/ollhe", isAnagram("hello", "ollhe"), true);
test("anagram: rat/car", isAnagram("rat", "car"), false);
test("anagram: aacc/ccac", isAnagram("aacc", "ccac"), false);
test("anagram: empty", isAnagram("", ""), true);
test("anagram: different length", isAnagram("abc", "ab"), false);
test(
  "anagram: same letters different counts",
  isAnagram("aaab", "aabb"),
  false,
);

/*
=====================================================
6. Two Sum
=====================================================

Дан массив nums и число target.
Нужно вернуть индексы двух чисел, которые в сумме дают target.

Условия:
- решение существует только одно;
- один и тот же элемент нельзя использовать дважды;
- числа могут быть отрицательными.

Примеры:
[2, 7, 11, 15], target = 9 -> [0, 1]
[3, 2, 4], target = 6 -> [1, 2]
[3, 3], target = 6 -> [0, 1]

Подсказка:
Map: число -> индекс
*/

function twoSum(nums, target) {
  let map = new Map();

  for (let i = 0; i <= nums.length - 1; i++) {
    let needed = target - nums[i];

    if (map.has(needed)) {
      return [map.get(needed), i];
    }

    map.set(nums[i], i);
  }

  return null;
}

test("two sum: example 1", twoSum([2, 7, 11, 15], 9), [0, 1]);
test("two sum: example 2", twoSum([3, 2, 4], 6), [1, 2]);
test("two sum: duplicate nums", twoSum([3, 3], 6), [0, 1]);
test("two sum: negative", twoSum([-1, 3, 4], 2), [0, 1]);
test("two sum: zero", twoSum([0, 4, 3, 0], 0), [0, 3]);
test("two sum: later pair", twoSum([5, 75, 25], 100), [1, 2]);

/*
=====================================================
7. Valid Brackets
=====================================================

Проверить, валидна ли строка со скобками.

Условия:
- строка содержит только символы: (, ), [, ], {, }
- каждая открывающая скобка должна закрываться скобкой того же типа;
- порядок вложенности должен быть правильным.

Примеры:
"()" -> true
"()[]{}" -> true
"(]" -> false
"([{}])" -> true
"([)]" -> false

Подсказка:
stack
*/

function isValidBrackets(str) {
  let stack = [];

  for (let el of str) {
    let top = stack[stack.length - 1];

    if (el === "(" || el === "[" || el === "{") {
      stack.push(el);
    } else if (
      (el === "]" && top === "[") ||
      (el === "}" && top === "{") ||
      (el === ")" && top === "(")
    ) {
      stack.pop();
    } else {
      return false;
    }
  }

  return stack.length ? false : true;
}

test("brackets: simple", isValidBrackets("()"), true);
test("brackets: several pairs", isValidBrackets("()[]{}"), true);
test("brackets: wrong type", isValidBrackets("(]"), false);
test("brackets: nested valid", isValidBrackets("([{}])"), true);
test("brackets: nested invalid", isValidBrackets("([)]"), false);
test("brackets: one open", isValidBrackets("("), false);
test("brackets: one close", isValidBrackets("]"), false);
test("brackets: empty", isValidBrackets(""), true);
test("brackets: many opens", isValidBrackets("(((({[]}))))"), true);

/*
=====================================================
8. Backspace String Compare
=====================================================

Даны две строки.
Символ # означает backspace.
Нужно проверить, равны ли строки после применения backspace.

Примеры:
"ab#c", "ad#c" -> true
"ab##", "c#d#" -> true
"a#c", "b" -> false
"abc#d", "abzz##d" -> true

Подсказка:
stack
*/

function backspaceCompare(s, t) {
  let first = [];
  let second = [];

  for (let el of s) {
    if (el !== "#") {
      first.push(el);
    } else {
      first.pop();
    }
  }

  for (let el of t) {
    if (el !== "#") {
      second.push(el);
    } else {
      second.pop();
    }
  }

  if (first.length !== second.length) {
    return false;
  } else {
    for (let i = 0; i <= first.length - 1; i++) {
      if (first[i] !== second[i]) {
        return false;
      }
    }
  }

  return true;
}

test("backspace: example 1", backspaceCompare("ab#c", "ad#c"), true);
test("backspace: example 2", backspaceCompare("ab##", "c#d#"), true);
test("backspace: example 3", backspaceCompare("a#c", "b"), false);
test("backspace: example 4", backspaceCompare("abc#d", "abzz##d"), true);
test("backspace: leading backspace", backspaceCompare("###a", "a"), true);
test("backspace: both empty result", backspaceCompare("a###", "####"), true);
test("backspace: no backspace false", backspaceCompare("abc", "abd"), false);

/*
=====================================================
9. Queue через index
=====================================================

Реализуй простую очередь.

Нужно написать функцию createQueue(),
которая возвращает объект с методами:

enqueue(value) — добавить элемент в конец очереди
dequeue() — достать первый элемент из очереди
peek() — посмотреть первый элемент, не удаляя его
isEmpty() — проверить, пустая ли очередь
size() — вернуть количество элементов в очереди

Важно:
- не использовать shift();
- использовать массив + head index.

Подсказка:
const items = [];
let head = 0;
*/

function createQueue() {
  let queue = [];
  let start = 0;

  return {
    enqueue(value) {
      queue.push(value);
    },
    dequeue() {
      if (start >= queue.length) {
        return undefined;
      }

      let first = queue[start];
      start++;
      return first;
    },
    peek() {
      if (start >= queue.length) {
        return undefined;
      }

      return queue[start];
    },
    isEmpty() {
      return start >= queue.length;
    },
    size() {
      return queue.length - start;
    },
  };
}

const q = createQueue();

test("queue: initially empty", q.isEmpty(), true);
test("queue: initial size", q.size(), 0);

q.enqueue("A");
q.enqueue("B");
q.enqueue("C");

test("queue: size after enqueue", q.size(), 3);
test("queue: peek", q.peek(), "A");
test("queue: dequeue A", q.dequeue(), "A");
test("queue: dequeue B", q.dequeue(), "B");
test("queue: size after dequeue", q.size(), 1);

q.enqueue("D");

test("queue: dequeue C", q.dequeue(), "C");
test("queue: dequeue D", q.dequeue(), "D");
test("queue: empty after all", q.isEmpty(), true);
test("queue: dequeue from empty", q.dequeue(), undefined);
test("queue: peek empty", q.peek(), undefined);

/*
=====================================================
После решения каждой задачи напиши рядом:

time:
space:

Например:

function hasDuplicate(nums) {
  ...
}

// time: O(n)
// space: O(n)
=====================================================
*/
