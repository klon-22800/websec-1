const operand1 = document.getElementById("operand1");
const operand2 = document.getElementById("operand2");
const operation = document.getElementById("operation");
const calculateBtn = document.getElementById("calculate");
const resultsDiv = document.getElementById("results");

const error1 = document.getElementById("error1");
const error2 = document.getElementById("error2");

const MAX_HISTORY = 3;

function cleanInput(e) {
    if (e.target.value.length > 1 && e.target.value.startsWith('0') && e.target.value[1] !== '.') {
        e.target.value = e.target.value.replace(/^0+/, '0');
    }
}

operand1.addEventListener('input', cleanInput);
operand2.addEventListener('input', cleanInput);

function validateInput(input, errorElement) {
    const value = input.value.trim();

    if (value === "") {
        errorElement.textContent = "Поле не должно быть пустым";
        input.classList.add("error");
        return false;
    }

    if (isNaN(value)) {
        errorElement.textContent = "Введите корректное число";
        input.classList.add("error");
        return false;
    }

    errorElement.textContent = "";
    input.classList.remove("error");
    return true;
}

function calculate() {
    const isValid1 = validateInput(operand1, error1);
    const isValid2 = validateInput(operand2, error2);

    if (!isValid1 || !isValid2) return;

    const num1 = parseFloat(operand1.value);
    const num2 = parseFloat(operand2.value);
    const op = operation.value;

    if (op === "/" && num2 === 0) {
        error2.textContent = "Деление на ноль запрещено";
        operand2.classList.add("error");
        return;
    }

    let result;

    switch (op) {
        case "+": result = num1 + num2; break;
        case "-": result = num1 - num2; break;
        case "*": result = num1 * num2; break;
        case "/": result = num1 / num2; break;
    }

    const expression = `${num1} ${op} ${num2} = ${result}`;

    const div = document.createElement("div");
    div.textContent = expression;
    div.classList.add("current-result");

    const oldCurrent = resultsDiv.querySelector(".current-result");
    if (oldCurrent) {
        oldCurrent.classList.remove("current-result");
        oldCurrent.classList.add("history-item");
    }

    resultsDiv.prepend(div);

    while (resultsDiv.children.length > MAX_HISTORY) {
        resultsDiv.removeChild(resultsDiv.lastElementChild);
    }
}

calculateBtn.addEventListener("click", calculate);