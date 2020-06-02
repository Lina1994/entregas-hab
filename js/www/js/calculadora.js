"use strict";

let numberA = 9;
let numberB = 2;
let operador = "+";
console.log("Soy la calculadora basada en IF ELSE versión 4");

if (
  numberA >= 0 ||
  (numberA < 0 && numberB >= 0) ||
  (numberB < 0 &&
    (operador === "+" ||
      operador === "-" ||
      operador === "*" ||
      operador === "/" ||
      operador === "**"))
) {
  //console.log("ok");
  if (operador === "+") {
    console.log(numberA + "+" + numberB + "=" + (numberA + numberB));
  } else if (operador === "-") {
    console.log(numberA + "-" + numberB + "=" + (numberA - numberB));
  } else if (operador === "*") {
    console.log(numberA + "*" + numberB + "=" + numberA * numberB);
  } else if (operador === "/") {
    console.log(numberA + "/" + numberB + "=" + numberA / numberB);
  } else if (operador === "**") {
    console.log(numberA + "**" + numberB + "=" + numberA ** numberB);
  }
} else {
  console.log(`  Esta es una calculadora básica,
  recuerda que numberA y numberB deben ser números
  y operador debe ser '+' , '-' , '*' , '/' o '**'. `);
}
