let vector = [0, 1, 0, 0, 1, 0, 1, 0];

let n = Math.log2(vector.length);
let len = vector.length;
let ess = [];
for(let i = 1; i <= n; i++){
    let step = len/(2**i);
    for(j = 0; j<len/2;j++){
        if(vector[i] != vector[i+step]){
            console.log("x"+i+" это сущщественная переменная!");
            ess.push(i);
            break; 
        }
    }
}

if(ess.length == 0){
    console.log("нет существенных(");
}

