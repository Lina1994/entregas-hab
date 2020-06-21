require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const listEntries = require("./controllers/diary/listEntries");
const getEntry = require("./controllers/diary/getEntry");

const app = express();

// Middlewares iniciales
app.use(morgan("dev"));

// API / CRUD / entidades / endpoint

// Listar multiples entradas del diario de viajas
// GET - /entries ✅
app.get("/entries", listEntries);

// Mostrar una sola entrada del diario
// GET - /entries/:id
app.get("/entries/:id", getEntry);

// Crear una nueva entrada del diario
// POST - /entries

// Editar una entrada del diario
// PUT - /entries/:id

// Borrar una entrada del diario
// DELETE - /entries/:id

// Votar una entrada
// Ver votos de una entrada

// Middlewares finales

// Error middleware
app.use((error, req, res, next) => {
  res.status(error.httpStatus || 500).send({
    status: "error",
    message: error.message,
  });
});

// Not found
app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Not found",
  });
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`API funcionando en http://localhost:${port}`);
});


// npm run dev