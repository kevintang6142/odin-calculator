const display = document.querySelector("#display");
const clear = document.querySelector("#clear");
const squareRoot = document.querySelector("#square-root");
const percent = document.querySelector("#percent");
const add = document.querySelector("#add");
const subtract = document.querySelector("#subtract");
const multiply = document.querySelector("#multiply");
const divide = document.querySelector("#divide");
const digits = []
for (let i = 0; i <= 9; i++) {
    digits.push(document.querySelector(`[id='${i}']`));
}
const decimal = document.querySelector("#decimal");
const equals = document.querySelector("#equals");

let operation = null;
let memoryNumber = "0";
let displayNumber = "0";

digits.forEach(digit => 
    digit.addEventListener("click", e => updateDisplayNumber(e.target.id))
);
decimal.addEventListener("click", e => updateDisplayNumber("."));

function updateDisplayNumber(userInput) {
    if (displayNumber.length === 10) return;
    if (displayNumber.includes(".") && userInput === ".") return;   
    if (displayNumber === "0" && userInput === "0") return;
    displayNumber !== "0" ? displayNumber = displayNumber + userInput : displayNumber = userInput;
    display.innerText = displayNumber;
}