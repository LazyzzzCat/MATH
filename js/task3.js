const zero = [1, 1, 1, 0];
const one = [1, 0, 1, 1];

const arg = 3;
const restoredFunction = [];
const len = zero.length*2;
const a = len / 2**arg;  
const s = 2**(arg-1);

for(c=0;c<s;c++){
    for(i=c; i<a+c;i++){
        restoredFunction.push(zero[i]);
    }
    for(i=c; i<a+c;i++){
        restoredFunction.push(one[i]);
    }
}

console.log(restoredFunction);

