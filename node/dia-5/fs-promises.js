const fs = require("fs").promises;
const path = require("path");

const file = "../../../../../../fichero.txt";

fs.writeFile(path.join(__dirname, file), "Contenido del fichero 3")
  .then(() => console.log("el fichero fue escrito"))
  .catch((error) => console.error(`Hubo este error: ${error.message}`));
