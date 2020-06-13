const fs = require("fs");

fs.writeFileSync(
  "fichero2.txt",
  "Probando a escribir un fichero sincronamente"
);

console.log("cuando aparezca esto el fichero ya está escrito en disco");
