const { formatDistance, formatDistanceToNow } = require("date-fns");
const { es } = require("date-fns/locale");

const d1 = new Date();
const d2 = new Date(2020, 5, 10, 10, 30);

const humanDistance = formatDistanceToNow(d2, { locale: es });

console.log(`hace ${humanDistance} que empezó el estado de alarma`);
