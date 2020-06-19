const fs = require("fs").promises;
const path = require("path");
const os = require("os");

const todoFile = path.join(os.homedir(), ".tasks.json");

// Lee la lista de todos y devuelve el contenido
async function readTodoList() {
  try {
    let todos;

    try {
      const todoListContent = await fs.readFile(todoFile);
      todos = JSON.parse(todoListContent.toString());
    } catch (error) {
      todos = { todos: [] };
      await fs.writeFile(todoFile, JSON.stringify(todos));
    }

    return todos;
  } catch (error) {
    console.error(error);
  }
}

// Guarda la lista de todos
async function saveTodos(todoList) {
  try {
    await fs.writeFile(todoFile, JSON.stringify(todoList));
  } catch (error) {
    console.error(error.message);
  }
}

async function addTodo({ text, priority }) {
  console.log(text, priority);
  // Abrir la lista actual de todos
  const currentList = await readTodoList();

  currentList.todos.unshift({
    text,
    priority,
  });

  await saveTodos(currentList);
  // Añadir el todo que recibe al principio
  // Guardar la lista actualizada
}

async function markAsDone(index) {
  // Abrir la lista actual de todos
  // Buscar el todo con el index que recibe
  // Modificar el objecto del todo como done: true
  // Guardar la lista actualizada
}

async function markAsUnDone(index) {
  // Abrir la lista actual de todos
  // Buscar el todo con el index que recibe
  // Modificar el objecto del todo como done: false
  // Guardar la lista actualizada
}

async function listTodos() {
  const todos = await readTodoList();

  console.log(todos);
  // Abrir la lista actual de todos
  // Imprimir la lista en la consola
}

async function cleanTodos() {
  // Abrir la lista actual de todos
  // Filtrar los que están marcados como done: true
  // Guardar la lista resultante
}

module.exports = {
  addTodo,
  markAsDone,
  markAsUnDone,
  listTodos,
  cleanTodos,
};
