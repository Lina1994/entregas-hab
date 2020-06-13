"use strict";

const fs = require("fs").promises;
const path = require("path");
const chalk = require("chalk");
const { formatDistanceToNow } = require("date-fns");
const { es } = require("date-fns/locale");

async function getFile(pathName) {
  try {
    let pathInfo;
    try {
      // Sacar información del path
      pathInfo = await fs.stat(pathName);
    } catch (error) {
      throw new Error(`La ruta ${pathName} no existe`);
    }

    // Comprobar que el path es un fichero
    if (!pathInfo.isFile()) {
      throw new Error(`La ruta ${pathName} no es un fichero`);
    }

    // Comprobar que pesa menos de 10000 bytes
    if (pathInfo.size > 10000) {
      throw new Error(`El fichero ${pathName} pesa máis de 10Kb`);
    }

    const content = await fs.readFile(pathName);

    return {
      createdAt: pathInfo.birthtime,
      content: content.toString(),
    };

    // Leer el fichero y retornar la información necesaria (contenido y fecha creación)
  } catch (error) {
    console.error(chalk.red(error.message));
    console.error(chalk.red("----------------------------"));
  }
}

async function main() {
  const args = process.argv.slice(2);

  for (const argument of args) {
    const pathName = path.join(__dirname, argument);

    const fileData = await getFile(pathName);

    if (fileData) {
      const distance = formatDistanceToNow(new Date(fileData.createdAt), {
        locale: es,
      });

      console.log();
      console.log(chalk.blue(`El fichero ${argument} fue creado ${distance}`));
      console.log("Los contenido del fichero son:");
      console.log(fileData.content);
    }
  }
}

main();
