const fs = require("fs").promises;
const path = require("path");
const minimist = require("minimist");

async function fileInfo(file) {
  try {
    const stats = await fs.stat(file);

    console.log("Es un fichero?", stats.isFile());
    console.log("Es un directorio?", stats.isDirectory());

    console.log(`la ruta fue creada en: ${stats.birthtime}`);
  } catch (error) {
    console.error("el fichero no existe o no es accesible");
  }
}

const args = minimist(process.argv.slice(2));

if (!args.file) {
  console.error(
    "El comando tiene que ser llamado con el parámetro --file=fichero"
  );
} else {
  fileInfo(path.join(__dirname, args.file));
}
