require("dotenv").config();
const http = require("http");
const fs = require("fs").promises;
const path = require("path");
const urlParser = require("url");
const querystring = require("querystring");

const { homePage, addPage, thankYou } = require("./html");

const port = process.env.PORT;

const server = http.createServer();

server.on("request", async function (request, response) {
  const { url, method } = request;

  // Procesar url y querystring
  const { pathname, query } = urlParser.parse(url, true);

  console.log(`Detectada petición a ${pathname} ... procesando.`);

  try {
    if (method === "GET" && (pathname === "/" || pathname === "/index.html")) {
      /*
        Página principal
      */
      response.statusCode = 200;
      response.setHeader("Content-type", "text/html");

      const pokedexContent = await fs.readFile(
        path.join(__dirname, "pokedex.json")
      );

      let pokedexList = JSON.parse(pokedexContent.toString());

      if (query.search) {
        pokedexList.pokedex = pokedexList.pokedex.filter((pokemon) => {
          return pokemon.name
            .toLowerCase()
            .includes(query.search.toLowerCase());
        });
      }

      response.end(homePage({ list: pokedexList, search: query.search }));
    } else if (method === "GET" && pathname === "/add") {
      /*
        Formulario Añadir pokemon
      */
      response.statusCode = 200;
      response.setHeader("Content-type", "text/html");

      response.end(addPage());
    } else if (method === "POST" && pathname === "/add") {
      /*
        Recogida de datos fomulario añadir pokemon
      */
      // Recoger datos del formulario
      let body = [];

      request.on("data", (part) => {
        body.push(part);
      });

      request.on("end", async () => {
        body = Buffer.concat(body).toString();

        const payload = querystring.parse(body);
        const pokedexFile = path.join(__dirname, "pokedex.json");
        // Meter datos en pokedex.json
        const pokedexData = await fs.readFile(pokedexFile);

        const pokedexObject = JSON.parse(pokedexData.toString());
        const now = new Date();

        const newPokemon = {
          name: payload.name,
          type: payload.type,
          seen: now.toISOString(),
        };

        pokedexObject.pokedex.unshift(newPokemon);

        // Guardar de nuevo el pokedex
        await fs.writeFile(pokedexFile, JSON.stringify(pokedexObject, null, 4));

        // Mostrar mensaje con link a portada
        // response.statusCode = 200;
        // response.setHeader("Content-type", "text/html");
        // response.end(
        //   thankYou({
        //     name: newPokemon.name,
        //   })
        // );

        // Opción 2: redirigir directamente a portada
        response.statusCode = 301;
        response.setHeader("Location", "/");
        response.end();
      });
    } else if (method === "GET" && pathname === "/css/style.css") {
      /*
        CSS
      */
      response.statusCode = 200;
      response.setHeader("Content-type", "text/css");

      const cssContent = await fs.readFile(
        path.join(__dirname, "static/style.css")
      );

      response.end(cssContent.toString());
    } else if (method === "GET" && pathname === "/js/script.js") {
      /*
        JS 
      */
      response.statusCode = 200;
      response.setHeader("Content-type", "application/javascript");

      const jsContent = await fs.readFile(
        path.join(__dirname, "static/main.js")
      );

      response.end(jsContent.toString());
    } else {
      /*
        Si no entró en un if anterior devolvemos un 404 (Not found)
      */
      response.statusCode = 404;
      response.setHeader("Content-type", "text/plain; charset=utf-8");
      response.end("Not found");
    }
  } catch (error) {
    console.error(error);
    response.statusCode = 500;
    response.setHeader("Content-type", "text/plain; charset=utf-8");
    response.end("Error procesando la petición");
  }
});

server.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port}`);
});
