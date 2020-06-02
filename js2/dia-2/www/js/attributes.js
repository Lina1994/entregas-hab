const section = document.querySelector("section.content");
const p = document.querySelector("p");
const button = document.querySelector("button");

// Valor de los atributos
console.log(section.getAttribute("class"));
console.log(section.getAttribute("id"));
console.log(p.getAttribute("data-berto"));
console.log(button.getAttribute("disabled"));

// Cambiar valor de los atributos
section.setAttribute("class", "green");
section.setAttribute("id", "secundario");

// Quitar un atributo
button.removeAttribute("disabled");
button.setAttribute("disabled", "yes");

if (p.hasAttribute("data-berto")) {
  console.log("el párrafo tiene el atributo escogido");
}

// Data attributes
// data-algo

p.dataset.rating = "⭐️⭐️⭐️";
p.dataset.year = "1970";
console.log(p.dataset);
