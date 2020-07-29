<template>
  <div>
    <naveg/>
      <vue-headful
    title="ERROR"
    />
      <h1>
          ¿Eres viajero en el tiempo? 
      </h1>
      <h2>
          Puede que en el futuro tengamos lo que buscas
      </h2>
      <h3>
          pero por ahora no lo tenemos.
      </h3>
      <img src="https://miro.medium.com/max/534/1*wUOrpv-selJOytCkslSIhg.png">
      <p>Usa el menú para volver al rebaño :)</p>
      
  </div>
</template>
<!-- /HTML DE LA VISTA -->

<script> //JS DE LA VISTA
import naveg from '@/components/Navegador.vue'

export default {
name: 'Error',
components: {
    naveg
  }
}
</script>

<style scoped>/* CSS de la vista */
div {
  /*height: 500px;*/
  /*height: 87vh;*/
  background: rgb(255, 255, 255);
}
</style>