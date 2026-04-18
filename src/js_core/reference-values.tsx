/**
 * Value vs Reference Notes
 *
 * This file contains solved examples and key rules
 * for primitives, objects, arrays, mutation, reassignment,
 * shallow copy, and deep copy in JavaScript.
 *
 * Main idea:
 * - primitives are copied by value
 * - objects and arrays are assigned by reference
 * - changing a property is not the same as reassigning a variable
 */

// =========================
// Primitives
// =========================

let primitiveA = 5;
let primitiveB = primitiveA;
primitiveB = 10;

console.log(primitiveA); // 5
console.log(primitiveB); // 10

// =========================
// Objects by reference
// =========================

let objA = { x: 1 };
let objB = objA;
objB.x = 2;

console.log(objA.x); // 2
console.log(objB.x); // 2

let objC = { x: 1 };
let objD = objC;
objD = { x: 2 };

console.log(objC.x); // 1
console.log(objD.x); // 2

// =========================
// Functions and object mutation
// =========================

let objE = { x: 1 };

function mutateObject(obj: { x: number }): void {
  obj.x = 5;
}

mutateObject(objE);

console.log(objE.x); // 5

let objF = { x: 1 };

function reassignInsideFunction(obj: { x: number }): void {
  obj = { x: 5 };
}

reassignInsideFunction(objF);

console.log(objF.x); // 1

let objG = { x: 1 };

function mutateThenReassign(obj: { x: number }): void {
  obj.x = 2;
  obj = { x: 3 };
}

mutateThenReassign(objG);

console.log(objG.x); // 2

// =========================
// Equality
// =========================

let objH = { x: 1 };
let objI = { x: 1 };

console.log(objH === objI); // false

let objJ = { x: 1 };
let objK = objJ;

console.log(objJ === objK); // true

// =========================
// Arrays
// =========================

let arrA = [1, 2];
let arrB = arrA;
arrB.push(3);

console.log(arrA); // [1, 2, 3]

let arrC = [1, 2];
let arrD = arrC;
arrD = arrD.concat(3);

console.log(arrC); // [1, 2]
console.log(arrD); // [1, 2, 3]

// =========================
// Shallow copy
// =========================

let shallowA = { x: 1 };
let shallowB = { ...shallowA };

shallowB.x = 2;

console.log(shallowA.x); // 1
console.log(shallowB.x); // 2

let nestedA = { x: { y: 1 } };
let nestedB = { ...nestedA };

nestedB.x.y = 2;

console.log(nestedA.x.y); // 2

let assignedA = { x: { y: 1 } };
let assignedB = Object.assign({}, assignedA);

assignedB.x.y = 5;

console.log(assignedA.x.y); // 5

// =========================
// Deep copy
// =========================

let deepA = { x: { y: 1 } };
let deepB = JSON.parse(JSON.stringify(deepA));

deepB.x.y = 2;

console.log(deepA.x.y); // 1

// =========================
// Returning new object vs same reference
// =========================

let originalA = { x: 1 };

function returnNewObject(obj: { x: number }) {
  return { ...obj, x: 2 };
}

let newObjectResult = returnNewObject(originalA);

console.log(originalA.x); // 1
console.log(newObjectResult.x); // 2

let originalB = { x: 1 };

function returnSameReference(obj: { x: number }) {
  obj.x = 2;
  return obj;
}

let sameReferenceResult = returnSameReference(originalB);

console.log(originalB.x); // 2
console.log(sameReferenceResult.x); // 2
console.log(originalB === sameReferenceResult); // true

// =========================
// Additional solved examples
// =========================

let extraA = { x: 1 };
let extraB = extraA;
extraA = { x: 2 };

console.log(extraB.x); // 1

let extraArrA = [1, 2];
let extraArrB = extraArrA;
extraArrA.push(3);

console.log(extraArrB); // [1, 2, 3]

let assignA = { x: 1 };
let assignB = Object.assign({}, assignA);
assignB.x = 2;

console.log(assignA.x, assignB.x); // 1 2

let funcA = { x: 1 };

function mixedBehavior(obj: { x: number }) {
  obj.x = 3;
  return { x: 4 };
}

let funcB = mixedBehavior(funcA);

console.log(funcA.x, funcB.x); // 3 4

let funcC = { x: 1 };

function localReassign(obj: { x: number }) {
  obj = { x: 5 };
  return obj;
}

let funcD = localReassign(funcC);

console.log(funcC.x, funcD.x); // 1 5

const constObjA = { x: 1 };
const constObjB = constObjA;
constObjB.x = 2;

console.log(constObjA.x); // 2

const constObjC = { x: 1 };
constObjC.x = 2;

console.log(constObjC.x); // 2

// =========================
// Key rules
// =========================

/**
 * 1. Primitives are copied by value:
 *    number, string, boolean, null, undefined, symbol, bigint
 *
 * 2. Objects and arrays are assigned by reference:
 *    variables store a reference to the same object in memory
 *
 * 3. Changing a property:
 *    obj.x = 2
 *    mutates the existing object
 *
 * 4. Reassigning a variable:
 *    obj = { x: 2 }
 *    makes the variable point to a new object
 *
 * 5. In functions:
 *    JavaScript passes the value
 *    but for objects that value is a reference
 *
 * 6. Spread and Object.assign create shallow copies
 *
 * 7. Nested objects remain shared after shallow copy
 *
 * 8. const prevents reassignment of the variable,
 *    but does not make the object immutable
 */
