require("dotenv").config();
const express = require("express");

const port = process.env.PORT;
const app = express();

app.use(async function (request, response, next) {
  try {
    // hace cosas
    throw new Error("Movida rarisima en el servidor");
  } catch (error) {
    next(error);
  }
});

app.get("/ruta", function (request, response, next) {
  response.send({
    data: "ok",
  });
});

app.get("/", function (request, response, next) {
  response.send("Esta es la raíz");
});

app.post("/formulario", function (request, response, next) {
  response.send({
    message: "Datos recibidios",
  });
});

// Error handling middleware
app.use(function (error, request, response, next) {
  response.status(500).send({ status: "error", message: error.message });
});

// Not found middleware
app.use(function (request, response) {
  response.status(404).send("Not found");
});

app.listen(port, () => {
  console.log(`Servidor web funcionando en http://localhost:${port} 🚀`);
});
