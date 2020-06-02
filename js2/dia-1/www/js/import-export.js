import todayDate from "/js/helpers.js";
import { add as suma, PI } from "/js/helpers.js";

const today = "hoy";
const add = "Suma";

function principal() {
  console.log(`Bienvenidas a JS2, hoy es ${todayDate()}`);

  console.log(`La suma de 3 más PI es ${suma(3, PI)}`);
}

principal();
