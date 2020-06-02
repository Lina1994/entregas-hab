console.log("ola");
console.error("Algo hiciste mal");
console.warn("Algo hiciste regular");

let ventana;

const respuesta = window.confirm("Abrir elpais?");

if (respuesta) {
  ventana = window.open("https://elpais.com");
} else {
  console.log("ok vale");
}

const valor = window.prompt("Escribe CERRAR para cerrar la pestaña de elpais");

console.log(ventana);

if (valor === "CERRAR") {
  console.log("cerramos el pais");
  ventana.close();
}
