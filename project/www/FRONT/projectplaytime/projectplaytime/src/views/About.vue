<template>
  <div class="about">
    <div class="project">
        <h1>TÍTULO</h1>
        <p>DONACIÓN DE JUGUETES ONLINE</p>

        <h2>DESCRIPCIÓN</h2>
        <p>
          Portal para buscar juguetes gratis (donados por particulares). Quien busca juguetes accede, selecciona los que le interesa y solicita que se los den.
        </p>

        <h2>
          ANÓNIMO
        </h2>
        <ul>
          <li>Visualizar la landing</li>
          <li>Búsqueda por:</li>
          <ul>
          <li>Edad recomendada del juguete</li>
          <li>Categoría</li>
          <li>Localidad</li>
          </ul>
          <li>Login</li>
          <li>Registro (le llega email de registro)</li>
        </ul>

        <h2>USUARIOS REGISTRADOS (los que solicitan juguetes)</h2>
        <ul>
          <li>Gestión del perfil (cambio de datos…)</li>
          <li>Búsqueda por :</li>
          <ul>
          <li>Edad recomendada del juguete</li>
          <li>Categoría</li>
          <li>Localidad</li>
          </ul>
          <li>Reserva del juguete (recibe email con el código de la reserva y el punto y hora de entrega).</li>
          <li>Rating de los donantes (después de la fecha de la entrega).</li>
        </ul>

        <h2>INFORMACIÓN DE LOS JUGUETES:</h2>
          <ul>
            <li>La plataforma permitirá introducir en backend la información necesaria sobre cada donante y juguete:</li>
          <ul>
            <li>Nombre del donante</li>
            <li>Descripción del juguete</li>
            <li>Categoría</li>
            <li>Ubicación</li>
            <li>Edad recomendada del juguete</li>
            <li>Rating otorgado de donaciones previas</li>
            <li>Horario y lugar de entrega (martes a 20h en plaza A)</li>
          </ul>
          </ul>
    </div>
    
    <myfooter class="foote"/>

  </div>
  
</template>

<script>
import myfooter from '@/components/MyFooter.vue'

export default {
  name: 'About',
  components: {
    myfooter
  }
}
</script>

<style scoped>
* {
  margin-left: 2rem;
  text-align: left;
}
.project{
  margin-top: -8rem;
}
</style>
