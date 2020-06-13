const fs = require("fs").promises;
const path = require("path");

async function readDirectory(dir) {
  try {
    // Comprobar que el directorio existe ✅
    try {
      await fs.access(dir);
    } catch (error) {
      throw new Error("el directorio no existe");
    }

    // Leer los contenidos del directorio ✅
    let directoryContents;
    try {
      directoryContents = await fs.readdir(dir);
    } catch (error) {
      throw new Error("No puedo leer los contenidos del directorio");
    }

    // Recorrer la lista de contenidos del directorio ✅
    for (const content of directoryContents) {
      const contentRoute = path.join(dir, content);

      try {
        const contentInfo = await fs.stat(contentRoute);

        if (contentInfo.isDirectory()) {
          // Si el contenido es otro directorio imprimir su nombre ✅
          console.log(`La ruta ${content} es un directorio`);
        } else {
          // Si el contenido es un fichero imprimr el nombre y el tamaño ✅
          console.log(
            `La ruta ${content} es un fichero que tiene ${contentInfo.size} bytes`
          );
        }
      } catch (error) {
        throw new Error(
          `No pude leer la información de la ruta ${contentRoute}`
        );
      }
    }
  } catch (error) {
    console.error(error.message);
  }
}

const directory = "./downloads";
readDirectory(path.join(__dirname, directory));
