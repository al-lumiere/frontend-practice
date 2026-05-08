"use strict";

/**
 * DOM Events Practice: Bubbling, Delegation, target/currentTarget
 *
 * Topics:
 * - event.target vs event.currentTarget
 * - event bubbling
 * - stopPropagation()
 * - event delegation
 * - closest()
 * - remove()
 * - dynamic elements
 *
 * Notes:
 * - event.target is the real element where the event started.
 * - event.currentTarget is the element where the current listener is attached.
 * - Events usually bubble from the deepest element up to its parents.
 * - Delegation means attaching one listener to a parent and handling child clicks through event.target.
 */

// =====================================================
// 1. target vs currentTarget
// =====================================================

/*
HTML:

<div id="box">
  <button id="btn">Click me</button>
</div>
*/

const box = document.getElementById("box");

box.addEventListener("click", (event) => {
  console.log(event.target.id); // "btn" if the button was clicked
  console.log(event.currentTarget.id); // "box"
});

/*
Explanation:

event.target:
  The element that was actually clicked.

event.currentTarget:
  The element where this exact listener is attached.
*/

// =====================================================
// 2. Event bubbling
// =====================================================

/*
HTML:

<div id="outer">
  <div id="inner">
    <button id="btn">Click</button>
  </div>
</div>
*/

document.getElementById("outer").addEventListener("click", () => {
  console.log("outer clicked");
});

document.getElementById("inner").addEventListener("click", () => {
  console.log("inner clicked");
});

document.getElementById("btn").addEventListener("click", () => {
  console.log("btn clicked");
});

/*
If we click the button, the output will be:

btn clicked
inner clicked
outer clicked

Because the event bubbles from the deepest element up to its parents.
*/

// =====================================================
// 3. stopPropagation()
// =====================================================

/*
HTML:

<div id="outer">
  <div id="inner">
    <button id="btn">Click</button>
  </div>
</div>
*/

document.getElementById("outer").addEventListener("click", () => {
  console.log("outer clicked");
});

document.getElementById("inner").addEventListener("click", () => {
  console.log("inner clicked");
});

document.getElementById("btn").addEventListener("click", (event) => {
  event.stopPropagation();
  console.log("btn clicked");
});

/*
If we click the button, the output will be only:

btn clicked

Because stopPropagation() stops the event from bubbling to parent elements.
*/

// =====================================================
// 4. Basic event delegation
// =====================================================

/*
HTML:

<ul id="list">
  <li>JS</li>
  <li>React</li>
  <li>CSS</li>
</ul>

<div id="output"></div>
*/

document.getElementById("list").addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    document.getElementById("output").textContent =
      event.target.textContent;
  }
});

/*
Why delegation is useful:

Instead of adding a click listener to every <li>,
we add one listener to the parent <ul>.

This also works for elements that are added later dynamically.
*/

// =====================================================
// 5. Remove items with delegation
// =====================================================

/*
HTML:

<ul id="list">
  <li>
    JS
    <button>X</button>
  </li>

  <li>
    React
    <button>X</button>
  </li>

  <li>
    CSS
    <button>X</button>
  </li>
</ul>
*/

const listForRemove = document.getElementById("list");

listForRemove.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const item = event.target.closest("li");

    if (!item) {
      return;
    }

    item.remove();
  }
});

/*
closest("li") is safer than parentElement because the button may contain
nested elements later, for example:

<button>
  <span>X</span>
</button>
*/

// =====================================================
// 6. Toggle selected item
// =====================================================

/*
HTML:

<ul id="list">
  <li>JS</li>
  <li>React</li>
  <li>CSS</li>
</ul>
*/

document.getElementById("list").addEventListener("click", (event) => {
  const item = event.target.closest("li");

  if (!item) {
    return;
  }

  item.classList.toggle("selected");
});

/*
CSS example:

.selected {
  background: black;
  color: white;
}
*/

// =====================================================
// 7. Dynamic todo list
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
    <button type="button">X</button>
  `;

  todoList.append(item);

  input.value = "";
});

todoList.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button) {
    return;
  }

  const item = button.closest("li");

  if (!item) {
    return;
  }

  item.remove();
});

/*
Important pattern:

We do not add click listeners to every new button.

Instead, we listen on the parent <ul> and check whether the click came
from a button inside a todo item.
*/

// =====================================================
// 8. Mini cheat sheet
// =====================================================

/*
event.target
  The original clicked element.

event.currentTarget
  The element where the current listener is attached.

event.stopPropagation()
  Stops bubbling.

element.closest(selector)
  Finds the nearest parent that matches the selector.

element.contains(otherElement)
  Checks whether otherElement is inside element.

element.remove()
  Removes the element from the DOM.

element.classList.add("active")
  Adds a class.

element.classList.remove("active")
  Removes a class.

element.classList.toggle("active")
  Toggles a class.

document.createElement("li")
  Creates a new DOM element.

parent.append(child)
  Adds a child element to the end of parent.
*/