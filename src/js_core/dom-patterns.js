"use strict";

/**
 * DOM UI Patterns Practice
 *
 * Topics:
 * - overlay click
 * - modal window
 * - todo list
 * - tabs
 * - accordion
 */

// =====================================================
// 1. Where is the click: overlay vs modal
// =====================================================

/*
HTML:

<div id="overlay">
  <div id="modal">content</div>
</div>
*/

const overlayClickArea = document.getElementById("overlay");
const modalContent = document.getElementById("modal");

overlayClickArea.addEventListener("click", (event) => {
  const insideModal = modalContent.contains(event.target);

  if (!insideModal) {
    console.log("overlay click");
  }
});

// =====================================================
// 2. Modal window
// =====================================================

/*
HTML:

<button id="open">Open modal</button>

<div id="overlay" hidden>
  <div id="modal">
    <button id="close">X</button>

    <h2>Modal title</h2>

    <p>Some content here</p>

    <input placeholder="Type something..." />
  </div>
</div>
*/

const openButton = document.getElementById("open");
const modalOverlay = document.getElementById("overlay");
const closeButton = document.getElementById("close");

function openModal() {
  modalOverlay.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modalOverlay.hidden = true;
  document.body.style.overflow = "";
}

openButton.addEventListener("click", () => {
  openModal();
});

modalOverlay.addEventListener("click", (event) => {
  if (event.target === closeButton || event.target === modalOverlay) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modalOverlay.hidden) {
    closeModal();
  }
});

// =====================================================
// 3. Todo list
// =====================================================

/*
HTML:

<input id="input" />
<button id="add">Add</button>

<ul id="list"></ul>
*/

const input = document.getElementById("input");
const addButton = document.getElementById("add");
const todoList = document.getElementById("list");

addButton.addEventListener("click", () => {
  const value = input.value.trim();

  if (value.length === 0) {
    return;
  }

  const item = document.createElement("li");

  item.innerHTML = `
    <p>${value}</p>
    <button type="button">Delete</button>
  `;

  todoList.append(item);
  input.value = "";
});

todoList.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const item = event.target.closest("li");

    if (!item) {
      return;
    }

    item.remove();
  }
});

// =====================================================
// 4. Tabs
// =====================================================

/*
HTML:

<div id="tabs">
  <button data-tab="about">About</button>
  <button data-tab="projects">Projects</button>
  <button data-tab="contacts">Contacts</button>
</div>

<div id="content"></div>
*/

const tabs = document.getElementById("tabs");
const content = document.getElementById("content");

tabs.addEventListener("click", (event) => {
  const tab = event.target.closest("button");

  if (!tab) {
    return;
  }

  const activeTab = tabs.querySelector(".active");

  if (activeTab) {
    activeTab.classList.remove("active");
  }

  tab.classList.add("active");

  content.textContent = tab.dataset.tab;
});

// =====================================================
// 5. Accordion
// =====================================================

/*
HTML:

<div class="item">
  <button>Section 1</button>
  <p hidden>Text 1</p>
</div>

<div class="item">
  <button>Section 2</button>
  <p hidden>Text 2</p>
</div>
*/

const accordionItems = document.querySelectorAll(".item");

accordionItems.forEach((item) => {
  const button = item.querySelector("button");
  const text = item.querySelector("p");

  button.addEventListener("click", () => {
    accordionItems.forEach((otherItem) => {
      const otherText = otherItem.querySelector("p");

      if (otherItem !== item) {
        otherText.hidden = true;
        otherItem.classList.remove("active");
      }
    });

    text.hidden = !text.hidden;
    item.classList.toggle("active", !text.hidden);
  });
});