const os = require("os");

console.log("Memoria total", os.totalmem() / 1000); // en bytes
console.log("Memoria disponible", os.freemem() / 1000); // en bytes
console.log("Nombre del host", os.hostname());

console.log("Directorio de usuario", os.homedir());
console.log("Directorio temporal", os.tmpdir());
console.log("Plataforma en la que está ejecutándose", os.platform());
console.log("Tiempo encendido", os.uptime() / 60 / 60 / 24); //en segundos, calculo en días
