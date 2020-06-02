import { randomNumber as rn } from "/js/helpers.js";

const body = document.body;
const h1 = document.querySelector("#principal");

let contador = 10;

function tick() {
  if (contador === 0) {
    h1.textContent = "💥";
    contador = 10;
  } else {
    h1.textContent = contador;
    body.style.backgroundColor = `rgb(${rn(255)},${rn(255)},${rn(255)})`;
  }

  contador--;
}

const interval = setInterval(tick, 1000);
