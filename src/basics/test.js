function once(fn) {
  let called = false;
  let res;

  return function wrapper() {
    if (called) {
      return res;
    }

    res = fn();
    called = true;
    return res;
  };
}

const init = once(() => {
  console.log("init");
  return 42;
});

console.log(init()); // 42
console.log(init()); // 42, но "init" больше не печатается
console.log(init()); // 42


function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms)
  })
}

delay(1000).then(() => console.log("done"));


const result = await asyncMapSequential([1, 2, 3], async (x) => x * 2);
// [2, 4, 6]