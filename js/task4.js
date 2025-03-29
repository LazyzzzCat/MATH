document.addEventListener('DOMContentLoaded', () => {
    // Все возможные функции от 2 аргументов (16 штук)
    const functions = [
        { vector: '0000', name: '0 (Константа 0)', symbol: '0' },
        { vector: '0001', name: 'Конъюнкция (x·y)', symbol: 'x·y' },
        { vector: '0010', name: 'Коимпликация (x↛y)', symbol: 'x↛y' },
        { vector: '0011', name: 'x (Переменная)', symbol: 'x' },
        { vector: '0100', name: 'Обратная коимпликация (x↚y)', symbol: 'x↚y' },
        { vector: '0101', name: 'y (Переменная)', symbol: 'y' },
        { vector: '0110', name: 'Сложение (x⊕y)', symbol: 'x⊕y' },
        { vector: '0111', name: 'Дизъюнкция (x∨y)', symbol: 'x∨y' },
        { vector: '1000', name: 'Стрелка Пирса (x↓y)', symbol: 'x↓y' },
        { vector: '1001', name: 'Эквивалентность (x↔y)', symbol: 'x↔y' },
        { vector: '1010', name: 'Отрицание y (¬y)', symbol: '¬y' },
        { vector: '1011', name: 'Обратная импликация (x←y)', symbol: 'x←y' },
        { vector: '1100', name: 'Отрицание x (¬x)', symbol: '¬x' },
        { vector: '1101', name: 'Импликация (x→y)', symbol: 'x→y' },
        { vector: '1110', name: 'Штрих Шеффера (x|y)', symbol: 'x|y' },
        { vector: '1111', name: '1 (Константа 1)', symbol: '1' }
    ];

    // Элементы интерфейса
    const vectorDisplay = document.getElementById('vectorDisplay');
    const funcButtons = document.querySelectorAll('.func-btn');
    const gameResult = document.getElementById('gameResult');
    const nextBtn = document.getElementById('nextBtn');

    // Текущая функция
    let currentFunc;
    
    // Инициализация игры
    function initGame() {
        currentFunc = functions[Math.floor(Math.random() * functions.length)];
        vectorDisplay.textContent = currentFunc.vector;
        resetGame();
    }

    // Сброс состояния игры
    function resetGame() {
        gameResult.textContent = 'Выберите обозначение функции!';
        gameResult.className = 'game-result';
        funcButtons.forEach(btn => {
            btn.style.backgroundColor = '';
            btn.style.color = '';
        });
    }

    // Обработчики кнопок
    funcButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Сначала сбрасываем все стили
            resetGame();
            
            const selectedFuncIndex = parseInt(btn.dataset.func);
            const selectedFunc = functions[selectedFuncIndex];
            
            if (selectedFunc.vector === currentFunc.vector) {
                gameResult.textContent = `Правильно! Это ${currentFunc.name}`;
                gameResult.classList.add('correct');
                btn.style.backgroundColor = '#00FF00';
                btn.style.color = '#000';
            } else {
                gameResult.textContent = `Неверно! Это ${currentFunc.name}`;
                gameResult.classList.add('wrong');
                btn.style.backgroundColor = '#FF0000';
                btn.style.color = '#FFF';
            }
        });
    });

    // Кнопка "Следующая функция"
    nextBtn.addEventListener('click', initGame);

    // Начало игры
    initGame();
});