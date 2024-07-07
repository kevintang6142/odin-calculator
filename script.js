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

let operation = null;
let previousNumber = "0";
let currentNumber = "0";


digits.forEach(digit => 
    digit.addEventListener("click", e => updateDisplayNumber(e.target.id))
);
decimal.addEventListener("click", e => updateDisplayNumber("."));

function updateDisplayNumber(userInput) {
    if (currentNumber.length === 10) return;
    if (currentNumber.includes(".") && userInput === ".") return;   
    if (currentNumber === "0" && userInput === "0") return;
    currentNumber !== "0" || userInput === "." ? currentNumber = currentNumber + userInput : currentNumber = userInput;
    display.innerText = currentNumber;
}