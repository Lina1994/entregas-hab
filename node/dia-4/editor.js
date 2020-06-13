const sharp = require("sharp");
const minimist = require("minimist");

const args = minimist(process.argv.slice(2));

const image = args._[0];

const processedImage = sharp(image);

processedImage.resize(args.w, args.h);

if (args.grayscale) {
  processedImage.grayscale();
}

processedImage.toFile(args.output);
