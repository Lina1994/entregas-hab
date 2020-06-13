const fs = require("fs").promises;
const path = require("path");

async function writeObjectToDisk(data, pathName) {
  try {
    if (typeof data !== "object") {
      throw new Error("El objeto no es del tipo correcto");
    }

    const dataString = JSON.stringify(data, null, 2);

    await fs.writeFile(pathName, dataString);

    console.log(`Los datos fueron escritos en ${pathName}`);
  } catch (error) {
    console.error(`No pude escribir el objeto a disco: ${error.message}`);
  }
}

const objeto = {
  name: "Berto",
  stats: {
    age: 43,
    webdeveloper: true,
    birthplace: "O Vicedo",
  },
  devices: ["PC", "Macbook", "Smartphone"],
};

writeObjectToDisk(objeto, path.join(__dirname, "datos.json"));
