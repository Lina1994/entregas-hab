<template>
  <div>
      <!-- -->
    <div id="nav">
      <router-link :to="{ name: 'Home' }">Home</router-link> |
      <router-link :to="{ name: 'About' }">About</router-link> |
      <router-link :to="{ name: 'Collection' }">Collection</router-link> |
      <router-link :to="{ name: 'KingdomCollection' }">Kingdom</router-link>
      <p> {{ username }} </p>
    </div>
  </div>
</template>

<script>
   //
export default {
   name: 'MenuCustom',
   props: {
       username: String,
       email: String,
       age: Number
   }
}
</script>

<style scoped>
   /* */
   #nav {
     padding: 30px;
   }

   #nav a {
     font-weight: bold;
     color: #2c3e50;
   }

   #nav a.router-link-exact-active {
     color: #42b983;
   }
</style>