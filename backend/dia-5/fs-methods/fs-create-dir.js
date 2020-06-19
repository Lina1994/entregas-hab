const fs = require("fs").promises;
const path = require("path");

async function createDirectory(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
    console.log(`El directorio ${dir} fue creado`);
  } catch (error) {
    console.error("No pude crear el directorio");
  }
}

const newDir = "./fotos/2020/enero";

createDirectory(path.join(__dirname, newDir));
