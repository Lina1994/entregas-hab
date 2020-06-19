const fs = require("fs").promises;

async function main() {
  try {
    let newContent;

    try {
      // Leemos el fichero
      const content = await fs.readFile("ficherooo.txt");

      // Creamos un nuevo contenido en base a lo que tenga el fichero
      newContent = `
        Este es el contenido antiguo:
        ${content.toString()}
      `;
    } catch (error) {
      // controlamos error de la lectura del fichero
      throw new Error("Hubo un error leyendo el fichero original");
    }

    try {
      // Escribimos ese nuevo contenido en un nuevo fichero
      await fs.writeFile("fichero-modificado.txt", newContent);
    } catch (error) {
      // controlamos el error de la escritura del fichero
      throw new Error("hubo un error escribiendo el fichero modificado");
    }

    // Avisamos de que acabamos
    console.log("acabé");
  } catch (error) {
    // Si hay un error avisamos
    console.error(error.message);
  }
}

main();
