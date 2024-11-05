let screen = document.getElementById('clac-screen');
let screenValue = screen.textContent;
let firstValue = 0;
let prevOperator = null;
let waitForSecondValue = false;

function inputDigit(digit) {
    if (waitForSecondValue) {
        waitForSecondValue = false;
        screenValue = digit;
    } else {
        screenValue = screenValue === "0" ? digit : screenValue + digit;
    }
    updateScreenDisplay();
}

function inputDecimal() {
    if (waitForSecondValue) {
        inputDigit('0.');
    } else if (!screenValue.includes('.')) {
        screenValue = screenValue + '.';
    }
    updateScreenDisplay();
}

function toggleSign() {
    screenValue = (parseFloat(screenValue) * -1).toString();
    if (waitForSecondValue) {
        firstValue = screenValue;
    }
    updateScreenDisplay();
}

function getSquareRoot() {
    let numberValue = parseFloat(screenValue);
    if (isNaN(numberValue)) {
        screenValue = "Error"; // Handle non-numeric input gracefully
    } else {
        screenValue = Math.sqrt(numberValue).toString();
    }
    firstValue = screenValue;
    updateScreenDisplay();
}

function clearEntry() {
    screenValue = screenValue.slice(0, -1);
    if (screenValue.length === 0) {
        screenValue = "0";
    }
    updateScreenDisplay();
}

function clearAll() {
    screenValue = "0";
    firstValue = 0;
    prevOperator = null;
    updateScreenDisplay();
}

function handleOperator(currentOperator) {
    if (waitForSecondValue) {
        prevOperator = currentOperator;
        return;
    }

    firstValue = calculate(firstValue, prevOperator, parseFloat(screenValue));
    screenValue = firstValue.toString();
    prevOperator = currentOperator;
    waitForSecondValue = true;
    updateScreenDisplay();
}

function calculate(first, operator, second) {
    if (operator === '+') return first + second;
    if (operator === '-') return first - second;
    if (operator === '*') return first * second;
    if (operator === '/') return first / second;

    return second;
}

function separateScreenValueByComma() {
    let parts = screenValue.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function updateScreenDisplay() {
    screen.textContent = separateScreenValueByComma();
}
