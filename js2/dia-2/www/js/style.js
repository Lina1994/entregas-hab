const title = document.querySelector("header h1");

// title.setAttribute("style", "border: 5px dotted rebeccapurple;");

title.style.color = "red";
title.style.fontSize = "4rem";

console.log(title.style.border);
console.log(title.style.textDecoration);

console.log(window.getComputedStyle(title));

title.style.textDecoration = "underline";
