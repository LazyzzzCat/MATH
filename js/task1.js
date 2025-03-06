const slider = document.getElementById('argSlider');
const sliderValue = document.getElementById('sliderValue');
const generateButton = document.getElementById('generateButton');
const outputField = document.getElementById('outputField');
slider.addEventListener('input', () => {
    sliderValue.textContent = slider.value;
});
generateButton.addEventListener('click', () => {
    const n = parseInt(slider.value); 
    let result = '';
    for (let i = 0; i < 2 ** n; i++) {
        result += Math.round(Math.random());
    }
    outputField.value = result;
});

// let n = 5; 
// let result = '';
// for (let i = 0; i < 2 ** n; i++) {
//     result += Math.round(Math.random());
// }
// console.log(result);