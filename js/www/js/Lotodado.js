"use strict";

console.log("////La dado loto////");
const carasDado = 6;
let puntosTirada = 0;
let tirada = 0;
let puntosTotales = 0;
if (carasDado === typeof "String" || carasDado <= 0) {
  console.log("Dado no homologado");
} else {
  while (puntosTotales < 50 && tirada < 50) {
    tirada++;
    let lanzarDado = Math.ceil(Math.random() * carasDado);
    puntosTotales = puntosTotales + lanzarDado;
    console.log(
      "Tirada número " +
        tirada +
        (", ha salido un " + lanzarDado) +
        (", llevas un total de " + puntosTotales)
    );

    if (puntosTotales >= 50) {
      console.log(
        "¡Enhorabuena, ha salido un " +
          lanzarDado +
          ("! ¡Has ganado con un total de " + puntosTotales + " puntos!")
      );
    }
  }
}
/////
