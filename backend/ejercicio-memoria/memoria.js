const fs = require("fs").promises;
const path = require("path");
const { formatDistanceToNow } = require("date-fns");
const { es } = require("date-fns/locale");

const memory = path.join(__dirname, "memory.json");

async function main() {
  try {
    // comprobar que el archivo existe
    try {
      await fs.access(memory);
    } catch (error) {
      throw new Error("Es la primera vez que me ejecutan");
    }

    // leer el archivo json
    const data = await fs.readFile(memory);

    // extraer la fecha que contiene
    const { lastUpdate } = JSON.parse(data);

    // Mostrar la distancia temporal entre la fecha y ahora

    const distance = formatDistanceToNow(new Date(lastUpdate), { locale: es });

    console.log(`La última vez que me ejecutaron fue hace ${distance}`);
  } catch (error) {
    // imprimo el error
    console.error(error.message);
  } finally {
    // escribir el archivo con la información de la fecha actual
    const now = new Date();

    const lastUpdateInfo = {
      lastUpdate: now.toISOString(),
    };

    await fs.writeFile(memory, JSON.stringify(lastUpdateInfo));
  }
}

main();
