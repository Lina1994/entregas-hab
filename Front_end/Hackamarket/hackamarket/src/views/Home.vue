<template>
  <div class="home">
  <naveg/>
  <h1>¿Verdad que aceptas nuestros términos y condiciones?</h1>
    <img src="https://img.pngio.com/personaje-del-diablo-de-halloween-descargar-png-svg-transparente-el-diablo-png-512_512.png" 
    alt="Sala espera" >
    <elfooter class="foote"/>
  </div>
</template>

<script>
// @ is an alias to /src
import naveg from '@/components/Navegador.vue'
import elfooter from '@/components/Mifooter.vue'

export default {
  name: 'Home',
  components: {
    naveg,
    elfooter
  }
}
</script>

<style scoped>
.foote {
        position: fixed;
        left: 0;
        bottom: 0;
        top: 90%;
        width: 100%;
        text-align: center;
}
img {
  position: fixed;
  right: 1rem;
  bottom: 4rem;
  max-width: 100vh;
  max-height: 100vh;
  height: 25rem;
  object-fit: cover;
  transition: all .4s;
}
h1 {
  margin-top: 6rem;
  font-size: 300%;
}

</style>
