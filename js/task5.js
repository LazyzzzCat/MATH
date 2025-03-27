// let N = 3; 
// let vector = '';
// for (let i = 0; i < 2 ** N; i++) {
//     vector += Math.round(Math.random());
// }
// console.log(vector);

// let n = Math.log2(vector.length);
// let len = vector.length;
// let ess = [];
// for(let i = 1; i <= n; i++){
//     let step = len/(2**i);
//     for(j = 0; j<len/2;j++){
//         if(vector[i] != vector[i+step]){
//             console.log("x"+i+" это существенная переменная!");
//             ess.push(i);
//             break; 
//         }
//     }
// }

// if(ess.length == 0){
//     console.log("нет существенных(");
// }
// Получаем элементы DOM
const functionVectorDisplay = document.getElementById('functionVectorDisplay');
const var1Checkbox = document.getElementById('var1');
const var2Checkbox = document.getElementById('var2');
const var3Checkbox = document.getElementById('var3');
const noneCheckbox = document.getElementById('none');
const checkButton = document.getElementById('checkButton');
const restartButton = document.getElementById('restartButton');
const resultText = document.getElementById('result');

// Генерация случайного вектора
let vector = '';
let essentialVariables = [];

function generateRandomVector() {
    vector = '';
    for (let i = 0; i < 8; i++) { // 2^3 = 8
        vector += Math.round(Math.random());
    }
    functionVectorDisplay.value = vector;
    findEssentialVariables();
}

// Поиск существенных переменных
function findEssentialVariables() {
    essentialVariables = [];
    const n = 3; // Количество переменных
    const len = vector.length;
    console.clear();
    for (let i = 1; i <= n; i++) {
        let step = len / (2 ** i);
        let isEssential = false;

        for (let j = 0; j < len / 2; j++) {
            if (vector[j] !== vector[j + step]) {
                isEssential = true;
                break;
            }
        }

        if (isEssential) {
            essentialVariables.push(i);
            console.log(i);
        }
    }

    if (essentialVariables.length === 0) {
        essentialVariables.push('none'); // Если нет существенных переменных
        console.log("no");
    }
}

// Проверка выбора пользователя
checkButton.addEventListener('click', () => {
    const userSelection = [];
    if (var1Checkbox.checked) userSelection.push(1);
    if (var2Checkbox.checked) userSelection.push(2);
    if (var3Checkbox.checked) userSelection.push(3);
    if (noneCheckbox.checked) userSelection.push('none');

    // Проверяем, что выбраны только существенные переменные
    if (arraysEqual(userSelection, essentialVariables)) {
        resultText.textContent = "Правильно! Поздравляем! 🎉";
    } else {
        resultText.textContent = "Неправильно! Попробуйте ещё раз.";
    }
});

// Кнопка для нового вектора
restartButton.addEventListener('click', () => {
    generateRandomVector();
    var1Checkbox.checked = false;
    var2Checkbox.checked = false;
    var3Checkbox.checked = false;
    noneCheckbox.checked = false;
    resultText.textContent = '';
});

// Функция для сравнения массивов
function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

// Инициализация
generateRandomVector();