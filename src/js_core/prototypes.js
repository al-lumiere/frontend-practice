let head = {
  glasses: 1
};

let table = {
  __proto__ : head,
  pen: 3
};

let bed = {
  __proto__ : table,
  sheet: 1,
  pillow: 2
};

let pockets = {
  __proto__ : bed,
  money: 2000
};

// console.log(pockets.pen);
// console.log(bed.glasses);

let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  stomach: [],
  __proto__: hamster
};

let lazy = {
  stomach: [],
  __proto__: hamster
};

// speedy.eat("apple");
// console.log( speedy.stomach ); // apple
// console.log( lazy.stomach ); // []


function f(a, b) {
  console.log(a + b);
}

Function.prototype.defer = function(ms) {
  let f = this;
  return function (...args) {
    setTimeout(() => f.apply(this, args), ms);
  }
};

f.defer(1000)(1, 2);