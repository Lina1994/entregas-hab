<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'Home'} ">Home</router-link> |
      <router-link :to="{ name: 'About'} ">About</router-link> |
      <router-link :to="{ name: 'Products'} ">Productos</router-link> |
      <router-link :to="{ name: 'RegistrarProducto'} ">Nuevo roducto</router-link> |
      <router-link :to="{ name: 'Clients'} ">Clientes</router-link> |
      <router-link :to="{ name: 'Registrar'} ">Registrar</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
    name: 'navegador',
    props: {
        navegar: String
    }
}
</script>

<style scoped>
#nav {
  padding: 3px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>