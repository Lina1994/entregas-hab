const fs = require("fs").promises;
const sharp = require("sharp");
const path = require("path");

async function main() {
  const originalImageBuffer = await fs.readFile(
    path.join(__dirname, "./foto.jpg")
  );

  const image = sharp(originalImageBuffer);

  image.extract({
    top: 100,
    left: 500,
    width: 400,
    height: 400,
  });

  await image.toFile("foto-extract.jpg");
}

main();
