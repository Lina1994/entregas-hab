const title = document.querySelector("header h1");
const content = document.querySelector("section.content");

title.textContent = new Date();

content.innerHTML = "<p><strong>Ola amigas!!!</strong></p>";
// content.outerHTML = "<div><p>cambio todo</p></div>";
