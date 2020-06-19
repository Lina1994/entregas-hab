const { format } = require("date-fns");
const { gl } = require("date-fns/locale");

const now = new Date(1720, 3, 12, 15, 30);

// miércoles, 10 de junio de 2020

const formatedDate = format(now, "EEEE, d 'de' MMMM 'de' yyyy", { locale: gl });

console.log(formatedDate);
