const { formatDistanceToNow } = require("date-fns");
const { es } = require("date-fns/locale");

const htmlTemplate = ({ title, content }) => {
  return `
    <!doctype html>
    <head>
      <meta charset="utf-8" />
      <title>${title}</title>

      <link rel="stylesheet" href="/css/style.css" />
    </head>

    <body>
      <header>
        <h1><a href="/">Pokemons vistos</a></h1>
      </header>

      <section>
        ${content}
      </section>

      <script type="module" src="/js/script.js"></script>
    </body>
    </html>
  `;
};

const homePage = ({ list, search }) => {
  const pokemonRows = list.pokedex.map(
    (pokemon) => `<tr>
    <td>${pokemon.name}</td>
    <td>${pokemon.type}</td>
    <td>hace ${formatDistanceToNow(new Date(pokemon.seen), { locale: es })}</td>
  </tr>`
  );

  return htmlTemplate({
    title: "Pokémons vistos",
    content: `
      <nav>
        <a href="/add">Añadir pokémon</a>
      </nav>

      <form method="GET">
        <fieldset>
        <label for="search">Buscar pokémon</label>
        <input type="search" name="search" id="search" value="${
          search || ""
        }" />
        </fieldset>

        <button>Buscar</button>
      </form>

      <table>
        <thead>
        <th>Nombre</th>
        <th>Tipo</th>
        <th>Fecha</th>
        </thead>

        <tbody>
        ${pokemonRows.join("")}
        </tbody>
      </table>

      ${search ? '<a href="/">Quitar filtro</a>' : ""}
    `,
  });
};

const addPage = () => {
  return htmlTemplate({
    title: "Añadir pokemon",
    content: `
      <h2>Formulario de añadir pokemon</h2>
      <form method="POST">
        <fieldset>
          <label for="name">Nombre</label>
          <input type="text" name="name" id="name" />
        </fieldset>
        <fieldset>
          <label for="type">Tipo</label>
          <select name="type" id="type">
            <option>Agua</option>
            <option>Tierra</option>
            <option>Aire</option>
            <option>Fuego</option>
            <option>Electricidad</option>
          </select>
        </fieldset>

        <button>Añadir pokemon</button>
      </form>
    `,
  });
};

const thankYou = ({ name }) => {
  return htmlTemplate({
    title: "Gracias por meter el nuevo pokemon",
    content: `
      <h2>Gracias por meter el pokemon: ${name}</h2>
      <a href="/">Volver a la portada</a>
    `,
  });
};

module.exports = {
  homePage,
  addPage,
  thankYou,
};
