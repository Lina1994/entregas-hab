import { randomNumber } from "/js/helpers.js";

// Seleccionando nodos

const main_title = document.getElementById("principal");

setInterval(() => {
  main_title.style.color = `rgb(${randomNumber(255)}, ${randomNumber(
    255
  )}, ${randomNumber(255)})`;
}, 500);
