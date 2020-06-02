"use strict";

function letterCount(str) {
    console.log('      Longest word');
    console.log('De la frase: ' + str);
    let strToArray = [...str];
    let arrayPalabras = [''];
    let j = 0;
    let longestWord = arrayPalabras[0]
    //* */console.log(strToArray);
    for (let i = 0; i < strToArray.length; i++) {
        if (strToArray[i] !== ','
            && strToArray[i] !== '.'
            && strToArray[i] !== ':'
            && strToArray[i] !== ';'
            && strToArray[i] !== '!'
            && strToArray[i] !== '¡'
            && strToArray[i] !== '?'
            && strToArray[i] !== '¿') {
            if (strToArray[i] === ' ') {
                j++
                arrayPalabras[j] = [''];
            } else {
                arrayPalabras[j] += strToArray[i];
            }
        }
        //* comprobación longitud arrayPalabras manual:*/ console.log(arrayPalabras[j] + arrayPalabras[j].length);
        for (let k = 1; k < arrayPalabras.length; k++) {
            if (arrayPalabras[k].length > longestWord.length) {
                longestWord = arrayPalabras[k]
            }
        }
    }
    //* comprovación transformación array por arrayPalabras:*/ console.log(arrayPalabras);
    return console.log('La palabra mas larga es... ' + longestWord);
}

letterCount('En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor. Una olla de algo más vaca que carnero, salpicón las más noches, duelos y quebrantos los sábados, lentejas los viernes, algún palomino de añadidura los domingos, consumían las tres partes de su hacienda.');