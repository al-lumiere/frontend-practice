// @ts-nocheck

/**
 * Type Coercion Notes
 *
 * This file contains solved examples and key rules
 * for JavaScript type coercion.
 *
 * Main idea:
 * - "+" can mean string concatenation or numeric addition
 * - "-", "*", "/" convert values to numbers
 * - arrays are converted via toString()
 * - objects may behave differently if "{}" is at the beginning of an expression
 */

// =========================
// Solved examples
// =========================

console.log("" + 1 + 0); // "10"
console.log("" - 1 + 0); // -1
console.log(true + false); // 1
console.log(6 / "3"); // 2
console.log("2" * "3"); // 6
console.log(4 + 5 + "px"); // "9px"
console.log("$" + 4 + 5); // "$45"
console.log("4" - 2); // 2
console.log("4px" - 2); // NaN
console.log(null == undefined); // true
console.log(null === undefined); // false
console.log(null + 1); // 1
console.log(undefined + 1); // NaN
console.log([] + null + 1); // "null1"
console.log([1] + false); // "1false"
console.log([1] - false); // 1
console.log([] == false); // true
console.log([] === false); // false
console.log([0] == false); // true
console.log([0] === false); // false
console.log({} + []); // 0 в консоли / "[object Object]" как выражение
console.log([] + {}); // "[object Object]"
console.log({} + []); // "[object Object]"
console.log(({} + {})); // "[object Object][object Object]"
console.log([] + [] + 1); // "1"
console.log([] - [] + 1); // 1
console.log([1, 2] + [3, 4]); // "1,23,4"
console.log([1] + [2] + [3]); // "123"
console.log([1] - [2]); // -1
console.log([2] * [3]); // 6
console.log([10] / [2]); // 5
console.log("" == 0); // true
console.log("" === 0); // false
console.log(" \t\n" == 0); // true
console.log(false == "0"); // true
console.log(false == 0); // true
console.log(false === 0); // false
console.log(null == 0); // false
console.log(null >= 0); // true
console.log("5" + 3 - 2); // 51
console.log("5" - 3 + 2); // 4
console.log(true + true + "1"); // "21"
console.log("1" + true + true); // "1truetrue"
console.log(null + null); // 0
console.log(undefined + undefined); // NaN
console.log([] == 0); // true
console.log([1] == 1); // true
console.log([1, 2] == "1,2"); // true
console.log(null > 0); // false

// =========================
// Key rules
// =========================

/**
 * 1. "+" is special:
 *    - if at least one operand becomes a string, it concatenates
 *    - otherwise it performs numeric addition
 *
 * 2. "-", "*", "/" always try to convert operands to numbers
 *
 * 3. Array to primitive:
 *    [] -> ""
 *    [1] -> "1"
 *    [1,2] -> "1,2"
 *
 * 4. Boolean to number:
 *    true -> 1
 *    false -> 0
 *
 * 5. Special values in numeric context:
 *    null -> 0
 *    undefined -> NaN
 *
 * 6. Equality traps:
 *    null == undefined -> true
 *    null == 0 -> false
 *    null >= 0 -> true
 *
 * 7. "{}" at the beginning of an expression
 *    can be parsed as a block, not as an object
 */
