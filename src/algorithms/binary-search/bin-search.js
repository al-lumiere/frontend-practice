// ======================================================
// Helpers
// ======================================================

function assertEqual(actual, expected, testName) {
  if (actual !== expected) {
    console.error(`❌ ${testName}`);
    console.error("Expected:", expected);
    console.error("Actual:  ", actual);
    return;
  }

  console.log(`✅ ${testName}`);
}

function assertDeepEqual(actual, expected, testName) {
  const actualJson = JSON.stringify(actual);
  const expectedJson = JSON.stringify(expected);

  if (actualJson !== expectedJson) {
    console.error(`❌ ${testName}`);
    console.error("Expected:", expected);
    console.error("Actual:  ", actual);
    return;
  }

  console.log(`✅ ${testName}`);
}

// ======================================================
// Pattern 1. Classic binary search
// ======================================================

/*
1. binarySearch

Given a sorted array of numbers and a target,
return the index of target.

If target does not exist, return -1.

Example:
binarySearch([1, 3, 5, 7], 5) -> 2
binarySearch([1, 3, 5, 7], 4) -> -1

Time complexity:
TODO:

Memory complexity:
TODO:
*/

function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let middle = Math.floor((right - left) / 2 + left);

    if (nums[middle] === target) {
      return middle;
    }

    if (nums[middle] < target) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return -1;
}

assertEqual(
  binarySearch([1, 3, 5, 7], 5),
  2,
  "binarySearch finds existing target",
);
assertEqual(
  binarySearch([1, 3, 5, 7], 4),
  -1,
  "binarySearch returns -1 for missing target",
);
assertEqual(binarySearch([], 1), -1, "binarySearch handles empty array");
assertEqual(
  binarySearch([10], 10),
  0,
  "binarySearch handles one element found",
);
assertEqual(
  binarySearch([10], 5),
  -1,
  "binarySearch handles one element missing",
);

// ======================================================
// Pattern 2. Insert position / lower bound
// ======================================================

/*
2. searchInsert

Given a sorted array of distinct numbers and a target,
return the index if the target is found.

If not found, return the index where it would be inserted in order.

Example:
searchInsert([1, 3, 5, 6], 5) -> 2
searchInsert([1, 3, 5, 6], 2) -> 1
searchInsert([1, 3, 5, 6], 7) -> 4

Hint:
This is the first index where nums[i] >= target.

Time complexity:
TODO:

Memory complexity:
TODO:
*/

function searchInsert(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let middle = Math.floor((right - left) / 2 + left);

    if (nums[middle] === target) {
      return middle;
    }

    if (nums[middle] < target) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return left;
}

assertEqual(searchInsert([1, 3, 5, 6], 5), 2, "searchInsert finds target");
assertEqual(searchInsert([1, 3, 5, 6], 2), 1, "searchInsert inserts in middle");
assertEqual(searchInsert([1, 3, 5, 6], 7), 4, "searchInsert inserts at end");
assertEqual(searchInsert([1, 3, 5, 6], 0), 0, "searchInsert inserts at start");
assertEqual(searchInsert([], 10), 0, "searchInsert handles empty array");

// ======================================================
// Pattern 3. First true
// ======================================================

/*
3. firstBadVersion

You are given n versions from 1 to n.
There is a function isBadVersion(version) that returns true if version is bad.

All versions after the first bad version are also bad.

Return the first bad version.

Example:
n = 5
bad = 4

versions:
1 -> false
2 -> false
3 -> false
4 -> true
5 -> true

answer: 4

Time complexity:
TODO:

Memory complexity:
TODO:
*/

function createIsBadVersion(firstBad) {
  return function isBadVersion(version) {
    return version >= firstBad;
  };
}

function firstBadVersion(n, isBadVersion) {
  let left = 0;
  let right = n;

  while (left <= right) {
    let middle = Math.floor((right - left) / 2 + left);

    if (isBadVersion(middle)) {
      right = middle - 1;
    } else {
      left = middle + 1;
    }
  }

  return left;
}

assertEqual(
  firstBadVersion(5, createIsBadVersion(4)),
  4,
  "firstBadVersion finds first bad",
);
assertEqual(
  firstBadVersion(1, createIsBadVersion(1)),
  1,
  "firstBadVersion handles one version",
);
assertEqual(
  firstBadVersion(10, createIsBadVersion(1)),
  1,
  "firstBadVersion handles first version bad",
);
assertEqual(
  firstBadVersion(10, createIsBadVersion(10)),
  10,
  "firstBadVersion handles last version bad",
);

// ======================================================
// Pattern 4. First and last position
// ======================================================

