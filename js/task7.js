document.addEventListener('DOMContentLoaded', () => {
    const vectorDisplay = document.getElementById('vectorDisplay');
    const knfInput = document.getElementById('knfInput');
    const checkBtn = document.getElementById('checkBtn');
    const nextBtn = document.getElementById('nextBtn');
    const gameResult = document.getElementById('gameResult');
    const symbolButtons = document.querySelectorAll('.symbol-btn');
    
    // Текущая функция
    let currentVector;
    
    // Генерация случайного вектора
    function generateVector() {
        let vector = '';
        for (let i = 0; i < 4; i++) {
            vector += Math.round(Math.random());
        }
        return vector;
    }
    
    // Инициализация новой игры
    function initGame() {
        currentVector = generateVector();
        vectorDisplay.textContent = currentVector;
        knfInput.value = '';
        gameResult.textContent = 'Введите КНФ для данного вектора';
        gameResult.className = 'game-result';
    }
    
    // Проверка КНФ (упрощённая)
    function checkKNF(vector, knf) {
        try {
            // Проверяем, что КНФ покрывает все нули вектора
            const requiredClauses = [];
            
            // Определяем требуемые дизъюнкции
            for (let i = 0; i < 4; i++) {
                if (vector[i] === '0') {
                    const xVal = (i >> 1) & 1;
                    const yVal = i & 1;
                    requiredClauses.push(
                        '(' + (xVal ? '¬x' : 'x') + '∨' + (yVal ? '¬y' : 'y') + ')'
                    );
                }
            }
            
            // Проверяем наличие всех требуемых дизъюнкций
            for (const clause of requiredClauses) {
                if (!knf.includes(clause)) {
                    return false;
                }
            }
            
            return true;
        } catch {
            return false;
        }
    }
    
    // Обработчики кнопок символов
    symbolButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const symbol = btn.dataset.symbol;
            const startPos = knfInput.selectionStart;
            const endPos = knfInput.selectionEnd;
            
            knfInput.value = 
                knfInput.value.substring(0, startPos) +
                symbol +
                knfInput.value.substring(endPos);
            
            knfInput.focus();
            knfInput.setSelectionRange(startPos + symbol.length, startPos + symbol.length);
        });
    });
    
    // Проверка КНФ
    checkBtn.addEventListener('click', () => {
        const knf = knfInput.value.trim();
        
        if (!knf) {
            gameResult.textContent = 'Введите КНФ!';
            gameResult.className = 'game-result wrong';
            return;
        }
        
        const isCorrect = checkKNF(currentVector, knf);
        
        if (isCorrect) {
            gameResult.textContent = 'Правильно! Это верная КНФ';
            gameResult.className = 'game-result correct';
        } else {
            gameResult.textContent = 'Неверно! Попробуйте ещё раз';
            gameResult.className = 'game-result wrong';
        }
    });
    
    // Новая функция
    nextBtn.addEventListener('click', initGame);
    
    // Начало игры
    initGame();
});