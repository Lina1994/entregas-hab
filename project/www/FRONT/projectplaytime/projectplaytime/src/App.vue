<template>
  <div id="app">
    <div id="nav">
      <div class="homie">
      <router-link :to="{ name: 'Home' }"> PLAYTIME </router-link>
      </div>
      <div class="others">
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
  max-width: 100%;
  /*flex-flow: row wrap;*/
  align-items: flex-end;
  padding: .8rem;
  background: deepskyblue;
  margin-bottom: 1rem;
}
#nav div {
  flex: auto;
}
.homie {
  display: flex;
  margin-bottom: -1rem;
  font-size: 150%;
}
.others {
  display: flex;
  margin-right: 1rem;
  justify-content: flex-end;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
  margin-left: .5rem;
}

#nav a.router-link-exact-active {
  color: #e8ecf0;
}
.logout{
  padding: 0;
  margin-left: 1rem;
  margin-right: -2rem;
  margin-top: -.6rem;
  background-color: rgba(0, 191, 255, 0);
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 1px solid rgb(17, 16, 16);
  font-size: 70%;
  transform: rotate(90deg);
}

</style>
