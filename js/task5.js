// Получаем элементы DOM
const functionVectorInput = document.getElementById('functionVector');
const variableCheckboxes = document.getElementById('variableCheckboxes');
const checkButton = document.getElementById('checkButton');
const resultText = document.getElementById('result');

// Обработчик ввода вектора функции
functionVectorInput.addEventListener('input', () => {
    const vector = functionVectorInput.value;
    const n = Math.log2(vector.length); // Количество переменных

    // Очищаем чекбоксы
    variableCheckboxes.innerHTML = '';

    // Создаём чекбоксы для каждой переменной
    for (let i = 0; i < n; i++) {
        const label = document.createElement('label');
        label.innerHTML = `<input type="checkbox" id="var${i + 1}"> Переменная ${i + 1}`;
        variableCheckboxes.appendChild(label);
    }
});

// Обработчик нажатия кнопки "Проверить"
checkButton.addEventListener('click', () => {
    const vector = functionVectorInput.value;
    const n = Math.log2(vector.length);

    // Собираем выбранные переменные
    const essentialVariables = [];
    for (let i = 0; i < n; i++) {
        const checkbox = document.getElementById(`var${i + 1}`);
        if (checkbox.checked) {
            essentialVariables.push(i + 1);
        }
    }

    // Проверяем, правильно ли выбраны переменные
    const isCorrect = checkEssentialVariables(vector, essentialVariables);

    // Выводим результат
    if (isCorrect) {
        resultText.textContent = "Правильно!";
    } else {
        resultText.textContent = "Неправильно!";
    }
});

// Функция для проверки существенных переменных
function checkEssentialVariables(vector, essentialVariables) {
    const n = Math.log2(vector.length);

    // Проверяем, что все переменные, не выбранные как существенные, действительно фиктивные
    for (let i = 0; i < n; i++) {
        if (!essentialVariables.includes(i + 1)) {
            // Проверяем, что переменная фиктивная
            if (!isVariableFictitious(vector, i)) {
                return false;
            }
        }
    }

    return true;
}

// Функция для проверки, является ли переменная фиктивной
function isVariableFictitious(vector, variableIndex) {
    const step = 2 ** variableIndex;
    for (let i = 0; i < vector.length; i += 2 * step) {
        for (let j = 0; j < step; j++) {
            if (vector[i + j] !== vector[i + j + step]) {
                return false;
            }
        }
    }
    return true;
}