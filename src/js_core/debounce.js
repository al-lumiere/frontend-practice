"use strict";

/**
 * =====================================================
 * DEBOUNCE PRACTICE
 * =====================================================
 *
 * Topics:
 * - setTimeout
 * - clearTimeout
 * - input events
 * - early return
 * - validation before debounce
 * - controlled input + debounce
 * - debounce + fetch
 *
 * Main idea:
 * Debounce delays an action until the user stops triggering
 * the event for a specific amount of time.
 */

/* =====================================================
   1. Basic debounce
===================================================== */

const debounceInput = document.getElementById("debounce-input");
const debounceOutput = document.getElementById("debounce-output");

let debounceTimer;

debounceInput.addEventListener("input", (event) => {
  const value = event.target.value;

  debounceOutput.innerText = "Typing...";

  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    debounceOutput.innerText = `Search: ${value}`;
  }, 500);
});

/* =====================================================
   2. Debounce + empty state
===================================================== */

const emptyInput = document.getElementById("empty-input");
const emptyOutput = document.getElementById("empty-output");

let emptyTimer;

emptyInput.addEventListener("input", (event) => {
  const value = event.target.value;

  clearTimeout(emptyTimer);

  if (value.length === 0) {
    emptyOutput.innerText = "Empty";
    return;
  }

  emptyOutput.innerText = "Typing...";

  emptyTimer = setTimeout(() => {
    emptyOutput.innerText = `Search: ${value}`;
  }, 500);
});

/* =====================================================
   3. Debounce + min length validation
===================================================== */

const minLengthInput = document.getElementById("min-length-input");
const minLengthOutput = document.getElementById("min-length-output");

let minLengthTimer;

minLengthInput.addEventListener("input", (event) => {
  const value = event.target.value;

  clearTimeout(minLengthTimer);

  if (value.length === 0) {
    minLengthOutput.innerText = "Empty";
    return;
  }

  if (value.length < 3) {
    minLengthOutput.innerText = "Too short";
    return;
  }

  minLengthOutput.innerText = "Typing...";

  minLengthTimer = setTimeout(() => {
    minLengthOutput.innerText = `Search: ${value}`;
  }, 500);
});

/* =====================================================
   4. Debounce + controlled input
===================================================== */

const controlledInput = document.getElementById("controlled-input");
const controlledOutput = document.getElementById("controlled-output");

let controlledTimer;
let controlledState = "";

controlledInput.addEventListener("input", (event) => {
  const nextValue = event.target.value;

  clearTimeout(controlledTimer);

  if (nextValue.length > 10) {
    renderControlledDebounce("Too long");
    return;
  }

  controlledState = nextValue;
  renderControlledDebounce("Typing...");

  controlledTimer = setTimeout(() => {
    renderControlledDebounce();
  }, 500);
});

function renderControlledDebounce(message = "") {
  controlledInput.value = controlledState;

  if (message) {
    controlledOutput.innerText = message;
    return;
  }

  controlledOutput.innerText = `Search: ${controlledState}`;
}

/* =====================================================
   5. Debounced search with fetch
===================================================== */

const searchInput = document.getElementById("search-input");
const searchOutput = document.getElementById("search-output");

let searchTimer;

searchInput.addEventListener("input", (event) => {
  const value = event.target.value.trim();

  clearTimeout(searchTimer);

  if (value.length === 0) {
    renderSearch("Empty");
    return;
  }

  if (value.length < 3) {
    renderSearch("Too short");
    return;
  }

  renderSearch("Typing...");

  searchTimer = setTimeout(async () => {
    try {
      const response = await fetch(`/search?q=${value}`);

      if (!response.ok) {
        throw new Error("HTTP error");
      }

      const results = await response.json();

      renderSearch("", results);
    } catch (error) {
      renderSearch(error.message);
    }
  }, 500);
});

function renderSearch(message = "", results = []) {
  if (message) {
    searchOutput.innerText = message;
    return;
  }

  searchOutput.innerHTML = `
    <ul>
      ${
        results.length
          ? results.map((item) => `<li>${item.title}</li>`).join("")
          : "<li>No results</li>"
      }
    </ul>
  `;
}

/* =====================================================
   6. Debounced users search
===================================================== */

const usersInput = document.getElementById("users-input");
const usersOutput = document.getElementById("users-output");

let usersTimer;

usersInput.addEventListener("input", (event) => {
  const value = event.target.value.trim();

  clearTimeout(usersTimer);

  if (value.length === 0) {
    renderUsers("Empty");
    return;
  }

  if (value.length < 2) {
    renderUsers("Too short");
    return;
  }

  renderUsers("Searching...");

  usersTimer = setTimeout(async () => {
    try {
      const response = await fetch(`/users?search=${value}`);

      if (!response.ok) {
        throw new Error("HTTP error");
      }

      const users = await response.json();

      renderUsers("", users);
    } catch (error) {
      renderUsers(error.message);
    }
  }, 400);
});

function renderUsers(message = "", users = []) {
  if (message) {
    usersOutput.innerText = message;
    return;
  }

  usersOutput.innerHTML = `
    <ul>
      ${
        users.length
          ? users.map((user) => `<li>${user.name}</li>`).join("")
          : "<li>No users</li>"
      }
    </ul>
  `;
}

/**
 * =====================================================
 * SUMMARY
 * =====================================================
 *
 * Debounce:
 *   input event → clear old timer → create new timer
 *
 * Without clearTimeout:
 *   all timers run one by one.
 *
 * Validation:
 *   should happen before delayed expensive work.
 *
 * Fetch:
 *   should be inside setTimeout if the request is debounced.
 *
 * Controlled debounce:
 *   event → nextValue → validation → state → render → timeout
 */