/*
4. searchRange

Given a sorted array of numbers and a target,
return the first and last index of target.

If target does not exist, return [-1, -1].

Example:
searchRange([5, 7, 7, 8, 8, 10], 8) -> [3, 4]
searchRange([5, 7, 7, 8, 8, 10], 6) -> [-1, -1]

Time complexity:
TODO:

Memory complexity:
TODO:
*/

function searchRange(nums, target) {
  // TODO
}

assertDeepEqual(
  searchRange([5, 7, 7, 8, 8, 10], 8),
  [3, 4],
  "searchRange finds duplicated target",
);
assertDeepEqual(
  searchRange([5, 7, 7, 8, 8, 10], 6),
  [-1, -1],
  "searchRange handles missing target",
);
assertDeepEqual(
  searchRange([], 0),
  [-1, -1],
  "searchRange handles empty array",
);
assertDeepEqual(
  searchRange([2, 2], 2),
  [0, 1],
  "searchRange handles all elements equal target",
);
assertDeepEqual(
  searchRange([1], 1),
  [0, 0],
  "searchRange handles one element found",
);

// ======================================================
// Pattern 5. Square root
// ======================================================

/*
5. mySqrt

Given a non-negative integer x,
return the integer square root of x.

The integer square root is the largest integer y such that y * y <= x.

Example:
mySqrt(4) -> 2
mySqrt(8) -> 2
mySqrt(16) -> 4

Do not use Math.sqrt.

Time complexity:
TODO:

Memory complexity:
TODO:
*/

function mySqrt(x) {
  // TODO
}

assertEqual(mySqrt(0), 0, "mySqrt handles 0");
assertEqual(mySqrt(1), 1, "mySqrt handles 1");
assertEqual(mySqrt(4), 2, "mySqrt handles perfect square");
assertEqual(mySqrt(8), 2, "mySqrt floors result");
assertEqual(mySqrt(16), 4, "mySqrt handles another perfect square");
assertEqual(mySqrt(2147395599), 46339, "mySqrt handles large number");

// ======================================================
// Pattern 6. Peak element
// ======================================================

/*
6. findPeakElement

A peak element is an element that is strictly greater than its neighbors.

Given an array nums, return the index of any peak element.

You may imagine:
nums[-1] = -Infinity
nums[n] = -Infinity

Example:
findPeakElement([1, 2, 3, 1]) -> 2
findPeakElement([1, 2, 1, 3, 5, 6, 4]) -> 1 or 5

Hint:
Compare nums[mid] and nums[mid + 1].
If nums[mid] < nums[mid + 1], peak is on the right.
Otherwise peak is on the left or at mid.

Time complexity:
TODO:

Memory complexity:
TODO:
*/

function findPeakElement(nums) {
  // TODO
}

function isPeak(nums, index) {
  const left = index === 0 ? -Infinity : nums[index - 1];
  const right = index === nums.length - 1 ? -Infinity : nums[index + 1];

  return nums[index] > left && nums[index] > right;
}

const peakIndex1 = findPeakElement([1, 2, 3, 1]);
assertEqual(
  isPeak([1, 2, 3, 1], peakIndex1),
  true,
  "findPeakElement finds peak in simple array",
);

const peakInput2 = [1, 2, 1, 3, 5, 6, 4];
const peakIndex2 = findPeakElement(peakInput2);
assertEqual(
  isPeak(peakInput2, peakIndex2),
  true,
  "findPeakElement finds any valid peak",
);

assertEqual(findPeakElement([1]), 0, "findPeakElement handles one element");

// ======================================================
// Pattern 7. Rotated sorted array
// ======================================================

/*
7. searchInRotatedArray

Given a rotated sorted array of unique numbers and a target,
return the index of target.

If target does not exist, return -1.

Example:
searchInRotatedArray([4, 5, 6, 7, 0, 1, 2], 0) -> 4
searchInRotatedArray([4, 5, 6, 7, 0, 1, 2], 3) -> -1

Hint:
At each step, one half is always sorted.
Find which half is sorted and decide where target can be.

Time complexity:
TODO:

Memory complexity:
TODO:
*/

function searchInRotatedArray(nums, target) {
  // TODO
}

assertEqual(
  searchInRotatedArray([4, 5, 6, 7, 0, 1, 2], 0),
  4,
  "searchInRotatedArray finds target",
);
assertEqual(
  searchInRotatedArray([4, 5, 6, 7, 0, 1, 2], 3),
  -1,
  "searchInRotatedArray handles missing target",
);
assertEqual(
  searchInRotatedArray([1], 0),
  -1,
  "searchInRotatedArray handles one element missing",
);
assertEqual(
  searchInRotatedArray([1], 1),
  0,
  "searchInRotatedArray handles one element found",
);
assertEqual(
  searchInRotatedArray([3, 1], 1),
  1,
  "searchInRotatedArray handles two elements",
);

