const form = document.querySelector("form");
const list = document.querySelector("ul#tweets");

const addTweet = (text) => {
  // Esta función añade un tweet a la lista

  // Creo el li
  const li = document.createElement("li");

  // Creo el párrafo con el texto del tweets
  const p = document.createElement("p");
  p.textContent = text;

  // Creo el footer
  const footer = document.createElement("footer");

  // Creo el time
  const time = document.createElement("time");
  const now = new Date();
  time.textContent = `
    ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}
  `;

  // Creo el botón de borrar
  const button = document.createElement("button");
  button.classList.add("action");
  button.textContent = "Borrar";

  // Cuando hago click en el botón que elimine el li que acabamos de crear
  // button.addEventListener("click", () => {
  //   li.remove();
  // });

  // Añado time y button al fotter
  footer.append(time);
  footer.append(button);

  // Añado el párrafo con el tweet al li
  li.append(p);

  // Añado el footer al li
  li.append(footer);

  // Añado el li a la lista
  list.prepend(li);
};

const handleFormSubmit = (event) => {
  event.preventDefault();

  const input = form.querySelector("input#tweet");

  const text = input.value;

  if (text.length === 0 || text.length > 250) {
    alert("hai que poner algo y no pasarse de 250 caracteres");
  } else {
    addTweet(text);
    input.value = "";
  }
};

const handleListClick = (event) => {
  // Si donde hice click es en el botón que me interesa
  // Borra el li más cercano a ese botón
  const target = event.target;

  if (target.matches("ul button.action")) {
    target.closest("li").remove();
  }
};

form.addEventListener("submit", handleFormSubmit);

document.body.addEventListener("click", handleListClick);
