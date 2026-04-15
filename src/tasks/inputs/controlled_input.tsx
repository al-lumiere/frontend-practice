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
 *   This is controlled input, because we store the state using React and hook useState. We can control every input and validate the value immediately.
 * - What happens if we remove `value`?
 *   If we remove value the input will uncontrolled. It still will update in onChange, but using value from DOM, not from React state.
 * - When would uncontrolled input be better?
 *   When we build simple forms and validate data after submitting.
 */

import { useState } from "react";

export function ControlledInput() {
  let initialValue = "";
  const [value, setValue] = useState(initialValue);

  const handleReset = () => {
    setValue(initialValue);
  };

  return (
    <>
      <input
        type="text"
        maxLength={10}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="button" onClick={handleReset}>
        Reset
      </button>
      <p>{value}</p>
    </>
  );
}
