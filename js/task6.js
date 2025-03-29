document.addEventListener('DOMContentLoaded', () => {
    const vectorDisplay = document.getElementById('vectorDisplay');
    const dnfInput = document.getElementById('dnfInput');
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
        dnfInput.value = '';
        gameResult.textContent = 'Введите ДНФ для данного вектора';
        gameResult.className = 'game-result';
    }
    
    // Проверка ДНФ (упрощённая)
    function checkDNF(vector, dnf) {
        try {
            // Проверяем, что ДНФ покрывает все единицы вектора
            const requiredTerms = [];
            
            // Определяем требуемые конъюнкции
            for (let i = 0; i < 4; i++) {
                if (vector[i] === '1') {
                    const xVal = (i >> 1) & 1;
                    const yVal = i & 1;
                    requiredTerms.push(
                        (xVal ? 'x' : '¬x') + '∧' + (yVal ? 'y' : '¬y')
                    );
                }
            }
            
            // Проверяем наличие всех требуемых термов
            for (const term of requiredTerms) {
                if (!dnf.includes(term)) {
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
            const startPos = dnfInput.selectionStart;
            const endPos = dnfInput.selectionEnd;
            
            dnfInput.value = 
                dnfInput.value.substring(0, startPos) +
                symbol +
                dnfInput.value.substring(endPos);
            
            dnfInput.focus();
            dnfInput.setSelectionRange(startPos + symbol.length, startPos + symbol.length);
        });
    });
    
    // Проверка ДНФ
    checkBtn.addEventListener('click', () => {
        const dnf = dnfInput.value.trim();
        
        if (!dnf) {
            gameResult.textContent = 'Введите ДНФ!';
            gameResult.className = 'game-result wrong';
            return;
        }
        
        const isCorrect = checkDNF(currentVector, dnf);
        
        if (isCorrect) {
            gameResult.textContent = 'Правильно! Это верная ДНФ';
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