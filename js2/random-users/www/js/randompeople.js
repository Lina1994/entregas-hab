const mainElement = document.querySelector("main");

/*
  <article>
    <header>
      <img src="..." alt="..." />
      <h1>nombre apellido</h1>
    </header>
    <p>Lugar de nacimiento, Año</p>
  </article>
*/

// Esta función recibe un array de objectos de usuario y crea los elementos html y los
// inserta en el documento
function builGallery(userList) {
  // Creo un fragmento de DOM en el que voy a meter los article
  const fragment = document.createDocumentFragment();

  // Recorremos el array de usuarios
  for (const user of userList) {
    // Creamos el nombre y la fecha de nacimiento
    const name = `${user.name.first} ${user.name.last}`;
    const birthYear = new Date(user.dob.date);

    // Creamos el article y el header
    const article = document.createElement("article");
    const header = document.createElement("header");

    // Creamos la imagen de usuario
    const img = document.createElement("img");
    img.setAttribute("src", user.picture.large);
    img.setAttribute("alt", name);

    // Creamos el titulo
    const h1 = document.createElement("h1");
    h1.textContent = name;

    // Añadimos los dos elementos anteriores al header
    header.append(img);
    header.append(h1);

    // Añadimos el header al article de usuario
    article.append(header);

    // Creamos el párrafo con el lugar y fecha de nacimiento
    const p = document.createElement("p");
    p.textContent = `${user.location.city} (${
      user.location.country
    }), ${birthYear.getFullYear()}`;

    // Añadimos el párrafo al article
    article.append(p);

    // Añadimos el article al fragmento creado anteriormente
    fragment.append(article);
  }

  // Introduzco el fragmento en el DOM real
  mainElement.append(fragment);
}

async function main() {
  let num = window.prompt(
    "Cuantos usuarios quieres generar (entre 1 y 100)",
    50
  );
  num = Number(num);

  // Comprobamos que num está dentro de los márgenes
  if (num < 1) num = 1;
  if (num > 20) num = 100;

  // Construímos la url a la que hacer la petición
  const apiURL = `https://randomuser.me/api/?results=${num}`;

  // Recogemos el JSON que nos da la URL
  const response = await fetch(apiURL);
  const randomUsers = await response.json();

  // Ejecutamos la función de construír la galería con los resultados
  builGallery(randomUsers.results);
}

main();
