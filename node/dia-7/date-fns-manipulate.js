const { sub, isFuture, isPast, max, min } = require("date-fns");

const now = new Date();

// substrae a una fecha
const modified = sub(now, {
  days: 3,
  minutes: 50,
  months: 2,
  years: 3,
});

console.log(modified);

console.log(isFuture(modified));
console.log(isPast(modified));

const d1 = new Date(1985, 3, 21);
const d2 = new Date(2000, 7, 13);

// Fecha máxima (tienen que ir en array)
console.log(max([d1, d2]));
// Fecha mínima
console.log(min([d1, d2]));
