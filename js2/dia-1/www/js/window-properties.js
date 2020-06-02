// Altura del viewport (body visible)
console.log(window.innerHeight, "alto");
console.log(window.innerWidth, "ancho");

// Altura de la ventana completa del navegador
console.log(window.outerHeight);
console.log(window.outerWidth);

// Información sobre la URL
console.log(window.location); // Objecto con información sobre la url
console.log(window.location.href); //Url completa

// Podremos cambiar la url
// window.location.href = "https://google.com";

// console.log(window.navigator);
console.log(window.navigator.vendor);

if (window.navigator.vendor.indexOf("Google") > -1) {
  console.log("estás usando google chrome");
} else {
  console.log("estás usando otro navegador");
}

// Información sobre scroll
console.log(window.scrollY);
console.log(window.scrollX);
