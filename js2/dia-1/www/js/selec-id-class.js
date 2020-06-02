import { randomNumber as rn } from "/js/helpers.js";

// Selecciono UN elemento por #id
const mainTitle = document.getElementById("principal");

console.log(mainTitle);

// Selecciono VARIOS elementos por .classname
const contentSections = document.getElementsByClassName("content");

// El resultado es un HTMLCollection que es como un array
console.log(contentSections);

// Recorro el HTMLCollection como si fuera un array con un for...of
for (const section of contentSections) {
  // asigno un color aleatorio a cada uno de los sections
  section.style.color = `rgba(${rn(255)}, ${rn(255)}, ${rn(255)})`;
}

// Seleccionamos todos los elementos que sean de tipo 'section'
const allSections = document.getElementsByTagName("section");

console.log(allSections);

// Seleccionamos el elemento con las class .other
const otherClass = document.getElementsByClassName("other");

// Aunque sólo haya un elemento con la class .other devuelve un array
console.log(otherClass);

// Por lo tanto tenemos que especificar el elemento que queremos modificar con el [indice]
otherClass[0].style.color = "red";
