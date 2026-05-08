"use strict";

/**
 * Dropdown Practice
 *
 * Topics:
 * - toggle dropdown
 * - event delegation
 * - click outside
 * - active item
 * - closest()
 * - contains()
 * - bubbling
 *
 * Notes:
 * - The dropdown opens/closes when clicking the trigger button.
 * - Clicking a menu item selects it and closes the menu.
 * - Clicking outside closes the dropdown.
 * - Event delegation is used for menu items.
 */

// =====================================================
// 1. HTML Structure
// =====================================================

/*
HTML:

<button id="trigger">Choose technology</button>

<ul id="menu" hidden>
  <li data-value="js">JavaScript</li>
  <li data-value="react">React</li>
  <li data-value="css">CSS</li>
  <li data-value="ts">TypeScript</li>
</ul>
*/

// =====================================================
// 2. Get DOM elements
// =====================================================

const trigger = document.getElementById("trigger");
const menu = document.getElementById("menu");

// =====================================================
// 3. Open / close dropdown
// =====================================================

trigger.addEventListener("click", () => {
  menu.hidden = !menu.hidden;
});

/*
menu.hidden = true
  Hides the menu.

menu.hidden = false
  Shows the menu.

!menu.hidden toggles the current state.
*/

// =====================================================
// 4. Select dropdown item
// =====================================================

menu.addEventListener("click", (event) => {
  const item = event.target.closest("li");

  // Ignore clicks outside <li>
  if (!item) {
    return;
  }

  // Find previously selected item
  const activeItem = menu.querySelector(".active");

  // Remove previous active class
  if (activeItem) {
    activeItem.classList.remove("active");
  }

  // Update button text
  trigger.textContent = item.textContent;

  // Add active class to selected item
  item.classList.add("active");

  // Close dropdown
  menu.hidden = true;
});

/*
closest("li")
  Finds the nearest parent <li>.

This is useful because the user may click:
- text
- span
- icon
inside the list item.
*/

// =====================================================
// 5. Click outside
// =====================================================

document.addEventListener("click", (event) => {
  const insideMenu = menu.contains(event.target);
  const insideButton = trigger.contains(event.target);

  // Close only if click is outside BOTH menu and button
  if (!insideMenu && !insideButton) {
    menu.hidden = true;
  }
});

/*
Why do we need both checks?

menu.contains(event.target)
  Checks whether the click happened inside dropdown menu.

trigger.contains(event.target)
  Checks whether the click happened on the trigger button.

Without trigger.contains(...),
the menu would:
1. open
2. immediately close because of bubbling
*/

// =====================================================
// 6. Example CSS
// =====================================================

/*
.active {
  background: black;
  color: white;
}
*/

// =====================================================
// 7. Event flow example
// =====================================================

/*
Click on trigger button:

1. trigger click listener runs
2. menu opens
3. event bubbles to document
4. insideButton === true
5. dropdown stays open

Click outside:

1. document listener runs
2. insideMenu === false
3. insideButton === false
4. dropdown closes
*/

// =====================================================
// 8. Mini cheat sheet
// =====================================================

/*
menu.hidden
  Show/hide element.

event.target
  Original clicked element.

closest("li")
  Finds nearest matching parent.

contains(element)
  Checks whether element is inside another element.

classList.add("active")
  Adds class.

classList.remove("active")
  Removes class.

querySelector(".active")
  Finds currently active item.

Event delegation
  One listener on parent instead of many listeners on children.
*/