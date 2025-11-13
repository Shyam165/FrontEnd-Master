// Keeps track of the total result of all previous operations
let runningTotal = 0;

// The current number being entered by the user (as text)
let buffer = "0";

// The last operator that was pressed (+, -, ×, ÷, etc.)
let previousOperator = null;

// Selecting the screen element from the DOM (where results are displayed)
const screen = document.querySelector(".screen");

// ------------------- MAIN CLICK HANDLER -------------------
function buttonClick(value) {
  // Check if the clicked button is a number or a symbol/operator
  if (isNaN(parseInt(value))) {
    // If not a number → handle as symbol (like +, -, =, C, ←)
    handleSymbol(value);
  } else {
    // If it's a number → append to current buffer
    handleNumber(value);
  }
  // Update the calculator display after each click
  rerender();
}

// ------------------- HANDLE NUMBERS -------------------
function handleNumber(value) {
  // If buffer currently has "0", replace it with the new number
  if (buffer === "0") {
    buffer = value;
  } else {
    // Otherwise, append the new number to the existing one
    buffer += value;
  }
}

// ------------------- HANDLE OPERATORS -------------------
function handleMath(value) {
  // Prevent operation if buffer is still "0" (nothing to calculate yet)
  if (buffer === "0") {
    return;
  }

  // Convert current buffer (string) into a number for calculations
  const floatBuffer = parseFloat(buffer);

  // If this is the first operation, store the buffer as the running total
  if (runningTotal === 0 && previousOperator === null) {
    runningTotal = floatBuffer;
  } else {
    // Otherwise, perform the pending operation first
    flushOperation(floatBuffer);
  }

  // Save the operator for the next operation
  previousOperator = value;

  // Reset the buffer for the next number input
  buffer = "0";
}

// ------------------- PERFORM CALCULATIONS -------------------
function flushOperation(floatBuffer) {
  // Based on the previous operator, perform the correct math
  if (previousOperator === "+") {
    runningTotal += floatBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= floatBuffer;
  } else if (previousOperator === "×" || previousOperator === "*") {
    runningTotal *= floatBuffer;
  } else if (previousOperator === "÷" || previousOperator === "/") {
    // Prevent division by zero
    if (floatBuffer === 0) {
      runningTotal = NaN; // NaN = "Not a Number" (error case)
    } else {
      runningTotal /= floatBuffer;
    }
  }
}

// ------------------- HANDLE SYMBOLS / SPECIAL BUTTONS -------------------
function handleSymbol(value) {
  switch (value) {
    // Clear button → resets everything
    case "C":
      buffer = "0";
      runningTotal = 0;
      previousOperator = null;
      break;

    // Equals button → performs the final calculation
    case "=":
      // If there's no operator stored, do nothing
      if (!previousOperator) return;

      // Perform the pending operation
      flushOperation(parseFloat(buffer));

      // Clear operator so further clicks don’t chain incorrectly
      previousOperator = null;

      // Display the result on screen (convert number → string)
      buffer = String(runningTotal);

      // Reset total for next calculation
      runningTotal = 0;
      break;

    // Backspace button → removes last entered digit
    case "←":
      // If only one digit remains, reset to "0"
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        // Otherwise, remove last character
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;

    // Mathematical operators (+, -, ×, ÷)
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

// ------------------- UPDATE THE SCREEN DISPLAY -------------------
function rerender() {
  // Show the current buffer value on the calculator screen
  screen.innerText = buffer;
}

// ------------------- INITIALIZE CALCULATOR -------------------
function init() {
  // Attach a single click event listener to the entire button area
  // (Event delegation: handles all button clicks in one place)
  document.querySelector(".calc-buttons").addEventListener("click", function (event) {
    // Make sure we’re getting a button element (ignores clicks on empty space)
    const btn = event.target.closest("button");
    if (!btn) return;

    // Extract the text value from the button (e.g., "5", "+", "=")
    const val = btn.innerText.trim();

    // Process the button click
    buttonClick(val);
  });
}

// Call init() when the script loads
init();
