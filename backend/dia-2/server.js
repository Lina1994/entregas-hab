const http = require("http");

const host = "localhost";
const port = 3000;

const server = http.createServer(function (request, response) {
  if (request.url === "/noticias") {
    response.end("esta es la página de noticias");
  } else if (request.url === "/") {
    response.end("esta es la página principal");
  } else if (request.url === "/hora") {
    response.end(new Date().toString());
  }
});

server.listen(port, host);
