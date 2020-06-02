const mainContent = document.querySelector("div.content");

// Hijos de div.content
console.log(mainContent.children);

// Primer hijo de div.content
console.log(mainContent.firstElementChild);

// Último hijo
console.log(mainContent.lastElementChild);

const lastP = mainContent.lastElementChild.lastElementChild;

const h1 = lastP.parentElement.parentElement.children[0].children[0];

console.log(h1);

// Elementos hermanos

const previousP = lastP.previousElementSibling;

console.log(previousP);

previousP.nextElementSibling;
