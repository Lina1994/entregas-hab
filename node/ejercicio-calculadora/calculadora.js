// LANG=gl node calculadora.js suma 10 20
// El resultado de sumar 10 y 20 es 30
const { suma, resta, multiplica, divide } = require("./lib/operations");
const operation_translations = require("./lib/translations");

const valid_operations = ["suma", "resta", "multiplica", "divide"];
const valid_languages = ["es", "en"];

// Detecto lenguage
let language = process.env.LANG || "es";

if (!valid_languages.includes(language)) {
  language = "es";
}

// Gestiono argumentos
const [operation, valueA, valueB] = process.argv.slice(2);

// Compruebo que existan los argumentos que necesito
if (!operation || !valueA || !valueB) {
  console.log("Faltan argumentos");
  process.exit();
}

// Detecto operation
if (!valid_operations.includes(operation)) {
  console.log(
    "La operación no es válida, tiene que ser: suma, resta, multiplica o divide"
  );

  process.exit();
}

const vA = Number(valueA);
const vB = Number(valueB);

if (!vA || !vB) {
  console.log("Los valores no son numéricos");
  process.exit();
}

// Hago los cáculos

let result;

switch (operation) {
  case "suma":
    result = suma(vA, vB);
    break;
  case "resta":
    result = resta(vA, vB);
    break;
  case "multiplica":
    result = multiplica(vA, vB);
    break;
  case "divide":
    result = divide(vA, vB);
    break;
}

if (language === "es") {
  console.log(
    `El resultado de ${operation_translations[operation][language]} ${vA} y ${vB} es ${result}`
  );
} else if (language === "en") {
  console.log(
    `The result of ${operation_translations[operation][language]} ${vA} and ${vB} if ${result}`
  );
}
