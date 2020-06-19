const { random, sample, sampleSize, shuffle, chunk } = require("lodash");

console.log(random(10, 44));

const dias = [
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
  "domingo",
];

console.log(sample(dias));
console.log(sampleSize(dias, 3));
console.log(shuffle(dias));

console.log(chunk(dias, 2));
