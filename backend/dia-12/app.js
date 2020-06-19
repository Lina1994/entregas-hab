require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fs = require("fs").promises;
const path = require("path");
const uuid = require("uuid");

const app = express();

// Middlewares

// Log de requests al terminal
app.use(morgan("dev"));
app.use(bodyParser.json());

/*
GET - / - devolver json pokemons ✅
GET - /?search=pi - devolver json pokemons cuyo nombre incluya "pi" ✅
*/

app.get("/", async (req, res, next) => {
  try {
    const pokemonData = await fs.readFile(path.join(__dirname, "pokedex.json"));

    const { search } = req.query;

    let pokemonList = JSON.parse(pokemonData.toString());

    if (search) {
      pokemonList = pokemonList.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(search.toLowerCase());
      });
    }

    res.send(pokemonList);
  } catch (error) {
    next(error);
  }
});

/*
GET - /pokemon/id - devolver json con solo el pokemon con la id ✅
*/
app.get("/pokemon/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const pokemonData = await fs.readFile(path.join(__dirname, "pokedex.json"));
    const pokemonList = JSON.parse(pokemonData.toString());

    const pokemon = pokemonList.find((pokemon) => {
      return pokemon.id === id;
    });

    if (!pokemon) {
      const error = new Error("Pokémon no encontrado");
      error.httpStatus = 404;
      throw error;
    }

    res.send(pokemon);
  } catch (error) {
    next(error);
  }
});

/*
POST - /pokemon - añadir un pokemon que se envía en la petición
*/
app.post("/pokemon", async (req, res, next) => {
  // recibir datos de un nuevo pokemon
  // leer la lista de pokemons
  // añadir el nuevo pokemon a la lista
  // guardar la lista de pokemons
  try {
    const { name, type } = req.body;

    if (!name || !type) {
      const error = new Error("Faltan datos en la petición");
      error.httpStatus = 400;
      throw error;
    }

    const pokemonFile = path.join(__dirname, "pokedex.json");
    const pokemonData = await fs.readFile(pokemonFile);
    const pokemonList = JSON.parse(pokemonData.toString());

    pokemonList.unshift({
      name,
      type,
      id: uuid.v4(),
    });

    await fs.writeFile(pokemonFile, JSON.stringify(pokemonList, null, 4));

    res.send({
      status: "ok",
      message: `${name} añadido a la lista de pokemons`,
    });
  } catch (error) {
    next(error);
  }
});

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
