import { randomColor } from "/js/helpers.js";

const button = document.querySelector("button");
const p = document.querySelector("p");

let count = 0;

const handleClick = function () {
  count++;
  p.textContent = `Clicaste en el botón ${count} vece(s)`;

  if (count >= 20) {
    button.removeEventListener("click", handleClick2);
  }
};

const handleClick2 = function () {
  document.body.style.backgroundColor = randomColor();
};

button.addEventListener("click", handleClick);
button.addEventListener("click", handleClick2);
