const fs = require("fs").promises;
const path = require("path");
const sharp = require("sharp");

async function main() {
  const image = sharp(path.join(__dirname, "foto.jpg"));

  image.composite([
    {
      input: "./hackaboss.png",
      gravity: "northwest",
    },
  ]);

  image.toFormat("webp");

  image.grayscale();

  await fs.writeFile("./marca-agua.webp", await image.toBuffer());
}

main();
