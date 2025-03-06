const screen = document.querySelector('.calculator-screen');
// elo
// 3 2 0
const keys = document.querySelectorAll(".calculator-keys>button");

let numbers = [];
let operators = [];
let functions = [];
let buffer = [];
let resultArray = [];
let currentValue =  "";

keys.forEach((key) => {
    if(key.classList.contains('operator')) {
        operators.push(key);
        const op = key.value;
        switch(op) {
            case '+':
                key.addEventListener('click', (e) => {
                    if (currentValue !== "") {
                        buffer.push(parseFloat(currentValue.replace(',', '.')));
                        buffer.push('+');
                        currentValue = "";
                        screen.innerText = "";
                    }
                });
                break;
            case '-':
                key.addEventListener('click', (e) => {
                    if (currentValue !== "") {
                        buffer.push(parseFloat(currentValue.replace(',', '.')));
                        buffer.push('-');
                        currentValue = "";
                        screen.innerText = "";
                    }
                });
                break;
            case '*':
                key.addEventListener('click', (e) => {
                    if (currentValue !== "") {
                        buffer.push(parseFloat(currentValue.replace(',', '.')));
                        buffer.push('*');
                        currentValue = "";
                        screen.innerText = "";
                    }
                });
                break;
            case '/':
                key.addEventListener('click', (e) => {
                    if (currentValue !== "") {
                        buffer.push(parseFloat(currentValue.replace(',', '.')));
                        buffer.push('/');
                        currentValue = "";
                        screen.innerText = "";
                    }
                });
                break;
        }
    }else if(key.classList.contains('decimal')) {
        key.addEventListener('click', (e) => {
            if (!currentValue.includes(',')) {
                updateScreen(e.target.value);
            }
        });
    }else if(key.classList.contains('all-clear')) {
        functions.push(key);
        key.addEventListener('click', (e) => {
            resetScreen();
            buffer = [];
        });
    }else if(key.classList.contains('equal-sign')) {
        functions.push(key);
        key.addEventListener('click', (e) => {
            computeNew();
            resultArray = [];
        });
    }else {
        numbers.push(key);
        functions.push(key);
        key.addEventListener('click', (e) => {
            updateScreen(e.target.value);
        });
    }
});

function updateScreen(value) {
    screen.innerText += value;
    currentValue += value;
}

function resetScreen() {
    screen.innerText = "";
    currentValue = "";
}

function computeNew() {
    if (buffer.length >= 2 && currentValue !== "") {
        buffer.push(parseFloat(currentValue.replace(',', '.')));
        let outcome = buffer.reduce((acc, val, idx, arr) => {
            if (typeof val === 'number') return acc;
            let nextNum = arr[idx + 1];
            if (typeof nextNum !== 'number') return acc;
            switch (val) {
                case '+': return acc + nextNum;
                case '-': return acc - nextNum;
                case '*': return acc * nextNum;
                case '/': return acc / nextNum;
                default: return acc;
            }
        }, buffer[0]);
        screen.innerText = outcome.toString().replace('.', ',');
        buffer = [outcome];
        currentValue = outcome.toString().replace('.', ',');
    }
}
