const fs = require("fs").promises;
const path = require("path");

async function readJSON(file) {
  try {
    const jsonContent = await fs.readFile(file);

    const obj = JSON.parse(jsonContent.toString());

    console.log(obj.name);
  } catch (error) {
    console.error("No se pudo leer el JSON");
  }
}

readJSON(path.join(__dirname, "package.json"));