// ======================================================
// Pattern 8. Minimum in rotated sorted array
// ======================================================

/*
8. findMinInRotatedArray

Given a rotated sorted array of unique numbers,
return the minimum element.

Example:
findMinInRotatedArray([3, 4, 5, 1, 2]) -> 1
findMinInRotatedArray([4, 5, 6, 7, 0, 1, 2]) -> 0
findMinInRotatedArray([11, 13, 15, 17]) -> 11

Hint:
Compare nums[mid] with nums[right].

Time complexity:
TODO:

Memory complexity:
TODO:
*/

function findMinInRotatedArray(nums) {
  // TODO
}

assertEqual(
  findMinInRotatedArray([3, 4, 5, 1, 2]),
  1,
  "findMinInRotatedArray finds min",
);
assertEqual(
  findMinInRotatedArray([4, 5, 6, 7, 0, 1, 2]),
  0,
  "findMinInRotatedArray finds min in longer array",
);
assertEqual(
  findMinInRotatedArray([11, 13, 15, 17]),
  11,
  "findMinInRotatedArray handles not rotated array",
);
assertEqual(
  findMinInRotatedArray([1]),
  1,
  "findMinInRotatedArray handles one element",
);

// ======================================================
// Pattern 9. Single element in sorted array
// ======================================================

/*
9. singleNonDuplicate

You are given a sorted array where every element appears exactly twice,
except for one element which appears exactly once.

Return the single element.

Example:
singleNonDuplicate([1, 1, 2, 3, 3, 4, 4]) -> 2
singleNonDuplicate([1, 1, 2, 2, 3]) -> 3

Hint:
Before the single element:
pairs start at even indexes: 0, 2, 4...

After the single element:
pairs start at odd indexes.

Time complexity:
TODO:

Memory complexity:
TODO:
*/

function singleNonDuplicate(nums) {
  // TODO
}

assertEqual(
  singleNonDuplicate([1, 1, 2, 3, 3, 4, 4]),
  2,
  "singleNonDuplicate finds middle single",
);
assertEqual(
  singleNonDuplicate([1, 1, 2, 2, 3]),
  3,
  "singleNonDuplicate finds last single",
);
assertEqual(
  singleNonDuplicate([1, 2, 2, 3, 3]),
  1,
  "singleNonDuplicate finds first single",
);
assertEqual(
  singleNonDuplicate([7]),
  7,
  "singleNonDuplicate handles one element",
);

// ======================================================
// Pattern 10. Binary search on answer
// ======================================================

/*
10. minEatingSpeed

Koko eats bananas.

You are given:
- piles: array of banana piles
- h: number of hours

Koko chooses an integer eating speed k.
Each hour, she chooses one pile and eats k bananas from it.
If the pile has fewer than k bananas, she eats all of them.

Return the minimum integer k such that she can eat all bananas within h hours.

Example:
minEatingSpeed([3, 6, 7, 11], 8) -> 4

Hint:
The answer is between 1 and max(piles).
For a chosen speed k, calculate how many hours she needs.
If hours <= h, k is enough, try smaller.
If hours > h, k is too slow, try bigger.

Time complexity:
TODO:

Memory complexity:
TODO:
*/

function minEatingSpeed(piles, h) {
  // TODO
}

assertEqual(minEatingSpeed([3, 6, 7, 11], 8), 4, "minEatingSpeed example 1");
assertEqual(
  minEatingSpeed([30, 11, 23, 4, 20], 5),
  30,
  "minEatingSpeed example 2",
);
assertEqual(
  minEatingSpeed([30, 11, 23, 4, 20], 6),
  23,
  "minEatingSpeed example 3",
);
assertEqual(
  minEatingSpeed([1, 1, 1, 1], 4),
  1,
  "minEatingSpeed handles all ones",
);

// ======================================================
// Extra: templates to remember
// ======================================================

/*
Classic binary search template:

let left = 0;
let right = nums.length - 1;

while (left <= right) {
  const mid = Math.floor((left + right) / 2);

  if (nums[mid] === target) {
    return mid;
  }

  if (nums[mid] < target) {
    left = mid + 1;
  } else {
    right = mid - 1;
  }
}

return -1;


Lower bound template:
Find first index where condition is true.

let left = 0;
let right = nums.length;

while (left < right) {
  const mid = Math.floor((left + right) / 2);

  if (condition(mid)) {
    right = mid;
  } else {
    left = mid + 1;
  }
}

return left;
*/

console.log("\nDone. Some tests will fail until you implement TODO functions.");
