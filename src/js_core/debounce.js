let inp = document.getElementById("input");
let out = document.getElementById("output");

// Debounce

let timeout

inp.addEventListener(("input"), (e) => {
  let value = e.target.value;
  out.innerText = "Typing...";

  clearTimeout(timeout);

  timeout = setTimeout(() => {
    out.innerText = `Search: ${value}`
  }, 500);
})

// Debounce + Empty

let timeout2

inp.addEventListener(("input"), (e) => {
  let value = e.target.value;

  clearTimeout(timeout2);

  if (value.length === 0) {
    out.innerText = "Empty"
    return
  }

  out.innerText = "Typing...";

  timeout2 = setTimeout(() => {
    out.innerText = `Search: ${value}`
  }, 500)
})

// Min length

let timeout3

inp.addEventListener(("input"), (e) => {
  let value = e.target.value

  clearTimeout(timeout3);

  if (value.length === 0) {
    out.innerText = "Empty"
    return
  }

  if (value.length < 3) {
    out.innerText = "Too short"
    return
  }

  out.innerText = "Typing..."

  timeout3 = setTimeout(() => {
    out.innerText = `Search: ${value}`
  }, 500)
})

// Debounce + Controlled

let timeout4
let state = ""

inp.addEventListener(("input"), (e) => {
  const nextValue = e.target.value;

  clearTimeout(timeout4);

  if (nextValue.length > 10) {
    render("Too long")
    return
  }

  state = nextValue;
  render("Typing...");

  timeout4 = setTimeout(() => {
    render();
  }, 500)
})

function render (message = "") {
  inp.value = state;

  if (message.length !== 0) {
    out.innerText = message
  } else {
    out.innerText = `Search: ${state}`
  }
}