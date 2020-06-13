/*
node todo.js Comprar pan <- añade "Comprar pan" al principio de la lista
node todo.js Comprar pan --priority <- añade "Comprar pan" al principio de la lista con la propiedad "prioridad alta"
node todo.js --list <- lista las tareas que hay guardadas
node todo.js --done=1 <- marca la tarea 1 como hecha
node todo.js --undone=1 <- marca la tarea 1 como NO hecha
node todo.js --clean <- borra las tareas marcadas como hechas
*/

const minimist = require("minimist");
const {
  addTodo,
  markAsDone,
  markAsUnDone,
  listTodos,
  cleanTodos,
} = require("./lib/actions");

async function todoList() {
  const args = minimist(process.argv.slice(2));

  const { _, priority, list, done, undone, clean } = args;

  if (list) {
    await listTodos();
    console.log("listo todos los todos");
    process.exit();
  }

  if (done) {
    // Marcar el todo número "done" como hecho
    console.log(`Marco el todo ${done} como HECHO`);
    process.exit();
  }

  if (undone) {
    // Marcar el todo número "undone" como no hecho
    console.log(`Marco el todo ${undone} como PENDIENTE`);
    process.exit();
  }

  if (clean) {
    // Borro de la lista todos hechos
    console.log("Borro los todos ya hechos");
    process.exit();
  }

  const newTodo = _.join(" ");

  if (newTodo.length > 0) {
    // Añadir newTodo a la lista
    await addTodo({
      text: newTodo,
      priority: priority ? true : false,
    });

    process.exit();
  } else {
    console.log("Nada que hacer");
  }
}

todoList();
