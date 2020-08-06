<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link v-show="logged" :to="{ name: 'Home'} ">| Home |</router-link> -->
      <router-link :to="{ name: 'Home' }">| Home |</router-link>
      <router-link :to="{ name: 'About' }">| About |</router-link>
      <router-link :to="{ name: 'Donate' }">| Donar |</router-link>
      <router-link :to="{ name: 'MyUser'} ">| Perfil |</router-link> 
      <router-link :to="{ name: 'Register'} ">| Register |</router-link>
      <router-link :to="{ name: 'Validate'} ">| Validar usuario |</router-link> 
      <router-link :to="{ name: 'Login'} ">| Login |</router-link> 
      <button class="logout" @click="logoutUser()">
        LOGOUT
      </button>
    </div>
    <router-view/>
  </div>
</template>

<script>

export default {
  data(){
    return {
      username: '',
      role: ''
    }
  },
  methods: {
    ///// LOGOUT
    logoutUser(){
      //axios.defaults.headers.common['Authorization'] = ''
      localStorage.removeItem('AUTH_TOKEN_KEY')
      //localStorage.removeItem('ROLE')
      localStorage.removeItem('EMAIL')
  }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 3px 30px 30px 30px ;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
