class Calculator {
  constructor(previousOperandDisplay, currentOperandDisplay) {
    this.previousOperandDisplay = previousOperandDisplay;
    this.currentOperandDisplay = currentOperandDisplay;
    this.reset();
  }

  reset() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = String(this.currentOperand).slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && String(this.currentOperand).indexOf(".") !== -1)
      return;
    this.currentOperand = String(this.currentOperand) + String(number);
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") this.compute();
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "×":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = String(number);
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandDisplay.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandDisplay.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandDisplay.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const resetButton = document.querySelector("[data-reset]");
const deleteButton = document.querySelector("[data-delete]");
const resultButton = document.querySelector("[data-result]");
const previousOperandDisplay = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandDisplay = document.querySelector("[data-current-operand]");

const calculator = new Calculator(
  previousOperandDisplay,
  currentOperandDisplay
);

numberButtons.forEach((numberButton) => {
  numberButton.addEventListener("click", () => {
    calculator.appendNumber(numberButton.innerText);
    calculator.updateDisplay();
  });
});

operatorButtons.forEach((operatorButton) => {
  operatorButton.addEventListener("click", () => {
    calculator.chooseOperation(operatorButton.innerText);
    calculator.updateDisplay();
  });
});

resetButton.addEventListener("click", () => {
  calculator.reset();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

resultButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});
