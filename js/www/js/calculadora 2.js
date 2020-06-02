"use strict";
let numberA = 4;
let numberB = 3;
let operador = "+";
console.log("Soy la calculadora basada en If Else Verión 4");
if (
  (numberA >= 0 || numberA < 0) &&
  (numberB >= 0 || numberB < 0) &&
  (operador === "+" ||
    operador === "-" ||
    operador === "*" ||
    operador === "/" ||
    operador === "**")
) {
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
