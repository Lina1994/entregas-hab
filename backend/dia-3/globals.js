// process

process.on("uncaughtException", (error) => {
  console.log(`hubo un error y este es el mensaje: ${error.message}`);
});

let count = 1;

setInterval(() => {
  console.log(count++);

  if (count === 5) {
    throw new Error("No me gusta el número 5");
  }

  if (count === 10) {
    throw new Error("Tampoco me gusta el numero 10");
  }
}, 500);
