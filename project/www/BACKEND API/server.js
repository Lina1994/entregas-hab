require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const entryBookingExists = require("./middlewares/entryBookingExists");
const entryExists = require("./middlewares/entryExists");
const isUser = require("./middlewares/isUser");
const isAdmin = require("./middlewares/isAdmin");

// my content controllers
const listEntries = require("./controllers/toys/listEntries");
const getEntry = require("./controllers/toys/getEntry");
const newEntry = require("./controllers/toys/newEntry");
const editEntry = require("./controllers/toys/editEntry");
const deleteEntry = require("./controllers/toys/deleteEntry");

// my bookings controllers
const listbookingsEntries = require("./controllers/bookings/listEntries");
const getbookingsEntry = require("./controllers/bookings/getEntry");
const newbookingsEntry = require("./controllers/bookings/newEntry");
const editbookingsEntry = require("./controllers/bookings/editEntry");
const deletebookingsEntry = require("./controllers/bookings/deleteEntry");

// my deliverys_points controllers
const listDeliveringPointEntries = require("./controllers/deliverys_points/listEntries");
const getDeliveringPointEntry = require("./controllers/deliverys_points/getEntry");
const newDeliveringPointEntry = require("./controllers/deliverys_points/newEntry");
const editDeliveringPointEntry = require("./controllers/deliverys_points/editEntry");
const deleteDeliveringPointEntry = require("./controllers/deliverys_points/deleteEntry");
/*
// Content controllers
const voteEntry = require("./controllers/diary/voteEntry");
const getEntryVotes = require("./controllers/diary/getEntryVotes");
*/

// User controllers
const newUser = require("./controllers/users/newUser");
const validateUser = require("./controllers/users/validateUser");
const loginUser = require("./controllers/users/loginUser");
const getUser = require("./controllers/users/getUser");
const editUser = require("./controllers/users/editUser");
const deleteUser = require("./controllers/users/deleteUser");
const editUserPassword = require("./controllers/users/editUserPassword");
const recoverUserPassword = require("./controllers/users/recoverUserPassword");
const resetUserPassword = require("./controllers/users/resetUserPassword");


const app = express();

// Middlewares iniciales

// Log de peticiones a la consola
app.use(morgan("dev"));

// Procesado de body tipo json
app.use(bodyParser.json());

// Procesado de body tipo form-data
app.use(fileUpload());


/*
  ////// ENDPOINTS DE TOYS /////////////////////////////////////
*/

// Listar multiples entradas del diario de viajas
// GET - /entries 
// Público
app.get("/entries", listEntries);

// Mostrar una sola entrada del diario
// GET - /entries/:id 
// Público
app.get("/entries/:id", entryExists, getEntry);

// Crear una nueva entrada del diario
// POST - /entries 
// Sólo usuarios registrados
app.post("/entries", isUser, newEntry);

// Editar una entrada del diario
// PUT - /entries/:id 
// Sólo usuario que creara esta entrada o admin
app.put("/entries/:id", isUser, entryExists, editEntry);

// Borrar una entrada del diario
// DELETE - /entries/:id 
// Sólo usuario que creara esta entrada o admin
app.delete("/entries/:id", isUser, entryExists, deleteEntry);

/*
  ////// ENDPOINTS DE DELIVERING_POINTS /////////////////////////////////////
*/

// Listar multiples entradas del diario de viajas
// GET - /entries 
// Público
app.get("/entries", listDeliveringPointEntries);

// Mostrar una sola entrada del diario
// GET - /entries/:id 
// Público
app.get("/entries/:id", entryExists, getDeliveringPointEntry);

// Crear una nueva entrada del diario
// POST - /entries 
// Sólo usuarios registrados
app.post("/entries", isUser, newDeliveringPointEntry);

// Editar una entrada del diario
// PUT - /entries/:id 
// Sólo usuario que creara esta entrada o admin
app.put("/entries/:id", isUser, entryExists, editDeliveringPointEntry);

// Borrar una entrada del diario
// DELETE - /entries/:id 
// Sólo usuario que creara esta entrada o admin
app.delete("/entries/:id", isUser, entryExists, deleteDeliveringPointEntry);

/*
  ////// ENDPOINTS DE BOOKING /////////////////////////////////////
*/

// Listar multiples entradas del diario de viajas
// GET - /entries 
// Público
app.get("/entries", listbookingsEntries);

// Mostrar una sola entrada del diario
// GET - /entries/:id 
// Público
app.get("/entries/:id", entryBookingExists, getbookingsEntry);

// Crear una nueva entrada del diario
// POST - /entries 
// Sólo usuarios registrados
app.post("/entries", isUser, newbookingsEntry);

// Editar una entrada del diario
// PUT - /entries/:id 
// Sólo usuario que creara esta entrada o admin
app.put("/entries/:id", isUser, entryBookingExists, editbookingsEntry);

// Borrar una entrada del diario
// DELETE - /entries/:id 
// Sólo usuario que creara esta entrada o admin
app.delete("/entries/:id", isUser, entryBookingExists, deletebookingsEntry);

// Votar una entrada
// POST - /entries/:id/votes 
// Sólo usuarios registrados
//app.post("/entries/:id/votes", isUser, entryExists, voteEntry);

// Ver votos de una entrada
// GET - /entries/:id/votes 
// Público
//app.get("/entries/:id/votes", entryExists, getEntryVotes);

/*
  ENDPOINTS DE USUARIO
*/

// Registro de usuarios
// POST - /users 
// Público
app.post("/users", newUser);

// Validación de usuarios registrados
// GET - /users/validate/:code 
// Público
app.get("/users/validate/:code", validateUser);

// Login de usuarios
// POST - /users/login 
// Público
app.post("/users/login", loginUser);

// Ver información de un usuario
// GET - /users/:id 
// Sólo para usuarios registrados
// Pero si el usuario es el mismo o admin debería mostrar toda la información
app.get("/users/:id", isUser, getUser);

// Editar datos de usuario: email, name, avatar
// PUT - /users/:id 
// Sólo el propio usuario o el usuario admin
app.put("/users/:id", isUser, editUser);

// Borrar un usuario
// DELETE- /users/:id 
// Sólo el usuario admin
app.delete("/users/:id", isUser, isAdmin, deleteUser);

// Editar password de usuario
// POST - /users/:id/password
// Sólo el propio usuario
app.post("/users/:id/password", isUser, editUserPassword);

// Enviar código de reset de password
// POST - /users/recover-password
// Público
app.post("/users/recover-password", recoverUserPassword);

// Resetear password de usuario
// POST - /users/reset-password
// Público
app.post("/users/reset-password", resetUserPassword);

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
  console.log(`API funcionando en http://localhost:${port}`);
});
