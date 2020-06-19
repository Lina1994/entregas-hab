const http = require("http");
const port = 3000;

const server = http.createServer();

server.on("request", (request, response) => {
  const { method, url, headers } = request;

  console.log(url);
  console.log(method);
  console.log(headers);

  response.statusCode = 200;
  response.setHeader("Bootcamp", "JSB06");
  response.setHeader("Pepito", "Pérez");

  response.end("ola amigos");
});

server.listen(port, () => {
  console.log(`Servidor web funcionando en http://localhost:${port} 🚀`);
});
