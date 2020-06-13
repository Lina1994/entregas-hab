require("dotenv").config();
const http = require("http");

const port = process.env.PORT;

const server = http.createServer();

/*
Petición HTTP entrada:
GET /css/style.css HTTP/1.1
Host: localhost:3000

- método: GET
- ruta: /css/style.css
- cabeceras: (host: localhost: 3000, ...)

*/

server.on("request", (request, response) => {
  // procesa request

  const { url, method, headers } = request;

  // console.log("El método de la petición es", method);
  // console.log("La url que se pide es", url);
  // console.log("Las cabeceras de la pecición son:");
  // console.log(headers);

  // construye response
  if (method === "GET" && url === "/") {
    // Configuramos respuesta página principal
    response.setHeader("Content-type", "text/html");

    const now = new Date();
    const humanDate = `${now.getHours()}:${now.getMinutes()}`;

    response.end(`
      <!doctype html>
      <html lang="es">
        <head>
          <meta charset="utf-8" />
          <title>Mi web</title>

          <link rel="stylesheet" href="/css/style.css" />
        </head>
        <body>
          <h1>Ola amigas son las ${humanDate}</h1>
        </body>
      </html>
    `);
  } else if (method === "GET" && url === "/css/style.css") {
    // Configuramos respuesta archivo CSS
    response.setHeader("Content-type", "text/css");
    response.end(`
      body {
        background: rebeccapurple;
        color: goldenrod;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
      }

      h1 {
        font-family: sans-serif;
      }
    `);
  } else if (method === "GET" && url === "/secreto.html") {
    const secretContent = {
      password: "loremipsum",
    };
    // devuelve un json
    // sólo lo devuelve sí se recibe la cabecera "Authorization = 123456"
    if (headers["authorization"] === "123456") {
      response.setHeader("Content-type", "application/json");
      response.end(JSON.stringify(secretContent));
    } else {
      response.statusCode = 401;
      response.end("No autorizado");
    }
  } else {
    // Respuesta por defecto: página no encontrada
    response.statusCode = 404;
    response.end("Página no encontrada");
  }
});

/*
Respuesta HTTP salida:

HTTP/1.1 200 OK
Date: ...
Connection: keep-alive
Content-length: 4
Content-type: text/html

body
*/

server.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port} 🤪`);
});
