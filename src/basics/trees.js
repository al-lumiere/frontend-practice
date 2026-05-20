const tree = {
  value: 1,

  left: {
    value: 2,
    left: null,
    right: null,
  },

  right: {
    value: 3,
    left: {
      value: 2,
      left: null,
      right: null,
    },
    right: null,
  },
};

function countNodes(node) {
  if (!node) {
    return 0;
  }

  return 1 + countNodes(node.left) + countNodes(node.right);
}

//console.log(countNodes(tree));

function sumTree(node) {
  if (!node) {
    return 0;
  }

  return node.value + sumTree(node.right) + sumTree(node.left);
}

// console.log(sumTree(tree));

function maxDepth(node) {
  if (!node) {
    return 0;
  }

  return 1 + Math.max(maxDepth(node.rigth), maxDepth(node.left));
}

// console.log(maxDepth(tree));

function containsValue(node, target) {
  if (!node) {
    return false;
  }

  if (node.value === target) {
    return true;
  }

  return containsValue(node.left, target) || containsValue(node.right, target);
}

// console.log(containsValue(tree, 2)); // true
// console.log(containsValue(tree, 10)); // false

const tree1 = {
  value: 1,

  left: {
    value: 2,

    left: {
      value: 4,
      left: null,
      right: null,
    },

    right: null,
  },

  right: {
    value: 3,
    left: null,
    right: null,
  },
};

function countLeaves(node) {
  if (!node) {
    return 0;
  }

  if (!node.left && !node.right) {
    return 1;
  }

  return countLeaves(node.left) + countLeaves(node.right);
}

// console.log(countLeaves(tree1))

function getLeafValues(node) {
  if (!node) {
    return [];
  }

  if (!node.left && !node.right) {
    return [node.value];
  }

  return [...getLeafValues(node.left), ...getLeafValues(node.right)];
}

// console.log(getLeafValues(tree1));

const tree2 = {
  value: 1,

  left: {
    value: 2,

    left: {
      value: 4,
      left: null,
      right: null,
    },

    right: null,
  },

  right: {
    value: 3,
    left: null,
    right: null,
  },
};

function findPath(node, target) {
  if (!node) {
    return null;
  }

  if (node.value === target) {
    return [node.value];
  }

  const left = findPath(node.left, target);
  if (left) {
    return [node.value, ...findPath(node.left, target)];
  }

  const right = findPath(node.left, target);
  if (right) {
    return [node.value, ...findPath(node.right, target)];
  }

  return null;
}

//console.log(findPath(tree2, 4));

const tree4 = {
  value: 5,

  left: {
    value: 2,

    left: {
      value: 1,
      left: null,
      right: null,
    },

    right: null,
  },

  right: {
    value: 8,
    left: {
      value: 4,
      left: null,
      right: null,
    },
    right: null,
  },
};

function countEven(node) {
  let current = 0;

  if (!node) {
    return 0;
  }

  if (node.value % 2 === 0) {
    current = 1;
  }

  return current + countEven(node.left) + countEven(node.right);
}

// console.log(countEven(tree4))

const tree5 = {
  value: 5,

  left: {
    value: 2,

    left: {
      value: 1,
      left: null,
      right: null,
    },

    right: null,
  },

  right: {
    value: 8,
    left: null,
    right: null,
  },
};

function sumOfLeaves(node) {
  if (!node) {
    return 0;
  }

  if (!node.left && !node.right) {
    return node.value;
  }

  return sumOfLeaves(node.left) + sumOfLeaves(node.right);
}

//console.log(sumOfLeaves(tree5));

const tree6 = {
  value: 8,

  left: {
    value: 3,

    left: {
      value: 1,
      left: null,
      right: null,
    },

    right: {
      value: 6,
      left: null,
      right: null,
    },
  },

  right: {
    value: 10,
    left: null,
    right: null,
  },
};

function findMin(node) {
  if (!node) {
    return Infinity;
  }

  let current = node.value;
  let minL = Math.min(current, findMin(node.left));
  let minR = Math.min(current, findMin(node.right));

  return Math.min(minL, minR);
}

//console.log(findMin(tree6))

const tree7 = {
  value: 1,

  left: {
    value: 2,

    left: {
      value: 4,
      left: null,
      right: null,
    },

    right: null,
  },

  right: {
    value: 3,
    left: null,
    right: null,
  },
};

function heightDifference(tree) {
  function countDepth(tree) {
    if (!tree) {
      return 0;
    }
    return 1 + Math.max(countDepth(tree.left), countDepth(tree.right));
  }

  let left = countDepth(tree.left);
  let right = countDepth(tree.right);

  return left - right;
}

// console.log(heightDifference(tree7))

const tree8 = {
  value: 5,

  left: {
    value: 2,

    left: {
      value: 1,
      left: null,
      right: null,
    },

    right: null,
  },

  right: {
    value: 8,

    left: {
      value: 6,
      left: null,
      right: null,
    },

    right: {
      value: 10,
      left: null,
      right: null,
    },
  },
};

