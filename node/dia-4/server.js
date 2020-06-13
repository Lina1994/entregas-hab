// const dotenv = require("dotenv");
// dotenv.config();
require("dotenv").config();

console.log(process.env.MYSQL_USER);
console.log(process.env.MYSQL_PASS);
console.log(process.env.LANG);

setInterval(() => {
  console.log("Hola amigas!! 😈");
}, 500);
