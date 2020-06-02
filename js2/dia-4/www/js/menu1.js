const button = document.querySelector("main section button");
const main = document.querySelector("main");

button.addEventListener("mouseover", function () {
  main.classList.toggle("menuopen");
});
