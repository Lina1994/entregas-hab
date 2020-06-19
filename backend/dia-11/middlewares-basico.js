/*
módulo http:
cliente -> request -> function que gestiona la request -> response -> client
                      --------------------------------
módulo express:
cliente -> request -> middleware1 -> middleware2 -> middleware3 -> response -> cliente
*/
require("dotenv").config();
const express = require("express");

const port = process.env.PORT;

const app = express();

// Middlewares
app.use(function (request, response, next) {
  console.log(`soy el primer middleware, la url solicitada es: ${request.url}`);

  next();
});

app.use(function (request, response, next) {
  if (request.headers.authorization === "loremipsum") {
    next();
  } else {
    response.status(401).send("No tienes autorización para ver esta url");
  }
});

app.use(function (request, response, next) {
  response.send("Premio. LLegaste al final");
});

app.listen(port, () => {
  console.log(`Servidor web funcionando en http://localhost:${port} 🚀`);
});
