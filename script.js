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
    if (Math.abs(result) < 0.00000001) {
        result = "0";
    }
    else {
        result = result.toString().slice(0, 10);
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
    if (Math.abs(result) < 0.00000001) {
        firstNumber = "0";
    }
    else if (Math.abs(result) > 9999999999) {
        firstNumber = "NaN";
    }
    else {
        firstNumber = result.toString().slice(0, 10);
    }
    display.innerText = +firstNumber;
}

function resetCalculator() {
    display.innerText = "0";
    operations.forEach(operation => operation.style = "");
    currentOperation = null;
    firstNumber = null;
    secondNumber = null;
    calculatorState = 1;
}