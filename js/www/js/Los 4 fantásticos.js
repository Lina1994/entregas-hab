"use strict";
/*
let two = "*";
let one = "";
let espacio = " ";
let loops = 9;
*/
/////// Piramide1//////////////////////////////////////
/*
for (let i = 1; i <= loops; i++) {
  one = one + two;
  console.log(one);
  */
//// Piramide 2////////////////////////////////////////
/*
one = "";
for (let i = 1; i <= loops; i++) {
  one = one + two;
  let menos = "";
  for (let j = loops; j >= i; j--) {
    menos = menos + espacio;
  }
  console.log(menos + one);
}
*/
///////Piramide 3//////////////////////////////////////
/*
one = "";
let otraMas = "";
for (let i = 1; i <= loops; i++) {
  one = one + two;
  let menos = "";
  for (let j = loops; j >= i; j--) {
    menos = menos + espacio;
  }
  console.log(menos + one + otraMas);
  otraMas = one;
}
*/
// //Piramide 4 //////////Rombo mi yo del pasado me odia
/*
one = "";
let otraMas = "";
for (let i = 1; i <= loops; i++) {
  one = one + two;
  let menos = "";
  for (let j = loops; j >= i; j--) {
    menos = menos + espacio;
  }
  console.log(menos + one + otraMas);
  otraMas = one;
}
one = "";
espacio = " ";
let tres = "";
let nuevoEspacio = " ";
for (let i = 1; i <= loops - 1; i++) {
  one = espacio + one;
  let menos = "";
  let tres = "";
  for (let j = loops - 1; j >= i; j--) {
    tres = menos;
    menos = menos + two;
  }
  console.log(nuevoEspacio + one + menos + tres);
}
*/
///////////////////////////////////////////////////////
/*
function printFloorNumber(floors) {
  for (let i = 1; i < floors; i++) {
    console.log(`Piso ${i + 1}`);
  }
}

function buildFloor(size) {
  let floor = "";
  for (let i = 0; i < size; i++) {
    floor = floor + "*";
  }
  return floor;
}

function printPyramid(floors) {
  for (let i = 0; i < floors; i++) {
    console.log(buildFloor(i + 1));
  }
}

printPyramid(5);
*/
////////////////////////ESTO ES UNA BOMBA//////////////
/*
let password = Math.ceil(Math.random() * 10);
console.log(password);
let intentos = 5;
let intentosRestantes = intentos;
let passwordp = "";

for (let m = 1; m <= intentos; m++) {
  passwordp = prompt(`Introduzca password para desactivar la autodestrucción
tiene ${intentosRestantes} intentos`);
  if (password == passwordp) {
    break;
  }
  intentosRestantes = intentosRestantes - 1;
}
if (password == passwordp) {
  console.log("La autodestrucción ha sido desactivada.");
} else {
  console.log("¡¡¡¡¡Boom!!!!!");
} */
////////////////////     Fibonacci     //////////////////
/*function fibonacci(params) {
  if (params <= 1) {
    return params;
  }
  return fibonacci(params - 1) + fibonacci(params - 2);
}
console.log(fibonacci(7));*/
////////     Palabra mas larga metodo Raqui ///////////
/*
function miMetodo2(arg) {
  let palabraResult = '';
  let argSinEspacios = arg.split(/\W+/);
  for (let i = 0; i < argSinEspacios.length; i++) {
      if (argSinEspacios[i].length > palabraResult.length) {
          palabraResult = argSinEspacios[i];
      }
  }
  console.log('La palabra mas larga es... ' + palabraResult);
  return palabraResult;
}

miMetodo2('En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor. Una olla de algo más vaca que carnero, salpicón las más noches, duelos y quebrantos los sábados, lentejas los viernes, algún palomino de añadidura los domingos, consumían las tres partes de su hacienda.');
*/
///////////////////
/*
const animal = {name:'gallina'}
const establo = [{name:'zorro'}, {name:'zorro'}]

function getRandomAnimal () {
  return {animal: Math.round(Math.random()) ? 'zorro' : 'gallina'};
}
console.log(getRandomAnimal());

function granja(establo) {
if (establo[0] === establo[1]) {
 establo.push(establo[0]);
 return establo;
}
  return [{name:'zorro'}]
}
console.log(granja(establo))
*/
///////////////////// CRONOMETRO /////////////////////
/*
function chronometer(duration) {
let elapsed = 0;
const intervalId = setInterval(()=>{
  console.log(`${elapsed}s`);
  elapsed++;
  if (elapsed > duration){
    clearInterval(intervalId);
  }
},1000);
}
chronometer(1000)
*/
/////////////    PROMESAS    //////////////////////////
/*
function promiseGenerator (){
  const randomNumber = Math.round(Math.random()*500);
  console.log('Esperando ', randomNumber)
  return new Promise ((resolve)=>{
    setTimeout(()=>{
      console.log('Resolviendo ', randomNumber);
      resolve(randomNumber);
    }, randomNumber)
  });
}

async function myFunction(params) {
const myPromise1 =  promiseGenerator();
const myPromise2 =  promiseGenerator();
const myPromise3 =  promiseGenerator();
const value1 = await myPromise1
console.log('value1', value1);
const value2 = await myPromise2
console.log('value2', value2);
const value3 = await myPromise3
console.log('value3', value3);
}

myFunction();
*/
////////////
/*
fetch('https://www.anapioficeandfire.com/api/houses/378').then((response)=>{
  console.log(response);
  return response.json().then((value)=> {
    console.log(value);
  });
});

async function getCurrentLord (currentLord) {
   const lord = await fetch(`https://www.anapioficeandfire.com/api/characters/1303`).then((name)=> {
    return name.json();
  });
  console.log(lord.name, lord.aliases);
  console.log(lord);
};
getCurrentLord();*/
///


async function getHouse() {
  const requestHouse = await fetch('https://www.anapioficeandfire.com/api/houses/378');
  const houseData = await requestHouse.json();
  const requestLord = await fetch(houseData.currentLord);
  const lordData = await requestLord.json();
  console.log(lordData.name);
  for (const title of lordData.titles) {
    console.log(`- ${title}`);
  }
}

getHouse();
