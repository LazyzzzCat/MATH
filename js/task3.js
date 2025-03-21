// const zero = [1, 1, 1, 0];
// const one = [1, 0, 1, 1];

// const arg = 1;
// const restoredFunction = [];
// const len = zero.length*2;
// const piece = len / (2**arg);
// let izero = 0;
// let ione = 0;

// while(restoredFunction.length < len){
//     for(i = izero; i < piece+izero; i++){
//         restoredFunction.push(zero[i]);
//     }
//     for(i = ione; i < piece+ione; i++){
//         restoredFunction.push(one[i]);
//     }
//     izero+=piece;
//     ione+=piece;
// }
// console.log(restoredFunction);

const zeroInput = document.getElementById('zeroInput');
const oneInput = document.getElementById('oneInput');
const argInput = document.getElementById('argInput');
const restoreButton = document.getElementById('restoreButton');
const outputField = document.getElementById('outputField');

restoreButton.addEventListener('click', () => {
    // Получаем нулевую и единичную остаточные (слитно)
    const zero = zeroInput.value.split('').map(Number);
    const one = oneInput.value.split('').map(Number);

    // Получаем номер аргумента
    const arg = parseInt(argInput.value);

    // Восстанавливаем вектор функции
    const restoredFunction = restoreFunctionVector(zero, one, arg);

    // Выводим результат
    outputField.value = restoredFunction.join('');
});

function restoreFunctionVector(zero, one, arg) {
    const restoredFunction = [];
    const len = zero.length * 2;
    const piece = len / (2 ** arg);
    let izero = 0;
    let ione = 0;

    while (restoredFunction.length < len) {
        for (let i = izero; i < piece + izero; i++) {
            restoredFunction.push(zero[i]);
        }
        for (let i = ione; i < piece + ione; i++) {
            restoredFunction.push(one[i]);
        }
        izero += piece;
        ione += piece;
    }

    return restoredFunction;
}