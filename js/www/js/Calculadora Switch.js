"use strict";

console.log("Y yo la calculadora basada en Switch");
let numberC = 4;
let numberD = 6;
let operadorS = "+";
switch (
  numberC >= 0 ||
  (numberC < 0 && numberD >= 0) ||
  (numberD < 0 &&
    (operadorS === "+" ||
      operadorS === "-" ||
      operadorS === "*" ||
      operadorS === "/" ||
      operadorS === "**"))
) {
  case operadorS === "+":
    console.log(numberC + "+" + numberD + "=" + (numberC + numberD));
    break;
  case operadorS === "-":
    console.log(numberC + "-" + numberD + "=" + (numberC - numberD));
    break;
  case operadorS === "*":
    console.log(numberC + "*" + numberD + "=" + numberC * numberD);
    break;
  case operadorS === "/":
    console.log(numberC + "/" + numberD + "=" + numberC / numberD);
    break;
  case operadorS === "**":
    console.log(numberC + "**" + numberD + "=" + numberC ** numberD);
    break;
  default:
    console.log(`  Esta es una calculadora básica,
  recuerda que numberA y numberB deben ser números
  y operador debe ser '+' , '-' , '*' , '/' o '**'. `);
}
/*console.log(`  Esta es una calculadora básica,
  recuerda que numberA y numberB deben ser números
  y operador debe ser '+' , '-' , '*' , '/' o '**'. `);  /*/
