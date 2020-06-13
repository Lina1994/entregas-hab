const fs = require("fs").promises;
const sharp = require("sharp");
const path = require("path");

async function main() {
  const originalImageBuffer = await fs.readFile(
    path.join(__dirname, "./foto.jpg")
  );

  const image = sharp(originalImageBuffer);

  sharp(originalImageBuffer).resize(500, 500, {
    fit: "contain",
    // position: "right top",
    background: {
      r: 50,
      g: 100,
      b: 200,
    },
  });

  await image.toFile("foto-mini.jpg");
}

main();
