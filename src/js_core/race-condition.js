"use strict";

/**
 * =====================================================
 * RACE CONDITION PRACTICE
 * =====================================================
 *
 * Topics:
 * - debounce
 * - fetch
 * - loading state
 * - stale responses
 * - requestId / currentId
 * - race-safe rendering
 *
 * Main idea:
 * Old async requests can finish after newer requests.
 * We should render only the latest actual request.
 */

/* =====================================================
   1. Debounced search with race protection
===================================================== */

const searchInput = document.getElementById("input");
const searchOutput = document.getElementById("output");

let searchTimer;
let searchRequestId = 0;

searchInput.addEventListener("input", (event) => {
  const value = event.target.value.trim();

  clearTimeout(searchTimer);

  if (!value) {
    renderSearch("Empty");
    return;
  }

  renderSearch("Loading...");

  searchTimer = setTimeout(async () => {
    searchRequestId++;
    const currentRequestId = searchRequestId;

    try {
      const response = await fetch(`/search?q=${value}`);

      if (!response.ok) {
        throw new Error("HTTP error");
      }

      const results = await response.json();

      if (currentRequestId !== searchRequestId) {
        return;
      }

      renderSearch("", results);
    } catch (error) {
      if (currentRequestId !== searchRequestId) {
        return;
      }

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
   2. Race-safe user profile loader
===================================================== */

const annaButton = document.getElementById("anna");
const alexButton = document.getElementById("alex");
const userOutput = document.getElementById("user-output");

let userRequestId = 0;

annaButton.addEventListener("click", () => loadUser("Anna"));
alexButton.addEventListener("click", () => loadUser("Alex"));

async function loadUser(name) {
  renderUser("Loading...");

  userRequestId++;
  const currentRequestId = userRequestId;

  try {
    const response = await fetch(`/users/${name}`);

    if (!response.ok) {
      throw new Error("HTTP error");
    }

    const user = await response.json();

    if (currentRequestId !== userRequestId) {
      return;
    }

    renderUser("", user);
  } catch (error) {
    if (currentRequestId !== userRequestId) {
      return;
    }

    renderUser(error.message);
  }
}

function renderUser(message = "", user = null) {
  if (message) {
    userOutput.innerText = message;
    return;
  }

  userOutput.innerHTML = `
    <h2>${user.name}</h2>
    <p>Age: ${user.age}</p>
  `;
}

/* =====================================================
   3. Race-safe tabs
===================================================== */

const profileButton = document.getElementById("profile");
const settingsButton = document.getElementById("settings");
const pageOutput = document.getElementById("page-output");

let pageRequestId = 0;

profileButton.addEventListener("click", () => loadPage("profile"));
settingsButton.addEventListener("click", () => loadPage("settings"));

async function loadPage(page) {
  renderPage("Loading...");

  pageRequestId++;
  const currentRequestId = pageRequestId;

  try {
    const response = await fetch(`/${page}`);

    if (!response.ok) {
      throw new Error("HTTP error");
    }

    const pageData = await response.json();

    if (currentRequestId !== pageRequestId) {
      return;
    }

    renderPage("", pageData);
  } catch (error) {
    if (currentRequestId !== pageRequestId) {
      return;
    }

    renderPage(error.message);
  }
}

function renderPage(message = "", pageData = null) {
  if (message) {
    pageOutput.innerText = message;
    return;
  }

  pageOutput.innerHTML = `
    <h2>${pageData.title}</h2>
    <p>${pageData.text}</p>
  `;
}

/**
 * =====================================================
 * SUMMARY
 * =====================================================
 *
 * Race condition:
 *   Old async request finishes after a newer request
 *   and can overwrite the UI.
 *
 * Protection:
 *   requestId++;
 *   const currentRequestId = requestId;
 *
 *   after await:
 *   if (currentRequestId !== requestId) return;
 *
 * Important:
 *   Check stale request both after success and in catch.
 *
 * Pattern:
 *   event → requestId++ → fetch → stale check → render
 */