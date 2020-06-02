const pokemons = document.querySelectorAll("ul.pokemon li h1");

const handlePokemonClick = function (event) {
  const title = event.target;

  for (const pokemon of pokemons) {
    const li = pokemon.parentElement;
    li.querySelector("p").style.height = "0px";
  }

  const p = title.parentElement.querySelector("p");

  p.style.height = "50px";
};

for (const pokemon of pokemons) {
  pokemon.addEventListener("click", handlePokemonClick);
}
