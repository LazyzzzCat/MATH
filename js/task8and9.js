// let vector = "01101001";

// //SDNF task 8
// function SDNF(vector) {
//   let n = Math.log2(vector.length);
//   let knf = [];
//   for (let i = 0; i < vector.length; i++) {
//     if (vector[i] == "1") {
//       let binary = i.toString(2).padStart(n, "0");
//       let clause = [];
//       for (let j = 0; j < n; j++) {
//         let letter = String.fromCharCode(65 + j);
//         if (binary[j] == "1") {
//           clause.push(letter);
//         } else {
//           clause.push(`¬` + letter);
//         }
//       }
//       knf.push(`(${clause.join("")})`);
//     }
//   }
//   console.log(knf.join("∨"));
// }

// //SKNF task 9
// function SKNF(vector) {
//   let n = Math.log2(vector.length);
//   let knf = [];
//   for (let i = 0; i < vector.length; i++) {
//     if (vector[i] == "0") {
//       let binary = i.toString(2).padStart(n, "0");
//       let clause = [];
//       for (let j = 0; j < n; j++) {
//         let letter = String.fromCharCode(65 + j);
//         if (binary[j] == "1") {
//           clause.push(`¬` + letter);
//         } else {
//           clause.push(letter);
//         }
//       }
//       knf.push(`(${clause.join("∨")})`);
//     }
//   }
//   console.log(knf.join("∧"));
// }

// SDNF(vector);
// SKNF(vector);

// Генерация вектора
const slider = document.getElementById('argSlider');
const sliderValue = document.getElementById('sliderValue');
const generateButton = document.getElementById('generateButton');
const vectorInput = document.getElementById('vectorInput');

slider.addEventListener('input', () => {
    sliderValue.textContent = slider.value;
});

generateButton.addEventListener('click', () => {
    const n = parseInt(slider.value); 
    let result = '';
    for (let i = 0; i < 2 ** n; i++) {
        result += Math.round(Math.random());
    }
    vectorInput.value = result;
});

// СДНФ
if (document.getElementById('calc')) {
    document.getElementById('calc').addEventListener('click', () => {
        const vector = vectorInput.value;
        document.getElementById('outputField').value = SDNF(vector);
    });
}

// СКНФ 
if (document.getElementById('calc')) {
    document.getElementById('calc').addEventListener('click', () => {
        const vector = vectorInput.value;
        document.getElementById('outputField').value = SKNF(vector);
    });
}


function SDNF(vector) {
    let n = Math.log2(vector.length);
    let knf = [];
    for (let i = 0; i < vector.length; i++) {
        if (vector[i] == "1") {
            let binary = i.toString(2).padStart(n, "0");
            let clause = [];
            for (let j = 0; j < n; j++) {
                let letter = String.fromCharCode(65 + j);
                if (binary[j] == "1") {
                    clause.push(letter);
                } else {
                    clause.push(`¬` + letter);
                }
            }
            knf.push(`(${clause.join("")})`);
        }
    }
    return knf.join("∨");
}

function SKNF(vector) {
    let n = Math.log2(vector.length);
    let knf = [];
    for (let i = 0; i < vector.length; i++) {
        if (vector[i] == "0") {
            let binary = i.toString(2).padStart(n, "0");
            let clause = [];
            for (let j = 0; j < n; j++) {
                let letter = String.fromCharCode(65 + j);
                if (binary[j] == "1") {
                    clause.push(`¬` + letter);
                } else {
                    clause.push(letter);
                }
            }
            knf.push(`(${clause.join("∨")})`);
        }
    }
    return knf.join("∧");
}