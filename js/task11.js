document.addEventListener('DOMContentLoaded', () => {
    // Элементы интерфейса
    const functionsDisplay = document.getElementById('functionsDisplay');
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const classesSelect = document.getElementById('classesSelect');
    const classSelect = document.getElementById('classSelect');
    const checkBtn = document.getElementById('checkBtn');
    const nextBtn = document.getElementById('nextBtn');
    const gameResult = document.getElementById('gameResult');

    // Текущий набор функций
    let currentFunctions = [];
    
    // Все возможные функции от 2 переменных
    const allFunctions = [
        { vector: '0000', name: '0' },
        { vector: '0001', name: 'x∧y' },
        { vector: '0010', name: 'x↛y' },
        { vector: '0011', name: 'x' },
        { vector: '0100', name: 'x↚y' },
        { vector: '0101', name: 'y' },
        { vector: '0110', name: 'x⊕y' },
        { vector: '0111', name: 'x∨y' },
        { vector: '1000', name: 'x↓y' },
        { vector: '1001', name: 'x↔y' },
        { vector: '1010', name: '¬y' },
        { vector: '1011', name: 'x←y' },
        { vector: '1100', name: '¬x' },
        { vector: '1101', name: 'x→y' },
        { vector: '1110', name: 'x|y' },
        { vector: '1111', name: '1' }
    ];
    
    // Проверка линейности функции (исправленная)
    function isLinear(vector) {
        const [f00, f01, f10, f11] = vector.split('').map(Number);
        const a0 = f00;
        const a1 = f00 ^ f10;
        const a2 = f00 ^ f01;
        return (f01 === (a0 ^ a2)) && 
               (f10 === (a0 ^ a1)) && 
               (f11 === (a0 ^ a1 ^ a2));
    }
    
    // Проверка монотонности
    function isMonotone(vector) {
        const [f00, f01, f10, f11] = vector.split('').map(Number);
        return f00 <= f01 && f00 <= f10 && f01 <= f11 && f10 <= f11;
    }
    
    // Проверка полноты системы (исправленная)
    function isCompleteSystem(functions) {
        // Проверяем 5 условий полноты по Посту
        const conditions = [
            // Хотя бы одна функция не сохраняет 0
            functions.some(f => f.vector[0] !== '0'),
            // Хотя бы одна функция не сохраняет 1
            functions.some(f => f.vector[3] !== '1'),
            // Хотя бы одна несамодвойственная
            functions.some(f => {
                const dual = f.vector.split('').reverse()
                              .map(b => b === '0' ? '1' : '0').join('');
                return f.vector !== dual;
            }),
            // Хотя бы одна немонотонная
            functions.some(f => !isMonotone(f.vector)),
            // Хотя бы одна нелинейная
            functions.some(f => !isLinear(f.vector))
        ];
        
        // Все условия должны выполняться
        return conditions.every(c => c);
    }
    
    // Определение класса, которому принадлежит система
    function getContainingClass(functions) {
        const classes = ['T0', 'T1', 'S', 'M', 'L'];
        for (const className of classes) {
            if (functions.every(f => {
                switch(className) {
                    case 'T0': return f.vector[0] === '0';
                    case 'T1': return f.vector[3] === '1';
                    case 'S': {
                        const dual = f.vector.split('').reverse()
                                      .map(b => b === '0' ? '1' : '0').join('');
                        return f.vector === dual;
                    }
                    case 'M': return isMonotone(f.vector);
                    case 'L': return isLinear(f.vector);
                }
            })) return className;
        }
        return null;
    }
    
    // Генерация случайного набора функций
    function generateFunctionSet() {
        const count = Math.floor(Math.random() * 3) + 2; // 2-4 функции
        const shuffled = [...allFunctions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
    
    // Отображение набора функций
    function displayFunctions(functions) {
        functionsDisplay.innerHTML = functions.map(f => 
            `<div class="function-vector">${f.name} (${f.vector})</div>`
        ).join('');
    }
    
    // Формирование пояснения
    function getExplanation(functions) {
        const reasons = [];
        if (functions.every(f => f.vector[0] === '0')) 
            reasons.push('все функции сохраняют 0 (T₀)');
        if (functions.every(f => f.vector[3] === '1')) 
            reasons.push('все функции сохраняют 1 (T₁)');
        if (functions.every(f => {
            const dual = f.vector.split('').reverse()
                          .map(b => b === '0' ? '1' : '0').join('');
            return f.vector === dual;
        })) reasons.push('все функции самодвойственные (S)');
        if (functions.every(f => isMonotone(f.vector))) 
            reasons.push('все функции монотонные (M)');
        if (functions.every(f => isLinear(f.vector))) 
            reasons.push('все функции линейные (L)');
        
        return reasons.length > 0 ? `Причина: ${reasons.join(', ')}` : '';
    }
    
    // Инициализация новой игры
    function initGame() {
        currentFunctions = generateFunctionSet();
        displayFunctions(currentFunctions);
        
        // Сброс формы
        toggleButtons[0].classList.add('active');
        toggleButtons[1].classList.remove('active');
        classesSelect.style.display = 'none';
        classSelect.value = 'T0';
        gameResult.textContent = 'Определите полноту системы функций';
        gameResult.className = 'game-result';
    }
    
    // Обработчики кнопок-переключателей
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            classesSelect.style.display = 
                btn.dataset.value === 'incomplete' ? 'block' : 'none';
        });
    });
    
    // Проверка ответа
    checkBtn.addEventListener('click', () => {
        const isComplete = document.querySelector('.toggle-btn.active').dataset.value === 'complete';
        const actualComplete = isCompleteSystem(currentFunctions);
        
        if (isComplete !== actualComplete) {
            const correctAnswer = actualComplete ? 'Полная' : 'Неполная';
            gameResult.textContent = `Неверно! Система ${correctAnswer}. ${getExplanation(currentFunctions)}`;
            gameResult.className = 'game-result wrong';
            return;
        }
        
        if (!actualComplete) {
            const selectedClass = classSelect.value;
            const actualClass = getContainingClass(currentFunctions);
            
            if (selectedClass !== actualClass) {
                gameResult.textContent = `Неверно! Система принадлежит классу ${actualClass}`;
                gameResult.className = 'game-result wrong';
                return;
            }
        }
        
        gameResult.textContent = 'Правильно!';
        gameResult.className = 'game-result correct';
    });
    
    // Новая игра
    nextBtn.addEventListener('click', initGame);
    
    // Начало игры
    initGame();
});