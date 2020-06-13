const path = require("path");

// normalize: resuelve todos las partes relativas de una ruta (.. y .)
const path_feo = "/home/berto/proyectos/../documentos/./fotos/1.jpg";
console.log(path.normalize(path_feo));

// join: une dos rutas resolviendo también partes relativas
const directorio_base = __dirname;
const directorio_uploads = "../static/uploads";

console.log(path.join(directorio_base, directorio_uploads));

// resolve: convierte una ruta relativa a absoluta
const directorio = "../descargas";

console.log(path.resolve(directorio));

// dirname: nos dice el directorio de una ruta (que tiene que ser absoluta)
const ruta = "../../ficheros/legal.txt";
const ruta_absoluta = path.resolve(ruta);

console.log(path.dirname(ruta_absoluta));

// extname: nos devuelve la extensión de un fichero

const ruta_fichero = "./descargas/curriculum.pdf";

console.log(path.extname(ruta_fichero));

// parse: nos da información completa de una ruta absoluta (o relativa)
const relativa = "../../fotos/vicedo.jpg";
const absoluta = path.resolve(relativa);

console.log(path.parse(absoluta));
