const fs = require("fs").promises;
const path = require("path");

// async function createDir(dir) {
//   try {
//     await fs.mkdir(dir, {
//       recursive: true,
//     });

//     console.log(`El directorio ${dir} fue creado`);
//   } catch (error) {
//     console.error("No se pudo crear el directorio");
//   }
// }

//createDir(path.join(__dirname, "downloads/2020"));

async function deleteDir(dir) {
  try {
    await fs.rmdir(dir, {
      recursive: true, //Cuidado con esto que BORRA directorios con contenido (sin preguntar)
    });

    console.log(`El directorio ${dir} fue borrado`);
  } catch (error) {
    console.error("No se pudo borrar el directorio");
  }
}

deleteDir(path.join(__dirname, "downloads"));
