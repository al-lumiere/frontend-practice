"use strict";

function isEqual(actual, expected) {
  return JSON.stringify(actual) === JSON.stringify(expected);
}

function test(name, actual, expected) {
  if (isEqual(actual, expected)) {
    console.log(`✅ ${name}`);
  } else {
    console.log(`❌ ${name}`);
    console.log("   expected:", expected);
    console.log("   actual:  ", actual);
  }
}

function longestUniqueSubstring(str) {
  let unique = new Set();
  let left = 0;
  let max = 0;

  for (let right = 0; right <= str.length - 1; right++) {
    while (unique.has(str[right])) {
      unique.delete(str[left]);
      left++;
    }

    unique.add(str[right]);
    max = Math.max(max, right - left + 1);
  }

  return max;
}

test("abcabcbb", longestUniqueSubstring("abcabcbb"), 3);
test("bbbbb", longestUniqueSubstring("bbbbb"), 1);
test("pwwkew", longestUniqueSubstring("pwwkew"), 3);
test("empty", longestUniqueSubstring(""), 0);
test("abcde", longestUniqueSubstring("abcde"), 5);
test("abba", longestUniqueSubstring("abba"), 2);
test("dvdf", longestUniqueSubstring("dvdf"), 3);
test("tmmzuxt", longestUniqueSubstring("tmmzuxt"), 5);

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

test("ab#c vs ad#c", backspaceCompare("ab#c", "ad#c"), true);
test("ab## vs c#d#", backspaceCompare("ab##", "c#d#"), true);
test("a#c vs b", backspaceCompare("a#c", "b"), false);
test("xywrrmp vs xywrrmu#p", backspaceCompare("xywrrmp", "xywrrmu#p"), true);
test("#### vs empty", backspaceCompare("####", ""), true);
test("bxj##tw vs bxo#j##tw", backspaceCompare("bxj##tw", "bxo#j##tw"), true);

function lowerBound(arr, target) {
  if (!arr.length) {
    return -1;
  }

  let left = 0;
  let right = arr.length - 1;

  while (right - left > 1) {
    let ind = Math.floor((right - left) / 2 + left);

    if (arr[ind] >= target) {
      right = ind;
    }

    if (arr[ind] < target) {
      left = ind;
    }
  }

  if (arr[left] >= target) {
    return left;
  } else if (arr[right] >= target) {
    return right;
  } else {
    return -1;
  }
}

test("exact match", lowerBound([1, 3, 5, 7], 5), 2);
test("between values", lowerBound([1, 3, 5, 7], 4), 2);
test("smaller than all", lowerBound([1, 3, 5, 7], 0), 0);
test("bigger than all", lowerBound([1, 3, 5, 7], 8), -1);
test("duplicates", lowerBound([1, 3, 3, 3, 5], 3), 1);
test("empty", lowerBound([], 3), -1);
test("single found", lowerBound([10], 5), 0);
test("single not found", lowerBound([10], 15), -1);

function lastIndexLower(arr, target) {
  if (!arr.length) {
    return -1;
  }

  let left = 0;
  let right = arr.length - 1;

  while (right - left > 1) {
    let ind = Math.floor((right - left) / 2 + left);

    if (arr[ind] <= target) {
      left = ind;
    }

    if (arr[ind] > target) {
      right = ind;
    }
  }

  if (arr[right] <= target) {
    return right;
  } else if (arr[left] <= target) {
    return left;
  } else {
    return -1;
  }
}

test("exact match", lastIndexLower([1, 3, 5, 7], 5), 2);
test("between values", lastIndexLower([1, 3, 5, 7], 4), 1);
test("smaller than all", lastIndexLower([1, 3, 5, 7], 0), -1);
test("bigger than all", lastIndexLower([1, 3, 5, 7], 8), 3);
test("duplicates", lastIndexLower([1, 3, 3, 3, 5], 3), 3);
test("empty", lastIndexLower([], 3), -1);
test("single found", lastIndexLower([10], 5), -1);
test("single not found", lastIndexLower([10], 15), 0);

function countOccurrences(arr, target) {
  if (!arr.length) return 0;

  function findFirst(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    let first = -1;

    while (right - left > 1) {
      let middle = Math.floor((right - left) / 2 + left);

      if (arr[middle] < target) {
        left = middle;
      }

      if (arr[middle] >= target) {
        right = middle;
      }
    }

    if (arr[left] >= target) {
      first = left;
    } else if (arr[right] >= target) {
      first = right;
    }

    return first;
  }

  let leftInd = findFirst(arr, target);
  if (leftInd === -1 || arr[leftInd] !== target) return 0;

  function findLast() {
    let left = leftInd;
    let right = arr.length - 1;
    let last = -1;

    while (right - left > 1) {
      let middle = Math.floor((right - left) / 2 + left);

      if (arr[middle] <= target) {
        left = middle;
      }

      if (arr[middle] > target) {
        right = middle;
      }
    }

    if (arr[right] <= target) {
      last = right;
    } else if (arr[left] <= target) {
      last = left;
    }

    return last;
  }

  let rightInd = findLast(arr, target);

  return rightInd - leftInd + 1;
}

