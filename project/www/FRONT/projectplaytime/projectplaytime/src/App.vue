<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link v-show="logged" :to="{ name: 'Home'} ">| Home |</router-link> -->
      <router-link :to="{ name: 'Home' }"> Donaciones </router-link>
      <!--<router-link :to="{ name: 'About' }">| About |</router-link>-->
      <router-link v-show="logged" :to="{ name: 'MyUser'} "> Perfil </router-link> 
      <router-link v-show="logged" :to="{ name: 'Donate' }"> Donar </router-link>
      <router-link v-show="unlogged && vshowdebug" :to="{ name: 'Register'} "> Register </router-link>
      <router-link v-show="unlogged && vshowdebug" :to="{ name: 'Validate'} "> Validar usuario </router-link> 
      <router-link v-show="unlogged" :to="{ name: 'Login'} "> Login </router-link> 
      <button class="logout" v-show="logged" @click="logoutUser()">
        LOGOUT
      </button>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { isLoggedIn } from './utils/utils.js'

export default {
  data(){
    return {
      username: '',
      role: '',
      logged: false,
      unlogged: true,
      vshowdebug: false
    }
  },
  methods: {
    ///// LOGOUT
    logoutUser(){
      //axios.defaults.headers.common['Authorization'] = ''
      localStorage.removeItem('AUTH_TOKEN_KEY')
      //localStorage.removeItem('ROLE')
      localStorage.removeItem('EMAIL')
      setTimeout( () => {
        location.reload()
      }, 250 );
  },
  getLogin() {
      this.logged = isLoggedIn()
      this.unlogged = !this.logged
    }
  },
  created(){
    this.getLogin()
  }
}
</script>

<style>
*{
  margin-top: 0;
  margin-left: 0;
}
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
  margin-left: .5rem;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.logout{
  margin-left: 1rem;
  margin-right: 1rem;
}

</style>
