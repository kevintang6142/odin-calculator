const display = document.querySelector("#display");
const clear = document.querySelector("#clear");
const squareRoot = document.querySelector("#square-root");
const operations = [
    document.querySelector("#add"), 
    document.querySelector("#subtract"), 
    document.querySelector("#multiply"),
    document.querySelector("#divide")
]
const percent = document.querySelector("#percent");
const digits = []
for (let i = 0; i <= 9; i++) {
    digits.push(document.querySelector(`[id='${i}']`));
}
const decimal = document.querySelector("#decimal");
const equals = document.querySelector("#equals");

resetCalculator();

clear.addEventListener("click", resetCalculator);
squareRoot.addEventListener("click", e => {
    let result = (+display.innerText) ** 0.5;
    if (result < 0.00000001) {
        result = "0";
    }
    else {
        result = result.toString();
        result = result.includes("e") ? toDecimal(result) : (+result.slice(0, 10)).toString();
    }
    display.innerText = result;
    switch (calculatorState) {
        case 1:
        case 3:
            firstNumber = result;
            break;
        case 2:
            secondNumber = result;
            break;
    }
});
operations.forEach(operation => operation.addEventListener("click", e => {
    if (calculatorState === 2 && secondNumber !== null) calculate();
    calculatorState = 2;
    secondNumber = null;
    currentOperation = operation.id;
    operations.forEach(operation => operation.style = "");
    operation.style.backgroundColor = "#ff8e2c";
}));
digits.forEach(digit => digit.addEventListener("click", e => updateNumber(e.target.id)));
decimal.addEventListener("click", e => updateNumber("."));
equals.addEventListener("click", e => {
    calculate();
    calculatorState = 3;
});
percent.addEventListener("click", calculatePercent);

function updateNumber(userInput) {
    if (calculatorState === 3) {
        firstNumber = null;
        calculatorState = 1;
    }
    if (calculatorState === 1){
        if (firstNumber === null) firstNumber = "0";
        if (firstNumber.length === 10) return;
        if (firstNumber.includes(".") && userInput === ".") return;
        firstNumber !== "0" || userInput === "." ? firstNumber = firstNumber + userInput : firstNumber = userInput;
        display.innerText = firstNumber;
    }
    else if (calculatorState == 2) {
        if (secondNumber === null) secondNumber = "0";
        if (secondNumber.length === 10) return;
        if (secondNumber.includes(".") && userInput === ".") return;
        secondNumber !== "0" || userInput === "." ? secondNumber = secondNumber + userInput : secondNumber = userInput;
        display.innerText = secondNumber;
    }
}

function calculate() {
    let result;
    switch (currentOperation) {
        case "add":
            result = secondNumber !== null ? +firstNumber + +secondNumber : Math.abs(+firstNumber);
            break;
        case "subtract":
            result = secondNumber !== null ? +firstNumber - +secondNumber : -Math.abs(+firstNumber);
            break;
        case "multiply":
            if (secondNumber !== null) {
                result = +firstNumber * +secondNumber
            }
            else {
                result = firstNumber ** 2; 
                secondNumber = firstNumber;
            }
            break;
        case "divide":
            result = secondNumber !== null ? +firstNumber / +secondNumber : 1 / +firstNumber;
            break;
        default:
            result = +firstNumber;
            break;
    }
    if (result > -0.0000001 && result < 0.00000001) {
        firstNumber = "0";
    }
    else if (result < -999999999 || result > 9999999999) {
        firstNumber = "NaN";
    }
    else {
        result = result.toString();
        firstNumber = result.includes("e") ? toDecimal(result) : (+result.slice(0, 10)).toString();
    }
    display.innerText = firstNumber;
}

function calculatePercent() {
    let result;
    switch (currentOperation) {
        case "add":
            result = secondNumber !== null ? +firstNumber * (1 + +secondNumber / 100) : +firstNumber;
            break;
        case "subtract":
            result = secondNumber !== null ? +firstNumber * (1 - +secondNumber / 100) : +firstNumber;
            break;
        case "multiply":
            result = secondNumber !== null ? +firstNumber * +secondNumber / 100 : +firstNumber / 100;
            break;
        case "divide":
            result = secondNumber !== null ? +firstNumber / +secondNumber * 100: 1 / firstNumber * 100;
            break;
        default:
            result = +firstNumber / 100;
            break;
    }
    if (result > -0.0000001 && result < 0.00000001) {
        firstNumber = "0";
    }
    else if (result < -999999999 || result > 9999999999) {
        firstNumber = "NaN";
    }
    else {
        result = result.toString();
        firstNumber = result.includes("e") ? toDecimal(result) : (+result.slice(0, 10)).toString();
    }
    display.innerText = firstNumber;
    calculatorState = 3;
}

function resetCalculator() {
    display.innerText = "0";
    operations.forEach(operation => operation.style = "");
    currentOperation = null;
    firstNumber = null;
    secondNumber = null;
    calculatorState = 3;
}

function toDecimal(number) {
    if (number.startsWith("-")) {
        return "-0.000000" + number[1];
    }
    else {
        if (number.length === 4) {
            if (number.at(-1) === "7") {
                return "0.000000" + number[0];
            }
            else {
                return "0.0000000" + number[0];
            }
        }
        else {
            if (number.at(-1) === "7") {
                return "0.000000" + number[0] + number[2];
            }
            else {
                return "0.0000000" + number[0];
            }
        }
    }
}