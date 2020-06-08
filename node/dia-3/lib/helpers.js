function hello() {
  console.log("hello from helpers.js");
}

function suma(a, b) {
  return a + b;
}

console.log("esto está dentro de helpers");
console.log("esto está dentro de helpers");
console.log("esto está dentro de helpers");
console.log("esto está dentro de helpers");
console.log("esto está dentro de helpers");

function loquesea() {
  console.log(66 + 123);
}

loquesea();

module.exports = {
  hello,
  suma,
  loquesea,
};
