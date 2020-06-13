const fs = require("fs").promises;
const path = require("path");

async function showFileContents(file) {
  try {
    const contents = await fs.readFile(file);

    console.log(contents.toString());
  } catch (error) {
    console.error("No pude leer los contenidos del fichero");
  }
}

showFileContents(path.join(__dirname, "movidas.txt"));
