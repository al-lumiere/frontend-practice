/**
 * Task: Uncontrolled Input
 *
 * Requirements:
 * - Create an input field
 * - Display the typed text below (if it can be)
 * - Add a reset button to clear the input
 * - Limit input length to 10 characters
 *
 * Questions to think about:
 * - Why is this a uncontrolled input?
 *   This is uncontrolled input, because we store data using DOM and take it by hook useRef.
 * - Why we don't see <p>{inputRef.current?.value}</p> ?
 *   Cause ref does not trigger a React re-render.
 * - When would uncontrolled input be better?
 *   It's better to use uncontrolled input for simple forms and when you need to get result after submiting.
 */

import { useRef } from "react";

export function UncontrolledInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleReset = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <>
      <input type="text" maxLength={10} ref={inputRef} />
      <button type="button" onClick={handleReset}>
        Reset
      </button>
    </>
  );
}
