require("dotenv").config();
const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const { sample } = require("lodash");

const port = process.env.PORT;

const app = express();

// Middleware inicial: leer el json de nombres ✅
app.use(async function (request, response, next) {
  try {
    const nameData = await fs.readFile(path.join(__dirname, "names.json"));
    const nameObject = JSON.parse(nameData.toString());

    request.names = nameObject;
    next();
  } catch (error) {
    next(new Error("No se pudo leer el archivo de nombres"));
  }
});

app.use(function (request, response, next) {
  console.log(`Petición de tipo ${request.method} a la url ${request.url}`);
  next();
});

// / -> debe mostrar el json completo ✅
app.get("/", function (request, response, next) {
  response.send(request.names);
});

// /masculinos -> debe mostrar los nombres masculinos ✅
app.get("/masculinos", function (request, response, next) {
  const masculineNames = request.names.filter((name) => name.gender === "M");

  response.send(masculineNames);
});

// /femeninos -> debe mostrar los nombres femeninos
app.get("/femeninos", function (request, response, next) {
  const femenineNames = request.names.filter((name) => name.gender === "F");
  response.send(femenineNames);
});

// /random -> debe mostrar un nombre aleatorio
// /random?genre=M -> mostrar un nombre aleatorio masculino
// /random?genre=F -> mosrar un nombre aleatorio femenino
app.get("/random", function (request, response, next) {
  const { gender } = request.query;
  let names = request.names;

  if (gender === "F") {
    names = names.filter((name) => name.gender === "F");
  }

  if (gender === "M") {
    names = names.filter((name) => name.gender === "M");
  }

  response.send(sample(names));
});

// Error middleware
app.use(function (error, request, response, next) {
  response.status(500).send({
    status: "error",
    message: error.message,
  });
});

// Not found middleware
app.use(function (request, response) {
  response.status(404).send({
    status: "error",
    message: "Route not found",
  });
});

app.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port} 😇`);
});
