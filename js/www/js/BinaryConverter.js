"use strict";

console.log(`        Binary Converter
Donde los '0' y '1' se convierten en números.`);

function binaryConverter(str){
    let binary=[...str];
    let acum=0;
    let j=0;
for (let i = binary.length -1; i >= 0; i--, j++) {
  if (binary[i]==1){
      binary[i] = 2**j;
      acum+=2**j;
  }
}
return acum;
}

console.log(binaryConverter('10011'));