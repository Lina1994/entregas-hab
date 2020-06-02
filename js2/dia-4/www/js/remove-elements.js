const deleteme = document.getElementById("deleteme");

deleteme.remove();

const newP = document.createElement("p");
newP.innerHTML = `
  <strong>Nuevo párrafo</strong>: que se va a autodestruir en 5 segundos...
`;

document.body.prepend(newP);

setTimeout(() => {
  newP.remove();
}, 5000);
