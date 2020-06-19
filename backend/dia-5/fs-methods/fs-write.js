const fs = require("fs").promises;
const path = require("path");
const minimist = require("minimist");

async function writeContentToFile(content, file) {
  try {
    await fs.writeFile(file, content);
  } catch (error) {
    console.error("No pude escribir el fichero");
  }
}

// node fs-write.js "contenido del fichero" --filename=nombre-fichero

const args = minimist(process.argv.slice(2));

const content = args._[0];
const filename = args.filename;

if (content.length === 0) {
  console.error("Hay que especificar un contenido");
  process.exit();
}

if (!filename) {
  console.error("Hay que especificar un nombre de fichero");
  process.exit();
}

writeContentToFile(content, path.join(__dirname, filename));
