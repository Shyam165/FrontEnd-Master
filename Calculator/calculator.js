let runningTotal = 0;
let buffer = "0";
let previousOperator = null;
const screen = document.querySelector(".screen");

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

function handleNumber(value) {
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
}

function handleMath(value) {
  if (buffer === "0") {
    // nothing to operate on
    return;
  }

  const floatBuffer = parseFloat(buffer);
  if (runningTotal === 0 && previousOperator === null) {
    runningTotal = floatBuffer;
  } else {
    flushOperation(floatBuffer);
  }

  previousOperator = value;
  buffer = "0";
}

function flushOperation(floatBuffer) {
  if (previousOperator === "+") {
    runningTotal += floatBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= floatBuffer;
  } else if (previousOperator === "×" || previousOperator === "*") {
    runningTotal *= floatBuffer;
  } else if (previousOperator === "÷" || previousOperator === "/") {
    // guard division by zero
    if (floatBuffer === 0) {
      runningTotal = NaN; // or handle as you prefer (show error)
    } else {
      runningTotal /= floatBuffer;
    }
  }
}

function handleSymbol(value) {
  switch (value) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      previousOperator = null;
      break;
    case "=":
      // need a previous operator and a number in buffer to compute
      if (!previousOperator) return;
      flushOperation(parseFloat(buffer));
      previousOperator = null;
      buffer = String(runningTotal);
      runningTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "+":
    case "-":
    case "×":
    case "÷":
    case "*":
    case "/":
      handleMath(value);
      break;
  }
}

function rerender() {
  screen.innerText = buffer;
}

function init() {
  document.querySelector(".calc-buttons").addEventListener("click", function (event) {
    // make sure we get the clicked button (works if buttons contain spans/icons)
    const btn = event.target.closest("button");
    if (!btn) return;
    const val = btn.innerText.trim();
    buttonClick(val);
  });
}

init();
