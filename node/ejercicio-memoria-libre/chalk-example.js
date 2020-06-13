const chalk = require("chalk");

console.log(chalk.red.bgCyan.bold.underline("Esto es un mensaje"));
console.log(chalk.green.italic.underline("Esto otro mensaje"));

console.log(chalk`
- {bold.bgWhite.blue name}: {red.bgMagentaBright Berto}
- {bold.bgWhite.blue pet}:  {red.bgMagentaBright Lula}
- {bold.bgWhite.blue city}: {red.bgMagentaBright Coruña}
`);