test("several duplicates", countOccurrences([1, 2, 2, 2, 3, 4], 2), 3);
test("one occurrence", countOccurrences([1, 2, 3, 4], 3), 1);
test("not found", countOccurrences([1, 2, 3, 4], 5), 0);
test("all same found", countOccurrences([2, 2, 2], 2), 3);
test("all same not found", countOccurrences([2, 2, 2], 1), 0);
test("empty", countOccurrences([], 2), 0);
test("target at start", countOccurrences([1, 1, 1, 2, 3], 1), 3);
test("target at end", countOccurrences([1, 2, 3, 3, 3], 3), 3);
test("not found between values", countOccurrences([1, 2, 4, 5], 3), 0);

function searchInsert(arr, target) {
  if (!arr.length) return 0;

  let left = 0;
  let right = arr.length - 1;
  let ans = arr.length;

  while (left <= right) {
    let middle = Math.floor((right - left) / 2 + left);

    if (arr[middle] >= target) {
      ans = middle;
      right = middle - 1;
    } else {
      left = middle + 1;
    }
  }

  return ans;
}

test("found", searchInsert([1, 3, 5, 6], 5), 2);
test("insert middle", searchInsert([1, 3, 5, 6], 2), 1);
test("insert end", searchInsert([1, 3, 5, 6], 7), 4);
test("insert start", searchInsert([1, 3, 5, 6], 0), 0);
test("empty", searchInsert([], 10), 0);
test("single smaller", searchInsert([5], 2), 0);
test("single bigger", searchInsert([5], 7), 1);

function twoSum(nums, target) {
  let m = new Map();

  for (let i = 0; i <= nums.length - 1; i++) {
    let take = target - nums[i];

    if (m.has(take)) {
      return [m.get(take), i];
    } else {
      m.set(nums[i], i);
    }
  }
}

test("example 1", twoSum([2, 7, 11, 15], 9), [0, 1]);
test("example 2", twoSum([3, 2, 4], 6), [1, 2]);
test("duplicates", twoSum([3, 3], 6), [0, 1]);
test("negative", twoSum([-1, -2, -3, -4, -5], -8), [2, 4]);
test("zero", twoSum([0, 4, 3, 0], 0), [0, 3]);

function isAnagram(s, t) {
  if (s.length !== t.length) {
    return false;
  }

  let obj = {};

  for (let i = 0; i <= s.length - 1; i++) {
    if (!obj[s[i]]) {
      obj[s[i]] = 0;
    }

    if (!obj[t[i]]) {
      obj[t[i]] = 0;
    }

    obj[s[i]] += 1;
    obj[t[i]] -= 1;
  }

  for (let v in obj) {
    if (obj[v] !== 0) return false;
  }

  return true;
}

test("valid", isAnagram("anagram", "nagaram"), true);
test("invalid", isAnagram("rat", "car"), false);
test("different counts", isAnagram("aacc", "ccac"), false);
test("empty", isAnagram("", ""), true);
test("one empty", isAnagram("a", ""), false);
test("same letters", isAnagram("listen", "silent"), true);

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

test("example", moveZeroes([0, 1, 0, 3, 12]), [1, 3, 12, 0, 0]);
test("zeros at start", moveZeroes([0, 0, 1]), [1, 0, 0]);
test("no zeros", moveZeroes([1, 2, 3]), [1, 2, 3]);
test("all zeros", moveZeroes([0, 0, 0]), [0, 0, 0]);
test("mixed", moveZeroes([4, 0, 5, 0, 0, 3]), [4, 5, 3, 0, 0, 0]);
test("empty", moveZeroes([]), []);

function testRemoveDuplicates(name, nums, expectedK, expectedPrefix) {
  const k = removeDuplicates(nums);
  const prefix = nums.slice(0, k);

  const ok =
    k === expectedK &&
    JSON.stringify(prefix) === JSON.stringify(expectedPrefix);

  if (ok) {
    console.log(`✅ ${name}`);
  } else {
    console.log(`❌ ${name}`);
    console.log("   expected k:", expectedK);
    console.log("   actual k:  ", k);
    console.log("   expected prefix:", expectedPrefix);
    console.log("   actual prefix:  ", prefix);
    console.log("   full nums:       ", nums);
  }
}

function removeDuplicates(nums) {
  if (!nums.length) return 0;

  let write = 1;

  for (let i = 1; i <= nums.length - 1; i++) {
    if (nums[i] !== nums[i - 1]) {
      nums[write] = nums[i];
      write++;
    }
  }

  return write;
}

testRemoveDuplicates("example 1", [1, 1, 2], 2, [1, 2]);

testRemoveDuplicates(
  "example 2",
  [0, 0, 1, 1, 1, 2, 2, 3, 3, 4],
  5,
  [0, 1, 2, 3, 4],
);

testRemoveDuplicates("no duplicates", [1, 2, 3], 3, [1, 2, 3]);
testRemoveDuplicates("all same", [5, 5, 5], 1, [5]);
testRemoveDuplicates("empty", [], 0, []);
