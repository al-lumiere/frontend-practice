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
1. longestUniqueSubstring — sliding window
=====================================================

Дана строка.

Нужно вернуть длину самой длинной подстроки
без повторяющихся символов.

Примеры:

"abcabcbb" -> 3
Потому что "abc"

"bbbbb" -> 1
Потому что "b"

"pwwkew" -> 3
Потому что "wke"

Важно:
- нужна именно подстрока, то есть символы подряд
- вернуть длину, не саму строку
*/

function longestUniqueSubstring(str) {
  let left = 0;
  let seen = new Set();
  let res = 0;

  for (let right = 0; right <= str.length - 1; right++) {
    while (seen.has(str[right])) {
      seen.delete(str[left]);
      left++;
    }

    seen.add(str[right]);

    res = Math.max(res, right - left + 1);
  }

  return res;
}

test("longestUniqueSubstring: abcabcbb", longestUniqueSubstring("abcabcbb"), 3);
test("longestUniqueSubstring: bbbbb", longestUniqueSubstring("bbbbb"), 1);
test("longestUniqueSubstring: pwwkew", longestUniqueSubstring("pwwkew"), 3);
test("longestUniqueSubstring: empty", longestUniqueSubstring(""), 0);
test("longestUniqueSubstring: abcde", longestUniqueSubstring("abcde"), 5);
test("longestUniqueSubstring: abba", longestUniqueSubstring("abba"), 2);
test("longestUniqueSubstring: dvdf", longestUniqueSubstring("dvdf"), 3);
test("longestUniqueSubstring: tmmzuxt", longestUniqueSubstring("tmmzuxt"), 5);

/*
=====================================================
maxSumSubarray — fixed sliding window
=====================================================

Дан массив чисел arr и число k.

Нужно вернуть максимальную сумму подряд идущих k элементов.

Примеры:

[2, 1, 5, 1, 3, 2], k = 3

Все окна длины 3:
[2, 1, 5] -> 8
[1, 5, 1] -> 7
[5, 1, 3] -> 9
[1, 3, 2] -> 6

Ответ: 9

Важно:
- элементы должны идти подряд
- если k больше длины массива, вернуть null
*/

function maxSumSubarray(arr, k) {
  if (k > arr.length) {
    return null;
  }

  let sum = 0;

  for (let i = 0; i <= k - 1; i++) {
    sum += arr[i];
  }

  let max = sum;

  for (let r = k; r <= arr.length - 1; r++) {
    sum += arr[r];
    sum -= arr[r - k];

    max = Math.max(sum, max);
  }

  return max;
}

test("maxSumSubarray: example 1", maxSumSubarray([2, 1, 5, 1, 3, 2], 3), 9);
test("maxSumSubarray: example 2", maxSumSubarray([2, 3, 4, 1, 5], 2), 7);
test("maxSumSubarray: k = 1", maxSumSubarray([5, -1, 3], 1), 5);
test("maxSumSubarray: all negative", maxSumSubarray([-2, -3, -1, -5], 2), -4);
test("maxSumSubarray: k too large", maxSumSubarray([1, 2], 3), null);
test("maxSumSubarray: exact length", maxSumSubarray([1, 2, 3], 3), 6);

/*
=====================================================
minSubarrayLen — sliding window variable size
=====================================================

Дан массив положительных чисел arr и число target.

Нужно вернуть минимальную длину подряд идущего подмассива,
сумма которого >= target.

Если такого подмассива нет — вернуть 0.

Примеры:

[2, 3, 1, 2, 4, 3], target = 7 -> 2
Потому что [4, 3]

[1, 1, 1, 1], target = 5 -> 0

[5, 1, 3], target = 5 -> 1
Потому что [5]
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

test("minSubarrayLen: example 1", minSubarrayLen([2, 3, 1, 2, 4, 3], 7), 2);
test("minSubarrayLen: no answer", minSubarrayLen([1, 1, 1, 1], 5), 0);
test("minSubarrayLen: one element", minSubarrayLen([5, 1, 3], 5), 1);
test("minSubarrayLen: whole array", minSubarrayLen([1, 2, 3], 6), 3);
test("minSubarrayLen: middle", minSubarrayLen([1, 4, 4], 4), 1);
