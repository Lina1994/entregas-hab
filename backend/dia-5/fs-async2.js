const fs = require("fs").promises;

async function main() {
  let newContent;

  try {
    // Leemos el fichero
    const content = await fs.readFile("fichero.txt");

    // Creamos un nuevo contenido en base a lo que tenga el fichero
    newContent = `
        Este es el contenido antiguo:
        ${content.toString()}
      `;
  } catch (error) {
    // controlamos error de la lectura del fichero
    console.error("Hubo un error leyendo el fichero original");
    process.exit();
  }

  try {
    // Escribimos ese nuevo contenido en un nuevo fichero
    await fs.writeFile("fichero-modificado.txt", newContent);
  } catch (error) {
    // controlamos el error de la escritura del fichero
    console.error("hubo un error escribiendo el fichero modificado");
    process.exit();
  }

  // Avisamos de que acabamos
  console.log("acabé");
}

main();
