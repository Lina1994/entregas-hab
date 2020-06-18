require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const fs = require("fs").promises;
const path = require("path");

const app = express();

const { protectedRoute } = require("./middlewares");

// Middlewares

// Log de requests al terminal
app.use(morgan("dev"));

// Servir archivos estáticos
app.use(express.static(path.resolve(__dirname, "static")));

// Middleware de Rutas
app.get("/", (req, res, next) => {
  res.send({
    status: "ok",
    message: "Welcome!",
  });
});

app.get("/protegida", protectedRoute, (req, res, next) => {
  res.send({
    status: "ok",
    secret_message: "Roses are red",
  });
});

// app.get("/style.css", async (req, res, next) => {
//   try {
//     const styleData = await fs.readFile(
//       path.join(__dirname, "static/style.css")
//     );
//     res.send(styleData.toString());
//   } catch (error) {
//     next(error);
//   }
// });

// Middleware de error
app.use((error, req, res, next) => {
  res.status(error.httpStatus || 500).send({
    status: "error",
    message: error.message,
  });
});

// Middleware de not found
app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Not found",
  });
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port} 💥`);
});
