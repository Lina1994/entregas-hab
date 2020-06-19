const fs = require("fs").promises;
const sharp = require("sharp");
const path = require("path");

async function main() {
  const originalImageBuffer = await fs.readFile(
    path.join(__dirname, "./foto.jpg")
  );

  const image = sharp(originalImageBuffer);

  await image.toFile("./foto.webp");
}

main();
