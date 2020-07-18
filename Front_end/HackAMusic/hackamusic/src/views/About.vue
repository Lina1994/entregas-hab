<!-- HTML DE LA VISTA -->
<template>
 <!-- SÍ, TODO ESTE CÓDIGO ES REUTILIZADO DE UN PROYECTO DE CSS
 PERO CON ALGÜN CAMBIO -->
<div class="about">
<body>
  <!-- CABECERA  -->
  <header>

    <figure>
      <img class="second" src="../assets/perfil_lucía.jpeg" alt="Lucía Carolina González Chans" />
    </figure>

    <h1>Lucía Caro<strong class="nickname">lina</strong></h1>
    <h2>González <strong class="nickname">Chan</strong>s</h2>
    <a href="mailto:luciagc_94@outlook.es">luciagc_94@outlook.es</a>

  </header>
  <!-- /CABECERA  -->

  <!-- Info Columna 1  -->
  <section id="intro">
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi, laborum quos? Sit sapiente eveniet eos eaque dolor ab amet quisquam modi, quas aut, dolorum veritatis et quae distinctio vero dignissimos quidem, eius consectetur quod hic cupiditate neque. Est fugit quis at odio officiis autem magni excepturi. Doloremque a omnis veritatis!</p>

    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit voluptas ex ab cupiditate reprehenderit temporibus asperiores incidunt possimus, deleniti ratione ad doloremque iste! Est ea aspernatur sequi aut tempore perspiciatis. Architecto, provident. Totam, alias praesentium repellendus debitis repudiandae atque mollitia repellat sapiente? Error veniam dolorem ipsa voluptatibus velit, omnis minus.</p>

    <!-- <a class="button" href="pages/about.html">Más info</a> -->
  </section>
  <!-- /Info Columna 1  -->

  <!-- Info Columna 2  -->
  <section id="experience">

    <h2>Experiencia</h2>

    <ul>
      <li>Lorem ipsum dolor sit amet.</li>
      <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</li>
      <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, velit.</li>
      <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
    </ul>

  </section>
  <!-- Info Columna 2  -->

</body>

  </div>
</template>
<!-- /HTML DE LA VISTA -->

<script> //JS DE LA VISTA
/*
const rn = (max) => Math.floor(Math.random() * max +20);
const borderR = document.querySelector("img.second");
console.log(borderR);
function changeradius() {

    borderR.style.borderRadius = `${rn(100)}% ${rn(80)}% ${rn(80)}% ${rn(80)}%`;
    
}
const interval = setInterval(changeradius, 1000);
*/
</script>

<style scoped>
/* Importar tipografía */
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;900&display=swap");

/* RESETEO DEL HTML */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* DEFINIR COLORES A USAR */
.about {
  --dark: #222222;
  --bright: #ffffff;
  --action: #1a71a3;
  --nickname: #4d2280;
  --font: "Source Sans Pro", sans-serif;
}

/* AJUSTAR ANCHO MAXIMO IMAGENES AL ANCHO DE LA PANTALLA */
/* EVITA SCROLL HORIZONTAL POR LA IMAGEN */
img {
  max-width: 100%;
}

body {
  font-family: var(--font);
  display: flex;
  flex-direction: column;
}

/* Clases comunes */
.nickname {
  color: var(--nickname);
}

/* Header */

body > header {
  margin: 1rem 0;
  text-align: center;
}


body > header img {
  border: 8px solid var(--dark);
  border-radius: 65% 40% 60% 40%;
  max-width: 9rem;
  transition: all 2s;
}

body > header h1 {
  margin: 1rem 0 0.5rem 0;
}

body > header a {
  color: var(--dark);
  text-decoration: none;
  font-weight: 600;
}
div {
  height: 89vh;
}

/* Section(s) */

body > section {
  margin: 1rem;
}

body > section p,
body > section figure {
  margin-bottom: 1rem;
}

body > section figure img {
  width: 100%;
}

body > section#experience h2 {
  margin-bottom: 1rem;
}

body > section#experience ul {
  padding-left: 2rem;
}

/* DEFINE COMPORTAMIENTO PARA ANCHO MAYOR QUE 700px */
@media (min-width: 700px) {
  body {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  body > header {
    width: 100%;
  }

  body > header h1 {
    font-size: 4rem;
    margin-top: 0;
    line-height: 4rem;
  }

  body > header h2 {
    font-size: 3rem;
    margin-top: 0;
    line-height: 3rem;
  }

  body > section {
    width: calc(50% - 2rem);
  }

  body#interior > header {
    width: 30%;
  }

  body#interior > section {
    width: calc(70% - 4rem);
  }
}

/* DEFINE COMPORTAMIENTO PARA ANCHO MAYOR QUE 1000px */
@media (min-width: 1000px) {

  body > header {
    text-align: right;
    margin: 1rem;
  }

  body > header,
  body > section {
    width: calc(33.33% - 2rem);
  }
}
</style>
