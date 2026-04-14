/**
 * Task: Controlled Input
 *
 * Requirements:
 * - Create an input field
 * - Display the typed text below
 * - Add a reset button to clear the input
 * - Limit input length to 10 characters
 *
 * Questions to think about:
 * - Why is this a controlled input?
 * - What happens if we remove `value`?
 * - When would uncontrolled input be better?
*/

import { useState } from "react";

export function Task1() {
  const [value, setValue] = useState("");

  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p>You typed: {value}</p>
    </div>
  );
}