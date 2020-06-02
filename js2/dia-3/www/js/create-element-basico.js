// Ejemplo básico
const body = document.body;

const newP = document.createElement("p");
newP.textContent = "lorem ipsum dolor sit amet";
newP.classList.add("important");

body.append(newP);

// Ejemplo más complejo

// <ul>
//  <li>uno</li>
//  <li>dos</li>
//  <li>tres</li>
// </ul>

const ul = document.createElement("ul");

const li1 = document.createElement("li");
li1.textContent = "uno";
const li2 = document.createElement("li");
li2.textContent = "dos";
const li3 = document.createElement("li");
li3.textContent = "tres";

ul.append(li1);
ul.append(li2);
ul.append(li3);

const section = document.querySelector("section.lista");

section.append(ul);
