const button = document.querySelector("button");
const input = document.querySelector("input");
const h2 = document.querySelector("h2");

button.onclick = function () {
  const p = document.createElement("p");
  p.textContent = "Hubo un click en el botón";

  document.body.append(p);
};

button.onmouseover = function () {
  console.log("acabas de pasar por arriba del botón");
};

button.onmouseout = function () {
  console.log("acabas de salir de arriba del botón");
};

input.oninput = function () {
  h2.textContent = input.value;
};

window.onload = function () {
  console.log("la pagina acabó de cargar");
  document.body.style.backgroundColor = "lightblue";
};

input.onfocus = function () {
  console.log("hiciste foco en el input");
};

input.onblur = function () {
  console.log("el input ya no tiene foco");
};

window.onresize = function () {
  console.log(window.innerWidth);
  console.log(window.innerHeight);
};
