// Fecha ahora
const now = new Date();

console.log(now);
console.log(now.getTime());

console.log("Año", now.getFullYear());
console.log("Mes", now.getMonth());
console.log("Día del mes", now.getDate());
console.log("Día de la semana", now.getDay());
console.log("Hora", now.getHours());
console.log("Minutos", now.getMinutes());
console.log("Segundos", now.getSeconds());
console.log("Milisegundos", now.getMilliseconds());

// Otras fechas

const fecha2 = new Date("September 2 1976 07:00:03.333");

console.log(fecha2);

const fecha3 = new Date(200000000);

console.log(fecha3);

// Modificar fecha

console.log("---------------");

const ahora = new Date();

ahora.setDate(30);
ahora.setMonth(1);
ahora.setFullYear(1930);

console.log(`${ahora.getHours()}:${ahora.getMinutes()}:${ahora.getSeconds()}`);
