const fs = require("fs").promises;
const sharp = require("sharp");
const path = require("path");

async function main() {
  const originalImageBuffer = await fs.readFile(
    path.join(__dirname, "./foto.jpg")
  );

  const image = sharp(originalImageBuffer);

  const metadata = await image.metadata();

  // console.log(metadata);
  console.log("Ancho", metadata.width);
  console.log("Alto", metadata.height);
}

main();
