const headerButton = document.querySelector("section.content button");
const navButton = document.querySelector("nav button");
const nav = document.querySelector("nav");

const handleHeaderButtonClick = () => {
  nav.classList.toggle("visible");
};

const handleNavButtonClick = () => {
  nav.classList.toggle("visible");
};

headerButton.addEventListener("click", handleHeaderButtonClick);
navButton.addEventListener("click", handleNavButtonClick);
