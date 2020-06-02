"use strict";

console.log("El equipo ganador es...................");
let equipoMaria = (62 + 34 + 55) / 3;
let equipoPaula = (35 + 60 + 59) / 3;
let equipoRebeca = (40 + 39 + 63) / 3;
if (equipoMaria > equipoPaula && equipoMaria > equipoRebeca) {
  console.log("el equipo de Maria!!!!!");
} else if (equipoPaula > equipoMaria && equipoPaula > equipoRebeca) {
  console.log("el equipo de Paula!!!!!");
} else if (equipoRebeca > equipoMaria && equipoRebeca > equipoPaula) {
  console.log("el equipo de Rebeca!!!!!");
} else {
  console.log("parece que hay empate");
}
//////
