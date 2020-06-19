const fs = require("fs").promises;
const path = require("path");

async function deleteFile(file) {
  try {
    await fs.unlink(file);
    console.log(`El fichero ${file} fue borrado`);
  } catch (error) {
    console.error(error.message);

    console.error("No pude borrar el fichero");
  }
}

const fileToDelete = "f.txt";

deleteFile(path.join(__dirname, fileToDelete));
