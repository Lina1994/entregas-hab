const figure = document.createElement("figure");
const img = document.createElement("img");
img.setAttribute("src", "https://source.unsplash.com/500x300");
img.setAttribute("alt", "Imagen aleatoria");

figure.append(img);

const body = document.body;
const p = document.querySelector("p.medio");

body.insertBefore(figure, p);

// Array de movidas

const lista = ["Pikachu", "Bulbasaur", "Squirtle", "Charmander", "Mewtwo"];

const pokemonUl = document.createElement("ul");

for (const pokemon of lista) {
  const li = document.createElement("li");
  li.textContent = pokemon;

  pokemonUl.append(li);
}

body.prepend(pokemonUl);
