const fs = require("fs").promises;
const sharp = require("sharp");
const path = require("path");

async function main() {
  const image = sharp("./cocodrilo.jpg");

  image.trim();

  await image.toFile("./coco.jpg");
}

main();
