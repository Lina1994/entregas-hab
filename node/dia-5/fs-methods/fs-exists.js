const fs = require("fs").promises;
const path = require("path");

async function routeExists(route) {
  try {
    await fs.access(route);
    console.log("la ruta existe");
  } catch (error) {
    console.error("la ruta no existe");
  }
}

const route = path.join(__dirname, "moviddddas.txt");

routeExists(route);
