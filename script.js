const screen = document.querySelector('.calculator-screen');
const keys = document.querySelectorAll(".calculator-keys>button");

let numbers = [];
let operators = [];
let functions = [];
let buffer = [];
let resultArray = [];
let currentValue = "";

// Iterujemy przez wszystkie przyciski kalkulatora
keys.forEach((key) => {
    if(key.classList.contains('operator')) { // Obsługa operatorów (+, -, *, /)
        operators.push(key);
        const op = key.value;
        switch(op) {
            case '+':
            case '-':
            case '*':
            case '/':
                key.addEventListener('click', () => {
                    if (currentValue !== "") {
                        buffer.push(parseFloat(currentValue.replace(',', '.'))); // Zapisujemy liczbę do bufora
                        buffer.push(op); // Dodajemy operator
                        currentValue = ""; // Resetujemy bieżącą wartość
                        screen.innerText = "";
                    }
                });
                break;
        }
    } else if(key.classList.contains('decimal')) { // Obsługa kropki dziesiętnej
        key.addEventListener('click', () => {
            if (!currentValue.includes(',')) {
                updateScreen(key.value); // Dodajemy kropkę do ekranu
            }
        });
    } else if(key.classList.contains('all-clear')) { // Obsługa przycisku "C"
        key.addEventListener('click', () => {
            resetScreen(); // Resetujemy ekran i bufor
            buffer = [];
        });
    } else if(key.classList.contains('equal-sign')) { // Obsługa "="
        key.addEventListener('click', () => {
            computeNew(); // Obliczamy wynik
            resultArray = [];
        });
    } else { // Obsługa cyfr
        key.addEventListener('click', () => {
            updateScreen(key.value); // Dodajemy cyfrę do ekranu
        });
    }
});

// Funkcja do aktualizacji ekranu
function updateScreen(value) {
    screen.innerText += value;
    currentValue += value;
}

// Funkcja resetująca ekran
function resetScreen() {
    screen.innerText = "";
    currentValue = "";
}

// Funkcja obliczająca wynik
function computeNew() {
    if (buffer.length >= 2 && currentValue !== "") {
        buffer.push(parseFloat(currentValue.replace(',', '.'))); // Dodajemy ostatnią liczbę do bufora
        let outcome = buffer[0]; // Rozpoczynamy od pierwszej liczby w buforze
        for (let i = 1; i < buffer.length; i++) {
            const operator = buffer[i]; // Operator
            const nextNum = buffer[i + 1]; // Następna liczba
            if (typeof nextNum === 'number') {
                switch (operator) {
                    case '+':
                        outcome += nextNum;
                        break;
                    case '-':
                        outcome -= nextNum;
                        break;
                    case '*':
                        outcome *= nextNum;
                        break;
                    case '/':
                        outcome /= nextNum;
                        break;
                    default:
                        break;
                }
            }
            i++; // Przesuwamy wskaźnik, żeby pominąć liczbę, którą już obliczyliśmy
        }
        screen.innerText = outcome.toString().replace('.', ','); // Wyświetlamy wynik
        buffer = [outcome]; // Zastępujemy bufor wynikiem
        currentValue = outcome.toString().replace('.', ','); // Ustawiamy wynik jako bieżącą wartość
    }
}
