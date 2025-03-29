document.addEventListener('DOMContentLoaded', () => {
    const vectorDisplay = document.getElementById('vectorDisplay');
    const checkBtn = document.getElementById('checkBtn');
    const nextBtn = document.getElementById('nextBtn');
    const gameResult = document.getElementById('gameResult');
    const classButtons = document.querySelectorAll('.class-btn');

    let currentVector;
    const selectedClasses = {
        T0: false,
        T1: false,
        S: false,
        M: false,
        L: false
    };

    function generateVector() {
        let vector = '';
        for (let i = 0; i < 4; i++) {
            vector += Math.round(Math.random());
        }
        return vector;
    }

    function checkClasses(vector) {
        // Штрих Шеффера (NAND) и Стрелка Пирса (NOR) - особые случаи
        if (vector === '1110' || vector === '1000') {
            return {
                T0: false,
                T1: false,
                S: false,
                M: false,
                L: false
            };
        }

        return {
            T0: vector[0] === '0',
            T1: vector[3] === '1',
            S: vector === [...vector].reverse().map(b => b === '0' ? '1' : '0').join(''),
            M: isMonotone(vector),
            L: isLinear(vector)
        };
    }

    function isMonotone(vector) {
        const values = [
            parseInt(vector[0], 10),
            parseInt(vector[1], 10),
            parseInt(vector[2], 10),
            parseInt(vector[3], 10)
        ];

        return values[0] <= values[1] &&
            values[0] <= values[2] &&
            values[1] <= values[3] &&
            values[2] <= values[3];
    }

    function isLinear(vector) {
        const linearFunctions = [
            '0000', '0001', '0010', '0011',
            '0100', '0101', '0110', '0111',
            '1000', '1001', '1010', '1011',
            '1100', '1101', '1110', '1111'
        ];
        return linearFunctions.includes(vector);
    }

    function initGame() {
        currentVector = generateVector();
        vectorDisplay.textContent = currentVector;

        classButtons.forEach(btn => {
            btn.classList.remove('selected');
            selectedClasses[btn.dataset.class] = false;
        });

        gameResult.textContent = 'Выберите предполные классы для данной функции';
        gameResult.className = 'game-result';
    }

    classButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('selected');
            selectedClasses[btn.dataset.class] = btn.classList.contains('selected');
        });
    });

    checkBtn.addEventListener('click', () => {
        const correctClasses = checkClasses(currentVector);
        let allCorrect = true;
        let anySelected = false;

        for (const classKey in selectedClasses) {
            if (selectedClasses[classKey] !== correctClasses[classKey]) {
                allCorrect = false;
            }
            if (selectedClasses[classKey]) anySelected = true;
        }

        const belongsToNoClass = Object.values(correctClasses).every(val => !val);

        if (belongsToNoClass && !anySelected) {
            gameResult.textContent = 'Правильно! Функция не принадлежит ни к одному классу';
            gameResult.className = 'game-result correct';
            return;
        }

        if (allCorrect) {
            gameResult.textContent = 'Правильно! Все классы определены верно';
            gameResult.className = 'game-result correct';
        } else {
            gameResult.textContent = 'Неверно! Попробуйте ещё раз';
            gameResult.className = 'game-result wrong';
        }
    });

    nextBtn.addEventListener('click', initGame);

    initGame();
});