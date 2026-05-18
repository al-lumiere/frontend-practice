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
      right: null
    },

    right: null
  },

  right: {
    value: 8,
    left: {
      value: 4,
      left: null,
      right: null
    },
    right: null
  }
};

function countEven(node) {
  let current = 0

  if (!node) {
    return 0
  }

  if (node.value % 2 === 0) {
    current = 1
  }

  return current + countEven(node.left) + countEven(node.right)
}

// console.log(countEven(tree4))

const tree5 = {
  value: 5,

  left: {
    value: 2,

    left: {
      value: 1,
      left: null,
      right: null
    },

    right: null
  },

  right: {
    value: 8,
    left: null,
    right: null
  }
};

function sumOfLeaves(node) {
  if (!node) {
    return 0
  }

  if (!node.left && !node.right) {
    return node.value
  }

  return sumOfLeaves(node.left) +  sumOfLeaves(node.right)
}

//console.log(sumOfLeaves(tree5));

const tree6 = {
  value: 8,

  left: {
    value: 3,

    left: {
      value: 1,
      left: null,
      right: null
    },

    right: {
      value: 6,
      left: null,
      right: null
    }
  },

  right: {
    value: 10,
    left: null,
    right: null
  }
};

function findMin(node) {
  if (!node) {
    return Infinity
  }

  let current = node.value;
  let minL = Math.min(current, findMin(node.left));
  let minR =  Math.min(current, findMin(node.right));

  return Math.min(minL, minR)
}

//console.log(findMin(tree6))

const tree7 = {
  value: 1,

  left: {
    value: 2,

    left: {
      value: 4,
      left: null,
      right: null
    },

    right: null
  },

  right: {
    value: 3,
    left: null,
    right: null
  }
};

function heightDifference(tree) {
  function countDepth(tree) {
    if (!tree) {
      return 0
    }
    return  1 + Math.max(countDepth(tree.left), countDepth(tree.right))
  }

  let left = countDepth(tree.left);
  let right = countDepth(tree.right);

  return left - right
}

console.log(heightDifference(tree7))