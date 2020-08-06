<template>
  <div>
      <h1>
          ¡Bienvenid@ a la familia!
      </h1>
      <input type="text" placeholder="Nombre de usuario">
      <br>
      <input type="password" placeholder="Contraseña">
      <br>
      <button>
          Registrarse
      </button>
      <router-link :to="{ name: 'Loging'} ">¿Ya eres parte de la familia?</router-link> 
  </div>
</template>

<script>
export default {
    name: 'Register'
}
</script>

<style scopede>
h1 {
    margin-top: 10rem;
}
</style>