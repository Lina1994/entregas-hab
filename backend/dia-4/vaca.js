const cowsay = require("cowsay");
const args = process.argv.slice(2);

const message = cowsay.say({
  text: args.join(" "),
});

console.log(message);