function countGreater(node, x) {
  if (!node) {
    return 0;
  }

  let current = 0;

  if (node.value > x) {
    current++;
  }

  return current + countGreater(node.left, x) + countGreater(node.right, x);
}

// console.log(countGreater(tree8, 5));

const tree9 = {
  value: 5,

  left: {
    value: 2,

    left: {
      value: 1,
      left: null,
      right: null,
    },

    right: {
      value: -3,
      left: null,
      right: null,
    },
  },

  right: {
    value: 8,
    left: null,
    right: null,
  },
};

function isPositive(node) {
  if (!node) {
    return true;
  }

  if (node.value < 0) {
    return false;
  }

  return isPositive(node.left) && isPositive(node.right);
}

// console.log(isPositive(tree9));

const tree10 = {
  value: 5,

  left: {
    value: 2,

    left: {
      value: 1,
      left: null,
      right: null,
    },

    right: {
      value: -3,
      left: null,
      right: null,
    },
  },

  right: {
    value: 8,
    left: null,
    right: null,
  },
};

function AnyNegative(node) {
  if (!node) {
    return false;
  }

  if (node.value < 0) {
    return true;
  }

  return AnyNegative(node.left) || AnyNegative(node.right);
}

//console.log(AnyNegative(tree10));

const tree11 = {
  value: 5,

  left: {
    value: 12,

    left: {
      value: 1,
      left: null,
      right: null,
    },

    right: {
      value: 20,
      left: null,
      right: null,
    },
  },

  right: {
    value: 8,
    left: null,
    right: null,
  },
};

function findLargestEven(node) {
  if (!node) {
    return -Infinity;
  }

  let current = -Infinity;

  if (node.value % 2 === 0) {
    current = node.value;
  }

  let res = Math.max(
    current,
    findLargestEven(node.left),
    findLargestEven(node.right),
  );

  return res === -Infinity ? null : res;
}

//console.log(findLargestEven(tree11));

const tree12 = {
  value: 5,

  left: {
    value: 4,

    left: {
      value: 11,

      left: {
        value: 7,
        left: null,
        right: null,
      },

      right: {
        value: 2,
        left: null,
        right: null,
      },
    },

    right: null,
  },

  right: {
    value: 8,

    left: {
      value: 13,
      left: null,
      right: null,
    },

    right: {
      value: 4,
      left: null,
      right: null,
    },
  },
};

function hasPathSum(node, target) {
  if (!node) {
    return false;
  }

  if (target === node.value && !node.left && !node.right) {
    return true;
  }

  let newT = target - node.value;

  return hasPathSum(node.left, newT) || hasPathSum(node.right, newT);
}

//console.log(hasPathSum(tree12, 22));

const tree13 = {
  value: 1,

  left: {
    value: 2,
    left: null,
    right: null
  },

  right: {
    value: 3,
    left: null,
    right: null
  }
};

const tree14 = {
  value: 1,

  left: {
    value: 2,
    left: null,
    right: null
  },

  right: {
    value: 3,
    left: null,
    right: null
  }
};

function isSame(nodeOne, nodeTwo) {
  if (!nodeOne && !nodeTwo) {
    return true
  }

  if (!nodeOne || !nodeTwo) {
    return false
  }

  return  nodeOne.value === nodeTwo.value && isSame(nodeOne.left, nodeTwo.left) && isSame(nodeOne.right, nodeTwo.right)
}

//console.log(isSame(tree13, tree14));

const tree15 = {
  value: 5,

  left: {
    value: 2,

    left: {
      value: 1,
      left: null,
      right: null
    },

    right: {
      value: 8,
      left: null,
      right: null
    }
  },

  right: {
    value: 7,
    left: null,
    right: null
  }
};

function countOdd(node) {
  if (!node) {
    return 0
  }

  let current = 0;

  if (node.value % 2 !== 0) {
    current++
  }

  return current + countOdd(node.left) + countOdd(node.right)
}

console.log(countOdd(tree15));

const tree16 = {
  value: 1,

  left: {
    value: 2,

    left: {
      value: 3,

      left: {
        value: 4,
        left: null,
        right: null
      },

      right: null
    },

    right: null
  },

  right: null
};

function mDepth(node) {
  if (!node) {
    return 0
  }

  let current = 1;

  let left = current + mDepth(node.left);
  let right = current + mDepth(node.right);

  return Math.max(left, right)
}

console.log(mDepth(tree16))

const tree17 = {
  value: 10,

  left: {
    value: 4,
    left: null,
    right: null
  },

  right: {
    value: 20,

    left: {
      value: 8,
      left: null,
      right: null
    },

    right: null
  }
};

function hasV (node, target) {
  if (!node) {
    return false
  }

  if (node.value === target) {
    return true
  }

  return hasV(node.left, target) || hasV(node.right, target)
}

console.log(hasV(tree17, 8));
console.log(hasV(tree17, 999));