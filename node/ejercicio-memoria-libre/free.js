const os = require("os");
const chalk = require("chalk");

const totalMem = os.totalmem();
const freeMem = os.freemem();

const usedPercent = 100 - (freeMem * 100) / totalMem;

const humanPercent = usedPercent.toFixed(2);

const message = `Tienes el ${humanPercent}% de memoria usada`;

let output;

if (usedPercent < 25) {
  output = chalk.green(message);
} else if (usedPercent < 75) {
  output = chalk.blue(message);
} else {
  output = chalk.red(message);
}

console.log(output);
