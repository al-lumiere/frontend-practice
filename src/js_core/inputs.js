"use strict";

/**
 * =====================================================
 * INPUTS PRACTICE
 * =====================================================
 *
 * Topics:
 * - basic input events
 * - input.value
 * - validation
 * - string normalization
 * - forbidden words
 * - controlled input
 * - state → render pattern
 */

/* =====================================================
   1. Basic input: typing logic
===================================================== */

const input = document.getElementById("input");
const output = document.getElementById("output");

input.addEventListener("input", () => {
  const value = input.value;

  if (value.length === 0) {
    output.innerText = "Empty";
  } else if (value.length > 10) {
    output.innerText = "Too long";
  } else if (value.length < 5) {
    output.innerText = "Typing...";
  } else {
    output.innerText = value;
  }
});

/* =====================================================
   2. Live counter
===================================================== */

const counterInput = document.getElementById("counter-input");
const counterOutput = document.getElementById("counter-output");

counterInput.addEventListener("input", () => {
  const value = counterInput.value;

  counterOutput.innerHTML = `<p>Length: ${value.length}</p>`;
});

/* =====================================================
   3. Validation
===================================================== */

const validationInput = document.getElementById("validation-input");
const validationOutput = document.getElementById("validation-output");

validationInput.addEventListener("input", () => {
  const value = validationInput.value;

  if (value.length === 0) {
    validationOutput.innerText = "Empty";
  } else if (value.length < 5) {
    validationOutput.innerText = "Too short";
  } else if (value.length > 10) {
    validationOutput.innerText = "Too long";
  } else {
    validationOutput.innerText = "OK";
  }
});

/* =====================================================
   4. Trim
===================================================== */

const trimInput = document.getElementById("trim-input");
const trimOutput = document.getElementById("trim-output");

trimInput.addEventListener("input", () => {
  const value = trimInput.value.trim();

  trimOutput.innerText = value.length === 0 ? "Empty" : value;
});

/* =====================================================
   5. Uppercase check
===================================================== */

const uppercaseInput = document.getElementById("uppercase-input");
const uppercaseOutput = document.getElementById("uppercase-output");

uppercaseInput.addEventListener("input", () => {
  const value = uppercaseInput.value;

  const hasLetters = value !== value.toLowerCase();
  const isUppercase = value === value.toUpperCase();

  if (value && hasLetters && isUppercase) {
    uppercaseOutput.innerText = "UPPERCASE";
  } else {
    uppercaseOutput.innerText = value;
  }
});

/* =====================================================
   6. Forbidden word
===================================================== */

const forbiddenInput = document.getElementById("forbidden-input");
const forbiddenOutput = document.getElementById("forbidden-output");

forbiddenInput.addEventListener("input", () => {
  const value = forbiddenInput.value;

  if (value.toLowerCase().includes("admin")) {
    forbiddenOutput.innerText = "Forbidden word";
  } else {
    forbiddenOutput.innerText = value;
  }
});

/* =====================================================
   7. Controlled input
===================================================== */

const controlledInput = document.getElementById("controlled-input");
const controlledOutput = document.getElementById("controlled-output");

let controlledState = "";

controlledInput.addEventListener("input", (event) => {
  controlledState = event.target.value;
  renderControlledInput();
});

function renderControlledInput() {
  controlledInput.value = controlledState;

  controlledOutput.innerText =
    controlledState.length === 0 ? "Empty" : controlledState;
}

renderControlledInput();

/* =====================================================
   8. Controlled input with max length
===================================================== */

const limitedInput = document.getElementById("limited-input");
const limitedOutput = document.getElementById("limited-output");

let limitedState = "";

limitedInput.addEventListener("input", (event) => {
  const nextValue = event.target.value;

  if (nextValue.length <= 10) {
    limitedState = nextValue;
  }

  renderLimitedInput();
});

function renderLimitedInput() {
  limitedInput.value = limitedState;
  limitedOutput.innerText = `Length: ${limitedState.length} / 10`;
}

renderLimitedInput();

/* =====================================================
   9. Controlled auto-trim
===================================================== */

const autoTrimInput = document.getElementById("auto-trim-input");
const autoTrimOutput = document.getElementById("auto-trim-output");

let autoTrimState = "";

autoTrimInput.addEventListener("input", (event) => {
  autoTrimState = event.target.value.trimStart();
  renderAutoTrimInput();
});

function renderAutoTrimInput() {
  autoTrimInput.value = autoTrimState;
  autoTrimOutput.innerText = autoTrimState;
}

renderAutoTrimInput();

/* =====================================================
   10. Controlled only-numbers input
===================================================== */

const numbersInput = document.getElementById("numbers-input");
const numbersOutput = document.getElementById("numbers-output");

let numbersState = "";

numbersInput.addEventListener("input", (event) => {
  numbersState = event.target.value.replace(/\D/g, "");
  renderNumbersInput();
});

function renderNumbersInput() {
  numbersInput.value = numbersState;
  numbersOutput.innerText = numbersState;
}

renderNumbersInput();

/* =====================================================
   11. Controlled lowercase formatter
===================================================== */

const lowercaseInput = document.getElementById("lowercase-input");
const lowercaseOutput = document.getElementById("lowercase-output");

let lowercaseState = "";

lowercaseInput.addEventListener("input", (event) => {
  lowercaseState = event.target.value.toLowerCase();
  renderLowercaseInput();
});

function renderLowercaseInput() {
  lowercaseInput.value = lowercaseState;
  lowercaseOutput.innerText = lowercaseState;
}

renderLowercaseInput();

/* =====================================================
   12. Controlled input with double validation
===================================================== */

const doubleValidationInput = document.getElementById(
  "double-validation-input"
);
const doubleValidationOutput = document.getElementById(
  "double-validation-output"
);

let doubleValidationState = "";

doubleValidationInput.addEventListener("input", (event) => {
  const nextValue = event.target.value;
  let message = "";

  if (nextValue.toLowerCase().includes("admin")) {
    message = "Forbidden";
  } else if (nextValue.length > 10) {
    message = "Too long";
  } else {
    doubleValidationState = nextValue;
  }

  renderDoubleValidationInput(message);
});

function renderDoubleValidationInput(message = "") {
  doubleValidationInput.value = doubleValidationState;

  doubleValidationOutput.innerText =
    message.length > 0 ? message : doubleValidationState;
}

renderDoubleValidationInput();

/**
 * =====================================================
 * SUMMARY
 * =====================================================
 *
 * Uncontrolled input:
 *   input itself stores the value.
 *
 * Controlled input:
 *   JS state is the source of truth.
 *
 * Controlled input flow:
 *   event → nextValue → validation/formatting → state → render
 *
 * Useful string methods:
 *   trim()
 *   trimStart()
 *   toLowerCase()
 *   toUpperCase()
 *   includes()
 *   replace()
 */