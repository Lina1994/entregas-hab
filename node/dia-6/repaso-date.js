const now = new Date();

console.log(now);

// const anotherDate = new Date("September 2 1976 03:56");
// console.log(anotherDate);

// const date3 = new Date("2020-06-10T18:16:17.023Z");
// console.log(date3);

// const date4 = new Date(1900, 0, 1, 13, 15, 0, 898);
// console.log(date4);

// const date5 = new Date(1591813502578); //Unix time
// console.log(date5)

now.setFullYear(1985);
now.setMonth(1);

console.log("año", now.getFullYear()); // Año
console.log("mes", now.getMonth()); // Mes
console.log("día", now.getDate()); // Día
console.log("día de la semana", now.getDay()); // Día de la semana (domingo es el 0)
console.log("hora", now.getHours()); // hora
console.log("minuto", now.getMinutes()); // minutos
console.log("segundo", now.getSeconds()); // segundos
console.log("milisegundo", now.getMilliseconds()); // milisegundos

// console.log("unix time", now.getTime());

// console.log("Formato local", now.toLocaleString("es"));
// console.log("Diferencia horaria con UTC", now.getTimezoneOffset());

// 10 de junio de 2020 y son las 20 y 37

const months = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

const days = [
  "domingo",
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
];

console.log(`
${days[now.getDay()]} ${now.getDate()} de ${
  months[now.getMonth()]
} de ${now.getFullYear()} y son las ${now.getHours()} y ${now.getMinutes()}
`);
