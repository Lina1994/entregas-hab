// querySelector selecciona usando selectores de CSS
const lastLi = document.querySelector("main > ul li:last-child");

lastLi.style.color = "rebeccapurple";

// Lo mismo
const title = document.querySelector("#principal");

title.style.textDecoration = "underline";

// Si el selector resulta en múltiples elementos solo selecciona el primero
const li = document.querySelector("ul li");
li.style.fontSize = "3rem";

// Seleccionar varios elementos

const ps = document.querySelectorAll("p");

for (const p of ps) {
  p.style.textDecoration = "underline";
}
