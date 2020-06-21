require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const entryExists = require("./middlewares/entryExists");

const listEntries = require("./controllers/diary/listEntries");
const getEntry = require("./controllers/diary/getEntry");
const newEntry = require("./controllers/diary/newEntry");
const editEntry = require("./controllers/diary/editEntry");
const deleteEntry = require("./controllers/diary/deleteEntry");
const voteEntry = require("./controllers/diary/voteEntry");
const getEntryVotes = require("./controllers/diary/getEntryVotes");

const app = express();

// Middlewares iniciales

// Log de peticiones a la consola
app.use(morgan("dev"));

// Procesado de body tipo json
app.use(bodyParser.json());

// Procesado de body tipo form-data
app.use(fileUpload());

// API / CRUD / entidades / endpoint

// Listar multiples entradas del diario de viajas
// GET - /entries ✅
// Público
app.get("/entries", listEntries);

// Mostrar una sola entrada del diario
// GET - /entries/:id ✅
// Público
app.get("/entries/:id", entryExists, getEntry);

// Crear una nueva entrada del diario
// POST - /entries ✅
// Sólo usuarios registrados
app.post("/entries", newEntry);

// Editar una entrada del diario
// PUT - /entries/:id ✅
// Sólo usuario que creara esta entrada o admin
app.put("/entries/:id", entryExists, editEntry);

// Borrar una entrada del diario
// DELETE - /entries/:id ✅
// Sólo usuario que creara esta entrada o admin
app.delete("/entries/:id", entryExists, deleteEntry);

// Votar una entrada
// POST - /entries/:id/votes ✅
// Sólo usuarios registrados
app.post("/entries/:id/votes", entryExists, voteEntry);

// Ver votos de una entrada
// GET - /entries/:id/votes ✅
// Público
app.get("/entries/:id/votes", entryExists, getEntryVotes);

// Middlewares finales

// Error middleware
app.use((error, req, res, next) => {
  console.error(error);

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
  console.log(`API funcionando en http://localhost:${port} 🙈`);
});
