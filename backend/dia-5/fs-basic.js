const fs = require("fs");

const file = "fichero.txt";
const content = "Ola amigas otra vez! 🤪";

fs.writeFile(file, content, (error) => {
  if (error) {
    console.error(error.message);
  } else {
    console.log(`El contenido está escrito en ${file}`);
  }
});

console.log("seguimos haciendo movidas");
