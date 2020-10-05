const calculator = document.querySelector(".calculator");

const keys = calculator.querySelector(".calculator__keys");
const display = calculator.querySelector(".calculator__display");

const operatorKeys = keys.querySelectorAll('[data-type="operator"]');

keys.addEventListener("click", keyListerner);

function keyListerner(e) {
  if (!e.target.closest("button")) return;

  const key = e.target;
  const displayValue = display.textContent;
  const keyValue = key.textContent;

  const { type } = key.dataset;
  const { previousKeyType } = calculator.dataset;

  if (type === "clear") {
    display.textContent = "0";
    resetState();
  }

  if (type === "number") {
    if (displayValue === "0") {
      display.textContent = keyValue;
    } else if (previousKeyType === "operator") {
      display.textContent = keyValue;
    } else if (previousKeyType === "equal") {
      display.textContent = keyValue;
    } else {
      display.textContent = displayValue + keyValue;
    }
  }

  if (type === "operator") {
    [...operatorKeys].map((key) => (key.dataset.state = ""));
    key.dataset.state = "selected";

    calculator.dataset.firstNumber = displayValue;
    calculator.dataset.operator = key.dataset.key;
  }

  if (type === "equal") {
    const firstNumber = calculator.dataset.firstNumber;
    const lastNumber = displayValue;
    const operator = calculator.dataset.operator;

    if (!firstNumber || !lastNumber || !operator) {
      return (display.textContent = "ERROR");
    }

    display.textContent = calculate(firstNumber, operator, lastNumber);
    resetState();
  }

  calculator.dataset.previousKeyType = type;
}

function calculate(firstNumber, operator, lastNumber) {
  firstNumber = parseFloat(firstNumber);
  lastNumber = parseFloat(lastNumber);

  if (operator === "plus") return firstNumber + lastNumber;
  if (operator === "minus") return firstNumber - lastNumber;
  if (operator === "times") return firstNumber * lastNumber;
  if (operator === "divide") return firstNumber / lastNumber;
}

function resetState() {
  calculator.dataset.previousKeyType = "";
  calculator.dataset.firstNumber = "";
  calculator.dataset.operator = "";
  [...operatorKeys].map((key) => (key.dataset.state = ""));
}
