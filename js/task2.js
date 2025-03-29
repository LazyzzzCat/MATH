// let f = [0, 1, 0, 1, 1, 0, 1, 0];
// let index = 0;
// let znArg = 1;

// let result = [];
// let len = f.length / 2;
// let piece = len / (2 ** index);
// let fi = piece * znArg;
// let fpiece = piece+fi;

// console.log(len + " " + piece + " " + fi + " " + fpiece);

// while (result.length < len) {
    
//     for (let i = fi; i < fpiece; i++) {
//         result.push(f[i]);
//     }
//     fi+=(piece*2);
//     fpiece+=(piece*2);
// }
// console.log(result);

document.addEventListener('DOMContentLoaded', () => {
    // Элементы
    const vectorInput = document.getElementById('vectorInput');
    const argButtons = document.querySelectorAll('.arg-btn');
    const valButtons = document.querySelectorAll('.val-btn');
    const calcButton = document.getElementById('calcButton');
    const outputField = document.getElementById('outputField');

    // Выбранные значения
    let selectedArg = 0;
    let selectedVal = 0;

    // Обработчики кнопок аргументов
    argButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            argButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedArg = parseInt(btn.dataset.arg);
        });
    });

    // Обработчики кнопок значений
    valButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            valButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedVal = parseInt(btn.dataset.val);
        });
    });

    // Основная функция
    calcButton.addEventListener('click', () => {
        try {
            const vector = vectorInput.value.split('').map(Number);
            
            // Проверки
            if (vector.length === 0) throw new Error("Введите вектор!");
            if (![2,4,8,16].includes(vector.length)) 
                throw new Error("Длина вектора должна быть 2,4,8 или 16");
            if (vector.some(v => v !== 0 && v !== 1)) 
                throw new Error("Только 0 и 1!");

            // Вычисление
            const residual = calculateResidual(vector, selectedArg, selectedVal);
            outputField.textContent = residual.join('');
            
        } catch (error) {
            outputField.textContent = `Ошибка: ${error.message}`;
            outputField.style.color = "#FF0000";
        }
    });

    // Твой алгоритм
    function calculateResidual(f, index, znArg) {
        const result = [];
        const len = f.length / 2;
        const piece = len / (2 ** index);
        let fi = piece * znArg;
        let fpiece = piece + fi;

        while (result.length < len) {
            for (let i = fi; i < fpiece; i++) {
                result.push(f[i]);
            }
            fi += (piece * 2);
            fpiece += (piece * 2);
        }
        return result;
    }
});