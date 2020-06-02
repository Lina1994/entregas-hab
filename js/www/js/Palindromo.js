"use strict";

function PalindromeTwo (str) {
  console.log('¿Será palíndromo?')
    console.log(str);
   str = str.toLowerCase();
let palin = [...str];
let sinEspacios =[];
for (let i = 0; i < palin.length; i++) {
    if (palin[i] !== ' '){
      sinEspacios += palin[i];
    }
}
let dromo = [...sinEspacios];
let dromo2 = [...sinEspacios];
dromo2 = dromo2.reverse();
for (let j = 0; j < dromo.length; j++) {
  if (dromo[j] != dromo2[j]){ 
  console.log('Se siente, no es palíndromo.')
  return false;
 }
}
console.log('Enhorabuena, es palíndromo.')
return true;
}
// RECUERDA NO PONER ACENTOS 
console.log(PalindromeTwo('Arriba la birra'));
