const cowsay = require("cowsay");

const message = cowsay.say({
  text: "Ola desde nodejs!",
});

console.log(message);
